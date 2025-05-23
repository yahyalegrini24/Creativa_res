/* eslint-disable no-unused-vars */
import React from "react";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaCamera, FaVideo, FaPencilAlt } from "react-icons/fa";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen px-4 sm:px-6 py-8 sm:py-10 text-white relative font-poppins w-full">
      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center text-center w-full max-w-2xl mx-auto px-4">
        {/* Logo */}
        <img
          src="/images/logo.png"
          alt="Creativa Logo"
          className="w-24 sm:w-32 mb-4 sm:mb-6 drop-shadow-xl"
        />

        {/* Heading with Typewriter */}
        <motion.h1
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-black leading-tight"
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
          className="text-xl sm:text-2xl md:text-3xl font-semibold text-white-900 mt-2 sm:mt-3"
        >
          Don't limit your life between black and white.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-800 leading-relaxed font-medium"
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
            whileHover={{ scale: 1.1, boxShadow: "0 0 20px 6px #22d3ee" }}
            whileTap={{ scale: 0.96 }}
            className="bg-gradient-to-r from-green-400 via-cyan-400 to-blue-400 hover:from-green-500 hover:to-blue-600 text-white px-6 sm:px-8 py-2 rounded-2xl shadow-xl transition-all font-bold text-base sm:text-lg tracking-wide border-2 border-transparent hover:border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 w-full sm:w-auto"
            onClick={() => navigate("/aichat")}
          >
         
            Talk with Qomra
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;