import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Toaster } from 'sonner';
import { CinematicIntro } from './components/cinematic-intro';
import { Navbar } from './components/navbar';
import { HeroSection } from './components/hero-section';
import { ShoeSlide, ShoeData } from './components/shoe-slide';
import { OrderSection } from './components/order-section';
import { ContactSection } from './components/contact-section';
import { ShopSection, CartItem } from './components/shop-section';
import { AuthModal } from './components/auth-modal';

const SHOES: ShoeData[] = [
  {
    id: 's1',
    name: 'Apex I',
    subtitle: 'The Foundation Series',
    price: '$340',
    image: 'https://images.unsplash.com/photo-1710472171218-da46dce3faf9?w=1000&q=85',
    accentColor: '#d4a857',
    tagline: 'Where legacy begins. Every stitch a statement, every sole a foundation of purpose.',
    badge: 'New',
  },
  {
    id: 's2',
    name: 'Noir S',
    subtitle: 'Midnight Edition',
    price: '$290',
    image: 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=1000&q=85',
    accentColor: '#e0e0e0',
    tagline: 'Shadow, perfected. Engineered for those who move in silence.',
    badge: undefined,
  },
  {
    id: 's3',
    name: 'Ember R',
    subtitle: 'Fire Collection',
    price: '$410',
    image: 'https://images.unsplash.com/photo-1770029606852-38309868b4ee?w=1000&q=85',
    accentColor: '#e07040',
    tagline: 'Ignite every step. Born from heat, forged for intensity.',
    badge: 'Limited',
  },
  {
    id: 's4',
    name: 'Glacier X',
    subtitle: 'Polar Series',
    price: '$380',
    image: 'https://images.unsplash.com/photo-1623788975845-7d3e0adbae7c?w=1000&q=85',
    accentColor: '#7ab8e8',
    tagline: 'Cool under pressure. Clarity of purpose in every movement.',
    badge: undefined,
  },
  {
    id: 's5',
    name: 'Velvet V',
    subtitle: 'Couture Line',
    price: '$520',
    image: 'https://images.unsplash.com/photo-1695459590088-d6fd3cc97cfa?w=1000&q=85',
    accentColor: '#c09060',
    tagline: 'Luxury redefined. Where craftsmanship transcends expectation.',
    badge: 'Limited',
  },
  {
    id: 's6',
    name: 'Carbon C',
    subtitle: 'Sport Edition',
    price: '$460',
    image: 'https://images.unsplash.com/photo-1710472171182-ada20c1c21c4?w=1000&q=85',
    accentColor: '#909090',
    tagline: 'Performance unleashed. The ultimate expression of athletic mastery.',
    badge: undefined,
  },
];

export default function App() {
  const [introComplete, setIntroComplete] = useState(false);
  const [cart, setCart]         = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'login'>('login');

  const addToCart = (shoe: ShoeData) => {
    setCart(prev => {
      const existing = prev.find(c => c.id === shoe.id);
      if (existing) {
        return prev.map(c => c.id === shoe.id ? { ...c, qty: c.qty + 1 } : c);
      }
      return [...prev, {
        id: shoe.id,
        name: shoe.name,
        price: parseInt(shoe.price.replace('$', '')),
        priceLabel: shoe.price,
        image: shoe.image,
        size: 'EU 42',
        color: 'Default',
        qty: 1,
        category: 'sneaker',
      }];
    });
  };

  const openAuth = (mode: 'signin' | 'login') => {
    setAuthMode(mode);
    setAuthOpen(true);
  };

  return (
    <>
      <Toaster position="top-right" />

      {/* Cinematic intro overlay */}
      <AnimatePresence>
        {!introComplete && (
          <CinematicIntro key="intro" onComplete={() => setIntroComplete(true)} />
        )}
      </AnimatePresence>

      {/* Main site — fades in after intro */}
      <AnimatePresence>
        {introComplete && (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ backgroundColor: '#0a0a0a', minHeight: '100vh' }}
          >
            <Navbar
              cartCount={cart.reduce((n, c) => n + c.qty, 0)}
              onCartOpen={() => setCartOpen(true)}
              onAuthOpen={openAuth}
            />

            <HeroSection />

            {/* Animated shoe showcase — 6 slides */}
            <div id="about">
              {SHOES.map((shoe, i) => (
                <ShoeSlide
                  key={shoe.id}
                  shoe={shoe}
                  index={i}
                  onAddToCart={addToCart}
                />
              ))}
            </div>

            <ShopSection
              cart={cart}
              setCart={setCart}
              cartOpen={cartOpen}
              setCartOpen={setCartOpen}
            />

            <OrderSection shoes={SHOES} />

            <ContactSection />

            <footer
              className="py-16 px-6 md:px-10 border-t"
              style={{ backgroundColor: '#0a0a0a', borderColor: 'rgba(255,255,255,0.06)' }}
            >
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                <span
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontWeight: 700,
                    fontSize: '1.3rem',
                    letterSpacing: '0.18em',
                    background: 'linear-gradient(135deg, #f0ece4 0%, #d4a857 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  RABBIT
                </span>
                <div
                  style={{
                    fontFamily: 'Inter',
                    fontSize: '0.65rem',
                    letterSpacing: '0.15em',
                    color: 'rgba(255,255,255,0.2)',
                    textAlign: 'center',
                  }}
                >
                  © 2024 RABBIT - Premium footwear design. All rights reserved.
                </div>
                <div className="flex gap-6">
                  {['Privacy', 'Terms', 'Cookies'].map(link => (
                    <a
                      key={link}
                      href="#"
                      style={{
                        fontFamily: 'Inter',
                        fontSize: '0.6rem',
                        letterSpacing: '0.18em',
                        color: 'rgba(255,255,255,0.25)',
                        textDecoration: 'none',
                        textTransform: 'uppercase',
                        transition: 'color 0.25s',
                      }}
                      className="hover:!text-[#f0ece4]"
                    >
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Auth modal */}
      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        initialMode={authMode}
      />
    </>
  );
}
