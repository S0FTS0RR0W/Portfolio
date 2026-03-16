"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center font-mono">
          <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
          <button
            className="px-4 py-2 bg-zinc-900 text-white rounded hover:bg-zinc-700 transition-colors dark:bg-zinc-100 dark:text-zinc-900"
            onClick={() => reset()}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
