import { useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ShoppingBag, X } from 'lucide-react';
import { Badge } from './ui/badge';

interface NavbarProps {
  cartCount: number;
  onCartOpen: () => void;
  onAuthOpen: (mode: 'signin' | 'login') => void;
}

export function Navbar({ cartCount, onCartOpen, onAuthOpen }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  const navBg = useTransform(scrollY, [0, 80], ['rgba(10,10,10,0)', 'rgba(10,10,10,0.94)']);
  const navBlur = useTransform(scrollY, [0, 80], ['blur(0px)', 'blur(24px)']);
  const borderOp = useTransform(scrollY, [0, 80], ['rgba(255,255,255,0)', 'rgba(255,255,255,0.06)']);

  const navLinks = ['Collection', 'About', 'Order', 'Contact'];

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-5 flex items-center justify-between"
        style={{
          backgroundColor: navBg,
          backdropFilter: navBlur,
          borderBottom: '1px solid',
          borderColor: borderOp,
        }}
      >
        {/* Logo */}
        <a
          href="#hero"
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontWeight: 700,
            fontSize: '1.5rem',
            letterSpacing: '0.18em',
            background: 'linear-gradient(135deg, #f0ece4 0%, #d4a857 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textDecoration: 'none',
          }}
        >
          RABBIT
        </a>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              style={{
                fontFamily: 'Inter',
                fontWeight: 400,
                fontSize: '0.72rem',
                letterSpacing: '0.18em',
                color: 'rgba(240,236,228,0.55)',
                textDecoration: 'none',
                transition: 'color 0.25s',
                textTransform: 'uppercase',
              }}
              className="hover:!text-[#f0ece4]"
            >
              {link}
            </a>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => onAuthOpen('signin')}
            style={{
              fontFamily: 'Inter',
              fontSize: '0.7rem',
              letterSpacing: '0.18em',
              color: 'rgba(240,236,228,0.5)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              transition: 'color 0.25s',
              textTransform: 'uppercase',
            }}
            className="hidden md:block hover:!text-[#f0ece4]"
          >
            Sign In
          </button>
          <button
            onClick={() => onAuthOpen('login')}
            className="hidden md:flex items-center justify-center px-4 py-2 rounded-sm hover:opacity-90 transition-opacity"
            style={{
              fontFamily: 'Inter',
              fontSize: '0.7rem',
              letterSpacing: '0.18em',
              fontWeight: 500,
              color: '#0a0a0a',
              background: 'linear-gradient(135deg, #d4a857, #f5c842)',
              border: 'none',
              cursor: 'pointer',
              textTransform: 'uppercase',
            }}
          >
            Login
          </button>

          {/* Cart */}
          <button
            onClick={onCartOpen}
            className="relative flex items-center justify-center w-9 h-9 rounded-full hover:bg-white/5 transition-colors"
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <ShoppingBag size={17} color="rgba(240,236,228,0.7)" />
            {cartCount > 0 && (
              <Badge
                className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center p-0 rounded-full text-[9px]"
                style={{ backgroundColor: '#d4a857', color: '#0a0a0a', fontFamily: 'Inter', fontWeight: 700 }}
              >
                {cartCount}
              </Badge>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-1.5 w-6 h-6 items-center justify-center"
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <span className="w-5 h-px bg-[#f0ece4]/60" />
            <span className="w-3 h-px bg-[#f0ece4]/60" />
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8"
          style={{ backgroundColor: '#0a0a0a' }}
        >
          <button
            onClick={() => setMobileOpen(false)}
            className="absolute top-6 right-6"
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <X size={20} color="rgba(240,236,228,0.6)" />
          </button>
          {navLinks.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => setMobileOpen(false)}
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontWeight: 400,
                fontSize: '2.5rem',
                letterSpacing: '0.1em',
                color: 'rgba(240,236,228,0.7)',
                textDecoration: 'none',
              }}
            >
              {link}
            </a>
          ))}
          <div className="flex gap-4 mt-4">
            <button
              onClick={() => { onAuthOpen('signin'); setMobileOpen(false); }}
              style={{
                fontFamily: 'Inter', fontSize: '0.75rem', letterSpacing: '0.15em',
                color: 'rgba(240,236,228,0.5)', background: 'none', border: '1px solid rgba(255,255,255,0.15)',
                padding: '10px 24px', cursor: 'pointer', textTransform: 'uppercase',
              }}
            >
              Sign In
            </button>
            <button
              onClick={() => { onAuthOpen('login'); setMobileOpen(false); }}
              style={{
                fontFamily: 'Inter', fontSize: '0.75rem', letterSpacing: '0.15em',
                color: '#0a0a0a', background: 'linear-gradient(135deg, #d4a857, #f5c842)',
                border: 'none', padding: '10px 24px', cursor: 'pointer', textTransform: 'uppercase', fontWeight: 500,
              }}
            >
              Login
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
}
