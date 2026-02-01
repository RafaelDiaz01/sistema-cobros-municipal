export default function InfoItem({ label, value }) {
  const isNotSelected = value === "No Seleccionado";
  return (
    <div className="flex items-center justify-between">
      <p className="text-sm font-medium">{label}</p>
      <p className={`text-sm font-medium ${isNotSelected ? "text-gray-400" : "text-gray-800"}`}>{value}</p>
    </div>
  );
}
