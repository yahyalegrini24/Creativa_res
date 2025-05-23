import { Outlet } from "react-router-dom";
import Header from "../components/Sections/Header/Header";
import Footer from "../components/Sections/Footer/Footer";

const MainLayout = () => {
  return (
    <div className="relative z-10">
      <img
  src="/bg.png"
  alt="background"
  className="absolute inset-0 w-full h-full object-cover sm:object-fill z-0"
/>

      <Header />
      <main className="main-content px-4 sm:px-6 py-6 sm:py-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
