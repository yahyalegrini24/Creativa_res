/* eslint-disable no-unused-vars */
import { FaInstagram, FaFacebook, FaTiktok, FaPalette, FaVideo, FaCamera } from "react-icons/fa";
import { motion } from "framer-motion";
import { TypeAnimation } from 'react-type-animation';

export default function About() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 ">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-12 max-w-6xl w-full">
        
        {/* Left Image with Creative Frame */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative group"
        >
          <img
            src="/images/Creativa_Familly.jpg"
            alt="Club"
            className="w-full max-w-[500px] h-auto rounded-2xl shadow-lg object-cover border-8 border-white transform group-hover:-rotate-2 transition duration-500"
          />
          {/* Polaroid-like stickers */}
          <motion.div 
            className="absolute -top-4 -right-4 bg-white p-2 rounded-lg shadow-md rotate-6"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <FaCamera className="text-orange-600 text-xl" />
          </motion.div>
          <motion.div 
            className="absolute -bottom-4 -left-4 bg-white p-2 rounded-lg shadow-md -rotate-6"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          >
            <FaVideo className="text-orange-600 text-xl" />
          </motion.div>
        </motion.div>

        {/* Right Text with Animated Typing */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col gap-8 text-center md:text-left"
        >
          <div>
            <h1 className="text-5xl font-bold text-gray-800 mb-2 font-serif tracking-tight">
              About <span className="text-orange-600 font-cursive">Creativa</span>
            </h1>
            
            <TypeAnimation
              sequence={[
                'Where creativity meets technology',
                2000,
                'A community of visual storytellers',
                2000,
                'Bringing ideas to life',
                2000
              ]}
              wrapper="p"
              speed={50}
              repeat={Infinity}
              className="text-xl text-orange-600 font-medium font-sans italic"
            />
          </div>
          
          <p className="text-lg text-gray-700 max-w-lg leading-relaxed font-sans">
            Creativa is a passionate community focused on creativity and audiovisual expression. 
            From <span className="font-semibold text-orange-600">photography</span> and <span className="font-semibold text-orange-600">filmmaking</span> to <span className="font-semibold text-orange-600">design</span> and <span className="font-semibold text-orange-600">storytelling</span>, we bring ideas to life and empower young creators.
          </p>

          {/* Creative Stats */}
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            {[
              { icon: <FaPalette />, value: "200+", label: "Projects" },
              { icon: <FaCamera />, value: "50+", label: "Members" },
              { icon: <FaVideo />, value: "30+", label: "Events" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-white px-4 py-3 rounded-lg shadow-sm flex items-center gap-3"
              >
                <span className="text-orange-600 text-xl">{stat.icon}</span>
                <div>
                  <p className="font-bold text-gray-800 text-lg font-mono">{stat.value}</p>
                  <p className="text-sm text-gray-500 font-sans">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Social Icons with Wave Animation */}
          <motion.div 
            className="flex justify-center md:justify-start gap-6 text-2xl text-orange-600 mt-4"
            animate={{ 
              x: [0, 5, -5, 0],
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <motion.a 
              href="https://www.instagram.com/creativaclub24/" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ y: -5, scale: 1.1 }}
              className="hover:text-orange-400 transition-colors duration-200"
            >
              <FaInstagram />
            </motion.a>
            <motion.a 
              href="https://www.tiktok.com/@creativaclub24?_t=ZM-8wBtd1D2WVa&_r=1" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ y: -5, scale: 1.1 }}
              className="hover:text-orange-400 transition-colors duration-200"
            >
              <FaTiktok />
            </motion.a>
            <motion.a 
              href="https://www.facebook.com/creativa.club.2025" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ y: -5, scale: 1.1 }}
              className="hover:text-orange-400 transition-colors duration-200"
            >
              <FaFacebook />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}