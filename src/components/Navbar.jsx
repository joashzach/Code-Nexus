import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Wallet, Sun, Moon, ShoppingBag, PlusCircle, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Logo = ({ size = 22, id = 'logo-grad' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11 2L2 14H10L9 22L20 10H12L13 2Z" fill={`url(#${id})`} stroke="white" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" />
    <defs>
      <linearGradient id={id} x1="2" y1="2" x2="20" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="#9333EA" />
        <stop offset="1" stopColor="#3B82F6" />
      </linearGradient>
    </defs>
  </svg>
);

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
    fontWeight: 500, fontSize: '0.875rem',
    color: 'var(--color-text-secondary)', // Secondary text
    textDecoration: 'none',
    padding: '0.5rem 0.85rem',
    borderRadius: 8,
    transition: 'all 0.2s ease',
  };

  return (
    <nav className="glass" style={{
      position: 'sticky', top: 0, zIndex: 50,
      boxShadow: scrolled ? '0 8px 32px rgba(0,0,0,0.5)' : 'none',
      transition: 'box-shadow 0.3s ease',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
          <motion.div
            whileHover={{ rotate: 5, scale: 1.1, boxShadow: '0 0 25px rgba(168, 85, 247, 0.4)' }}
            style={{
              width: 42, height: 42, borderRadius: 12,
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
            }}
          >
            <Logo size={24} />
          </motion.div>
          <span style={{
            fontWeight: 800, fontSize: '1.5rem',
            color: 'var(--color-text-primary)',
            letterSpacing: '-0.04em',
            textTransform: 'uppercase'
          }}>
            Code Nexus
          </span>
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} className="desktop-nav">
          <Link to="/" style={linkStyle}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-text-primary)'; e.currentTarget.style.background = 'var(--color-border-subtle)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-text-secondary)'; e.currentTarget.style.background = 'transparent'; }}
          >
            <ShoppingBag size={16} /> Marketplace
          </Link>
          <Link to="/upload" style={linkStyle}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-text-primary)'; e.currentTarget.style.background = 'var(--color-border-subtle)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-text-secondary)'; e.currentTarget.style.background = 'transparent'; }}
          >
            <PlusCircle size={16} /> Upload
          </Link>

          <div style={{ width: 1, height: 20, background: 'var(--color-border-subtle)', margin: '0 0.5rem' }} />

          {/* Dark mode toggle - simplified since we're dark-first */}
          <motion.button
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
            onClick={toggleDark}
            style={{
              width: 38, height: 38, borderRadius: 8, border: '1px solid var(--color-border-subtle)',
              background: 'var(--color-bg-surface)',
              color: 'var(--color-text-secondary)',
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
            whileHover={{ scale: 1.05, boxShadow: '0 8px 20px rgba(91, 140, 255, 0.3)' }} whileTap={{ scale: 0.95 }}
            onClick={connectWallet}
            className="gradient-btn"
            style={{ marginLeft: '1rem', gap: 7, padding: '0.7rem 1.4rem' }}
          >
            <Wallet size={16} />
            {walletAddress ? short(walletAddress) : 'Connect Wallet'}
            {walletAddress && (
              <motion.span 
                animate={{ scale: [1, 1.4, 1] }} 
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', display: 'inline-block' }} 
              />
            )}
          </motion.button>
        </div>

        {/* Mobile toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }} className="mobile-nav">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-secondary)', padding: 6 }}>
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              overflow: 'hidden',
              background: 'var(--color-bg-base)',
              borderTop: '1px solid var(--color-border-subtle)',
              padding: '1rem 1.5rem',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[{ to: '/', icon: <ShoppingBag size={16} />, label: 'Marketplace' }, { to: '/upload', icon: <PlusCircle size={16} />, label: 'Upload' }].map(item => (
                <Link key={item.to} to={item.to} style={{ ...linkStyle, padding: '0.75rem 1rem' }} onClick={() => setIsMenuOpen(false)}>
                  {item.icon} {item.label}
                </Link>
              ))}
              <div style={{ height: 1, background: 'var(--color-border-subtle)', margin: '0.5rem 0' }} />
              <button onClick={() => { connectWallet(); setIsMenuOpen(false); }} className="gradient-btn" style={{ width: '100%', justifyContent: 'center' }}>
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
