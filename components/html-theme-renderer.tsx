"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { ModeToggle } from "@/components/mode-toggle";

interface HtmlThemeRendererProps {
  children: ReactNode;
}

const VOID_TAGS = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
]);

const HTML_THEME_PAGES = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/activity", label: "Activity" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
  { href: "/cv", label: "CV" },
  { href: "/projects", label: "Projects" },
];

interface HighlightToken {
  className: string;
  text: string;
}

function getTagName(segment: string) {
  const match = segment.match(/^<\/?\s*([a-zA-Z0-9:-]+)/);
  return match?.[1].toLowerCase() ?? null;
}

function pushToken(tokens: HighlightToken[], text: string, className: string) {
  if (!text) {
    return;
  }

  tokens.push({ className, text });
}

function tokenizeAttributes(source: string) {
  const tokens: HighlightToken[] = [];
  let index = 0;

  while (index < source.length) {
    const character = source[index];

    if (/\s/.test(character)) {
      const start = index;

      while (index < source.length && /\s/.test(source[index])) {
        index += 1;
      }

      pushToken(tokens, source.slice(start, index), "text-zinc-500");
      continue;
    }

    if (character === "/") {
      pushToken(tokens, character, "text-sky-700");
      index += 1;
      continue;
    }

    const nameStart = index;

    while (index < source.length && !/[\s=/>]/.test(source[index])) {
      index += 1;
    }

    pushToken(tokens, source.slice(nameStart, index), "text-emerald-700");

    while (index < source.length && /\s/.test(source[index])) {
      pushToken(tokens, source[index], "text-zinc-500");
      index += 1;
    }

    if (source[index] !== "=") {
      continue;
    }

    pushToken(tokens, source[index], "text-zinc-600");
    index += 1;

    while (index < source.length && /\s/.test(source[index])) {
      pushToken(tokens, source[index], "text-zinc-500");
      index += 1;
    }

    if (index >= source.length) {
      break;
    }

    if (source[index] === '"' || source[index] === "'") {
      const quote = source[index];
      const valueStart = index;

      index += 1;

      while (index < source.length && source[index] !== quote) {
        index += 1;
      }

      if (index < source.length) {
        index += 1;
      }

      pushToken(tokens, source.slice(valueStart, index), "text-amber-700");
      continue;
    }

    const valueStart = index;

    while (index < source.length && !/[\s>]/.test(source[index])) {
      index += 1;
    }

    pushToken(tokens, source.slice(valueStart, index), "text-amber-700");
  }

  return tokens;
}

function tokenizeTag(segment: string) {
  if (segment.startsWith("<!--")) {
    return [{ className: "text-zinc-500", text: segment }];
  }

  if (segment.startsWith("<!") || segment.startsWith("<?")) {
    return [{ className: "text-fuchsia-700", text: segment }];
  }

  const match = segment.match(/^<(\/?)([a-zA-Z0-9:-]+)([\s\S]*?)(\/?)>$/);

  if (!match) {
    return [{ className: "text-card-foreground", text: segment }];
  }

  const [, closingSlash, tagName, attributeSource, selfClosingSlash] = match;
  const tokens: HighlightToken[] = [];

  pushToken(tokens, "<", "text-sky-700");

  if (closingSlash) {
    pushToken(tokens, closingSlash, "text-sky-700");
  }

  pushToken(tokens, tagName, "text-blue-700 font-semibold");

  tokenizeAttributes(attributeSource).forEach((token) => {
    tokens.push(token);
  });

  if (selfClosingSlash) {
    pushToken(tokens, selfClosingSlash, "text-sky-700");
  }

  pushToken(tokens, ">", "text-sky-700");

  return tokens;
}

function highlightHtmlLine(line: string) {
  const segments = line.split(/(<[^>]+>)/g).filter(Boolean);

  if (!segments.length) {
    return [{ className: "text-card-foreground", text: line }];
  }

  return segments.flatMap((segment) => {
    if (segment.startsWith("<") && segment.endsWith(">")) {
      return tokenizeTag(segment);
    }

    return [{ className: "text-stone-700", text: segment }];
  });
}

function formatHtml(html: string) {
  const normalized = html
    .replace(/></g, ">\n<")
    .replace(/\n{2,}/g, "\n")
    .trim();

  const segments = normalized
    .split("\n")
    .map((segment) => segment.trim())
    .filter(Boolean);

  let indentLevel = 0;

  return segments
    .map((segment) => {
      const isClosingTag = /^<\//.test(segment);
      const isComment = /^<!--/.test(segment);
      const isDeclaration = /^<![^-]/.test(segment);
      const isProcessingInstruction = /^<\?/.test(segment);
      const isTag = /^</.test(segment);
      const tagName = isTag ? getTagName(segment) : null;
      const isVoidTag = tagName ? VOID_TAGS.has(tagName) : false;
      const isSelfClosingTag = /\/>$/.test(segment) || isVoidTag;
      const containsInlineText = /^<[^/!][^>]*>[^<]+<\//.test(segment);

      if (isClosingTag) {
        indentLevel = Math.max(indentLevel - 1, 0);
      }

      const formattedLine = `${"  ".repeat(indentLevel)}${segment}`;

      if (
        isTag &&
        !isClosingTag &&
        !isComment &&
        !isDeclaration &&
        !isProcessingInstruction &&
        !isSelfClosingTag &&
        !containsInlineText
      ) {
        indentLevel += 1;
      }

      return formattedLine;
    })
    .join("\n");
}

export function HtmlThemeRenderer({ children }: HtmlThemeRendererProps) {
  const { theme } = useTheme();
  const pathname = usePathname();
  const [rawHtml, setRawHtml] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isHtmlTheme = theme === "html";
  const formattedHtml = rawHtml ? formatHtml(rawHtml) : "";
  const formattedLines = formattedHtml ? formattedHtml.split("\n") : [];

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
      <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
            Raw HTML mode {pathname ? `- ${pathname}` : ""}
          </p>
          <div className="flex flex-wrap gap-2">
            {HTML_THEME_PAGES.map((page) => {
              const isActive = pathname === page.href;

              return (
                <Link
                  key={page.href}
                  href={page.href}
                  className={`rounded-md border px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] transition-colors ${
                    isActive
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-card-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  {page.label}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="self-start">
          <ModeToggle />
        </div>
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading raw HTML...</p>
      ) : null}

      {error ? <p className="text-sm text-destructive">{error}</p> : null}

      {!loading && !error ? (
        <div className="max-h-[calc(100vh-12rem)] overflow-auto rounded-md border bg-card text-xs leading-6 text-card-foreground">
          <div className="border-b px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            {formattedLines.length} lines
          </div>
          <pre className="overflow-x-auto p-4">
            {formattedLines.map((line, index) => (
              <div
                key={`${index + 1}-${line}`}
                className="grid grid-cols-[auto_1fr] gap-4"
              >
                <span className="select-none text-right text-muted-foreground/70">
                  {index + 1}
                </span>
                <code className="whitespace-pre-wrap wrap-break-word">
                  {highlightHtmlLine(line).map((token, tokenIndex) => (
                    <span
                      key={`${index + 1}-${tokenIndex}-${token.text}`}
                      className={token.className}
                    >
                      {token.text}
                    </span>
                  ))}
                </code>
              </div>
            ))}
          </pre>
        </div>
      ) : null}
    </section>
  );
}
