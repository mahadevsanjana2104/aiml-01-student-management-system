export default function StatusCard({ title, value, tone = "default" }) {
  const toneClass = {
    success: "status-card success",
    danger: "status-card danger",
    default: "status-card",
  }[tone];

  return (
    <div className={toneClass}>
      <p>{title}</p>
      <h3>{value}</h3>
    </div>
  );
}
