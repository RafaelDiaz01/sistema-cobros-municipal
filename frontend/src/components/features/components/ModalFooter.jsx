export default function ModalFooter(onClose, isEdit, idForm, buttonText) {
    return (
        <div className="flex justify-end gap-4 bg-white rounded-b-2xl pt-5 pb-0">
            <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 rounded-lg bg-[var(--color-cancelar)] text-[var(--color-text-secundario)] text-sm"
            >
                Cancelar
            </button>

            <button
                type="submit"
                form={idForm}
                className="px-6 py-2 rounded-lg bg-[var(--color-acento)] text-[var(--color-text-secundario)] text-sm font-medium"
            >
                {isEdit ? `Actualizar ${buttonText}` : `Guardar ${buttonText}`}
            </button>
        </div>
    );
}