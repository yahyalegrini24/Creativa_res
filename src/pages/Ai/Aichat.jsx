/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Robot from '../../components/3Dmodels/robot';
import { fetchGroqResponse } from '../../utils/AI';
import welcomeSound from '../../assets/sound/Hello.mp3'; // Adjust the path
import { FaPaperPlane, FaVolumeUp } from 'react-icons/fa'; // Import icons
import { ImSpinner2 } from 'react-icons/im'; // Import spinner icon

export default function Aichat() {
  const [message, setMessage] = useState('');
  const [isAnimating, setIsAnimating] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const audioRef = useRef(null);

  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio(welcomeSound);
  }, []);

  // Add automatic scene cycling
  useEffect(() => {
    const cycleScenes = () => {
      if (!isSpeaking) { // Play sound only if not speaking
        setIsSpinning(true);
        audioRef.current.play();

        // Reset after 1 second (duration of spin)
        setTimeout(() => {
          setIsSpinning(false);
        }, 1000);
      }
    };

    // Start the cycle
    const intervalId = setInterval(() => {
      cycleScenes();
    }, 5000); // Every 5 seconds

    return () => {
      clearInterval(intervalId);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [isSpeaking]); // Add isSpeaking as a dependency

  const handleSend = async () => {
  if (!message.trim()) return;

  try {
    const aiResponse = await fetchGroqResponse(message);
    if (aiResponse) {
      setIsSpeaking(true);

      const utterance = new SpeechSynthesisUtterance(aiResponse);
      const voices = speechSynthesis.getVoices();

      // Choose a synthetic/robotic-sounding voice
      const robotVoice = voices.find(
        (v) =>
          v.name.toLowerCase().includes('david') || // Windows voice
          v.name.toLowerCase().includes('google us english') || // Chrome on Android
          v.name.toLowerCase().includes('zira') || // Microsoft female robotic
          v.name.toLowerCase().includes('english') // fallback
      );

      if (robotVoice) {
        utterance.voice = robotVoice;
      }

      utterance.pitch = 0.7; // Lower pitch for robotic effect
      utterance.rate = 1.0;

      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      speechSynthesis.speak(utterance);
    }
  } catch (error) {
    const utterance = new SpeechSynthesisUtterance("Sorry, I couldn't get a response.");
    utterance.onend = () => setIsSpeaking(false);
    speechSynthesis.speak(utterance);
  }

  setMessage('');
};


  return (
    <div className="flex flex-col items-center min-h-screen p-4 relative">
      {/* 3D Model Canvas - centered properly */}
      <div className="w-full h-[85vh] mb-4 flex items-center justify-center">
        <Canvas 
          camera={{ position: [0, 0, 29], fov: 45, near: 0.1, far: 1000 }}
          style={{ width: '100%', height: '100%' }}
        >
          <ambientLight intensity={1.5} />
          <directionalLight position={[5, 5, 5]} intensity={2} />
          <Robot 
            isAnimating={isAnimating} 
            isSpeaking={isSpeaking} 
            isSpinning={isSpinning} 
            position={[0, 0, 0]}
          />
          <OrbitControls 
            enableZoom={false}
            enablePan={false}
            enableRotate={true}
            rotateSpeed={0.5}
          />
        </Canvas>
      </div>

      {/* Enhanced input area with animations */}
      <div className="w-full max-w-md sticky bottom-4 left-0 right-0 mx-auto px-4 z-10">
        <div className="flex gap-2 bg-white p-2 rounded-lg shadow-lg relative">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black transition-all duration-300 placeholder-gray-400 focus:placeholder-transparent"
          />
          <button
            onClick={handleSend}
            className={`px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-transform transform hover:scale-105 active:scale-95 flex items-center justify-center ${
              isSpeaking ? 'animate-spin' : ''
            }`}
          >
            {isSpeaking ? (
              <ImSpinner2 className="h-5 w-5 animate-spin" /> // Spinner icon when speaking
            ) : (
              <FaPaperPlane className="h-5 w-5" /> // Send icon
            )}
          </button>
        </div>
        {isSpeaking && (
          <div className="mt-2 flex items-center justify-center gap-2 text-blue-500 font-medium animate-pulse">
            <FaVolumeUp className="h-5 w-5 animate-bounce" /> {/* Sound indicator icon */}
            <span>Speaking...</span>
          </div>
        )}
      </div>
    </div>
  );
}