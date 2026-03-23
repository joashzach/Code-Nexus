import React from 'react';
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
      <Toaster position="top-center" toastOptions={{
        style: { borderRadius: '12px', fontWeight: 600, background: '#0f172a', color: '#f1f5f9' }
      }} />

      {/* Root wrapper: light bg + dark text as defaults */}
      <div style={{ minHeight: '100vh', backgroundColor: 'inherit', color: 'inherit' }}>
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
          borderTop: '1px solid #e2e8f0',
          padding: '3rem 1rem',
          textAlign: 'center',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <div style={{
              width: 36, height: 36,
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              borderRadius: 10,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontWeight: 800, fontSize: 13
            }}>CN</div>
            <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'inherit' }}>Code Nexus</span>
          </div>
          <p style={{ color: '#64748b', fontSize: '0.875rem', maxWidth: 320, margin: '0 auto 1.5rem' }}>
            The world's first decentralized code marketplace. Built on the blockchain, owned by developers.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '2rem' }}>
            {['Docs', 'Twitter', 'Discord', 'GitHub'].map(l => (
              <a key={l} href="#" style={{ color: '#94a3b8', fontWeight: 700, fontSize: '0.75rem', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{l}</a>
            ))}
          </div>
          <p style={{ color: '#94a3b8', fontSize: '0.75rem' }}>© 2024 Code Nexus. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
