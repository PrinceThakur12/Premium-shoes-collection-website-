import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

type MainPhase = 'black' | 'text1' | 'scenes' | 'text2' | 'words' | 'rapid' | 'final';

interface Props {
  onComplete: () => void;
}

const SHOE_IMAGES = [
  'https://images.unsplash.com/photo-1710472171218-da46dce3faf9?w=900&q=85',
  'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=900&q=85',
  'https://images.unsplash.com/photo-1770029606852-38309868b4ee?w=900&q=85',
  'https://images.unsplash.com/photo-1623788975845-7d3e0adbae7c?w=900&q=85',
  'https://images.unsplash.com/photo-1710472171182-ada20c1c21c4?w=900&q=85',
];

const SCENES = [
  { label: '01 — LOGO DESIGN',     visual: 'logo' },
  { label: '02 — BRAND IDENTITY',  visual: 'identity' },
  { label: '03 — DESIGN SYSTEM',   visual: 'system' },
  { label: '04 — BUSINESS CARDS',  visual: 'cards' },
  { label: '05 — PACKAGING',       visual: 'packaging' },
  { label: '06 — BRAND BOOK',      visual: 'book' },
  { label: '07 — DESIGN PROCESS',  visual: 'process' },
  { label: '08 — CREATIVE STUDIO', visual: 'studio' },
];

const BRAND_WORDS = ['STRATEGY', 'IDENTITY', 'IMPACT', 'RABBIT'];

function SceneVisual({ visual }: { visual: string }) {
  switch (visual) {
    case 'logo':
      return (
        <svg viewBox="0 0 300 300" className="w-56 h-56 opacity-90">
          <circle cx="150" cy="150" r="120" stroke="white" strokeWidth="0.8" fill="none" />
          <circle cx="150" cy="150" r="70"  stroke="white" strokeWidth="0.4" fill="none" />
          <polygon points="150,70 220,220 80,220" stroke="white" strokeWidth="0.8" fill="none" />
          <line x1="150" y1="30" x2="150" y2="270" stroke="white" strokeWidth="0.3" strokeDasharray="4 8" />
          <line x1="30"  y1="150" x2="270" y2="150" stroke="white" strokeWidth="0.3" strokeDasharray="4 8" />
          <circle cx="150" cy="150" r="6" fill="white" />
        </svg>
      );
    case 'identity':
      return (
        <div className="flex flex-col items-center gap-4">
          <div style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '9rem', lineHeight: 1, color: 'white', letterSpacing: '-0.02em' }}>M</div>
          <div className="flex gap-6 items-center">
            {['300', '400', '600', '700'].map(w => (
              <span key={w} style={{ fontFamily: 'Inter', fontWeight: Number(w), fontSize: '0.7rem', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.15em' }}>{w}</span>
            ))}
          </div>
        </div>
      );
    case 'system':
      return (
        <div className="flex flex-col gap-3">
          <div className="flex gap-2">
            {['#FFFFFF', '#D0D0D0', '#808080', '#404040', '#1a1a1a', '#000000'].map(c => (
              <div key={c} className="w-10 h-10 rounded-sm" style={{ backgroundColor: c, outline: '1px solid rgba(255,255,255,0.1)' }} />
            ))}
          </div>
          <div className="flex gap-2 items-center">
            <div className="w-10 h-10 rounded-sm" style={{ backgroundColor: '#d4a857' }} />
            <span style={{ fontFamily: 'Inter', fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.15em' }}>ACCENT GOLD</span>
          </div>
          <div style={{ fontFamily: 'Inter', fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.2em', marginTop: 8 }}>COLOR PALETTE - RABBIT</div>
        </div>
      );
    case 'cards':
      return (
        <div style={{ width: 280, height: 160, backgroundColor: '#f8f5ef', borderRadius: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '24px 28px', boxShadow: '0 0 60px rgba(0,0,0,0.8), 0 0 120px rgba(0,0,0,0.4)' }}>
          <div style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 600, fontSize: '1.3rem', color: '#0a0a0a', letterSpacing: '0.12em' }}>RABBIT</div>
          <div style={{ fontFamily: 'Inter', fontWeight: 300, fontSize: '0.6rem', color: '#555', letterSpacing: '0.15em', lineHeight: 1.8 }}>
            <div>FOOTWEAR STUDIO</div>
            <div>PREMIUM FOOTWEAR DESIGN</div>
            <div style={{ marginTop: 4, color: '#888' }}>+998 — — — — — —</div>
          </div>
        </div>
      );
    case 'packaging':
      return (
        <svg viewBox="0 0 320 280" className="w-72 h-56 opacity-90">
          <rect x="40" y="80"  width="240" height="160" stroke="white" strokeWidth="0.8" fill="none" />
          <rect x="40" y="40"  width="240" height="40"  stroke="white" strokeWidth="0.4" fill="rgba(255,255,255,0.02)" />
          <line x1="40" y1="80"  x2="10" y2="50" stroke="white" strokeWidth="0.4" />
          <line x1="280" y1="80" x2="310" y2="50" stroke="white" strokeWidth="0.4" />
          <line x1="10" y1="50" x2="40" y2="40" stroke="white" strokeWidth="0.4" />
          <line x1="310" y1="50" x2="280" y2="40" stroke="white" strokeWidth="0.4" />
          <text x="160" y="175" textAnchor="middle" fill="white" fontSize="11" fontFamily="Inter" letterSpacing="10" opacity="0.8">RABBIT</text>
          <rect x="140" y="158" width="40" height="0.5" fill="white" opacity="0.3" />
        </svg>
      );
    case 'book':
      return (
        <svg viewBox="0 0 340 240" className="w-72 h-52 opacity-90">
          <rect x="20" y="20"   width="140" height="200" stroke="white" strokeWidth="0.8" fill="none" />
          <rect x="180" y="20"  width="140" height="200" stroke="white" strokeWidth="0.8" fill="none" />
          <line x1="160" y1="20" x2="160" y2="220" stroke="white" strokeWidth="1.5" />
          {[50, 70, 90, 110, 130, 150].map(y => (
            <line key={y} x1="40"  y1={y} x2="140" y2={y} stroke="white" strokeWidth="0.3" opacity="0.4" />
          ))}
          {[50, 90, 130].map(y => (
            <line key={y} x1="200" y1={y} x2="300" y2={y} stroke="white" strokeWidth="0.3" opacity="0.4" />
          ))}
          <rect x="200" y="100" width="100" height="70" stroke="white" strokeWidth="0.4" fill="rgba(255,255,255,0.03)" />
          <text x="40" y="45" fill="white" fontSize="7" fontFamily="Inter" letterSpacing="5" opacity="0.6">BRAND GUIDELINES</text>
        </svg>
      );
    case 'process':
      return (
        <svg viewBox="0 0 320 240" className="w-72 h-52 opacity-80">
          <rect x="20" y="20"  width="130" height="90"  stroke="white" strokeWidth="0.5" fill="none" strokeDasharray="3 6" />
          <rect x="170" y="20" width="130" height="90"  stroke="white" strokeWidth="0.5" fill="none" strokeDasharray="3 6" />
          <rect x="20" y="130" width="280" height="90"  stroke="white" strokeWidth="0.5" fill="none" strokeDasharray="3 6" />
          <line x1="20"  y1="20"  x2="150" y2="110" stroke="white" strokeWidth="0.3" opacity="0.3" />
          <line x1="150" y1="20"  x2="20"  y2="110" stroke="white" strokeWidth="0.3" opacity="0.3" />
          <line x1="170" y1="20"  x2="300" y2="110" stroke="white" strokeWidth="0.3" opacity="0.3" />
          <line x1="300" y1="20"  x2="170" y2="110" stroke="white" strokeWidth="0.3" opacity="0.3" />
          {[150, 165, 180, 195, 210].map(y => (
            <line key={y} x1="40" y1={y} x2="200" y2={y} stroke="white" strokeWidth="0.3" opacity="0.4" />
          ))}
        </svg>
      );
    case 'studio':
      return (
        <svg viewBox="0 0 320 260" className="w-72 h-56 opacity-80">
          <rect x="60" y="20"  width="200" height="130" rx="4" stroke="white" strokeWidth="0.8" fill="none" />
          <rect x="130" y="155" width="60" height="8" stroke="white" strokeWidth="0.5" fill="none" />
          <ellipse cx="245" cy="190" rx="40" ry="50" stroke="white" strokeWidth="0.5" fill="none" />
          <line x1="245" y1="140" x2="245" y2="240" stroke="white" strokeWidth="0.3" />
          <rect x="20" y="170" width="80" height="50" rx="1" stroke="white" strokeWidth="0.5" fill="none" />
          {[182, 192, 202].map(y => (
            <line key={y} x1="30" y1={y} x2="90" y2={y} stroke="white" strokeWidth="0.3" opacity="0.5" />
          ))}
          <rect x="20" y="230" width="110" height="15" rx="1" stroke="white" strokeWidth="0.4" fill="none" />
          <line x1="100" y1="165" x2="80"  y2="230" stroke="white" strokeWidth="0.3" opacity="0.5" />
          <text x="85" y="95" textAnchor="middle" fill="white" fontSize="8" fontFamily="Inter" letterSpacing="4" opacity="0.5">RABBIT STUDIO</text>
        </svg>
      );
    default:
      return null;
  }
}

export function CinematicIntro({ onComplete }: Props) {
  const [phase, setPhase]     = useState<MainPhase>('black');
  const [sceneIdx, setSceneIdx] = useState(0);
  const [wordIdx, setWordIdx]   = useState(0);
  const [shoeIdx, setShoeIdx]   = useState(0);
  const [showSkip, setShowSkip] = useState(false);

  // Main phase timeline
  useEffect(() => {
    const t: ReturnType<typeof setTimeout>[] = [];
    t.push(setTimeout(() => setPhase('text1'),  400));
    t.push(setTimeout(() => setPhase('scenes'), 2600));
    t.push(setTimeout(() => setPhase('text2'),  5600));
    t.push(setTimeout(() => setPhase('words'),  7800));
    t.push(setTimeout(() => setPhase('rapid'),  10200));
    t.push(setTimeout(() => setPhase('final'),  12400));
    t.push(setTimeout(() => setShowSkip(true),  1500));
    return () => t.forEach(clearTimeout);
  }, []);

  // Scene cycling
  useEffect(() => {
    if (phase !== 'scenes') return;
    setSceneIdx(0);
    let i = 0;
    const iv = setInterval(() => {
      i++;
      if (i >= SCENES.length) { clearInterval(iv); return; }
      setSceneIdx(i);
    }, 350);
    return () => clearInterval(iv);
  }, [phase]);

  // Word cycling
  useEffect(() => {
    if (phase !== 'words') return;
    setWordIdx(0);
    let i = 0;
    const iv = setInterval(() => {
      i++;
      if (i >= BRAND_WORDS.length) { clearInterval(iv); return; }
      setWordIdx(i);
    }, 600);
    return () => clearInterval(iv);
  }, [phase]);

  // Rapid shoe cycling
  useEffect(() => {
    if (phase !== 'rapid') return;
    setShoeIdx(0);
    let i = 0;
    const iv = setInterval(() => {
      i++;
      if (i >= SHOE_IMAGES.length) { clearInterval(iv); return; }
      setShoeIdx(i);
    }, 440);
    return () => clearInterval(iv);
  }, [phase]);

  const scene   = SCENES[sceneIdx];
  const word    = BRAND_WORDS[wordIdx];
  const isFinalWord = phase === 'words' && word === 'RABBIT';

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden"
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }}
    >
      {/* Skip button */}
      <AnimatePresence>
        {showSkip && phase !== 'final' && (
          <motion.button
            key="skip"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onComplete}
            className="absolute top-8 right-8 z-50 text-white/40 hover:text-white/80 transition-colors"
            style={{ fontFamily: 'Inter', fontSize: '0.7rem', letterSpacing: '0.2em' }}
          >
            SKIP →
          </motion.button>
        )}
      </AnimatePresence>

      {/* Phase: black */}
      {phase === 'black' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="w-1 h-1 rounded-full bg-white/10"
        />
      )}

      {/* Phase: text1 */}
      <AnimatePresence>
        {phase === 'text1' && (
          <motion.div
            key="text1"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center px-8 absolute"
          >
            <p
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontWeight: 300,
                fontSize: 'clamp(1.6rem, 4vw, 3rem)',
                color: 'rgba(255,255,255,0.9)',
                letterSpacing: '0.04em',
                lineHeight: 1.4,
              }}
            >
              Every great brand...
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase: scenes — quick cuts */}
      <AnimatePresence mode="wait">
        {phase === 'scenes' && (
          <motion.div
            key={`scene-${sceneIdx}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.06 }}
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            {/* Corner label */}
            <div
              className="absolute top-8 left-8"
              style={{ fontFamily: 'Inter', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.35)' }}
            >
              {scene.label}
            </div>
            {/* Subtle horizontal scan line */}
            <div
              className="absolute left-0 right-0 h-px"
              style={{ top: '50%', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)' }}
            />
            <SceneVisual visual={scene.visual} />
            {/* Scene counter bottom right */}
            <div
              className="absolute bottom-8 right-8"
              style={{ fontFamily: 'Inter', fontSize: '0.55rem', letterSpacing: '0.25em', color: 'rgba(255,255,255,0.2)' }}
            >
              {String(sceneIdx + 1).padStart(2, '0')} / {String(SCENES.length).padStart(2, '0')}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase: text2 */}
      <AnimatePresence>
        {phase === 'text2' && (
          <motion.div
            key="text2"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center px-8 absolute"
          >
            <p
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontWeight: 300,
                fontSize: 'clamp(1.6rem, 4vw, 3rem)',
                color: 'rgba(255,255,255,0.9)',
                letterSpacing: '0.04em',
                lineHeight: 1.4,
              }}
            >
              ...starts with a powerful identity.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase: words — flash cuts */}
      <AnimatePresence mode="wait">
        {phase === 'words' && (
          <motion.div
            key={`word-${wordIdx}`}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.08, ease: 'easeOut' }}
            className="absolute flex items-center justify-center"
          >
            <span
              style={{
                fontFamily: 'Inter',
                fontWeight: 700,
                fontSize: 'clamp(2.5rem, 10vw, 8rem)',
                color: isFinalWord ? '#d4a857' : 'white',
                letterSpacing: isFinalWord ? '0.3em' : '0.25em',
                lineHeight: 1,
                textTransform: 'uppercase',
                filter: isFinalWord ? 'none' : 'none',
              }}
            >
              {word}
            </span>
            {isFinalWord && (
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(212,168,87,0.08) 0%, transparent 70%)',
                  filter: 'blur(40px)',
                }}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase: rapid — shoe images */}
      <AnimatePresence mode="wait">
        {phase === 'rapid' && (
          <motion.div
            key={`shoe-${shoeIdx}`}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.05 }}
            className="absolute inset-0"
          >
            <img
              src={SHOE_IMAGES[shoeIdx]}
              alt="shoe"
              className="w-full h-full object-cover"
              style={{ filter: 'grayscale(100%) contrast(1.1)', mixBlendMode: 'normal' }}
            />
            <div className="absolute inset-0 bg-black/60" />
            <div
              className="absolute bottom-8 left-8"
              style={{ fontFamily: 'Inter', fontSize: '0.6rem', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.4)' }}
            >
              PREMIUM COLLECTION
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase: final */}
      <AnimatePresence>
        {phase === 'final' && (
          <motion.div
            key="final"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-0"
          >
            {/* Ambient glow */}
            <div
              className="absolute"
              style={{
                width: 600,
                height: 600,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(212,168,87,0.06) 0%, transparent 65%)',
                filter: 'blur(60px)',
                pointerEvents: 'none',
              }}
            />

            {/* Metallic RABBIT logo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              {/* Reflection line */}
              <div
                className="absolute left-0 right-0 h-px"
                style={{ bottom: -1, background: 'linear-gradient(90deg, transparent, rgba(212,168,87,0.5), transparent)' }}
              />
              <span
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontWeight: 700,
                  fontSize: 'clamp(3rem, 12vw, 9rem)',
                  background: 'linear-gradient(180deg, #f0ece4 0%, #d4a857 50%, #8a6a2e 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  letterSpacing: '0.18em',
                  lineHeight: 1,
                  display: 'block',
                }}
              >
                RABBIT
              </span>
            </motion.div>

            {/* Thin divider line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.0, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="w-64 h-px my-8"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(212,168,87,0.6), transparent)', transformOrigin: 'center' }}
            />

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.9 }}
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontWeight: 300,
                fontSize: 'clamp(0.85rem, 2vw, 1.15rem)',
                color: 'rgba(240,236,228,0.7)',
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
              }}
            >
              Premium design for footwear
            </motion.p>

            {/* Author */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.0, duration: 0.9 }}
              style={{
                fontFamily: 'Inter',
                fontWeight: 300,
                fontSize: '0.7rem',
                color: 'rgba(255,255,255,0.3)',
                letterSpacing: '0.4em',
                marginTop: 12,
              }}
            >
              FOOTWEAR STUDIO
            </motion.p>

            {/* Enter site button */}
            <motion.button
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.8, duration: 0.8 }}
              onClick={onComplete}
              className="mt-14 group flex items-center gap-3 cursor-pointer"
              style={{ background: 'none', border: 'none', padding: 0 }}
            >
              <div
                style={{
                  fontFamily: 'Inter',
                  fontSize: '0.65rem',
                  letterSpacing: '0.3em',
                  color: 'rgba(212,168,87,0.8)',
                  transition: 'color 0.3s',
                }}
                className="group-hover:text-[#d4a857]"
              >
                ENTER SITE
              </div>
              <motion.div
                className="w-8 h-px"
                style={{ background: 'rgba(212,168,87,0.5)', display: 'block' }}
                whileHover={{ scaleX: 1.5 }}
              />
              <div style={{ color: 'rgba(212,168,87,0.6)', fontSize: '0.7rem' }}>→</div>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Persistent corner branding (except final) */}
      {phase !== 'final' && phase !== 'black' && (
        <div
          className="absolute bottom-8 left-8"
          style={{ fontFamily: 'Inter', fontSize: '0.55rem', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.18)' }}
        >
          RABBIT
        </div>
      )}
    </motion.div>
  );
}
