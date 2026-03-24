import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Marketplace from './pages/Marketplace';
import Upload from './pages/Upload';
import ModuleDetail from './pages/ModuleDetail';
import { Toaster } from 'react-hot-toast';

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
      <div style={{ minHeight: '100vh', backgroundColor: '#0B0F14', color: '#E6EDF3' }}>
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
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: '1.25rem' }}>
            <div style={{
              width: 32, height: 32,
              background: 'linear-gradient(135deg, #5B8CFF, #8B5CF6)',
              borderRadius: 8,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontWeight: 900, fontSize: 11
            }}>CN</div>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#E6EDF3', letterSpacing: '-0.02em' }}>Code Nexus</span>
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
