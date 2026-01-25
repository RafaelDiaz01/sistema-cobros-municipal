export default function InfoItem({ label, value }) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-sm font-medium">{label}</p>
      <p className="text-sm font-bold">{value}</p>
    </div>
  );
}
