export default function Contact() {
  return (
    <section className="section contact" id="contact">
      <div className="section__inner">
        <p className="section__label">Get started</p>
        <h2 className="section__title">Ready to brand it?</h2>
        <p className="section__lead">
          Share your logo and what you need outfitted. We&apos;ll reply with options, timelines, and a clear quote.
        </p>
        <div className="contact__actions">
          <a className="btn btn--primary" href="mailto:hello@brandit.studio?subject=Project%20inquiry">
            Email the studio
          </a>
          <a
            className="btn btn--ghost"
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>
        </div>
        <p className="contact__meta">
          Woodstock, Ontario ·{" "}
          <a href="mailto:hello@brandit.studio">hello@brandit.studio</a>
        </p>
      </div>
    </section>
  );
}
