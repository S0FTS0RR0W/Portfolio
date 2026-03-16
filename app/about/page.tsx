import Image from "next/image";

export default function About() {
  const highlights = [
    "TypeScript Enthusiast",
    "Next.js Developer",
    "React Developer",
    "Web Developer",
    "Designer",
    "HomeLabber",
  ];

  const languages = [
    "TypeScript",
    "JavaScript",
    "Python",
    "C++",
    "HTML",
    "CSS",
    "SQL",
  ];

  const frameworks = [
    "Next.js",
    "React",
    "Express",
    "Django",
    "Flask",
    "Angular",
    "Tailwind",
  ];

  return (
    <main className="relative isolate overflow-hidden px-6 py-14 font-mono md:px-10 md:py-20">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-teal-500/15 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <section className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <article className="rounded-3xl border border-border/80 bg-card/70 p-7 shadow-sm backdrop-blur md:p-10">
          <p className="mb-4 inline-flex rounded-full border border-teal-500/30 bg-teal-500/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-teal-600 dark:text-teal-300">
            About Me
          </p>
          <h1 className="mb-5 text-3xl font-semibold leading-tight md:text-5xl">
            Building sharp, human-centered web experiences.
          </h1>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
            I&apos;m Charlie, a developer focused on frontend craftsmanship with
            a strong foundation in React, Next.js, and TypeScript. I care about
            clean UX, maintainable code, and building products that feel fast,
            intentional, and enjoyable to use.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-background/65 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Focus
              </p>
              <p className="mt-2 text-sm md:text-base">Frontend Architecture</p>
            </div>
            <div className="rounded-2xl border border-border bg-background/65 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Workflow
              </p>
              <p className="mt-2 text-sm md:text-base">
                Design + Code + Iterate
              </p>
            </div>
          </div>
        </article>

        <aside className="rounded-3xl border border-border/80 bg-card/70 p-7 shadow-sm backdrop-blur md:p-10">
          <div className="mx-auto mb-6 w-fit rounded-3xl border border-border/70 bg-background/70 p-2">
            <Image
              src="/charlie.jpg"
              alt="Portrait of Charlie Brown"
              width={280}
              height={280}
              className="h-56 w-56 rounded-2xl object-cover md:h-64 md:w-64"
              priority
            />
          </div>
          <ul className="grid gap-2 text-sm text-muted-foreground md:text-base">
            {highlights.map((item) => (
              <li
                key={item}
                className="rounded-xl border border-border bg-background/65 px-3 py-2 text-foreground/90"
              >
                {item}
              </li>
            ))}
          </ul>
        </aside>
      </section>

      <section className="mx-auto mt-8 grid w-full max-w-6xl gap-6 md:grid-cols-2">
        <article className="rounded-3xl border border-border/80 bg-card/70 p-7 shadow-sm backdrop-blur md:p-8">
          <h2 className="text-xl font-semibold">Languages</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Core languages I use to ship products and experiments.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {languages.map((language) => (
              <span
                key={language}
                className="rounded-full border border-border bg-background/70 px-3 py-1.5 text-sm"
              >
                {language}
              </span>
            ))}
          </div>
        </article>

        <article className="rounded-3xl border border-border/80 bg-card/70 p-7 shadow-sm backdrop-blur md:p-8">
          <h2 className="text-xl font-semibold">Frameworks & Tools</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            My day-to-day stack for modern web development.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {frameworks.map((framework) => (
              <span
                key={framework}
                className="rounded-full border border-teal-500/30 bg-teal-500/10 px-3 py-1.5 text-sm text-teal-700 dark:text-teal-200"
              >
                {framework}
              </span>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}
