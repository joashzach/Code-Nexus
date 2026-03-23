import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Wallet, Sun, Moon, ShoppingBag, PlusCircle, Menu, X, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [isDarkMode, setIsDarkMode]       = useState(false);
  const [isMenuOpen, setIsMenuOpen]       = useState(false);
  const [scrolled, setScrolled]           = useState(false);

  useEffect(() => {
    // Init theme
    const dark = localStorage.theme === 'dark'
      || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setIsDarkMode(dark);
    document.documentElement.classList.toggle('dark', dark);

    // Scroll shadow
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleDark = () => {
    const next = !isDarkMode;
    document.documentElement.classList.toggle('dark', next);
    localStorage.theme = next ? 'dark' : 'light';
    setIsDarkMode(next);
  };

  // TODO: Integrate ethers.js / web3
  const connectWallet = async () => {
    try {
      const mockAddr = '0x71C7656EC7ab88b098defB751B7401B5f6d8976F';
      setWalletAddress(mockAddr);
    } catch (err) {
      console.error('Wallet connection failed:', err);
    }
  };

  const short = addr => `${addr.slice(0, 6)}…${addr.slice(-4)}`;

  const linkStyle = {
    display: 'flex', alignItems: 'center', gap: 6,
    fontWeight: 600, fontSize: '0.875rem',
    color: isDarkMode ? '#cbd5e1' : '#374151',
    textDecoration: 'none',
    padding: '0.35rem 0.75rem',
    borderRadius: 10,
    transition: 'background 0.18s, color 0.18s',
  };

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 50,
      backdropFilter: 'blur(16px) saturate(200%)',
      WebkitBackdropFilter: 'blur(16px) saturate(200%)',
      backgroundColor: isDarkMode ? 'rgba(6,6,18,0.88)' : 'rgba(255,255,255,0.84)',
      borderBottom: isDarkMode ? '1px solid rgba(139,92,246,0.15)' : '1px solid rgba(139,92,246,0.10)',
      boxShadow: scrolled
        ? isDarkMode
          ? '0 4px 32px rgba(0,0,0,0.45)'
          : '0 4px 32px rgba(139,92,246,0.10)'
        : 'none',
      transition: 'box-shadow 0.3s ease, background-color 0.3s ease',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
          <motion.div
            whileHover={{ rotate: 15, scale: 1.08 }}
            style={{
              width: 38, height: 38, borderRadius: 12,
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #a855f7)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontWeight: 900, fontSize: 13,
              boxShadow: '0 4px 16px rgba(139,92,246,0.40)',
            }}
          >
            CN
          </motion.div>
          <span style={{
            fontWeight: 800, fontSize: '1.15rem',
            background: 'linear-gradient(135deg, #6366f1, #a855f7)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Code Nexus
          </span>
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }} className="desktop-nav">
          <Link to="/" style={linkStyle}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(139,92,246,0.08)'; e.currentTarget.style.color = '#7c3aed'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = isDarkMode ? '#cbd5e1' : '#374151'; }}
          >
            <ShoppingBag size={16} /> Marketplace
          </Link>
          <Link to="/upload" style={linkStyle}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(139,92,246,0.08)'; e.currentTarget.style.color = '#7c3aed'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = isDarkMode ? '#cbd5e1' : '#374151'; }}
          >
            <PlusCircle size={16} /> Upload
          </Link>

          <div style={{ width: 1, height: 24, background: 'rgba(139,92,246,0.15)', margin: '0 0.5rem' }} />

          {/* Dark mode toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.92 }}
            onClick={toggleDark}
            style={{
              width: 38, height: 38, borderRadius: 10, border: 'none',
              background: isDarkMode ? 'rgba(139,92,246,0.15)' : 'rgba(139,92,246,0.07)',
              color: isDarkMode ? '#c4b5fd' : '#7c3aed',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div key={isDarkMode ? 'sun' : 'moon'}
                initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}>
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              </motion.div>
            </AnimatePresence>
          </motion.button>

          {/* Wallet */}
          <motion.button
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
            onClick={connectWallet}
            className="gradient-btn"
            style={{ marginLeft: '0.5rem', gap: 7 }}
          >
            <Wallet size={16} />
            {walletAddress ? short(walletAddress) : 'Connect Wallet'}
            {walletAddress && (
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
            )}
          </motion.button>
        </div>

        {/* Mobile toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }} className="mobile-nav">
          <button onClick={toggleDark} style={{ background: 'none', border: 'none', cursor: 'pointer', color: isDarkMode ? '#c4b5fd' : '#7c3aed', padding: 6 }}>
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: isDarkMode ? '#c4b5fd' : '#7c3aed', padding: 6 }}>
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              overflow: 'hidden',
              background: isDarkMode ? 'rgba(6,6,18,0.95)' : 'rgba(255,255,255,0.97)',
              borderTop: '1px solid rgba(139,92,246,0.10)',
              padding: '1rem 1.5rem',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[{ to: '/', icon: <ShoppingBag size={16} />, label: 'Marketplace' }, { to: '/upload', icon: <PlusCircle size={16} />, label: 'Upload' }].map(item => (
                <Link key={item.to} to={item.to} style={{ ...linkStyle, padding: '0.6rem 0.75rem' }} onClick={() => setIsMenuOpen(false)}>
                  {item.icon} {item.label}
                </Link>
              ))}
              <button onClick={() => { connectWallet(); setIsMenuOpen(false); }} className="gradient-btn" style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}>
                <Wallet size={16} /> {walletAddress ? short(walletAddress) : 'Connect Wallet'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 768px) { .mobile-nav { display: none !important; } }
        @media (max-width: 767px) { .desktop-nav { display: none !important; } }
      `}</style>
    </nav>
  );
};

export default Navbar;
