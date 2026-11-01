export function Marquee({ items }: { items: string[] }) {
  const loop = [...items, ...items];
  return (
    <div className="border-y border-white/10 py-5">
      <p className="sr-only">Industries we work with: {items.join(", ")}.</p>
      <div aria-hidden className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <ul className="animate-marquee flex shrink-0 items-center gap-10 pr-10 hover:[animation-play-state:paused] motion-reduce:animate-none">
          {loop.map((item, i) => (
            <li key={`${item}-${i}`} className="font-display text-paper/80 flex items-center gap-10 text-xl font-medium whitespace-nowrap">
              {item}
              <span className="text-lime text-base">✦</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
