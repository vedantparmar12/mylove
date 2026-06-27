import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const noPhrases = [
  "No",
  "Are you sure? 🥺",
  "Really sure?",
  "Pookie please...",
  "Don't do this to me!",
  "I'm gonna cry...",
  "You're breaking my heart ;(",
  "Is that your final answer?",
  "Pretty please? 🙏",
  "Okay I'll stop... just kidding!",
];

const shrekGifs = [
  "https://media.tenor.com/kHcmsxlKHEAAAAAC/shrek-smile.gif",
  "https://media.tenor.com/DSG9ZID25nsAAAAC/shrek-stare.gif",
  "https://media.tenor.com/XyewcINw9QUAAAAC/puss-in-boots-eyes.gif",
  "https://media.tenor.com/aX-QAGgu7gcAAAAC/shrek2-shrek.gif",
  "https://media.tenor.com/TSMSms25puIAAAAC/shrek-gravewalker.gif",
  "https://media.tenor.com/TSMSms25puIAAAAC/shrek-gravewalker.gif",
];

const celebrationGif = "https://media.tenor.com/7AUeNckxG-kAAAAC/shrekdam.gif";

// Generate static stars so they don't re-randomise on re-render
const STARS = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  left: `${(i * 13.7) % 100}%`,
  top: `${(i * 17.3) % 100}%`,
  size: `${1 + (i % 3)}px`,
  delay: `${(i * 0.4) % 6}s`,
  duration: `${2 + (i % 4)}s`,
}));

const HEARTS = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  left: `${(i * 7.1) % 100}%`,
  delay: `${(i * 0.6) % 8}s`,
  duration: `${6 + (i % 6)}s`,
  size: `${14 + (i % 18)}px`,
  opacity: 0.12 + (i % 5) * 0.04,
}));

export default function App() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [gifError, setGifError] = useState(false);
  const containerRef = useRef(null);

  const handleNoClick = () => {
    setNoCount(c => c + 1);
    setGifError(false);
  };

  const handleYesClick = () => {
    setYesPressed(true);

    const duration = 5000;
    const animationEnd = Date.now() + duration;
    const colors = ['#6366f1', '#3b82f6', '#8b5cf6', '#60a5fa', '#c4b5fd', '#93c5fd'];
    const defaults = { startVelocity: 40, spread: 360, ticks: 90, zIndex: 9999, colors };

    const rnd = (min, max) => Math.random() * (max - min) + min;
    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);
      const count = 70 * (timeLeft / duration);
      confetti({ ...defaults, particleCount: count, origin: { x: rnd(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount: count, origin: { x: rnd(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 200);
  };

  const currentNoPhrase = noPhrases[Math.min(noCount, noPhrases.length - 1)];
  const currentShrekGif = shrekGifs[Math.min(noCount, shrekGifs.length - 1)];
  const yesScale = Math.min(1 + noCount * 0.35, 3.5);
  const shrekEmojis = ["🟢😊", "🟢😐", "🥺🙏", "😢💔", "😭😭", "💀😩"];
  const currentEmoji = shrekEmojis[Math.min(noCount, shrekEmojis.length - 1)];

  return (
    <div
      className="flex flex-col items-center justify-center min-h-[100dvh] w-full p-4 text-center overflow-x-hidden overflow-y-auto relative"
      ref={containerRef}
    >
      {/* ── Deep space background ── */}
      <div className="aurora-bg" />

      {/* ── Static starfield ── */}
      <div className="stars">
        {STARS.map(s => (
          <div key={s.id} className="star" style={{
            left: s.left, top: s.top,
            width: s.size, height: s.size,
            animationDelay: s.delay, animationDuration: s.duration,
          }} />
        ))}
      </div>

      {/* ── Floating orbs ── */}
      <div className="aurora-bg" aria-hidden>
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>

      {/* ── Floating hearts ── */}
      <div className="floating-hearts">
        {HEARTS.map(h => (
          <span key={h.id} className="heart" style={{
            left: h.left,
            animationDelay: h.delay,
            animationDuration: h.duration,
            fontSize: h.size,
            opacity: h.opacity,
          }}>💙</span>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {yesPressed ? (
          /* ====== CELEBRATION SCREEN ====== */
          <motion.div
            key="celebration"
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", bounce: 0.5, duration: 0.9 }}
            className="flex flex-col items-center gap-5 z-10 w-full max-w-md py-10"
          >
            {/* Dancing GIF */}
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              className="gif-container"
            >
              <img
                src={celebrationGif}
                alt="Shrek Dancing"
                className="shrek-gif"
                onError={e => { e.target.style.display = 'none'; }}
              />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl font-black tracking-tight px-4 celebration-text"
            >
              She said YES! 💙
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-sm font-medium"
              style={{ color: 'rgba(148,163,184,0.8)' }}
            >
              Shrek has officially blessed this relationship 🧅
            </motion.p>

            {/* Receipt */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, type: "spring", damping: 18 }}
              className="w-full max-w-xs"
            >
              <div className="receipt-header">✦ OFFICIAL DATE RECEIPT ✦</div>
              <div className="receipt">
                <div className="receipt-row">
                  <span className="receipt-label">ITEM</span>
                  <span className="receipt-value">1 cute boyfriend (Vedant)</span>
                </div>
                <div className="receipt-row">
                  <span className="receipt-label">PRICE</span>
                  <span className="receipt-value">PRICELESS</span>
                </div>
                <div className="receipt-row">
                  <span className="receipt-label">DATE</span>
                  <span className="receipt-value">ASAP</span>
                </div>
                <div className="receipt-row">
                  <span className="receipt-label">VENUE</span>
                  <span className="receipt-value">YOUR CHOICE</span>
                </div>
                <div className="receipt-footer">
                  <p>No returns. No refunds.</p>
                  <p>I love you so much! 💙✨</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

        ) : (
          /* ====== QUESTION SCREEN ====== */
          <motion.div
            key="question"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -40 }}
            transition={{ type: "spring", bounce: 0.35, duration: 0.7 }}
            className="flex flex-col items-center gap-6 w-full max-w-sm z-10 glass-card p-8 md:p-10 rounded-3xl"
          >
            {/* GIF with glow ring */}
            <motion.div
              key={noCount}
              initial={{ scale: 0.6, opacity: 0, rotate: noCount > 0 ? -10 : 0 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ type: "spring", bounce: 0.55, duration: 0.6 }}
              className="relative gif-container"
            >
              {gifError ? (
                <div className="gif-fallback"><span className="text-6xl">{currentEmoji}</span></div>
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
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: 1, rotate: 0 }}
                  className="absolute -top-3 -right-3 text-2xl"
                >💔</motion.span>
              )}
            </motion.div>

            {/* Heading */}
            <div>
              <h1 className="hero-heading text-3xl md:text-4xl">
                Will you be my{' '}
                <span className="gradient-text">girlfriend?</span>
              </h1>
            </div>

            {/* Sad counter */}
            <AnimatePresence>
              {noCount > 0 && (
                <motion.div
                  key="sad-pill"
                  initial={{ opacity: 0, scale: 0.8, y: -8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="sad-pill -mt-2"
                >
                  You said no {noCount} time{noCount > 1 ? 's' : ''}... look at Shrek 😢
                </motion.div>
              )}
            </AnimatePresence>

            {/* Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-2 w-full">
              <motion.button
                animate={{ scale: yesScale }}
                whileHover={{ scale: yesScale * 1.07 }}
                whileTap={{ scale: yesScale * 0.93 }}
                transition={{ type: "spring", stiffness: 280, damping: 18 }}
                className="yes-btn z-20 flex-shrink-0 whitespace-nowrap"
                style={{ transformOrigin: "center" }}
                onClick={handleYesClick}
              >
                Yes 💙
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
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
