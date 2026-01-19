import { FolderUp } from "lucide-react";
function Upload() {
  return (
    <div className="border-2 border-dashed rounded-xl p-8 text-center text-sm text-gray-500">
      <FolderUp className="mx-auto mb-3 text-gray-400" />
      <p>Arrastre un archivo aquí o</p>
      <button className="text-green-600 font-medium mt-1">
        Seleccione un archivo
      </button>
      <p className="text-xs mt-2">
        Copia de Credencial de Elector (INE/IFE)
      </p>
    </div>
  );
}
export default Upload;