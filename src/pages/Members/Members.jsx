/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import MemberCard from "../../components/MemberCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const members = [
  {
    name: "Islam Himed",
    role: "President",
    description: "Our President from 2022 until now .",
    image: "/images/islam.jpg",
  },
  {
    name: "Adem Ammari",
    role: "Vice President",
    description: "Our vice president.",
    image: "/images/adem.jpg",
  },
  {
    name: "Yehya Legrini",
    role: "Training Manager",
    description: "Our Courses Manager.",
    image: "/images/yahya.jpg",
  },
  {
    name: "Nidhal charik",
    role: "Special Member",
    description: "Active Member.",
    image: "/images/nidhal.jpg",
  },
  {
    name: "Khaled Medjedel",
    role: "Special Member",
    description: "Active Member.",
    image: "/images/khaled.jpg",
  },
  {
    name: "Isbtissem Rehamnia ",
    role: "Special Member",
    description: "Active Member.",
    image: "/images/ibtissem.jpg",
  },
  {
    name: "Imen Azouz",
    role: "Special Member",
    description: "Active Member.",
    image: "/images/imen.jpg",
  },
  {
    name: "Monsef Belafia",
    role: "Special Member",
    description: "Active Member.",
    image: "/images/monsef.jpg",
  },
  {
    name: "Salim Abdellaoui",
    role: "Special Member",
    description: "Our 3d Designer.",
    image: "/images/salim.jpg",
  },
  {
    name: "Salsabil Namane",
    role: "Internal Relations Manager",
    description: "Our Internal Relations Manager .",
    image: "/images/salsabil.jpg",
  },
  {
    name: "Abdel elrahman",
    role: "Special member",
    description: "Active member.",
    image: "/images/abdelrahmen.jpg",
  },
];

const Members = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? members.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === members.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6">
      <div className="relative w-full max-w-5xl mx-auto">
        <div className="flex items-center justify-center gap-4">
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="z-10 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300"
            aria-label="Previous member"
          >
            <ChevronLeft size={40} className="text-white" />
          </button>

          {/* Animated Member Card */}
          <div className="relative w-full max-w-2xl">
            <AnimatePresence custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                initial={{ opacity: 0, x: direction * 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -100 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <MemberCard 
                  member={members[currentIndex]} 
                  imageSize="lg" // Pass this prop to your MemberCard for larger image
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="z-10 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300"
            aria-label="Next member"
          >
            <ChevronRight size={40} className="text-white" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 gap-2">
          {members.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-white w-6"
                  : "bg-white/50 hover:bg-white/70"
              }`}
              aria-label={`Go to member ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Members;