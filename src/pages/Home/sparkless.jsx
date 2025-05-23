// components/Sparkles.jsx
import { motion } from "framer-motion";

const Sparkles = () => {
  // Generate random positions and sizes for sparkles
  const generateSparkles = (count) => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 3,
      delay: Math.random() * 5,
      duration: 2 + Math.random() * 3
    }));
  };

  const sparkles = generateSparkles(30); // Adjust number of sparkles

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute bg-white rounded-full"
          initial={{
            x: `${sparkle.x}%`,
            y: `${sparkle.y}%`,
            opacity: 0,
            scale: 0
          }}
          animate={{
            x: `${sparkle.x + (Math.random() * 20 - 10)}%`,
            y: `${sparkle.y + (Math.random() * 20 - 10)}%`,
            opacity: [0, 0.8, 0],
            scale: [0, 1.5, 0]
          }}
          transition={{
            duration: sparkle.duration,
            repeat: Infinity,
            repeatDelay: sparkle.delay,
            ease: "easeInOut"
          }}
          style={{
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            filter: "blur(0.5px)"
          }}
        />
      ))}
    </div>
  );
};

export default Sparkles;