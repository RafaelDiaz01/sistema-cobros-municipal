function Grid({ children, cols}) {
  return (
    <div className={`grid grid-cols-${cols} md:grid-cols-${cols} lg:grid-cols-${cols} gap-5`}>
      {children}
    </div>
  );
}
export default Grid;