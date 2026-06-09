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
      <p className="font-mono text-sm font-semibold text-orange-400">
        {`/* ${eyebrow} */`}
      </p>
      <h2 className="mt-3 text-2xl font-semibold tracking-normal text-white sm:text-3xl lg:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 text-pretty text-sm leading-6 text-zinc-400 sm:text-base sm:leading-7">
          {description}
        </p>
      ) : null}
    </div>
  );
}
