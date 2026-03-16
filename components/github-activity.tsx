"use client";

import { Chart, registerables } from "chart.js";
import { useEffect, useRef, useState } from "react";

Chart.register(...registerables);

interface CommitActivity {
  date: string;
  commitCount: number;
}

export default function GitCommits() {
  const [activity, setActivity] = useState<CommitActivity[]>([]);
  const [error, setError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    async function loadCommits() {
      try {
        const res = await fetch("/api/github");
        if (!res.ok) throw new Error("Failed to fetch commits");
        const json = await res.json();
        setActivity(json.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      }
    }
    loadCommits();
  }, []);

  useEffect(() => {
    if (!activity.length || !canvasRef.current) return;

    // Destroy existing chart
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, "rgba(75, 192, 192, 1)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 1)");

    const labels = activity.map((a) => {
      const date = new Date(`${a.date}-02`); // Use day 2 to avoid timezone issues
      return date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
      });
    });
    const data = activity.map((a) => a.commitCount);

    chartRef.current = new Chart(canvasRef.current, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Commits (by Month)",
            data: data,
            backgroundColor: gradient as CanvasGradient,
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
            },
          },
        },
      },
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [activity]);

  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;

  return (
    <div style={{ width: "600px", height: "400px", padding: "50px" }}>
      <h2>Github Commits (by Month)</h2>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}
