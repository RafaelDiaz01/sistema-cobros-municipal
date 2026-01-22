import Stack from "../../layouts/Stack.jsx";

function Section({ icon, title, children }) {
  return (
    <Stack size="md">
      <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-wider text-gray-500">
        <span className="w-8 h-8 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
          {icon}
        </span>
        {title}
      </div>
      {children}
    </Stack>
  );
}
export default Section;
