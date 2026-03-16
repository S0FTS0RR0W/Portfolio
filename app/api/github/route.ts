import { NextResponse } from 'next/server';

export async function GET() {
    const apiKey = process.env.GITHUB_API_KEY;
    const username = 'S0FTS0RR0W';

    if (!apiKey) {
        return new NextResponse('Missing GITHUB_API_KEY', { status: 500 });
    }

    try {
        // Get today's date in ISO format
        const now = new Date();
        const currentYear = now.getUTCFullYear();
        const todayISO = now.toISOString();

        // 1. Fetch contribution years
        const yearsQuery = `
            query {
                user(login: "${username}") {
                    contributionsCollection {
                        contributionYears
                    }
                }
            }
        `;

        const yearsRes = await fetch('https://api.github.com/graphql', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query: yearsQuery }),
        });

        const yearsData = await yearsRes.json();

        if (!yearsRes.ok || yearsData.errors) {
            console.error('GitHub GraphQL error (years):', yearsData.errors || yearsRes.statusText);
            return new NextResponse('Failed to fetch contribution years', { status: 500 });
        }

        const years = yearsData.data.user.contributionsCollection.contributionYears;

        // 2. Build dynamic queries for each year
        const queryBody = years.map((year: number) => {
            const from = `${year}-01-01T00:00:00Z`;
            const to = year === currentYear
                ? todayISO // auto-updates daily
                : `${year}-12-31T23:59:59Z`;

            return `
                year${year}: contributionsCollection(from: "${from}", to: "${to}") {
                    contributionCalendar {
                        weeks {
                            contributionDays {
                                date
                                contributionCount
                            }
                        }
                    }
                }
            `;
        }).join('\n');

        const contributionsQuery = `
            query {
                user(login: "${username}") {
                    ${queryBody}
                }
            }
        `;

        const contributionsRes = await fetch('https://api.github.com/graphql', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query: contributionsQuery }),
        });

        const contributionsData = await contributionsRes.json();

        if (!contributionsRes.ok || contributionsData.errors) {
            console.error('GitHub GraphQL error (contributions):', contributionsData.errors || contributionsRes.statusText);
            return new NextResponse('Failed to fetch contribution data', { status: 500 });
        }

        // 3. Aggregate by month and collect daily points for heatmap rendering
        const contributionsByMonth: Record<string, number> = {};
        const dailyContributions: { date: string; count: number }[] = [];
        const yearsMeta: {
            year: string;
            total: number;
            range: { start: string; end: string };
        }[] = [];

        for (const year of years) {
            const yearData = contributionsData.data.user[`year${year}`];
            if (yearData) {
                let yearTotal = 0;
                let yearStart = '';
                let yearEnd = '';

                for (const week of yearData.contributionCalendar.weeks) {
                    for (const day of week.contributionDays) {
                        const month = day.date.substring(0, 7); // YYYY-MM
                        contributionsByMonth[month] = (contributionsByMonth[month] || 0) + day.contributionCount;

                        dailyContributions.push({
                            date: day.date,
                            count: day.contributionCount,
                        });

                        yearTotal += day.contributionCount;
                        if (!yearStart || day.date < yearStart) yearStart = day.date;
                        if (!yearEnd || day.date > yearEnd) yearEnd = day.date;
                    }
                }

                if (yearStart && yearEnd) {
                    yearsMeta.push({
                        year: String(year),
                        total: yearTotal,
                        range: {
                            start: yearStart,
                            end: yearEnd,
                        },
                    });
                }
            }
        }

        const data = Object.keys(contributionsByMonth)
            .map(month => ({
                date: month,
                commitCount: contributionsByMonth[month]
            }))
            .sort((a, b) => a.date.localeCompare(b.date));

        const sortedDailyContributions = dailyContributions.sort((a, b) => b.date.localeCompare(a.date));
        const maxDailyCount = Math.max(...sortedDailyContributions.map((entry) => entry.count), 1);
        const intensityPalette = ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'];

        const heatmapData = {
            years: yearsMeta.sort((a, b) => a.year.localeCompare(b.year)),
            contributions: sortedDailyContributions.map((entry) => {
                const intensity =
                    entry.count === 0
                        ? 0
                        : Math.min(4, Math.max(1, Math.ceil((entry.count / maxDailyCount) * 4)));

                return {
                    date: entry.date,
                    count: entry.count,
                    color: intensityPalette[intensity],
                    intensity,
                };
            }),
        };

        return NextResponse.json({ data, heatmapData });

    } catch (error) {
        console.error('Fetch error:', error);
        if (error instanceof Error) {
            return new NextResponse(`Failed to fetch: ${error.message}`, { status: 500 });
        }
        return new NextResponse('An unknown error occurred', { status: 500 });
    }
}
