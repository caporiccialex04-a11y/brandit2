import { useEffect, useState } from "react";

const links = [
  { href: "#craft", label: "Craft" },
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`site-nav${scrolled ? " is-scrolled" : ""}`}>
      <a href="#top" className="site-nav__logo brand-mark" onClick={close}>
        BRAND<span className="brand-it">iT</span>
      </a>

      <nav className="site-nav__links" aria-label="Primary">
        {links.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
        <a className="site-nav__cta" href="#contact">
          Start a project
        </a>
      </nav>

      <button
        type="button"
        className={`site-nav__toggle${open ? " is-open" : ""}`}
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
      >
        <span />
        <span />
        <span />
      </button>

      <div className={`site-nav__drawer${open ? " is-open" : ""}`}>
        {links.map((link) => (
          <a key={link.href} href={link.href} onClick={close}>
            {link.label}
          </a>
        ))}
        <a href="#contact" className="btn btn--primary" onClick={close}>
          Start a project
        </a>
      </div>
    </header>
  );
}
