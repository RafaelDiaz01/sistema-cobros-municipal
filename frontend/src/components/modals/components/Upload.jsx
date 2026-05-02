import { useState, useEffect } from "react";
import { ImageUp } from "lucide-react";

function Upload({ name, field, defaultImage }) {
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
    <label
      htmlFor={name}
      className="border-2 border-dashed rounded-xl p-8 text-center text-sm text-gray-500 block cursor-pointer flex flex-col items-center gap-3 hover:border-[var(--color-primario)] transition-colors"
    >
      {preview ? (
        <><img
          src={preview}
          alt="Preview"
          className="w-32 h-32 object-cover rounded-full"
        />
          <p>Si deseas cambiar la imagen, haz clic aquí</p>
        </>
      ) : (
        <>
          <ImageUp className="text-gray-400" />
          <p>Selecciona una imagen de tu dispositivo</p>
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
  );
}

export default Upload;