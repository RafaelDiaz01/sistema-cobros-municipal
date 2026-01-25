export default function InfoItem({ label, value }) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-sm font-bold">{label}</p>
      <p className="text-sm font-medium">{value}</p>
    </div>
  );
}
