import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-transparent text-white py-4 mt-10 shadow-inner backdrop-blur-md">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        <div className="text-lg font-semibold tracking-wide">
          © {new Date().getFullYear()} Creativa. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;