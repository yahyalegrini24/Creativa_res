/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Robot from '../../components/3Dmodels/robot';
import { fetchGroqResponse } from '../../utils/AI';
import welcomeSound from '../../assets/sound/Hello.mp3';
import { FaPaperPlane, FaVolumeUp, FaRobot } from 'react-icons/fa';
import { ImSpinner2 } from 'react-icons/im';
import { motion, AnimatePresence } from 'framer-motion';

export default function Aichat() {
  const [message, setMessage] = useState('');
  const [isAnimating, setIsAnimating] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentResponse, setCurrentResponse] = useState(null);
  const audioRef = useRef(null);
  const responseTimeoutRef = useRef(null);

  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio(welcomeSound);
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      clearTimeout(responseTimeoutRef.current);
    };
  }, []);

  // Handle canvas resizing
  useEffect(() => {
    const handleResize = () => window.dispatchEvent(new Event('resize'));
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Automatic scene cycling
  useEffect(() => {
    const cycleScenes = () => {
      if (!isSpeaking) {
        setIsSpinning(true);
        audioRef.current.play();
        setTimeout(() => setIsSpinning(false), 1000);
      }
    };
    const intervalId = setInterval(cycleScenes, 5000);
    return () => clearInterval(intervalId);
  }, [isSpeaking]);

  const displayResponse = (text) => {
    clearTimeout(responseTimeoutRef.current);
    setCurrentResponse(text);
    responseTimeoutRef.current = setTimeout(() => {
      setCurrentResponse(null);
    }, 10000); // Hide after 10 seconds
  };

  const handleSend = async () => {
    if (!message.trim()) return;

    try {
      const aiResponse = await fetchGroqResponse(message);
      if (aiResponse) {
        displayResponse(aiResponse);
        setIsSpeaking(true);

        const utterance = new SpeechSynthesisUtterance(aiResponse);
        const voices = speechSynthesis.getVoices();
        const robotVoice = voices.find(v => 
          v.name.toLowerCase().includes('david') || 
          v.name.toLowerCase().includes('google us english') ||
          v.name.toLowerCase().includes('zira') ||
          v.name.toLowerCase().includes('english')
        );

        if (robotVoice) utterance.voice = robotVoice;
        utterance.pitch = 0.7;
        utterance.rate = 1.0;
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);
        speechSynthesis.speak(utterance);
      }
    } catch (error) {
      const errorMessage = "Sorry, I couldn't process your request.";
      displayResponse(errorMessage);
      const utterance = new SpeechSynthesisUtterance(errorMessage);
      utterance.onend = () => setIsSpeaking(false);
      speechSynthesis.speak(utterance);
    }
    setMessage('');
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4 relative">
      {/* 3D Model Canvas with Response Area */}
      <div className="w-full h-[85vh] mb-4 flex flex-col items-center justify-center relative">
        {/* Response Bubble - Centered above robot */}
        <AnimatePresence>
          {currentResponse && (
            <motion.div
              key="response-bubble"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: 'spring', damping: 10, stiffness: 100 }}
              className="absolute top-[20%] z-10 w-full max-w-md px-4  "
            >
              <div className="bg-transparent backdrop-blur-sm rounded-xl p-4 shadow-2xl border border-white/20 transform transition-all duration-300 hover:scale-[1.02]">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-500 p-2 rounded-full text-white">
                    <FaRobot className="text-lg" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-800 font-medium text-sm sm:text-base">
                      {currentResponse}
                    </p>
                    {isSpeaking && (
                      <motion.div 
                        className="flex items-center gap-2 mt-2 text-blue-500 text-xs "
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ repeat: Infinity, duration: 1 }}
                        >
                          <FaVolumeUp className="text-xs" />
                        </motion.div>
                        <span>Robot is speaking...</span>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 3D Canvas */}
        <Canvas 
          camera={{ 
            position: [0, 0, 29], 
            fov: window.innerWidth < 768 ? 30 : 45,
            near: 0.1, 
            far: 1000 
          }}
          style={{ width: '100%', height: '100%', touchAction: 'none' }}
        >
          <ambientLight intensity={1.5} />
          <directionalLight position={[5, 5, 5]} intensity={2} />
          <Robot 
            isAnimating={isAnimating} 
            isSpeaking={isSpeaking} 
            isSpinning={isSpinning} 
            position={[0, 0, 0]}
            scale={window.innerWidth < 768 ? 0.8 : 1}
          />
          <OrbitControls 
            enableZoom={false}
            enablePan={false}
            enableRotate={true}
            rotateSpeed={0.5}
          />
        </Canvas>
      </div>

      {/* Input area */}
      <div className="w-full max-w-md sticky bottom-4 left-0 right-0 mx-auto px-4 z-10">
        <motion.div 
          className="flex gap-2 bg-white/90 p-2 rounded-lg shadow-xl backdrop-blur-sm border border-white/20"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
        >
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask the robot anything..."
            className="flex-1 p-2 bg-transparent border-none focus:outline-none text-black placeholder-gray-500"
          />
          <button
            onClick={handleSend}
            className={`p-2 rounded-full transition-all ${
              isSpeaking 
                ? 'bg-purple-500 text-white' 
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
            disabled={isSpeaking}
          >
            {isSpeaking ? (
              <ImSpinner2 className="h-5 w-5 animate-spin" />
            ) : (
              <FaPaperPlane className="h-5 w-5" />
            )}
          </button>
        </motion.div>
      </div>
    </div>
  );
}