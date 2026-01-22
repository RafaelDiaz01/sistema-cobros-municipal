import clsx from "clsx";

const COLS = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
};

function Grid({ children, cols = 1, md, lg, gap = "gap-5", className = "" }) {
  return (
    <div
      className={clsx(
        "grid",
        COLS[cols],
        md && `md:${COLS[md]}`,
        lg && `lg:${COLS[lg]}`,
        gap,
        className,
      )}
    >
      {children}
    </div>
  );
}

export default Grid;
