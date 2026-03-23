import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockModules } from '../data/mockModules';
import {
  Download, ShoppingCart, ArrowLeft, Share2,
  ShieldCheck, Clock, User, ExternalLink,
  Code2, Terminal, BrainCircuit, CheckCircle,
  Copy, ChevronRight, Heart, Star, Package
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Per-category accent colours
const accent = {
  Frontend:   { bg: '#ede9fe', text: '#7c3aed', border: '#c4b5fd', dot: '#8b5cf6' },
  Backend:    { bg: '#dbeafe', text: '#1d4ed8', border: '#93c5fd', dot: '#3b82f6' },
  Blockchain: { bg: '#fef3c7', text: '#b45309', border: '#fcd34d', dot: '#f59e0b' },
  DevOps:     { bg: '#d1fae5', text: '#065f46', border: '#6ee7b7', dot: '#10b981' },
  'UI/UX':    { bg: '#fce7f3', text: '#9d174d', border: '#f9a8d4', dot: '#ec4899' },
  Other:      { bg: '#f1f5f9', text: '#475569', border: '#cbd5e1', dot: '#94a3b8' },
};

const TABS = ['Overview', 'Installation', 'Updates'];

const ModuleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [module, setModule]     = useState(null);
  const [loading, setLoading]   = useState(true);
  const [activeTab, setActiveTab] = useState('Overview');
  const [copied, setCopied]     = useState(false);
  const [liked, setLiked]       = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setModule(mockModules.find(m => m.id === id) || null);
      setLoading(false);
    }, 400);
    return () => clearTimeout(t);
  }, [id]);

  const copyCode = () => {
    navigator.clipboard.writeText(module.codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const col = module ? (accent[module.category] || accent.Other) : accent.Other;

  /* ── Loading ── */
  if (loading) return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '70vh', gap: 16 }}>
      <div style={{ width: 40, height: 40, borderRadius: '50%', border: '3px solid rgba(139,92,246,0.2)', borderTopColor: '#8b5cf6', animation: 'spin 0.8s linear infinite' }} />
      <p style={{ color: '#94a3b8', fontWeight: 600, fontSize: '0.875rem' }}>Loading module…</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  /* ── Not found ── */
  if (!module) return (
    <div style={{ textAlign: 'center', padding: '6rem 2rem' }}>
      <p style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: 16 }}>Module not found</p>
      <button className="gradient-btn" onClick={() => navigate('/')}>← Back to Marketplace</button>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem 1.5rem 5rem', minHeight: '100vh' }}
    >
      {/* ── Back button ── */}
      <button
        onClick={() => navigate('/')}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.04em',
          color: '#7c3aed', background: 'rgba(139,92,246,0.08)',
          border: '1px solid rgba(139,92,246,0.15)',
          borderRadius: 10, padding: '6px 14px', cursor: 'pointer',
          marginBottom: '2rem',
          transition: 'background 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(139,92,246,0.14)'}
        onMouseLeave={e => e.currentTarget.style.background = 'rgba(139,92,246,0.08)'}
      >
        <ArrowLeft size={14} /> Marketplace
      </button>

      {/* ── Main grid ── */}
      <div data-detail-grid style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '2.5rem', alignItems: 'start' }}>

        {/* ══ LEFT COLUMN ══════════════════════════════════════ */}
        <div>

          {/* Module Header */}
          <div style={{ marginBottom: '2rem' }}>
            {/* Category + badges row */}
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8, marginBottom: '1rem' }}>
              <span style={{
                background: col.bg, color: col.text,
                border: `1px solid ${col.border}`,
                fontWeight: 700, fontSize: '0.72rem',
                padding: '4px 12px', borderRadius: 9999,
                letterSpacing: '0.07em', textTransform: 'uppercase'
              }}>
                {module.category}
              </span>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                background: '#f0fdf4', color: '#15803d',
                border: '1px solid #bbf7d0',
                fontWeight: 700, fontSize: '0.72rem',
                padding: '4px 12px', borderRadius: 9999,
              }}>
                <ShieldCheck size={12} /> Verified
              </span>
            </div>

            {/* Title */}
            <h1 style={{
              fontSize: '2rem', fontWeight: 900,
              letterSpacing: '-0.03em', lineHeight: 1.2,
              color: '#1e1b4b', marginBottom: '1rem',
            }}>
              {module.title}
            </h1>

            {/* Meta row */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', fontSize: '0.8rem', fontWeight: 600, color: '#94a3b8' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <User size={13} />
                <span style={{ color: col.dot, fontFamily: 'monospace' }}>{module.seller}</span>
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Clock size={13} /> Updated {module.lastUpdated}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Download size={13} /> {module.stats.downloads} downloads
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Heart size={13} fill={liked ? '#ef4444' : 'none'} color={liked ? '#ef4444' : '#94a3b8'} /> {module.stats.likes + (liked ? 1 : 0)} likes
              </span>
            </div>
          </div>

          {/* ── Tabs ── */}
          <div style={{ display: 'flex', borderBottom: '1px solid rgba(139,92,246,0.12)', marginBottom: '1.75rem', gap: 4 }}>
            {TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '0.6rem 1rem',
                  fontSize: '0.82rem', fontWeight: 700,
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: activeTab === tab ? '#7c3aed' : '#94a3b8',
                  borderBottom: activeTab === tab ? '2px solid #8b5cf6' : '2px solid transparent',
                  marginBottom: -1,
                  transition: 'color 0.2s',
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* ── Tab Content ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
            >
              {activeTab === 'Overview' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                  {/* Description */}
                  <div>
                    <p style={{ fontSize: '0.95rem', lineHeight: 1.8, color: '#475569' }}>
                      {module.fullDescription}
                    </p>
                  </div>

                  {/* Feature chips */}
                  <div>
                    <p style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '0.75rem' }}>
                      Highlights
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                      {['Optimized Performance', 'Security Verified', 'Well Documented', 'AI-Compatible'].map(f => (
                        <span key={f} style={{
                          display: 'inline-flex', alignItems: 'center', gap: 6,
                          background: col.bg, color: col.text,
                          border: `1px solid ${col.border}`,
                          fontSize: '0.78rem', fontWeight: 700,
                          padding: '6px 14px', borderRadius: 9999,
                        }}>
                          <CheckCircle size={12} /> {f}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Code preview */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Terminal size={15} style={{ color: '#94a3b8' }} />
                        <span style={{ fontSize: '0.78rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#475569' }}>
                          Code Snippet
                        </span>
                      </div>
                      <button
                        onClick={copyCode}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 6,
                          fontSize: '0.75rem', fontWeight: 700,
                          color: copied ? '#10b981' : '#94a3b8',
                          background: 'none', border: 'none', cursor: 'pointer',
                          transition: 'color 0.2s',
                        }}
                      >
                        {copied ? <CheckCircle size={14} /> : <Copy size={14} />}
                        {copied ? 'Copied!' : 'Copy'}
                      </button>
                    </div>

                    {/* Code block */}
                    <div style={{
                      background: '#0f0f1a',
                      borderRadius: 16,
                      padding: '0.75rem 1rem 1.25rem',
                      border: '1px solid rgba(255,255,255,0.06)',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
                      overflow: 'hidden',
                    }}>
                      {/* Window dots */}
                      <div style={{ display: 'flex', gap: 6, marginBottom: '0.875rem' }}>
                        {['#ff5f57','#ffbd2e','#28ca41'].map(c => (
                          <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
                        ))}
                      </div>
                      <pre style={{
                        margin: 0, fontSize: '0.82rem',
                        fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
                        color: '#e2e8f0', lineHeight: 1.7,
                        overflowX: 'auto',
                        whiteSpace: 'pre',
                      }}>
                        <code>{module.codeSnippet}</code>
                      </pre>
                    </div>
                  </div>

                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '4rem 2rem', gap: 12, opacity: 0.45 }}>
                  <Package size={44} color="#8b5cf6" />
                  <p style={{ fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#94a3b8' }}>
                    Coming soon on Mainnet
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ══ RIGHT SIDEBAR ════════════════════════════════════ */}
        <div style={{ position: 'sticky', top: 88 }}>
          <div className="card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            {/* Price block */}
            <div style={{ paddingBottom: '1.25rem', borderBottom: '1px solid rgba(139,92,246,0.10)' }}>
              <p style={{ fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.10em', textTransform: 'uppercase', color: '#94a3b8', marginBottom: 8 }}>
                Asking price
              </p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{ fontSize: '2.25rem', fontWeight: 900, color: '#1e1b4b', lineHeight: 1 }}>
                  {module.price}
                </span>
                <span style={{ fontSize: '1rem', fontWeight: 800, color: '#7c3aed' }}>ETH</span>
              </div>
              <p style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: 4 }}>
                ≈ ${(parseFloat(module.price) * 3500).toLocaleString()} USD
              </p>
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button
                className="gradient-btn"
                onClick={() => alert(`Buy ${module.title} — TODO: call smart contract`)}
                style={{ width: '100%', justifyContent: 'center', padding: '0.85rem', fontSize: '0.9rem', borderRadius: 14 }}
              >
                <ShoppingCart size={17} /> Buy Module
              </button>

              <button
                onClick={() => alert('Download — TODO: fetch from IPFS')}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  padding: '0.75rem', fontSize: '0.875rem', fontWeight: 700,
                  background: 'rgba(139,92,246,0.07)', color: '#7c3aed',
                  border: '1px solid rgba(139,92,246,0.20)',
                  borderRadius: 14, cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(139,92,246,0.13)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(139,92,246,0.07)'}
              >
                <Download size={16} /> Download
              </button>
            </div>

            {/* Secondary actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <button
                onClick={() => alert('Confirm — TODO: release escrow via smart contract')}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '0.7rem 0.875rem', borderRadius: 12,
                  background: '#f0fdf4', color: '#15803d',
                  border: '1px solid #bbf7d0',
                  fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#dcfce7'}
                onMouseLeave={e => e.currentTarget.style.background = '#f0fdf4'}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                  <CheckCircle size={15} /> Confirm Working
                </span>
                <ChevronRight size={14} />
              </button>

              <button
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '0.7rem 0.875rem', borderRadius: 12,
                  background: 'rgba(139,92,246,0.06)', color: '#7c3aed',
                  border: '1px solid rgba(139,92,246,0.15)',
                  fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(139,92,246,0.11)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(139,92,246,0.06)'}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                  <BrainCircuit size={15} /> Explain with AI
                </span>
                <span style={{ fontSize: '0.65rem', fontWeight: 800, background: col.bg, color: col.text, padding: '2px 8px', borderRadius: 9999 }}>BETA</span>
              </button>

              <button
                onClick={() => setLiked(v => !v)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '0.7rem 0.875rem', borderRadius: 12,
                  background: liked ? '#fef2f2' : 'transparent', color: liked ? '#ef4444' : '#94a3b8',
                  border: `1px solid ${liked ? '#fecaca' : 'rgba(139,92,246,0.12)'}`,
                  fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                  <Heart size={15} fill={liked ? '#ef4444' : 'none'} />
                  {liked ? 'Liked!' : 'Add to Wishlist'}
                </span>
                <span style={{ fontSize: '0.78rem' }}>{module.stats.likes + (liked ? 1 : 0)}</span>
              </button>
            </div>

            {/* Stats row */}
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr',
              gap: 10, paddingTop: '1.25rem',
              borderTop: '1px solid rgba(139,92,246,0.10)',
            }}>
              {[
                { label: 'Downloads', value: module.stats.downloads },
                { label: 'Likes',     value: module.stats.likes },
              ].map(s => (
                <div key={s.label} style={{
                  background: 'rgba(139,92,246,0.04)', borderRadius: 12,
                  padding: '0.75rem', textAlign: 'center',
                  border: '1px solid rgba(139,92,246,0.08)'
                }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#1e1b4b', lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.07em', marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Share / link */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
              {[{ icon: <Share2 size={16} />, label: 'Share' }, { icon: <ExternalLink size={16} />, label: 'Contract' }].map(a => (
                <button key={a.label} style={{
                  display: 'flex', alignItems: 'center', gap: 5,
                  fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8',
                  background: 'none', border: 'none', cursor: 'pointer',
                  transition: 'color 0.2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.color = '#7c3aed'}
                  onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}
                >
                  {a.icon} {a.label}
                </button>
              ))}
            </div>
          </div>

          {/* Seller trust badge */}
          <div style={{
            marginTop: 14, padding: '0.875rem 1.25rem',
            background: 'rgba(139,92,246,0.05)',
            border: '1px solid rgba(139,92,246,0.12)',
            borderRadius: 14,
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <ShieldCheck size={20} color="#10b981" />
            <div>
              <p style={{ fontSize: '0.78rem', fontWeight: 800, color: '#1e1b4b', marginBottom: 2 }}>Escrow Protection</p>
              <p style={{ fontSize: '0.72rem', color: '#94a3b8', lineHeight: 1.4 }}>Payment held until you confirm delivery.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          [data-detail-grid] { grid-template-columns: 1fr !important; }
        }
        html.dark h1 { color: #f1f5f9 !important; }
        html.dark h3 { color: #e2e8f0; }
        html.dark p  { color: #94a3b8; }
      `}</style>
    </motion.div>
  );
};

export default ModuleDetail;
