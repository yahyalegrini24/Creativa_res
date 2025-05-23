import React, { useState, useEffect } from "react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10); // Add blur if scrolled more than 10px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
  className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
    isScrolled ? "backdrop-blur-md" : "backdrop-blur-none"
  }`}
>
      <div className="container mx-auto px-6 py-4 flex justify-center">
        {/* Navigation Links */}
        <nav className="flex space-x-8">
          <a
            href="/"
            className="text-white text-lg font-medium relative group"
          >
            Home
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-cyan-500 transition-all group-hover:w-full"></span>
          </a>
          <a
            href="about"
            className="text-white text-lg font-medium relative group"
          >
            About
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-cyan-500 transition-all group-hover:w-full"></span>
          </a>
          <a
            href="members"
            className="text-white text-lg font-medium relative group"
          >
            Members
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-cyan-500 transition-all group-hover:w-full"></span>
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;