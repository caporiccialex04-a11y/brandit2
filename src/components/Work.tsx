import { useEffect, useRef } from "react";

const pieces = [
  {
    title: "Trucker — Navy",
    technique: "Leather Patch",
    visual: "vis-hat-navy",
    wide: true,
  },
  {
    title: "Heavyweight Hoodie",
    technique: "3D Embroidery",
    visual: "vis-hoodie",
  },
  {
    title: "Beanie",
    technique: "High-contrast stitch",
    visual: "vis-beanie",
  },
  {
    title: "Flannel Hood",
    technique: "Chest embroidery",
    visual: "vis-plaid",
  },
  {
    title: "Key tags",
    technique: "Screen print",
    visual: "vis-keys",
  },
  {
    title: "Trucker — Camel",
    technique: "Leather Patch",
    visual: "vis-hat-tan",
  },
];

export default function Work() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const items = root.querySelectorAll(".work__item");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.15 }
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="section work" id="work">
      <div className="section__inner">
        <p className="section__label">Selected work</p>
        <h2 className="section__title">Worn by local brands</h2>
        <p className="section__lead">
          Hats, hoodies, and accessories built for crews who want their name to look as solid as their work.
        </p>

        <div className="work__grid" ref={ref}>
          {pieces.map((piece) => (
            <article
              key={piece.title}
              className={`work__item${piece.wide ? " work__item--wide" : ""}`}
              tabIndex={0}
            >
              <div className={`work__visual ${piece.visual}`} aria-hidden="true" />
              <div className="work__caption">
                <strong>{piece.title}</strong>
                <span>{piece.technique}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
