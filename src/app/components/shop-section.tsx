import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { Badge } from './ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  priceLabel: string;
  image: string;
  size: string;
  color: string;
  qty: number;
  category: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  priceLabel: string;
  image: string;
  badge?: string;
  category: 'sneaker' | 'boot' | 'formal' | 'sport';
}

const PRODUCTS: Product[] = [
  { id: 'p1',  name: 'Apex I',      price: 340,  priceLabel: '$340',  image: 'https://images.unsplash.com/photo-1710472171218-da46dce3faf9?w=600&q=80', badge: 'New',     category: 'sneaker' },
  { id: 'p2',  name: 'Noir Classic', price: 290, priceLabel: '$290',  image: 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=600&q=80', badge: undefined, category: 'sneaker' },
  { id: 'p3',  name: 'Ember Rush',   price: 410, priceLabel: '$410',  image: 'https://images.unsplash.com/photo-1770029606852-38309868b4ee?w=600&q=80', badge: 'Limited', category: 'sport'   },
  { id: 'p4',  name: 'Glacier X',    price: 380, priceLabel: '$380',  image: 'https://images.unsplash.com/photo-1623788975845-7d3e0adbae7c?w=600&q=80', badge: undefined, category: 'sneaker' },
  { id: 'p5',  name: 'Carbon Pro',   price: 460, priceLabel: '$460',  image: 'https://images.unsplash.com/photo-1710472171182-ada20c1c21c4?w=600&q=80', badge: 'New',     category: 'sport'   },
  { id: 'p6',  name: 'Velvet II',    price: 520, priceLabel: '$520',  image: 'https://images.unsplash.com/photo-1695459590088-d6fd3cc97cfa?w=600&q=80', badge: 'Limited', category: 'formal'  },
  { id: 'p7',  name: 'Slate Hiker',  price: 380, priceLabel: '$380',  image: 'https://images.unsplash.com/photo-1710317958830-0553afbfc9a2?w=600&q=80', badge: undefined, category: 'boot'    },
  { id: 'p8',  name: 'Oxford Elite', price: 490, priceLabel: '$490',  image: 'https://images.unsplash.com/photo-1777987601426-c05a82045862?w=600&q=80', badge: undefined, category: 'formal'  },
  { id: 'p9',  name: 'Urban Runner',  price: 320, priceLabel: '$320', image: 'https://images.unsplash.com/photo-1727705723856-b44b14612e93?w=600&q=80', badge: 'Sale',    category: 'sport'   },
  { id: 'p10', name: 'Phantom Low',   price: 355, priceLabel: '$355', image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&q=80', badge: undefined, category: 'sneaker' },
  { id: 'p11', name: 'Ridge Boot',    price: 430, priceLabel: '$430', image: 'https://images.unsplash.com/photo-1632497775897-815042a13216?w=600&q=80', badge: 'New',     category: 'boot'    },
  { id: 'p12', name: 'Zenith White',  price: 310, priceLabel: '$310', image: 'https://images.unsplash.com/photo-1640016713197-76fe85053279?w=600&q=80', badge: undefined, category: 'sneaker' },
];

const CATEGORIES = [
  { id: 'all',     label: 'All' },
  { id: 'sneaker', label: 'Sneakers' },
  { id: 'boot',    label: 'Boots' },
  { id: 'formal',  label: 'Formal' },
  { id: 'sport',   label: 'Sport' },
];

interface Props {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
}

export function ShopSection({ cart, setCart, cartOpen, setCartOpen }: Props) {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filtered = activeCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeCategory);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(c => c.id === product.id);
      if (existing) {
        return prev.map(c => c.id === product.id ? { ...c, qty: c.qty + 1 } : c);
      }
      return [...prev, {
        id: product.id,
        name: product.name,
        price: product.price,
        priceLabel: product.priceLabel,
        image: product.image,
        size: 'EU 42',
        color: 'Default',
        qty: 1,
        category: product.category,
      }];
    });
  };

  const updateQty = (id: string, delta: number) => {
    setCart(prev =>
      prev.map(c => c.id === id ? { ...c, qty: Math.max(1, c.qty + delta) } : c),
    );
  };

  const removeItem = (id: string) => {
    setCart(prev => prev.filter(c => c.id !== id));
  };

  const subtotal = cart.reduce((sum, c) => sum + c.price * c.qty, 0);

  return (
    <>
      <section id="collection" className="py-24 md:py-32 px-6 md:px-10" style={{ backgroundColor: '#0a0a0a' }}>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
          >
            <div>
              <div
                style={{
                  fontFamily: 'Inter',
                  fontSize: '0.6rem',
                  letterSpacing: '0.35em',
                  color: 'rgba(212,168,87,0.6)',
                  textTransform: 'uppercase',
                  marginBottom: 12,
                }}
              >
                Shop Now
              </div>
              <h2
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontWeight: 700,
                  fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                  color: '#f0ece4',
                  lineHeight: 1,
                  letterSpacing: '-0.01em',
                }}
              >
                Full Collection
              </h2>
              <div className="w-12 h-px mt-6" style={{ background: 'linear-gradient(90deg, #d4a857, transparent)' }} />
            </div>

            {/* Category filter */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  style={{
                    fontFamily: 'Inter',
                    fontSize: '0.65rem',
                    letterSpacing: '0.15em',
                    color: activeCategory === cat.id ? '#0a0a0a' : 'rgba(240,236,228,0.45)',
                    background: activeCategory === cat.id ? 'linear-gradient(135deg, #d4a857, #f5c842)' : 'rgba(255,255,255,0.04)',
                    border: activeCategory === cat.id ? 'none' : '1px solid rgba(255,255,255,0.1)',
                    padding: '8px 18px',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    borderRadius: 2,
                    transition: 'all 0.25s',
                    fontWeight: activeCategory === cat.id ? 600 : 400,
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
            >
              {filtered.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.7, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -8, transition: { type: 'spring', stiffness: 350, damping: 22 } }}
                  className="group rounded-sm overflow-hidden cursor-pointer"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}
                >
                  {/* Image */}
                  <div
                    className="relative overflow-hidden"
                    style={{ aspectRatio: '1/1', background: '#111' }}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                      style={{ transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1)' }}
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
                    {product.badge && (
                      <Badge
                        className="absolute top-3 left-3 text-[9px] tracking-widest border-none"
                        style={{
                          fontFamily: 'Inter',
                          fontWeight: 600,
                          backgroundColor: product.badge === 'Sale' ? '#8b2020' : '#d4a857',
                          color: '#0a0a0a',
                          letterSpacing: '0.15em',
                          padding: '3px 8px',
                        }}
                      >
                        {product.badge}
                      </Badge>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <div
                      style={{
                        fontFamily: 'Inter',
                        fontSize: '0.82rem',
                        color: '#f0ece4',
                        fontWeight: 500,
                        letterSpacing: '0.03em',
                        marginBottom: 6,
                      }}
                    >
                      {product.name}
                    </div>
                    <div className="flex items-center justify-between">
                      <span
                        style={{
                          fontFamily: 'Cormorant Garamond, serif',
                          fontSize: '1.2rem',
                          color: '#d4a857',
                          letterSpacing: '0.04em',
                        }}
                      >
                        {product.priceLabel}
                      </span>
                      <button
                        onClick={() => addToCart(product)}
                        className="hover:opacity-85 transition-opacity"
                        style={{
                          fontFamily: 'Inter',
                          fontSize: '0.58rem',
                          letterSpacing: '0.18em',
                          fontWeight: 600,
                          color: '#0a0a0a',
                          background: 'linear-gradient(135deg, #d4a857, #f5c842)',
                          border: 'none',
                          padding: '7px 14px',
                          cursor: 'pointer',
                          textTransform: 'uppercase',
                          borderRadius: 1,
                        }}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Cart drawer */}
      <Sheet open={cartOpen} onOpenChange={setCartOpen}>
        <SheetContent
          side="right"
          className="flex flex-col"
          style={{
            backgroundColor: '#0e0e0e',
            borderLeft: '1px solid rgba(255,255,255,0.08)',
            color: '#f0ece4',
            width: '100%',
            maxWidth: 420,
            fontFamily: 'Inter',
          }}
        >
          <SheetHeader className="pb-6 border-b" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
            <SheetTitle
              className="flex items-center gap-3"
              style={{ color: '#f0ece4', fontFamily: 'Inter', fontSize: '0.75rem', letterSpacing: '0.25em', fontWeight: 500 }}
            >
              <ShoppingBag size={16} color="#d4a857" />
              YOUR CART
              {cart.length > 0 && (
                <span
                  className="ml-auto"
                  style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.65rem', letterSpacing: '0.2em' }}
                >
                  {cart.reduce((n, c) => n + c.qty, 0)} ITEMS
                </span>
              )}
            </SheetTitle>
          </SheetHeader>

          {cart.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center">
              <ShoppingBag size={40} color="rgba(255,255,255,0.1)" />
              <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.15em' }}>
                Your cart is empty
              </div>
            </div>
          ) : (
            <>
              {/* Cart items */}
              <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-4">
                {cart.map(item => (
                  <div
                    key={item.id}
                    className="flex gap-4"
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: 16 }}
                  >
                    <div
                      className="w-16 h-16 flex-shrink-0 rounded-sm overflow-hidden"
                      style={{ background: '#1a1a1a' }}
                    >
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div style={{ fontSize: '0.82rem', color: '#f0ece4', marginBottom: 4 }}>{item.name}</div>
                      <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>
                        {item.size} · {item.color}
                      </div>
                      <div
                        style={{
                          fontFamily: 'Cormorant Garamond, serif',
                          fontSize: '1rem',
                          color: '#d4a857',
                          marginTop: 4,
                        }}
                      >
                        {item.priceLabel}
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-between gap-2">
                      <button
                        onClick={() => removeItem(item.id)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2 }}
                      >
                        <Trash2 size={12} color="rgba(255,255,255,0.25)" />
                      </button>
                      <div
                        className="flex items-center gap-2"
                        style={{ border: '1px solid rgba(255,255,255,0.1)', borderRadius: 2, overflow: 'hidden' }}
                      >
                        <button
                          onClick={() => updateQty(item.id, -1)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px 8px', color: '#f0ece4' }}
                        >
                          <Minus size={10} />
                        </button>
                        <span style={{ fontSize: '0.75rem', minWidth: 20, textAlign: 'center' }}>{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.id, 1)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px 8px', color: '#f0ece4' }}
                        >
                          <Plus size={10} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="pt-6 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                <div className="flex justify-between items-center mb-6">
                  <span style={{ fontSize: '0.65rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.35)' }}>SUBTOTAL</span>
                  <span
                    style={{
                      fontFamily: 'Cormorant Garamond, serif',
                      fontSize: '1.5rem',
                      color: '#d4a857',
                    }}
                  >
                    ${subtotal}
                  </span>
                </div>
                <button
                  style={{
                    width: '100%',
                    fontFamily: 'Inter',
                    fontSize: '0.7rem',
                    letterSpacing: '0.25em',
                    fontWeight: 600,
                    color: '#0a0a0a',
                    background: 'linear-gradient(135deg, #d4a857, #f5c842)',
                    border: 'none',
                    padding: '16px',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                  }}
                  className="hover:opacity-90 transition-opacity"
                >
                  Proceed to Checkout
                </button>
                <button
                  onClick={() => setCartOpen(false)}
                  style={{
                    width: '100%',
                    fontFamily: 'Inter',
                    fontSize: '0.65rem',
                    letterSpacing: '0.18em',
                    color: 'rgba(255,255,255,0.3)',
                    background: 'none',
                    border: 'none',
                    padding: '12px',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    marginTop: 8,
                  }}
                  className="hover:!text-white/60 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
