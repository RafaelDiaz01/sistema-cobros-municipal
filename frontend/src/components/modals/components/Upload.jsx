import { ImageUp } from "lucide-react";

function Upload({ name, field }) {
  return (
    <label
      htmlFor={name}
      className="border-2 border-dashed rounded-xl p-8 text-center text-sm text-gray-500 block cursor-pointer flex flex-col items-center gap-3 hover:border-[var(--color-primario)] transition-colors"
    >
      <ImageUp className="text-gray-400" />
      <p>Haz clic o arrastra tu imagen aquí para subirla</p>
      <input
        id={name}
        type="file"
        accept="image/*"
        className="sr-only"
        {...field}
      />
    </label>
  );
}

export default Upload;