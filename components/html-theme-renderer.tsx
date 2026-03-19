"use client";

import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { ModeToggle } from "@/components/mode-toggle";

interface HtmlThemeRendererProps {
  children: ReactNode;
}

export function HtmlThemeRenderer({ children }: HtmlThemeRendererProps) {
  const { theme } = useTheme();
  const pathname = usePathname();
  const [rawHtml, setRawHtml] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isHtmlTheme = theme === "html";

  useEffect(() => {
    if (!isHtmlTheme) {
      setRawHtml("");
      setLoading(false);
      setError(null);
      return;
    }

    const controller = new AbortController();

    const loadRawHtml = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(pathname || "/", {
          cache: "no-store",
          headers: {
            Accept: "text/html",
          },
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Unable to load HTML for ${pathname || "/"}.`);
        }

        const html = await response.text();
        setRawHtml(html);
      } catch {
        if (!controller.signal.aborted) {
          setError("Unable to load raw HTML for this page.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadRawHtml();

    return () => {
      controller.abort();
    };
  }, [isHtmlTheme, pathname]);

  if (!isHtmlTheme) {
    return <>{children}</>;
  }

  return (
    <section className="h-full w-full p-4 md:p-6 font-mono">
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Raw HTML mode {pathname ? `- ${pathname}` : ""}
        </p>
        <ModeToggle />
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading raw HTML...</p>
      ) : null}

      {error ? <p className="text-sm text-destructive">{error}</p> : null}

      {!loading && !error ? (
        <pre className="max-h-[calc(100vh-12rem)] overflow-auto rounded-md border bg-card p-4 text-xs leading-6 text-card-foreground whitespace-pre-wrap break-all">
          {rawHtml}
        </pre>
      ) : null}
    </section>
  );
}
