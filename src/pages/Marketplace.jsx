import { useState, useEffect } from 'react';
import { mockModules } from '../data/mockModules';
import ModuleCard from '../components/ModuleCard';
import { Search, SlidersHorizontal, PackageOpen, Terminal } from 'lucide-react';
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
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '4rem 1.5rem', minHeight: '100vh', position: 'relative' }}>

      {/* ── Hero ── */}
      <section style={{ textAlign: 'center', marginBottom: '4rem', position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <div style={{ position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)', width: '90%', height: '120%', background: 'radial-gradient(circle at center, rgba(91, 140, 255, 0.1) 0%, transparent 65%)', zIndex: -1, pointerEvents: 'none', filter: 'blur(80px)' }} />
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.04em',
            marginBottom: '1.5rem',
            color: 'var(--color-text-primary)',
          }}>
            A{' '}
            <span style={{ 
              background: 'linear-gradient(135deg, var(--color-brand-primary), var(--color-brand-secondary))', 
              WebkitBackgroundClip: 'text', 
              WebkitTextFillColor: 'transparent', 
              backgroundClip: 'text' 
            }}>
              Web3-powered Marketplace
            </span>
            {' '}for Reusable Code
          </h1>
          <div style={{ height: 2, width: 80, background: 'linear-gradient(90deg, transparent, var(--color-brand-primary), transparent)', margin: '0 auto 2.5rem' }} />

          <p style={{ fontSize: '1.125rem', color: 'var(--color-text-secondary)', maxWidth: 540, margin: '0 auto 2.5rem', lineHeight: 1.6 }}>
            Browse and buy production-ready code modules secured by smart contracts.
            Pay in ETH. Own it forever.
          </p>

          {/* ── Search + Filter ── */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center', maxWidth: 680, margin: '0 auto' }}>
            <div style={{ position: 'relative', flex: '1 1 320px' }}>
              <Search size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)', pointerEvents: 'none' }} />
              <input
                type="text"
                placeholder="Search modules…"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                style={{ width: '100%', padding: '0.8rem 1rem 0.8rem 3rem', fontSize: '0.925rem' }}
              />
            </div>

            <div style={{ position: 'relative' }}>
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                style={{ padding: '0.8rem 2.5rem 0.8rem 1.25rem', fontSize: '0.925rem', fontWeight: 600, cursor: 'pointer', appearance: 'none', minWidth: 160 }}
              >
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <div style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)', pointerEvents: 'none' }}>
                <SlidersHorizontal size={16} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Category pills */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginTop: '1.5rem' }}
        >
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '6px 16px',
                borderRadius: 8,
                border: '1px solid',
                borderColor: selectedCategory === cat ? 'var(--color-brand-primary)' : 'var(--color-border-subtle)',
                background: selectedCategory === cat ? 'rgba(91, 140, 255, 0.1)' : 'var(--color-bg-surface)',
                color: selectedCategory === cat ? 'var(--color-brand-primary)' : 'var(--color-text-secondary)',
                fontWeight: 600,
                fontSize: '0.8rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
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
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {[...Array(8)].map((_, i) => (
                <div key={i} className="card" style={{ padding: '1.5rem', height: 360 }}>
                  <div className="skeleton" style={{ width: 48, height: 48, borderRadius: 10, marginBottom: 16 }} />
                  <div className="skeleton" style={{ width: '70%', height: 24, borderRadius: 6, marginBottom: 10 }} />
                  <div className="skeleton" style={{ width: '100%', height: 80, borderRadius: 6, marginBottom: 20 }} />
                  <div className="skeleton" style={{ width: '50%', height: 20, borderRadius: 6, marginTop: 'auto' }} />
                </div>
              ))}
            </motion.div>
          ) : filteredModules.length > 0 ? (
            <motion.div key="grid" variants={containerVariants} initial="hidden" animate="show"
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {filteredModules.map(module => (
                <motion.div key={module.id} variants={cardVariants}>
                  <ModuleCard module={module} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div key="empty" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '8rem 2rem', textAlign: 'center', gap: '1.25rem' }}>
              <div style={{ padding: '2.5rem', borderRadius: '50%', background: 'var(--color-bg-surface)', color: 'var(--color-border-subtle)', border: '1px solid var(--color-border-subtle)' }}>
                <PackageOpen size={64} />
              </div>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>No modules found</h3>
              <p style={{ color: 'var(--color-text-secondary)', maxWidth: 360, lineHeight: 1.6 }}>Try adjusting your search or category filter to find what you need.</p>
              <button onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }} className="gradient-btn" style={{ marginTop: '0.5rem' }}>
                Clear filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
};

export default Marketplace;
