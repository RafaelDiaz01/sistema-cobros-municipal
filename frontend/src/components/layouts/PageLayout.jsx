import Navbar from "../navbar/Navbar.jsx";
import Footer from "../footer/Footer.jsx";

const PageLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[var(--color-fondo)] text-[var(--color-texto)] flex flex-col">
      {/* NAVBAR */}
      <Navbar />

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 w-full px-8">{children}</main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default PageLayout;
