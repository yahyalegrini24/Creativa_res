/* eslint-disable no-unused-vars */
import React from "react";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaCamera, FaVideo, FaPencilAlt } from "react-icons/fa";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen px-4 sm:px-6 py-8 sm:py-10 text-white relative font-poppins w-full ">
      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center text-center w-full max-w-2xl mx-auto px-4 font-poppins">
        {/* Logo */}
        <img
          src="/images/logo.png"
          alt="Creativa Logo"
          className="w-full max-w-[300px] mx-auto drop-shadow-xl"
        />

        {/* Heading with Typewriter */}
        <motion.h1
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-gray-900 leading-tight font-poppins"
        >
          <Typewriter
            words={["CREATIVA", "We Cover World", "We Design", "We Film", "We Create"]}
            loop={true}
            cursor
            cursorStyle="_"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={2000}
          />
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white mt-2 sm:mt-3 font-poppins tracking-wide drop-shadow-lg"
        >
          Don't limit your life between black and white.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-3 sm:mt-4 text-lg sm:text-xl text-gray-700 leading-relaxed font-medium font-poppins tracking-normal"
        >
          Join a community where passion meets creation.
        </motion.p>

        {/* Icons Row in Circles */}
        <div className="flex justify-center gap-4 sm:gap-6 md:gap-8 mt-2 mb-6 sm:mb-10">
          {/* Pencil Icon */}
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 15 }}
            className="rounded-full bg-orange-500 shadow-lg p-3 sm:p-4 flex items-center justify-center" 
            style={{ width: 50, height: 50 }}
          >
            <FaPencilAlt className="text-white text-xl sm:text-2xl" />
          </motion.div>
          
          {/* Video Camera Icon */}
          <motion.div 
            whileHover={{ scale: 1.1, rotate: -15 }}
            className="rounded-full bg-blue-500 shadow-lg p-3 sm:p-4 flex items-center justify-center" 
            style={{ width: 50, height: 50 }}
          >
            <FaVideo className="text-white text-xl sm:text-2xl" />
          </motion.div>
          
          {/* Camera Icon */}
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 15 }}
            className="rounded-full bg-orange-700 shadow-lg p-3 sm:p-4 flex items-center justify-center" 
            style={{ width: 50, height: 50 }}
          >
            <FaCamera className="text-white text-xl sm:text-2xl" />
          </motion.div>
        </div>

        {/* AI Assistant button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex justify-center mb-6 sm:mb-10 w-full"
        >
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.97 }}
            className="relative flex items-center justify-center gap-2 bg-gradient-to-r from-green-400 via-cyan-400 to-blue-400 hover:from-green-500 hover:to-blue-600 text-white px-7 sm:px-10 py-3 rounded-3xl shadow-2xl font-extrabold text-lg sm:text-2xl tracking-wider border-0 focus:outline-none focus:ring-2 focus:ring-cyan-400 w-full sm:w-auto transition-all duration-200 font-poppins"
            style={{
              boxShadow: "0 4px 32px 0 rgba(34,211,238,0.18)",
              overflow: "hidden",
            }}
            aria-label="Talk with Qomra, your AI assistant"
            onClick={() => navigate("/aichat")}
          >
            {/* Animated Glow Effect */}
            <span className="absolute inset-0 rounded-3xl pointer-events-none animate-pulse bg-gradient-to-r from-cyan-400 via-blue-400 to-green-400 opacity-20 blur-lg" />
            {/* Chat Icon */}
            <svg
              className="relative z-10 w-6 h-6 text-white drop-shadow"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4-.8l-4 1 1-3.5A7.96 7.96 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="relative z-10 font-black italic drop-shadow-lg">Talk with Qomra</span>
            {/* Subtext for UX */}
            <span className="hidden sm:inline-block relative z-10 text-xs font-semibold italic text-cyan-100 ml-2 tracking-wide">AI Assistant</span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;