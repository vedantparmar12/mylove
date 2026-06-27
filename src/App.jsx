import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const noPhrases = [
  "No",
  "Are you sure?",
  "Really sure?",
  "Pookie please...",
  "Don't do this to me!",
  "I'm gonna cry...",
  "You're breaking my heart ;(",
  "Is that your final answer?",
  "Pretty please with a cherry on top?",
  "Okay I'll stop asking... just kidding!"
];

// Shrek GIF progression — gets sadder with each "No"
// ALL URLs verified HTTP 200 with Content-Type: image/gif
const shrekGifs = [
  // 0 - Initial: Shrek smiling
  "https://media.tenor.com/kHcmsxlKHEAAAAAC/shrek-smile.gif",
  // 1 - Shrek staring seriously
  "https://media.tenor.com/DSG9ZID25nsAAAAC/shrek-stare.gif",
  // 2 - Puss in boots pleading eyes
  "https://media.tenor.com/XyewcINw9QUAAAAC/puss-in-boots-eyes.gif",
  // 3 - Shrek sad
  "https://media.tenor.com/aX-QAGgu7gcAAAAC/shrek2-shrek.gif",
  // 4 - Shrek gravewalker (devastated)
  "https://media.tenor.com/TSMSms25puIAAAAC/shrek-gravewalker.gif",
  // 5+ - repeat last
  "https://media.tenor.com/TSMSms25puIAAAAC/shrek-gravewalker.gif",
];

// Celebration GIF - Shrek dancing (verified 200 OK)
const celebrationGif = "https://media.tenor.com/7AUeNckxG-kAAAAC/shrekdam.gif";

export default function App() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [gifError, setGifError] = useState(false);
  const containerRef = useRef(null);

  const handleNoClick = () => {
    setNoCount(noCount + 1);
    setGifError(false);
  };

  const handleYesClick = () => {
    setYesPressed(true);
    
    const duration = 4 * 1000;
    const animationEnd = Date.now() + duration;
    const colors = ['#f43f5e', '#ec4899', '#fb7185', '#fda4af', '#22c55e'];
    const defaults = { startVelocity: 35, spread: 360, ticks: 80, zIndex: 50, colors };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);

      const particleCount = 60 * (timeLeft / duration);
      confetti(Object.assign({}, defaults, { particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      }));
      confetti(Object.assign({}, defaults, { particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      }));
    }, 200);
  };

  const currentNoPhrase = noPhrases[Math.min(noCount, noPhrases.length - 1)];
  const currentShrekGif = shrekGifs[Math.min(noCount, shrekGifs.length - 1)];
  // Calculate scale factor (max 3.5)
  const yesScale = Math.min(1 + noCount * 0.35, 3.5);

  // Fallback emoji display when GIF fails to load
  const shrekEmojis = ["🟢😊", "🟢😐", "🥺🙏", "😢💔", "😭😭", "💀😩"];
  const currentEmoji = shrekEmojis[Math.min(noCount, shrekEmojis.length - 1)];

  return (
    <div 
      className="flex flex-col items-center justify-center min-h-[100dvh] w-full p-4 text-center overflow-x-hidden overflow-y-auto relative"
      ref={containerRef}
    >
      {/* Floating hearts background */}
      <div className="floating-hearts">
        {[...Array(12)].map((_, i) => (
          <span key={i} className="heart" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${6 + Math.random() * 6}s`,
            fontSize: `${14 + Math.random() * 20}px`,
            opacity: 0.15 + Math.random() * 0.2,
          }}>💙</span>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {yesPressed ? (
          /* ====== CELEBRATION SCREEN ====== */
          <motion.div
            key="celebration"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", bounce: 0.6, duration: 0.8 }}
            className="flex flex-col items-center gap-6 z-10 w-full max-w-xl"
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            >
              <img 
                src={celebrationGif}
                alt="Shrek Dancing"
                className="w-64 md:w-72 rounded-3xl shadow-2xl border-4 border-white/40"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-black tracking-tight px-4 celebration-text">
              Yay! She said YES! 💙
            </h1>
            <p className="text-lg md:text-xl text-gray-600 font-semibold -mt-2">
              Shrek approved this relationship
            </p>
            
            {/* Receipt */}
            <motion.div 
              initial={{ opacity: 0, rotateX: 90 }}
              animate={{ opacity: 1, rotateX: 0 }}
              transition={{ delay: 0.8, type: "spring", damping: 15 }}
              className="receipt"
            >
              <div className="font-mono text-left text-gray-800 text-sm">
                <h3 className="text-center font-bold text-lg mb-4 text-gray-900 tracking-[0.2em] border-b-2 border-dashed border-gray-300 pb-4">
                  ✦ OFFICIAL DATE RECEIPT ✦
                </h3>
                <div className="flex justify-between mb-2"><span className="text-gray-500">ITEM:</span> <span className="font-bold">1 cute boyfriend (Vedant)</span></div>
                <div className="flex justify-between mb-2"><span className="text-gray-500">PRICE:</span> <span className="font-bold">PRICELESS</span></div>
                <div className="flex justify-between mb-2"><span className="text-gray-500">DATE:</span> <span className="font-bold">ASAP</span></div>
                <div className="flex justify-between mb-4"><span className="text-gray-500">VENUE:</span> <span className="font-bold">YOUR CHOICE</span></div>
                <div className="border-t-2 border-dashed border-gray-300 pt-4 text-center text-xs opacity-60">
                  <p>Keep this receipt safe. No refunds.</p>
                  <p className="mt-1">I love you so much! 💙✨</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          /* ====== QUESTION SCREEN ====== */
          <motion.div 
            key="question"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            className="flex flex-col items-center gap-6 w-full max-w-lg z-10 glass-card p-8 md:p-10 rounded-3xl"
          >
            {/* Shrek GIF that changes with each "No" */}
            <motion.div
              key={noCount}
              initial={{ scale: 0.7, rotate: noCount > 0 ? -8 : 0 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="relative gif-container"
            >
              {gifError ? (
                <div className="gif-fallback">
                  <span className="text-6xl">{currentEmoji}</span>
                </div>
              ) : (
                <img 
                  src={currentShrekGif}
                  alt="Shrek"
                  className="shrek-gif"
                  referrerPolicy="no-referrer"
                  onError={() => setGifError(true)}
                />
              )}
              {noCount > 3 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-3 -right-3 text-3xl"
                >💔</motion.span>
              )}
            </motion.div>
            
            <h1 className="text-3xl md:text-5xl font-black text-gray-800 tracking-tight px-2 leading-tight">
              Will you be my{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">
                girlfriend?
              </span>
            </h1>

            {noCount > 0 && (
              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-gray-500 italic -mt-2"
              >
                You've said no {noCount} time{noCount > 1 ? 's' : ''}... look how sad Shrek is 😢
              </motion.p>
            )}
            
            <div className="flex flex-wrap items-center justify-center gap-5 mt-4 w-full">
              {/* YES Button — layout properties animated so it pushes siblings */}
              <motion.button
                animate={{ scale: yesScale }}
                whileHover={{ scale: yesScale * 1.08 }}
                whileTap={{ scale: yesScale * 0.92 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="yes-btn z-20 flex-shrink-0 whitespace-nowrap"
                style={{ transformOrigin: "center" }}
                onClick={handleYesClick}
              >
                Yes 💙
              </motion.button>
              
              {/* NO Button — stays in layout flow */}
              <motion.button
                onClick={handleNoClick}
                className="no-btn z-10 flex-shrink-0"
              >
                {currentNoPhrase}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
