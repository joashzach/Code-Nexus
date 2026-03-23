import React, { useState, useEffect } from 'react';
import { mockModules } from '../data/mockModules';
import ModuleCard from '../components/ModuleCard';
import { Search, SlidersHorizontal, PackageOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES = ['All', 'Frontend', 'Backend', 'Blockchain', 'UI/UX', 'DevOps'];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: {
    opacity: 1, y: 0, scale: 1,
    transition: { type: 'spring', stiffness: 260, damping: 22 }
  }
};

const Marketplace = () => {
  const [searchTerm, setSearchTerm]           = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading]             = useState(true);
  const [modules, setModules]                 = useState([]);

  useEffect(() => {
    const t = setTimeout(() => { setModules(mockModules); setIsLoading(false); }, 700);
    return () => clearTimeout(t);
  }, []);

  const filteredModules = modules.filter(m => {
    const matchSearch = m.title.toLowerCase().includes(searchTerm.toLowerCase())
                     || m.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCat = selectedCategory === 'All' || m.category === selectedCategory;
    return matchSearch && matchCat;
  });

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '3rem 1.5rem', minHeight: '100vh', position: 'relative' }}>

      {/* ── Floating ambient orbs ── */}
      <div className="orb" style={{ width: 520, height: 520, top: -120, left: -180, background: 'radial-gradient(circle, #a855f7, #6366f1)' }} />
      <div className="orb" style={{ width: 420, height: 420, top: 400, right: -150, background: 'radial-gradient(circle, #3b82f6, #06b6d4)', animationDelay: '3s' }} />

      {/* ── Hero ── */}
      <section style={{ textAlign: 'center', marginBottom: '3.5rem', position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 style={{
            fontSize: 'clamp(2.2rem, 5.5vw, 4rem)',
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            marginBottom: '1rem',
            color: '#1e1b4b',
          }}>
            The{' '}
            <span style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Code Marketplace
            </span>
            {' '}for Web3
          </h1>

          <p style={{ fontSize: '1.05rem', color: '#6b7280', maxWidth: 500, margin: '0 auto 2.25rem', lineHeight: 1.75 }}>
            Browse and buy audited code modules secured by smart contracts.
            Pay in ETH. Own it forever.
          </p>

          {/* ── Search + Filter ── */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem', justifyContent: 'center', maxWidth: 640, margin: '0 auto' }}>
            <div style={{ position: 'relative', flex: '1 1 280px' }}>
              <Search size={17} style={{ position: 'absolute', left: 15, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', pointerEvents: 'none' }} />
              <input
                type="text"
                placeholder="Search modules…"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                style={{ width: '100%', padding: '0.7rem 1rem 0.7rem 2.65rem', fontSize: '0.875rem' }}
              />
            </div>

            <div style={{ position: 'relative' }}>
              <SlidersHorizontal size={15} style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', pointerEvents: 'none' }} />
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                style={{ padding: '0.7rem 1.75rem 0.7rem 2.4rem', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer', appearance: 'none' }}
              >
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Category pills */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center', marginTop: '1.25rem' }}
        >
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '5px 14px',
                borderRadius: 9999,
                border: selectedCategory === cat
                  ? '1.5px solid rgba(139,92,246,0.6)'
                  : '1.5px solid rgba(139,92,246,0.14)',
                background: selectedCategory === cat
                  ? 'rgba(139,92,246,0.10)'
                  : 'transparent',
                color: selectedCategory === cat ? '#7c3aed' : '#94a3b8',
                fontWeight: 600,
                fontSize: '0.78rem',
                cursor: 'pointer',
                letterSpacing: '0.03em',
              }}
            >
              {cat}
            </button>
          ))}
        </motion.div>
      </section>

      {/* ── Module Grid ── */}
      <section style={{ position: 'relative', zIndex: 1 }}>
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div key="loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {[...Array(8)].map((_, i) => (
                <div key={i} className="card" style={{ padding: '1.5rem', height: 340 }}>
                  <div className="skeleton" style={{ width: 48, height: 48, borderRadius: 12, marginBottom: 16 }} />
                  <div className="skeleton" style={{ width: '70%', height: 22, borderRadius: 8, marginBottom: 10 }} />
                  <div className="skeleton" style={{ width: '100%', height: 70, borderRadius: 8, marginBottom: 20 }} />
                  <div className="skeleton" style={{ width: '50%', height: 18, borderRadius: 8, marginTop: 'auto' }} />
                </div>
              ))}
            </motion.div>
          ) : filteredModules.length > 0 ? (
            <motion.div key="grid" variants={containerVariants} initial="hidden" animate="show"
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {filteredModules.map(module => (
                <motion.div key={module.id} variants={cardVariants}>
                  <ModuleCard module={module} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div key="empty" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '6rem 2rem', textAlign: 'center', gap: '1rem' }}>
              <div style={{ padding: '2rem', borderRadius: '50%', background: 'rgba(139,92,246,0.08)', color: '#c4b5fd' }}>
                <PackageOpen size={56} />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1e1b4b' }}>No modules found</h3>
              <p style={{ color: '#6b7280', maxWidth: 340 }}>Try adjusting your search or category filter to find what you need.</p>
              <button onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }} className="gradient-btn" style={{ marginTop: '0.5rem' }}>
                Clear filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(0.85); }
        }
      `}</style>
    </div>
  );
};

export default Marketplace;
