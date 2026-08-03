type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="scroll-reveal max-w-2xl">
      <p className="font-mono text-sm font-medium uppercase tracking-normal text-sky-700/80">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-pretty text-base leading-7 text-zinc-500">
          {description}
        </p>
      ) : null}
    </div>
  );
}
