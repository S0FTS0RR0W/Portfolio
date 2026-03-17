"use client";

import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";
import {
  createCalendarTheme,
  Heatmap,
  type HeatmapData,
  type Theme,
} from "react-github-heatmap";

interface GitHubHeatmapResponse {
  heatmapData: HeatmapData;
}

//end user theme options
const ThemeOptions: Record<string, Theme> = {
  light: createCalendarTheme(
    "#0f766e",
    "#1f2937",
    "hsl(210 24% 92%)",
    "transparent",
  ),
  dark: createCalendarTheme(
    "#34d399",
    "#e6edf3",
    "hsl(215 14% 20%)",
    "transparent",
  ),
  nord: createCalendarTheme(
    "#88c0d0",
    "#2e3440",
    "hsl(210 24% 92%)",
    "transparent",
  ),
};

export default function GitHubChart() {
  const { resolvedTheme } = useTheme();
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

  const totalContributions = useMemo(() => {
    if (!data) return 0;
    return data.contributions.reduce((total, entry) => total + entry.count, 0);
  }, [data]);

  const heatmapTheme = useMemo<Theme>(() => {
    if (resolvedTheme === "dark") {
      return ThemeOptions.dark;
    }

    return ThemeOptions.light;
  }, [resolvedTheme]);

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
    <section className="github-activity-heatmap w-full max-w-5xl overflow-x-auto rounded-3xl border border-border/70 bg-linear-to-br from-card via-card/95 to-muted/40 p-5 font-mono shadow-[0_20px_70px_-45px_hsl(173_80%_36%/0.65)] backdrop-blur-sm sm:p-6">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">
            GitHub Contributions
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {totalContributions.toLocaleString()} commits tracked across{" "}
            {years.length} year
            {years.length === 1 ? "" : "s"}
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-border/70 bg-background/50 px-3 py-1.5 text-xs text-muted-foreground">
          <span>Less</span>
          <span className="h-2.5 w-2.5 rounded-lg bg-[hsl(210_24%_92%)] dark:bg-[hsl(215_14%_20%)]" />
          <span className="h-2.5 w-2.5 rounded-lg bg-emerald-300/70 dark:bg-emerald-500/45" />
          <span className="h-2.5 w-2.5 rounded-lg bg-emerald-500/75 dark:bg-emerald-400/65" />
          <span className="h-2.5 w-2.5 rounded-lg bg-emerald-700/80 dark:bg-emerald-300/85" />
          <span>More</span>
        </div>
      </div>

      <Heatmap
        data={data}
        years={years}
        fullYear={false}
        theme={heatmapTheme}
        blockSize={12}
        blockMargin={3}
        fontSize={12}
        style={{
          color: "var(--foreground)",
        }}
      />
    </section>
  );
}
