import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Badge } from './ui/badge';

export interface ShoeData {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  image: string;
  accentColor: string;
  tagline: string;
  badge?: string;
}

interface Props {
  shoe: ShoeData;
  index: number;
  onAddToCart: (shoe: ShoeData) => void;
}

export function ShoeSlide({ shoe, index, onAddToCart }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Spring-smoothed scroll for organic feel
  const rawRotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-32, 0, 32]);
  const rotateY    = useSpring(rawRotateY, { stiffness: 70, damping: 22, mass: 0.6 });

  const scale      = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.72, 1.0, 1.0, 0.72]);
  const opacity    = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [0, 1, 1, 0]);
  const glowOp     = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 1, 0]);

  const textX      = useTransform(
    scrollYProgress,
    [0.1, 0.35],
    index % 2 === 0 ? [-60, 0] : [60, 0],
  );
  const textOpacity = useTransform(scrollYProgress, [0.12, 0.32, 0.78, 0.92], [0, 1, 1, 0]);

  const isEven = index % 2 === 0;

  return (
    <div ref={sectionRef} style={{ height: '200vh', position: 'relative' }}>
      <div
        className="sticky top-0 flex items-center justify-center overflow-hidden"
        style={{ height: '100vh', backgroundColor: '#0a0a0a' }}
      >
        {/* Ambient accent glow */}
        <motion.div
          style={{ opacity: glowOp }}
          className="absolute pointer-events-none"
          aria-hidden
        >
          <div
            style={{
              width: 700,
              height: 700,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${shoe.accentColor}14 0%, transparent 65%)`,
              filter: 'blur(80px)',
            }}
          />
        </motion.div>

        {/* Subtle grain texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.018]"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
            backgroundSize: '200px 200px',
          }}
        />

        {/* Content layout */}
        <div
          className={`relative z-10 flex items-center gap-8 md:gap-16 w-full max-w-6xl px-6 md:px-12 ${
            isEven ? 'flex-col md:flex-row' : 'flex-col md:flex-row-reverse'
          }`}
        >
          {/* 3D Shoe */}
          <motion.div
            style={{ opacity, scale }}
            className="flex-shrink-0 flex items-center justify-center"
          >
            <div style={{ perspective: '1100px' }}>
              <motion.img
                src={shoe.image}
                alt={shoe.name}
                style={{ rotateY }}
                className="w-[280px] md:w-[420px] lg:w-[500px] object-contain"
                draggable={false}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.opacity = '0.3';
                }}
              />
              {/* Shoe drop shadow / glow */}
              <div
                className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 w-64 h-8 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse, ${shoe.accentColor}20 0%, transparent 70%)`,
                  filter: 'blur(12px)',
                }}
              />
            </div>
          </motion.div>

          {/* Text content */}
          <motion.div
            style={{ x: textX, opacity: textOpacity }}
            className="flex flex-col gap-4 max-w-sm"
          >
            <div className="flex items-center gap-3">
              {shoe.badge && (
                <Badge
                  style={{
                    backgroundColor: `${shoe.accentColor}18`,
                    color: shoe.accentColor,
                    border: `1px solid ${shoe.accentColor}30`,
                    fontFamily: 'Inter',
                    fontSize: '0.6rem',
                    letterSpacing: '0.2em',
                    fontWeight: 500,
                    padding: '3px 10px',
                  }}
                >
                  {shoe.badge}
                </Badge>
              )}
              <span
                style={{
                  fontFamily: 'Inter',
                  fontSize: '0.6rem',
                  letterSpacing: '0.25em',
                  color: 'rgba(255,255,255,0.25)',
                  textTransform: 'uppercase',
                }}
              >
                {String(index + 1).padStart(2, '0')} / 06
              </span>
            </div>

            <div>
              <h2
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontWeight: 700,
                  fontSize: 'clamp(2.8rem, 6vw, 5rem)',
                  color: '#f0ece4',
                  lineHeight: 0.9,
                  letterSpacing: '-0.01em',
                  marginBottom: 4,
                }}
              >
                {shoe.name}
              </h2>
              <div
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontWeight: 300,
                  fontStyle: 'italic',
                  fontSize: '1rem',
                  color: 'rgba(240,236,228,0.4)',
                  letterSpacing: '0.05em',
                }}
              >
                {shoe.subtitle}
              </div>
            </div>

            <p
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontWeight: 300,
                fontSize: '1.25rem',
                color: 'rgba(240,236,228,0.55)',
                letterSpacing: '0.03em',
                lineHeight: 1.5,
              }}
            >
              {shoe.tagline}
            </p>

            <div className="flex items-center gap-6 mt-2">
              <span
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontWeight: 400,
                  fontSize: '2rem',
                  color: shoe.accentColor,
                  letterSpacing: '0.05em',
                }}
              >
                {shoe.price}
              </span>
              <button
                onClick={() => onAddToCart(shoe)}
                style={{
                  fontFamily: 'Inter',
                  fontSize: '0.65rem',
                  letterSpacing: '0.2em',
                  fontWeight: 500,
                  color: '#0a0a0a',
                  background: `linear-gradient(135deg, #d4a857, #f5c842)`,
                  border: 'none',
                  padding: '11px 28px',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  transition: 'opacity 0.25s',
                }}
                className="hover:opacity-85"
              >
                Add to Cart
              </button>
            </div>
          </motion.div>
        </div>

        {/* Section progress bar */}
        <motion.div
          style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
          className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
          aria-hidden
        >
          <div
            style={{
              height: '100%',
              background: `linear-gradient(90deg, transparent, ${shoe.accentColor}80, transparent)`,
            }}
          />
        </motion.div>

        {/* Slide index vertical text */}
        <div
          className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-2"
          style={{
            fontFamily: 'Inter',
            fontSize: '0.55rem',
            letterSpacing: '0.25em',
            color: 'rgba(255,255,255,0.15)',
            writingMode: 'vertical-rl',
          }}
        >
          {shoe.name.toUpperCase()}
        </div>
      </div>
    </div>
  );
}
