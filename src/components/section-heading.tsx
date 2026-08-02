type SectionHeadingProps = {
  eyebrow?: string | null;
  title: string;
  description?: string | null;
  centered?: boolean;
};

export function SectionHeading({ eyebrow, title, description, centered = true }: SectionHeadingProps) {
  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? <p className="section-eyebrow">{eyebrow}</p> : null}
      <h2 className="mt-3 text-3xl font-black tracking-normal text-[var(--color-ink)] sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[var(--color-muted)]">
          {description}
        </p>
      ) : null}
    </div>
  );
}
