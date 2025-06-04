import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa"; // Import icons for hamburger menu

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10); // Add blur if scrolled more than 10px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "backdrop-blur-md bg-transparent/30" : "backdrop-blur-none"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        {/* Logo or Brand Name (Optional - Add if needed) */}
        <div className="text-white text-xl font-bold">
          {/* You can add a logo image here if you have one */}
          {/* <img src="/images/logo.png" alt="Creativa Logo" className="h-8" /> */}
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex space-x-8">
          <a
            href="/"
            className="text-white text-lg font-medium relative group"
          >
            Home
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-cyan-500 transition-all group-hover:w-full"></span>
          </a>
          <a
            href="/about"
            className="text-white text-lg font-medium relative group"
          >
            About
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-cyan-500 transition-all group-hover:w-full"></span>
          </a>
          <a
            href="/members"
            className="text-white text-lg font-medium relative group"
          >
            Members
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-cyan-500 transition-all group-hover:w-full"></span>
          </a>
           <a
            href="/aichat"
            className="text-white text-lg font-medium relative group"
          >
            AI Chat
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-cyan-500 transition-all group-hover:w-full"></span>
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-white focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu (Dropdown) */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-black/80 backdrop-blur-md shadow-lg py-4">
          <nav className="flex flex-col items-center space-y-4">
            <a
              href="/"
              className="text-white text-lg font-medium"
              onClick={toggleMobileMenu} // Close menu on click
            >
              Home
            </a>
            <a
              href="/about"
              className="text-white text-lg font-medium"
              onClick={toggleMobileMenu} // Close menu on click
            >
              About
            </a>
            <a
              href="/members"
              className="text-white text-lg font-medium"
              onClick={toggleMobileMenu} // Close menu on click
            >
              Members
            </a>
             <a
              href="/aichat"
              className="text-white text-lg font-medium"
              onClick={toggleMobileMenu} // Close menu on click
            >
              AI Chat
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

