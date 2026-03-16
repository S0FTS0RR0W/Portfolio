"use client";

import { useEffect, useMemo, useState } from "react";
import {
  createCalendarTheme,
  Heatmap,
  type HeatmapData,
} from "react-github-heatmap";

interface GitHubHeatmapResponse {
  heatmapData: HeatmapData;
}

export default function GitHubChart() {
  const [data, setData] = useState<HeatmapData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadHeatmap() {
      try {
        const res = await fetch("/api/github");
        if (!res.ok) {
          throw new Error("Failed to load GitHub activity");
        }

        const json: GitHubHeatmapResponse = await res.json();

        if (
          !json.heatmapData ||
          !Array.isArray(json.heatmapData.contributions)
        ) {
          throw new Error("Unexpected GitHub activity payload");
        }

        setData(json.heatmapData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      }
    }

    loadHeatmap();
  }, []);

  const years = useMemo(() => {
    if (!data) return [];
    return data.years.map((entry) => Number(entry.year)).sort((a, b) => b - a);
  }, [data]);

  if (error) {
    return <p className="font-mono text-sm text-red-500">Error: {error}</p>;
  }

  if (!data) {
    return (
      <p className="font-mono text-sm text-muted-foreground">
        Loading GitHub activity...
      </p>
    );
  }

  return (
    <section className="w-full max-w-5xl overflow-x-auto rounded-2xl border border-border bg-card/70 p-4 font-mono shadow-sm backdrop-blur">
      <h2 className="mb-4 text-lg font-semibold">GitHub Contributions</h2>
      <Heatmap
        data={data}
        years={years}
        fullYear={false}
        color="#14b8a6"
        theme={createCalendarTheme("#14b8a6")}
        blockSize={12}
        blockMargin={3}
        fontSize={12}
      />
    </section>
  );
}
