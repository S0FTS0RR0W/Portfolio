import WakatimeStats from "@/components/wakatime-stats";
import GitCommits from "@/components/github-activity";
import GitHubChart from "@/components/github-chart";

export default function Activity() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="">
            <WakatimeStats />
            </div>
            <div className="flex flex-col items-center justify-center gap-4">
            <GitCommits />
            </div>
            <div className="flex flex-col items-center justify-center gap-3">
            <GitHubChart />
            </div>
        </main>
    )
}