import React, { useState } from 'react';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { ShoeData } from './shoe-slide';

interface Props {
  shoes: ShoeData[];
}

const SIZES = ['EU 36', 'EU 37', 'EU 38', 'EU 39', 'EU 40', 'EU 41', 'EU 42', 'EU 43', 'EU 44', 'EU 45', 'EU 46'];
const COLORS = [
  { name: 'Obsidian', hex: '#1a1a1a' },
  { name: 'Pearl',    hex: '#f0ece4' },
  { name: 'Gold',     hex: '#d4a857' },
  { name: 'Crimson',  hex: '#8b2020' },
  { name: 'Slate',    hex: '#4a5568' },
];

interface OrderForm {
  model: string;
  size: string;
  color: string;
  qty: number;
  name: string;
  email: string;
  phone: string;
  notes: string;
}

export function OrderSection({ shoes }: Props) {
  const [form, setForm] = useState<OrderForm>({
    model: '', size: '', color: '', qty: 1,
    name: '', email: '', phone: '', notes: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const set = (key: keyof OrderForm, val: string | number) =>
    setForm(prev => ({ ...prev, [key]: val }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.model || !form.size || !form.color || !form.name || !form.email) {
      toast.error('Please fill in all required fields.');
      return;
    }
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1200));
    setSubmitting(false);
    toast.success('Order received! We\'ll contact you within 24 hours.', {
      style: { background: '#111', border: '1px solid rgba(212,168,87,0.3)', color: '#f0ece4' },
    });
    setForm({ model: '', size: '', color: '', qty: 1, name: '', email: '', phone: '', notes: '' });
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: '#f0ece4',
    fontFamily: 'Inter',
    fontSize: '0.85rem',
    padding: '12px 16px',
    outline: 'none',
    transition: 'border-color 0.25s',
    borderRadius: 2,
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: 'Inter',
    fontSize: '0.6rem',
    letterSpacing: '0.2em',
    color: 'rgba(240,236,228,0.35)',
    textTransform: 'uppercase',
    marginBottom: 8,
    display: 'block',
  };

  return (
    <section id="order" className="py-24 md:py-32 px-6 md:px-10" style={{ backgroundColor: '#0a0a0a' }}>
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
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
            Bespoke Service
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
            Place Your Order
          </h2>
          <div
            className="w-12 h-px mt-6"
            style={{ background: 'linear-gradient(90deg, #d4a857, transparent)' }}
          />
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          onSubmit={handleSubmit}
        >
          <div
            className="rounded-sm p-8 md:p-12"
            style={{
              background: 'rgba(255,255,255,0.025)',
              border: '1px solid rgba(255,255,255,0.07)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Model */}
              <div>
                <label style={labelStyle}>Model *</label>
                <select
                  value={form.model}
                  onChange={e => set('model', e.target.value)}
                  style={{ ...inputStyle, cursor: 'pointer', appearance: 'none' }}
                  required
                >
                  <option value="" style={{ background: '#111' }}>Select model</option>
                  {shoes.map(s => (
                    <option key={s.id} value={s.id} style={{ background: '#111' }}>
                      {s.name} — {s.price}
                    </option>
                  ))}
                </select>
              </div>

              {/* Size */}
              <div>
                <label style={labelStyle}>Size *</label>
                <select
                  value={form.size}
                  onChange={e => set('size', e.target.value)}
                  style={{ ...inputStyle, cursor: 'pointer', appearance: 'none' }}
                  required
                >
                  <option value="" style={{ background: '#111' }}>Select size</option>
                  {SIZES.map(s => (
                    <option key={s} value={s} style={{ background: '#111' }}>{s}</option>
                  ))}
                </select>
              </div>

              {/* Color */}
              <div className="md:col-span-2">
                <label style={labelStyle}>Colorway *</label>
                <div className="flex flex-wrap gap-3 mt-1">
                  {COLORS.map(c => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => set('color', c.name)}
                      className="flex items-center gap-2 px-4 py-2 transition-all"
                      style={{
                        background: form.color === c.name ? 'rgba(212,168,87,0.12)' : 'rgba(255,255,255,0.03)',
                        border: form.color === c.name ? '1px solid rgba(212,168,87,0.5)' : '1px solid rgba(255,255,255,0.08)',
                        borderRadius: 2,
                        cursor: 'pointer',
                        fontFamily: 'Inter',
                        fontSize: '0.72rem',
                        color: form.color === c.name ? '#d4a857' : 'rgba(240,236,228,0.5)',
                        letterSpacing: '0.1em',
                      }}
                    >
                      <div
                        className="w-3 h-3 rounded-full flex-shrink-0"
                        style={{
                          backgroundColor: c.hex,
                          outline: '1px solid rgba(255,255,255,0.15)',
                        }}
                      />
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label style={labelStyle}>Quantity</label>
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={form.qty}
                  onChange={e => set('qty', Number(e.target.value))}
                  style={inputStyle}
                />
              </div>

              {/* Full name */}
              <div>
                <label style={labelStyle}>Full Name *</label>
                <input
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={e => set('name', e.target.value)}
                  style={{ ...inputStyle, '::placeholder': { color: 'rgba(240,236,228,0.2)' } } as React.CSSProperties}
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label style={labelStyle}>Email *</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={e => set('email', e.target.value)}
                  style={inputStyle}
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <label style={labelStyle}>Phone</label>
                <input
                  type="tel"
                  placeholder="+998 — — — — — —"
                  value={form.phone}
                  onChange={e => set('phone', e.target.value)}
                  style={inputStyle}
                />
              </div>

              {/* Notes */}
              <div className="md:col-span-2">
                <label style={labelStyle}>Special Requests</label>
                <textarea
                  placeholder="Any custom requirements, gift packaging, etc."
                  value={form.notes}
                  onChange={e => set('notes', e.target.value)}
                  rows={4}
                  style={{ ...inputStyle, resize: 'vertical', fontFamily: 'Inter' }}
                />
              </div>

              {/* Submit */}
              <div className="md:col-span-2 flex justify-end mt-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="relative overflow-hidden hover:opacity-90 transition-opacity"
                  style={{
                    fontFamily: 'Inter',
                    fontSize: '0.7rem',
                    letterSpacing: '0.25em',
                    fontWeight: 600,
                    color: '#0a0a0a',
                    background: 'linear-gradient(135deg, #d4a857, #f5c842)',
                    border: 'none',
                    padding: '16px 48px',
                    cursor: submitting ? 'wait' : 'pointer',
                    textTransform: 'uppercase',
                    minWidth: 200,
                  }}
                >
                  {submitting ? 'Sending...' : 'Submit Order'}
                </button>
              </div>
            </div>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
