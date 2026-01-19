import Stack from "../layouts/Stack";

export default function SectionSubtitle({ title, children }) {
    return (
        <Stack gap="gap-6">
            <div className="flex items-center gap-3">
                <span className="w-1 h-6 bg-[var(--color-acento)] rounded-full" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--color-acento)]">
                    {title}
                </h2>
            </div>
            {children}
        </Stack>
    );
}