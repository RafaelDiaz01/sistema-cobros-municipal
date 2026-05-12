import { useState, useEffect } from "react";
import { ImageUp } from "lucide-react";
import Stack from "../../layouts/Stack";

function Upload({ label, placeholder, required = false, name, field, defaultImage, error }) {
  const [preview, setPreview] = useState(defaultImage || null);

  // Este useEffect limpia el objeto URL cuando el componente se desmonte o cuando cambie la imagen
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
    field.onChange(e);
  };

  return (
    <Stack size="xs">
      <label className="text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <label
        htmlFor={name}
        className={`border-2 border-dashed rounded-xl p-8 text-center text-sm block cursor-pointer flex flex-col items-center gap-3
          ${error ? "border-red-500 text-red-500" : "text-gray-500 hover:border-[var(--color-primario)]"}`}
      >
        {preview && !error ? (
          <>
            <img
              src={preview}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-full"
            />
            <p>Si deseas cambiar la imagen, haz clic aquí</p>
          </>
        ) : (
          <>
            <ImageUp className={error ? "text-red-500" : "text-gray-400"} />
            <p>{error ? error : placeholder}</p>
          </>
        )}
        <input
          id={name}
          type="file"
          accept="image/*"
          className="sr-only"
          {...field}
          onChange={handleFileChange}
        />
      </label>
    </Stack >
  );
}

export default Upload;