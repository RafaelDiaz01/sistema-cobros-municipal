import Stack from "../../../components/layouts/Stack.jsx";

export default function Header({ logoUrl, loginError }) {
    return (
        <Stack size="xs">
            {/* LOGO */}
            <div className="flex justify-center">
                <img
                    src={logoUrl}
                    alt="Logo Ayuntamiento"
                    className="w-24 h-26 object-contain"
                    draggable="false"
                />
            </div>

            {/* TITULO */}
            <h1 className="text-xl font-bold text-black">
                Sistema de Cobros
            </h1>
            <p className="text-sm text-black">
                H. Ayuntamiento de Ixtlán de Juárez
            </p>

            {/* ERROR DE LOGIN */}
            {loginError && (
                <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm">
                    {loginError}
                </div>
            )}
        </Stack>
    );
}