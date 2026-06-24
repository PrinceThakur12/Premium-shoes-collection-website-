import { motion } from 'motion/react';
import { MapPin, Mail, Phone, MessageSquare, Instagram, Facebook, Youtube } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

const CONTACT_CARDS = [
  {
    icon: MapPin,
    title: 'Visit Us',
    lines: ['Tashkent, Uzbekistan', 'Chilanzar District, Block 12'],
  },
  {
    icon: Mail,
    title: 'Email',
    lines: ['hello@rabbit.uz', 'orders@rabbit.uz'],
  },
  {
    icon: Phone,
    title: 'Phone',
    lines: ['+998 90 000 00 00', 'Mon – Sat, 9:00 – 18:00'],
  },
  {
    icon: MessageSquare,
    title: 'Live Chat',
    lines: ['Telegram: @rabbit_support', 'Response within 1 hour'],
  },
];

const FAQ_ITEMS = [
  {
    q: "What materials are RABBIT shoes made from?",
    a: "Every pair is crafted from premium full-grain Italian leather and sustainably sourced suede. Hardware is solid brass or stainless steel. We never use synthetic substitutes on primary surfaces.",
  },
  {
    q: "How do I determine my correct size?",
    a: "We recommend using our size guide on the product page. RABBIT fits true to EU sizing. If you're between sizes, we suggest sizing up. Custom sizing is also available on request.",
  },
  {
    q: "Do you offer custom colorways and materials?",
    a: "Yes. Our bespoke service allows full customization of materials, colors, and hardware. Lead time is 4–6 weeks. Use the Order form above and describe your requirements in the notes field.",
  },
  {
    q: "What is the return and exchange policy?",
    a: "Unworn items in original packaging can be returned within 14 days for a full refund. Custom orders are final sale. For exchanges, please contact us within 7 days of delivery.",
  },
  {
    q: "How long does shipping take?",
    a: "Domestic (Uzbekistan): 2–3 business days. Central Asia & CIS: 5–10 business days. International: 10–21 business days depending on customs. Express options are available.",
  },
  {
    q: "Do you ship internationally?",
    a: "Yes, we ship worldwide. International orders over $300 qualify for complimentary express shipping. All items are insured and tracked from dispatch to delivery.",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export function ContactSection() {
  return (
    <section id="contact" className="py-24 md:py-32 px-6 md:px-10" style={{ backgroundColor: '#0a0a0a' }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
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
            Get In Touch
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
            Contact & Support
          </h2>
          <div
            className="w-12 h-px mt-6"
            style={{ background: 'linear-gradient(90deg, #d4a857, transparent)' }}
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Contact cards + Social */}
          <div>
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {CONTACT_CARDS.map(card => (
                <motion.div
                  key={card.title}
                  variants={item}
                  className="flex flex-col gap-3 p-6 rounded-sm"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  <div
                    className="flex items-center justify-center w-9 h-9 rounded-sm"
                    style={{ background: 'rgba(212,168,87,0.1)', border: '1px solid rgba(212,168,87,0.2)' }}
                  >
                    <card.icon size={15} color="#d4a857" />
                  </div>
                  <div
                    style={{
                      fontFamily: 'Inter',
                      fontSize: '0.65rem',
                      letterSpacing: '0.2em',
                      color: 'rgba(240,236,228,0.4)',
                      textTransform: 'uppercase',
                    }}
                  >
                    {card.title}
                  </div>
                  {card.lines.map((line, i) => (
                    <div
                      key={i}
                      style={{
                        fontFamily: 'Inter',
                        fontSize: '0.82rem',
                        color: i === 0 ? '#f0ece4' : 'rgba(240,236,228,0.4)',
                        lineHeight: 1.5,
                      }}
                    >
                      {line}
                    </div>
                  ))}
                </motion.div>
              ))}
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mt-8 flex items-center gap-4"
            >
              <span
                style={{
                  fontFamily: 'Inter',
                  fontSize: '0.58rem',
                  letterSpacing: '0.25em',
                  color: 'rgba(255,255,255,0.2)',
                  textTransform: 'uppercase',
                }}
              >
                Follow
              </span>
              <div
                className="flex-1 h-px"
                style={{ background: 'rgba(255,255,255,0.06)' }}
              />
              {[Instagram, Facebook, Youtube].map((Icon, i) => (
                <button
                  key={i}
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    width: 36,
                    height: 36,
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'border-color 0.25s, background 0.25s',
                  }}
                  className="hover:!border-[#d4a857]/40 hover:!bg-[#d4a857]/08"
                >
                  <Icon size={14} color="rgba(240,236,228,0.45)" />
                </button>
              ))}
            </motion.div>
          </div>

          {/* Right: FAQ */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              style={{
                fontFamily: 'Inter',
                fontSize: '0.6rem',
                letterSpacing: '0.25em',
                color: 'rgba(240,236,228,0.3)',
                textTransform: 'uppercase',
                marginBottom: 20,
              }}
            >
              Frequently Asked
            </div>
            <Accordion type="single" collapsible className="flex flex-col gap-1">
              {FAQ_ITEMS.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  style={{
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: 2,
                    overflow: 'hidden',
                    marginBottom: 0,
                  }}
                >
                  <AccordionTrigger
                    style={{
                      fontFamily: 'Inter',
                      fontSize: '0.82rem',
                      color: '#f0ece4',
                      padding: '14px 16px',
                      background: 'rgba(255,255,255,0.02)',
                      textAlign: 'left',
                      fontWeight: 400,
                    }}
                    className="hover:no-underline [&>svg]:text-[#d4a857]"
                  >
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent
                    style={{
                      fontFamily: 'Inter',
                      fontSize: '0.8rem',
                      color: 'rgba(240,236,228,0.5)',
                      padding: '12px 16px 16px',
                      lineHeight: 1.7,
                      background: 'rgba(0,0,0,0.3)',
                    }}
                  >
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
