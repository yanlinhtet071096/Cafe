/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Coffee, Croissant, MapPin, Clock, Instagram, Facebook, Phone, Menu as MenuIcon, X } from "lucide-react";
import { useState } from "react";

const MENU_ITEMS = {
  bread: [
    { name: "Sourdough Batard", price: "$8", desc: "Our signature 36-hour fermented loaf with a dark, crackling crust.", id: "b1" },
    { name: "Heritage Rye", price: "$9", desc: "Deeply flavored rye with caraway seeds and a soft, dense crumb.", id: "b2" },
    { name: "Sea Salt Focaccia", price: "$7", desc: "Light, airy bread topped with cold-pressed olive oil and Maldon salt.", id: "b3" },
  ],
  coffee: [
    { name: "V60 Pour Over", price: "$5", desc: "Single-origin beans rotated weekly for the truest flavor profile.", id: "c1" },
    { name: "Oat Milk Latte", price: "$6", desc: "Double shot of espresso with creamy, perfectly textured oat milk.", id: "c2" },
    { name: "Cold Brew", price: "$5.5", desc: "18-hour steep results in a smooth, chocolate-forward refreshment.", id: "c3" },
  ],
  pastries: [
    { name: "Classic Croissant", price: "$4.5", desc: "French butter infused layers, hand-rolled every morning.", id: "p1" },
    { name: "Cardamom Bun", price: "$5", desc: "Swedish-style braided bun with fresh cardamom and pearl sugar.", id: "p2" },
    { name: "Apricot Danish", price: "$6", desc: "Flaky pastry with vanilla bean custard and poached apricots.", id: "p3" },
  ]
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen selection:bg-bakery-gold/30 selection:text-bakery-brown">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-bakery-cream/80 backdrop-blur-md border-b border-bakery-brown/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-serif font-bold tracking-tight text-bakery-brown">Lumière</span>
          </div>
          
          <div className="hidden md:flex items-center gap-12 text-sm uppercase tracking-[0.2em] font-medium text-bakery-dark/70">
            <a href="#menu" className="hover:text-bakery-gold transition-colors">Menu</a>
            <a href="#about" className="hover:text-bakery-gold transition-colors">Atmosphere</a>
            <a href="#contact" className="hover:text-bakery-gold transition-colors">Visit Us</a>
          </div>

          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed inset-0 z-40 bg-bakery-cream pt-24 px-8 flex flex-col gap-8 md:hidden"
        >
          <a href="#menu" onClick={() => setIsMenuOpen(false)} className="text-3xl font-serif">Our Menu</a>
          <a href="#about" onClick={() => setIsMenuOpen(false)} className="text-3xl font-serif">Atmosphere</a>
          <a href="#contact" onClick={() => setIsMenuOpen(false)} className="text-3xl font-serif">Visit Us</a>
        </motion.div>
      )}

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block text-bakery-gold font-medium uppercase tracking-[0.3em] text-xs mb-6">
              Artesian & Organic Since 2024
            </span>
            <h1 className="text-6xl md:text-8xl font-serif leading-[1.05] text-bakery-brown mb-8 text-balance">
              The morning <br /> 
              <span className="italic">ritual</span>, <br />
              redefined.
            </h1>
            <p className="max-w-md text-lg text-bakery-dark/60 leading-relaxed mb-10">
              Hand-kneaded breads, specialty roasts, and a sanctuary of calm in the heart of the city. We believe in slow flour, fast friends, and the perfect golden crust.
            </p>
            <div className="flex items-center gap-6">
              <a 
                href="#menu" 
                className="px-8 py-4 bg-bakery-brown text-bakery-cream rounded-full font-medium hover:bg-bakery-dark transition-all duration-300 shadow-xl shadow-bakery-brown/10"
              >
                Explore Menu
              </a>
              <a 
                href="#contact" 
                className="text-sm uppercase tracking-widest font-semibold border-b-2 border-bakery-gold/30 hover:border-bakery-gold transition-all"
              >
                Our Location
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="relative"
          >
            <div className="mask-pill aspect-[4/5] w-full max-w-md mx-auto overflow-hidden shadow-2xl relative z-10">
              <img 
                src="https://picsum.photos/seed/bakery-hero/800/1000" 
                alt="Fresh baked bread" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-bakery-brown/10 pointer-events-none" />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-bakery-warm rounded-full -z-10 animate-pulse" />
            <div className="absolute -top-12 -right-12 w-64 h-64 border border-bakery-gold/20 rounded-full -z-10" />
            
            <div className="absolute bottom-12 -right-4 bg-white/90 backdrop-blur p-6 rounded-2xl shadow-xl z-20 hidden md:block">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-bakery-gold/10 rounded-full flex items-center justify-center text-bakery-gold">
                  <Clock size={20} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-tighter text-bakery-dark/40 font-bold">Now Open</p>
                  <p className="font-serif font-semibold text-bakery-brown uppercase tracking-widest">Until 6:00 PM</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats/Features */}
      <section className="py-20 bg-bakery-warm/50 border-y border-bakery-brown/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-12">
          {[
            { label: "Founded", val: "2024" },
            { label: "Signature Blends", val: "12" },
            { label: "Handmade Daily", val: "100%" },
            { label: "Community First", val: "Always" },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <p className="text-xs uppercase tracking-tightest text-bakery-dark/40 font-bold mb-2">{stat.label}</p>
              <p className="text-4xl font-serif text-bakery-brown italic">{stat.val}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-5xl font-serif text-bakery-brown mb-6">Our Collection</h2>
            <div className="w-24 h-px bg-bakery-gold mx-auto mb-6" />
            <p className="max-w-xl mx-auto text-bakery-dark/50">
              A meticulously curated selection of our finest sourdough, micro-batch coffee, and seasonal pastries.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-20">
            {/* Bread Menu */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-12">
                <Croissant className="text-bakery-gold" size={24} />
                <h3 className="text-2xl font-serif uppercase tracking-widest text-bakery-brown">Daily Bread</h3>
              </div>
              <div className="space-y-10">
                {MENU_ITEMS.bread.map((item) => (
                  <div key={item.id} className="group cursor-pointer">
                    <div className="flex justify-between items-baseline mb-2">
                      <h4 className="text-lg font-medium group-hover:text-bakery-gold transition-colors">{item.name}</h4>
                      <span className="text-sm font-display italic text-bakery-gold">{item.price}</span>
                    </div>
                    <p className="text-sm text-bakery-dark/40 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Coffee Menu */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-12">
                <Coffee className="text-bakery-gold" size={24} />
                <h3 className="text-2xl font-serif uppercase tracking-widest text-bakery-brown">Fine Roasts</h3>
              </div>
              <div className="space-y-10">
                {MENU_ITEMS.coffee.map((item) => (
                  <div key={item.id} className="group cursor-pointer">
                    <div className="flex justify-between items-baseline mb-2">
                      <h4 className="text-lg font-medium group-hover:text-bakery-gold transition-colors">{item.name}</h4>
                      <span className="text-sm font-display italic text-bakery-gold">{item.price}</span>
                    </div>
                    <p className="text-sm text-bakery-dark/40 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Pastry Menu */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center gap-3 mb-12">
                <div className="w-6 h-6 border-b-2 border-r-2 border-bakery-gold rotate-45" />
                <h3 className="text-2xl font-serif uppercase tracking-widest text-bakery-brown">Seasonal</h3>
              </div>
              <div className="space-y-10">
                {MENU_ITEMS.pastries.map((item) => (
                  <div key={item.id} className="group cursor-pointer">
                    <div className="flex justify-between items-baseline mb-2">
                      <h4 className="text-lg font-medium group-hover:text-bakery-gold transition-colors">{item.name}</h4>
                      <span className="text-sm font-display italic text-bakery-gold">{item.price}</span>
                    </div>
                    <p className="text-sm text-bakery-dark/40 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Atmosphere Section */}
      <section id="about" className="py-32 px-6 bg-bakery-warm">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://picsum.photos/seed/bakery-vibe-1/600/800" 
                alt="Cafe interior" 
                className="w-full aspect-[3/4] object-cover rounded-3xl"
                referrerPolicy="no-referrer"
              />
              <img 
                src="https://picsum.photos/seed/bakery-vibe-2/600/800" 
                alt="Coffee making" 
                className="w-full aspect-[3/4] object-cover rounded-3xl mt-12"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <h2 className="text-5xl font-serif text-bakery-brown mb-8">Place of pause.</h2>
            <p className="text-lg text-bakery-dark/60 leading-relaxed mb-8">
              Designed as a sanctuary from the digital noise, Lumière is filled with natural light, the scent of blooming yeast, and the gentle hum of morning conversations.
            </p>
            <p className="text-lg text-bakery-dark/60 leading-relaxed mb-12">
              Whether you're here for a quick espresso or a slow breakfast with your favorite book, we've carved out a space just for you.
            </p>
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <MapPin className="text-bakery-gold" />
                <span className="font-medium">124 Artisanal Way, Heritage District</span>
              </div>
              <div className="flex items-center gap-4">
                <Clock className="text-bakery-gold" />
                <span className="font-medium">Tue — Sun / 07:00 — 18:00</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-bakery-dark text-bakery-cream pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-16 mb-24">
            <div className="col-span-2">
              <span className="text-4xl font-serif font-bold tracking-tight mb-8 block">Lumière</span>
              <p className="max-w-xs text-bakery-cream/50 leading-relaxed">
                Celebrating the intersection of light, flour, and community every single day.
              </p>
            </div>
            
            <div className="flex flex-col gap-4">
              <h5 className="uppercase tracking-widest text-xs font-bold mb-4">Connect</h5>
              <a href="#" className="flex items-center gap-3 text-bakery-cream/70 hover:text-bakery-gold transition-colors">
                <Instagram size={18} /> Instagram
              </a>
              <a href="#" className="flex items-center gap-3 text-bakery-cream/70 hover:text-bakery-gold transition-colors">
                <Facebook size={18} /> Facebook
              </a>
              <a href="#" className="flex items-center gap-3 text-bakery-cream/70 hover:text-bakery-gold transition-colors">
                <Phone size={18} /> Call us
              </a>
            </div>

            <div className="flex flex-col gap-4">
              <h5 className="uppercase tracking-widest text-xs font-bold mb-4">Legal</h5>
              <a href="#" className="text-bakery-cream/70 hover:text-bakery-gold transition-colors">Privacy</a>
              <a href="#" className="text-bakery-cream/70 hover:text-bakery-gold transition-colors">Terms</a>
              <a href="#" className="text-bakery-cream/70 hover:text-bakery-gold transition-colors">Cookies</a>
            </div>
          </div>
          
          <div className="pt-12 border-t border-bakery-cream/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs text-bakery-cream/30 uppercase tracking-widest">
              © 2026 Lumière Bakery & Café. All rights reserved.
            </p>
            <p className="text-xs text-bakery-cream/30 uppercase tracking-widest flex items-center gap-2">
              Baked lovingly in the heart of the city
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
