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

        // 3. Aggregate by month
        const contributionsByMonth: Record<string, number> = {};

        for (const year of years) {
            const yearData = contributionsData.data.user[`year${year}`];
            if (yearData) {
                for (const week of yearData.contributionCalendar.weeks) {
                    for (const day of week.contributionDays) {
                        const month = day.date.substring(0, 7); // YYYY-MM
                        contributionsByMonth[month] = (contributionsByMonth[month] || 0) + day.contributionCount;
                    }
                }
            }
        }

        const data = Object.keys(contributionsByMonth)
            .map(month => ({
                date: month,
                commitCount: contributionsByMonth[month]
            }))
            .sort((a, b) => a.date.localeCompare(b.date));

        return NextResponse.json({ data });

    } catch (error) {
        console.error('Fetch error:', error);
        if (error instanceof Error) {
            return new NextResponse(`Failed to fetch: ${error.message}`, { status: 500 });
        }
        return new NextResponse('An unknown error occurred', { status: 500 });
    }
}
