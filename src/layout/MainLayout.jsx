import { Outlet } from "react-router-dom";
import Header from "../components/Sections/Header/Header";
import Footer from "../components/Sections/Footer/Footer";

const MainLayout = () => {
  return (
    <div className="relative min-h-screen overflow-hidden font-poppins text-white">
      {/* Background Image as Responsive Layer */}
      <img
        src="/bg.png"
        alt="background"
        className="absolute inset-0 w-full h-full object-cover sm:object-fill z-[-1]"
      />

      {/* Overlay content */}
      <Header />
      <main className="main-content px-6 py-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
