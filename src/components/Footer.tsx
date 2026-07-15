export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <a href="#top" className="brand-mark">
        BRAND<span className="brand-it">iT</span>
      </a>
      <p>© {year} BRANDiT · Woodstock, ON</p>
    </footer>
  );
}
