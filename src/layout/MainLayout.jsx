import { Outlet } from "react-router-dom";
import Header from "../components/Sections/Header/Header";
import Footer from "../components/Sections/Footer/Footer";

const MainLayout = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
 <img
  src="/bg.png"
  srcSet="/bg.png 640w, /bg.png 1280w, /bg.png 1920w"
  sizes="(max-width: 640px) 640px, (max-width: 1280px) 1280px, 1920px"
  alt="background"
  className="absolute inset-0 w-full h-full object-cover z-0"
  loading="lazy"
/>
  <div className="relative z-10">
    <Header />
    <main className="main-content px-4 sm:px-6 py-6 sm:py-10">
      <Outlet />
    </main>
    <Footer />
  </div>
</div>

  );
};

export default MainLayout;
