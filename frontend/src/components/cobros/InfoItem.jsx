export default function InfoItem({ label, value }) {
  return (
    <div>
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
        {label}
      </p>
      <p className="text-xs font-bold text-[var(--color-texto)]">
        {value}
      </p>
    </div>
  );
}
