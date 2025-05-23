// CinematicGallery.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import filmFrame from "../../public/images/filmFrame.jpg";
import filmSound from "@/assets/film-scroll.mp3";
import image1 from "../../public/images/Gallery1.jpg";
import image2 from "../../public/images/Gallery1.jpg";
import image3 from "../../public/images/Gallery1.jpg";

const images = [image1, image2, image3];

export default function CinematicGallery() {
  const [enterFilm, setEnterFilm] = useState(false);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextImage = () => {
    if (index < images.length - 1) {
      setDirection(1);
      setIndex(index + 1);
      new Audio(filmSound).play();
    }
  };

  const prevImage = () => {
    if (index > 0) {
      setDirection(-1);
      setIndex(index - 1);
      new Audio(filmSound).play();
    }
  };

  return (
    <div className="w-full h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {!enterFilm ? (
        <motion.div
          className="flex flex-col items-center text-white gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h1 className="text-4xl font-bold">Enter Film Mode</h1>
          <Button
            onClick={() => setEnterFilm(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-800"
          >
            🎥 Start
          </Button>
        </motion.div>
      ) : (
        <div className="absolute inset-0">
          <img
            src={filmFrame}
            alt="Film Frame"
            className="w-full h-full object-cover z-10 pointer-events-none"
          />

          <AnimatePresence initial={false} custom={direction}>
            <motion.img
              key={index}
              src={images[index]}
              className="absolute top-1/2 left-1/2 w-2/3 h-2/3 object-cover z-0 rounded shadow-xl"
              initial={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction < 0 ? 300 : -300, opacity: 0 }}
              transition={{ duration: 0.6 }}
              style={{ transform: "translate(-50%, -50%)" }}
            />
          </AnimatePresence>

          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20">
            <Button onClick={prevImage} className="bg-black/70 hover:bg-black text-white">
              <ChevronLeft size={32} />
            </Button>
          </div>

          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20">
            <Button onClick={nextImage} className="bg-black/70 hover:bg-black text-white">
              <ChevronRight size={32} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
