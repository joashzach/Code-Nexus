import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Wallet, Sun, Moon, ShoppingBag, PlusCircle, Menu, X } from 'lucide-react';
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
    fontWeight: 500, fontSize: '0.875rem',
    color: '#9AA4AF', // Secondary text
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
            whileHover={{ rotate: 10, scale: 1.05 }}
            style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'linear-gradient(135deg, #5B8CFF, #8B5CF6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontWeight: 900, fontSize: 13,
            }}
          >
            CN
          </motion.div>
          <span style={{
            fontWeight: 800, fontSize: '1.25rem',
            color: '#E6EDF3', // Primary text
            letterSpacing: '-0.02em'
          }}>
            Code Nexus
          </span>
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} className="desktop-nav">
          <Link to="/" style={linkStyle}
            onMouseEnter={e => { e.currentTarget.style.color = '#E6EDF3'; e.currentTarget.style.background = '#1F2933'; }}
            onMouseLeave={e => { e.currentTarget.style.color = '#9AA4AF'; e.currentTarget.style.background = 'transparent'; }}
          >
            <ShoppingBag size={16} /> Marketplace
          </Link>
          <Link to="/upload" style={linkStyle}
            onMouseEnter={e => { e.currentTarget.style.color = '#E6EDF3'; e.currentTarget.style.background = '#1F2933'; }}
            onMouseLeave={e => { e.currentTarget.style.color = '#9AA4AF'; e.currentTarget.style.background = 'transparent'; }}
          >
            <PlusCircle size={16} /> Upload
          </Link>

          <div style={{ width: 1, height: 20, background: '#1F2933', margin: '0 0.5rem' }} />

          {/* Dark mode toggle - simplified since we're dark-first */}
          <motion.button
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
            onClick={toggleDark}
            style={{
              width: 38, height: 38, borderRadius: 8, border: '1px solid #1F2933',
              background: '#11161C',
              color: '#9AA4AF',
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
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            onClick={connectWallet}
            className="gradient-btn"
            style={{ marginLeft: '0.5rem', gap: 7 }}
          >
            <Wallet size={16} />
            {walletAddress ? short(walletAddress) : 'Connect Wallet'}
            {walletAddress && (
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
            )}
          </motion.button>
        </div>

        {/* Mobile toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }} className="mobile-nav">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9AA4AF', padding: 6 }}>
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
              background: '#0B0F14',
              borderTop: '1px solid #1F2933',
              padding: '1rem 1.5rem',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[{ to: '/', icon: <ShoppingBag size={16} />, label: 'Marketplace' }, { to: '/upload', icon: <PlusCircle size={16} />, label: 'Upload' }].map(item => (
                <Link key={item.to} to={item.to} style={{ ...linkStyle, padding: '0.75rem 1rem' }} onClick={() => setIsMenuOpen(false)}>
                  {item.icon} {item.label}
                </Link>
              ))}
              <div style={{ height: 1, background: '#1F2933', margin: '0.5rem 0' }} />
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
