import WakatimeStats from "@/components/wakatime-stats";
import GitCommits from "@/components/github-activity";

export default function Activity() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <WakatimeStats />
            <GitCommits />
        </main>
    )
}