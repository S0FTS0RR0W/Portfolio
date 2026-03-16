"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center font-mono">
      <h2 className="text-2xl font-bold mb-4">404 - Not Found</h2>
      <p className="mb-4">Could not find requested resource</p>
      <Link
        href="/"
        className="px-4 py-2 bg-zinc-900 text-white rounded hover:bg-zinc-700 transition-colors dark:bg-zinc-100 dark:text-zinc-900"
      >
        Return Home
      </Link>
    </div>
  );
}
