import { useEffect, useRef } from "react";

const techniques = [
  {
    title: "Leather Patch",
    body: "Etched and stitched patches with real hand-feel — built for trucker hats that carry a brand.",
    swatch: "craft__swatch--leather",
  },
  {
    title: "3D Embroidery",
    body: "Raised stitch work that holds up on hoodies, beanies, and crewnecks — clean, durable, premium.",
    swatch: "craft__swatch--embroidery",
    embroidery: true,
  },
  {
    title: "Screen Print",
    body: "Bold prints for tees, keys, and merch runs — sharp detail at any quantity.",
    swatch: "craft__swatch--print",
    print: true,
  },
];

export default function Craft() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const items = root.querySelectorAll(".craft__item");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.2 }
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="section craft" id="craft">
      <div className="section__inner">
        <p className="section__label">The craft</p>
        <h2 className="section__title">Branding that lasts</h2>
        <p className="section__lead">
          From leather-patched lids to heavyweight embroidery — we mark apparel the way your business shows up on the job.
        </p>

        <div className="craft__grid" ref={ref}>
          {techniques.map((item) => (
            <article className="craft__item" key={item.title}>
              <div className={`craft__swatch ${item.swatch}`}>
                {item.embroidery ? <span>ED&apos;S</span> : null}
                {item.print ? <span>PRINT</span> : null}
              </div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
