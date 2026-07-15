import { lazy, Suspense } from "react";

const Cap3D = lazy(() => import("./Cap3D"));

export default function Hero() {
  return (
    <section className="hero" id="top" aria-label="BRANDiT hero">
      <div className="hero__texture" aria-hidden="true" />
      <div className="hero__rock" aria-hidden="true" />

      <Suspense fallback={<div className="hero__canvas" aria-hidden="true" />}>
        <Cap3D />
      </Suspense>

      <div className="hero__content">
        <h1 className="hero__brand brand-mark">
          BRAND<span className="brand-it">iT</span>
        </h1>
        <p className="hero__headline">Your brand. Built to wear.</p>
        <p className="hero__support">
          Tees, hoodies &amp; all things custom embroidered &amp; printed.
        </p>
        <div className="hero__actions">
          <a className="btn btn--primary" href="#contact">
            Start a project
          </a>
          <a className="btn btn--ghost" href="#work">
            See the work
          </a>
        </div>
        <p className="hero__hint">Drag the cap to turn it</p>
      </div>
    </section>
  );
}
