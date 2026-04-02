import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Marketplace from './pages/Marketplace';
import Upload from './pages/Upload';
import ModuleDetail from './pages/ModuleDetail';
import { Toaster } from 'react-hot-toast';

const Logo = ({ size = 18, id = 'footer-logo-grad' }) => (
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

/**
 * Main App component.
 * Sets up routing for the Code Nexus dApp using React Router.
 */
function App() {
  return (
    <Router>
      {/* Toaster for global toast notifications */}
      <Toaster position="top-right" toastOptions={{
        style: { 
          borderRadius: '10px', 
          fontWeight: 600, 
          background: '#151B23', 
          color: '#E6EDF3',
          border: '1px solid #1F2933',
          fontSize: '0.875rem'
        }
      }} />

      {/* Root wrapper: Dark-first theme */}
      <div style={{ minHeight: '100vh' }}>
        <Navbar />

        <main className="pb-20">
          <Routes>
            <Route path="/" element={<Marketplace />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/module/:id" element={<ModuleDetail />} />
            <Route path="*" element={<Marketplace />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer style={{
          background: '#0B0F14',
          borderTop: '1px solid #1F2933',
          padding: '4rem 1.5rem',
          textAlign: 'center',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: '1.5rem' }}>
            <div style={{
              width: 38, height: 38,
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 10,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
            }}><Logo size={20} /></div>
            <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text-primary)', letterSpacing: '-0.04em', textTransform: 'uppercase' }}>Code Nexus</span>
          </div>
          <p style={{ color: '#9AA4AF', fontSize: '0.9rem', maxWidth: 400, margin: '0 auto 2rem', lineHeight: 1.6 }}>
            The world's first decentralized code marketplace. Built on the blockchain, owned by the developer community.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2.5rem', marginBottom: '2.5rem' }}>
            {['Docs', 'Twitter', 'Discord', 'GitHub'].map(l => (
              <a key={l} href="#" style={{ 
                color: '#6B7280', 
                fontWeight: 700, 
                fontSize: '0.75rem', 
                textDecoration: 'none', 
                textTransform: 'uppercase', 
                letterSpacing: '0.1em',
                transition: 'color 0.2s ease'
              }}
                onMouseEnter={e => e.currentTarget.style.color = '#5B8CFF'}
                onMouseLeave={e => e.currentTarget.style.color = '#6B7280'}
              >{l}</a>
            ))}
          </div>
          <p style={{ color: '#6B7280', fontSize: '0.75rem', fontWeight: 500 }}>© 2024 Code Nexus Labs. Distributed via decentralized protocols.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
