type InnerPageHeroProps = {
  title: string;
};

export function InnerPageHero({ title }: InnerPageHeroProps) {
  return (
    <section className="flex min-h-[180px] items-center justify-center bg-[var(--color-primary-strong)] sm:min-h-[220px]">
      <div className="mx-auto w-full max-w-4xl px-4 py-12 text-center sm:px-6 sm:py-16 lg:px-8">
        <h1 className="text-4xl font-black uppercase leading-tight text-white sm:text-5xl lg:text-5xl">
          {title}
        </h1>
      </div>
    </section>
  );
}
