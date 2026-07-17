export default function PageSection({ title, subtitle, children }) {
  return (
    <section className="page-section">
      <div className="section-header">
        <div>
          <h2>{title}</h2>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
      </div>
      <div className="section-body">{children}</div>
    </section>
  );
}
