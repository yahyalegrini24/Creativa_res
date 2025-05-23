import { Outlet } from "react-router-dom";
import Header from "../components/Sections/Header/Header";
import Footer from "../components/Sections/Footer/Footer";
import { useMemo } from "react";

const MainLayout = () => {
  // Memoize background image to prevent unnecessary re-renders
  const backgroundImage = useMemo(() => (
    <picture>
      {/* Serve optimized images based on screen size */}
      <source 
        srcSet="/bg.png" 
        media="(max-width: 640px)" 
        type="image/webp" 
      />
      <source 
        srcSet="/bg.png" 
        media="(max-width: 1024px)" 
        type="image/webp" 
      />
      <source 
        srcSet="/bg.png" 
        type="image/webp" 
      />
      <img
        src="/bg.png"
        alt="Decorative background"
        className="fixed inset-0 w-screen h-screen object-cover sm:object-fill z-0 select-none pointer-events-none"
        loading="eager" // Important for LCP optimization
        decoding="async"
      />
    </picture>
  ), []);

  return (
    <div className="relative min-h-screen overflow-x-hidden max-w-[100vw]">
      {/* Optimized Background */}
      {backgroundImage}

      {/* Content Container */}
      <div className="relative z-10 min-h-[calc(100dvh-var(--header-height)-var(--footer-height)] flex flex-col">
        <Header className="h-[var(--header-height)]" />
        
        {/* Main Content Area */}
        <main className="flex-1 px-4 sm:px-6 py-6 sm:py-10 w-full max-w-7xl mx-auto">
          <Outlet />
        </main>

        <Footer className="h-[var(--footer-height)]" />
      </div>
    </div>
  );
};

export default MainLayout;