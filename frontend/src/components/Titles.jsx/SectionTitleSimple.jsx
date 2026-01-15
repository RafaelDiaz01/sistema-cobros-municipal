export default function SectionTitleSimple({ text }) {
  return (
    <div className="w-full flex items-center justify-between">
      {/* TÍTULO */}
      <h2 className="text-3xl font-bold text-black">
        {text}
      </h2>
    </div>
  );
}
