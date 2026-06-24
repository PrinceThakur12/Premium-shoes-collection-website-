import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';

export function HeroSection() {
  const letters = 'RABBIT'.split('');

  return (
    <section
      id="hero"
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#0a0a0a' }}
    >
      {/* Ambient background glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: '80vw',
          height: '80vw',
          maxWidth: 900,
          maxHeight: 900,
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, rgba(212,168,87,0.06) 0%, transparent 68%)',
          filter: 'blur(80px)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Main title */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          style={{
            fontFamily: 'Inter',
            fontSize: '0.65rem',
            letterSpacing: '0.45em',
            color: 'rgba(212,168,87,0.6)',
            textTransform: 'uppercase',
          }}
        >
          Premium Footwear
        </motion.div>

        <div className="flex items-baseline" aria-label="RABBIT">
          {letters.map((letter, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 80, filter: 'blur(12px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{
                type: 'spring',
                stiffness: 100,
                damping: 18,
                delay: 0.3 + i * 0.08,
              }}
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontWeight: 700,
                fontSize: 'clamp(5rem, 20vw, 14rem)',
                lineHeight: 0.85,
                background: 'linear-gradient(180deg, #f0ece4 0%, #c8b88a 60%, #8a6a2e 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '-0.02em',
                display: 'inline-block',
              }}
            >
              {letter}
            </motion.span>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontWeight: 300,
            fontStyle: 'italic',
            fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
            color: 'rgba(240,236,228,0.45)',
            letterSpacing: '0.06em',
          }}
        >
          Where craftsmanship meets identity
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="flex items-center gap-4 mt-4"
        >
          <a
            href="#order"
            style={{
              fontFamily: 'Inter',
              fontSize: '0.7rem',
              letterSpacing: '0.22em',
              fontWeight: 500,
              color: '#0a0a0a',
              background: 'linear-gradient(135deg, #d4a857, #f5c842)',
              padding: '14px 36px',
              textDecoration: 'none',
              display: 'inline-block',
              transition: 'opacity 0.25s',
              textTransform: 'uppercase',
            }}
            className="hover:opacity-85"
          >
            Place Your Order
          </a>
          <a
            href="#about"
            style={{
              fontFamily: 'Inter',
              fontSize: '0.7rem',
              letterSpacing: '0.22em',
              color: 'rgba(240,236,228,0.5)',
              border: '1px solid rgba(255,255,255,0.12)',
              padding: '14px 36px',
              textDecoration: 'none',
              display: 'inline-block',
              transition: 'color 0.25s, border-color 0.25s',
              textTransform: 'uppercase',
            }}
            className="hover:!text-[#f0ece4] hover:!border-white/30"
          >
            Our Story
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={16} color="rgba(212,168,87,0.4)" />
        </motion.div>
        <div
          style={{
            fontFamily: 'Inter',
            fontSize: '0.55rem',
            letterSpacing: '0.3em',
            color: 'rgba(212,168,87,0.35)',
            writingMode: 'horizontal-tb',
            textTransform: 'uppercase',
          }}
        >
          Scroll
        </div>
      </motion.div>

      {/* Corner year */}
      <div
        className="absolute bottom-8 right-10 hidden md:block"
        style={{
          fontFamily: 'Inter',
          fontSize: '0.55rem',
          letterSpacing: '0.25em',
          color: 'rgba(255,255,255,0.15)',
        }}
      >
        EST. 2024
      </div>
    </section>
  );
}
