"use client";

import { Chart, registerables } from "chart.js";
import { useEffect, useRef, useState } from "react";

Chart.register(...registerables);

interface Language {
  name: string;
  total_seconds: number;
}

interface WakatimeStats {
  languages: Language[];
}

export default function WakatimeStats() {
  const [stats, setStats] = useState<WakatimeStats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await fetch("/api/wakatime");
        if (!res.ok) throw new Error("Failed to fetch stats");
        const json = await res.json();
        setStats(json.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      }
    }
    loadStats();
  }, []);

  useEffect(() => {
    if (!stats || !canvasRef.current) return;

    // Destroy existing chart
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const gradient: CanvasGradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, "rgba(75, 192, 192, 1)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 1)");

    const languages = stats.languages.map((l) => l.name);
    const hours = stats.languages.map((l) => l.total_seconds / 3600);

    chartRef.current = new Chart(canvasRef.current, {
      type: "bar",
      data: {
        labels: languages,
        datasets: [
          {
            label: "Hours coded (last 7 days)",
            data: hours,
            backgroundColor: gradient,
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [stats]);

  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;
  if (!stats) return <div>Loading...</div>;

  return (
    <div style={{ width: "600px", height: "400px" }}>
      <h2>Wakatime Stats (Last 7 Days)</h2>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}
