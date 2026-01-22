// Componente para apilar elementos verticalmente con espacio entre ellos
import clsx from "clsx";

const GAP_SIZES = {
  xs: "gap-2",
  sm: "gap-4",
  md: "gap-6",
  lg: "gap-8",
  xl: "gap-10",
};

export default function Stack({ children, size = "md", className }) {
  return (
    <div className={clsx("flex flex-col", GAP_SIZES[size], className)}>
      {children}
    </div>
  );
};
