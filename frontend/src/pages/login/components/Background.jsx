export default function Background() {
    return (
        <>
            {/* FORMAS DECORATIVAS */}
            <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-green-100 rounded-full opacity-60" />
            <div className="absolute bottom-[-200px] right-[-200px] w-[600px] h-[600px] bg-green-200 rounded-full opacity-50" />

            {/* SVG SUAVE */}
            <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 1440 320"
                preserveAspectRatio="none"
            >
                <path
                    fill="#22c55e"
                    fillOpacity="0.08"
                    d="M0,224L1440,96L1440,0L0,0Z"
                />
            </svg>
        </>
    );
}