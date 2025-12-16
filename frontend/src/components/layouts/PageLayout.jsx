import Navbar from "../Navbar.jsx";

const PageLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[var(--color-fondo)] text-[var(--color-texto)] flex flex-col">
      {/* NAVBAR */}
      <Navbar />

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 w-full px-8">{children}</main>
    </div>
  );
};

export default PageLayout;
