import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockModules } from '../data/mockModules';
import {
  Download, ShoppingCart, ArrowLeft, Share2,
  ShieldCheck, Clock, User, ExternalLink,
  Terminal, CheckCircle,
  Copy, ChevronRight, Heart, Package
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Refined category accents - more professional
const accent = {
  Frontend: { bg: 'rgba(91, 140, 255, 0.1)', text: '#5B8CFF', border: '#5B8CFF33' },
  Backend: { bg: 'rgba(139, 92, 246, 0.1)', text: '#8B5CF6', border: '#8B5CF633' },
  Blockchain: { bg: 'rgba(16, 185, 129, 0.1)', text: '#10B981', border: '#10B98133' },
  DevOps: { bg: 'rgba(239, 68, 68, 0.1)', text: '#EF4444', border: '#EF444433' },
  'UI/UX': { bg: 'rgba(244, 114, 182, 0.1)', text: '#F472B6', border: '#F472B633' },
  Other: { bg: 'rgba(154, 164, 175, 0.1)', text: '#6B7280', border: '#1F2933' },
};

const TABS = ['Overview', 'Installation', 'Updates'];

const ModuleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [module, setModule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Overview');
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);

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
      <div style={{ width: 32, height: 32, borderRadius: '50%', border: '2px solid #1F2933', borderTopColor: '#5B8CFF', animation: 'spin 0.6s linear infinite' }} />
      <p style={{ color: '#9AA4AF', fontWeight: 600, fontSize: '0.875rem' }}>Loading module details…</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  /* ── Not found ── */
  if (!module) return (
    <div style={{ textAlign: 'center', padding: '10rem 2rem' }}>
      <p style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: 24, color: '#E6EDF3' }}>Module not found</p>
      <button className="gradient-btn" onClick={() => navigate('/')}>← Back to Marketplace</button>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{ maxWidth: 1200, margin: '0 auto', padding: '3rem 1.5rem 6rem', minHeight: '100vh' }}
    >
      {/* ── Back button ── */}
      <button
        onClick={() => navigate('/')}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          fontSize: '0.8rem', fontWeight: 700,
          color: '#9AA4AF', background: '#11161C',
          border: '1px solid #1F2933',
          borderRadius: 8, padding: '8px 16px', cursor: 'pointer',
          marginBottom: '2.5rem',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={e => { e.currentTarget.style.color = '#E6EDF3'; e.currentTarget.style.borderColor = '#2A3441'; }}
        onMouseLeave={e => { e.currentTarget.style.color = '#9AA4AF'; e.currentTarget.style.borderColor = '#1F2933'; }}
      >
        <ArrowLeft size={16} /> Marketplace
      </button>

      {/* ── Main grid ── */}
      <div data-detail-grid style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '3rem', alignItems: 'start' }}>

        {/* ══ LEFT COLUMN ══════════════════════════════════════ */}
        <div>

          {/* Module Header */}
          <div style={{ marginBottom: '2.5rem' }}>
            {/* Category + badges row */}
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 10, marginBottom: '1.25rem' }}>
              <span style={{
                background: col.bg, color: col.text,
                border: `1px solid ${col.border}`,
                fontWeight: 700, fontSize: '0.7rem',
                padding: '4px 12px', borderRadius: 6,
                letterSpacing: '0.05em', textTransform: 'uppercase'
              }}>
                {module.category}
              </span>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                background: 'rgba(16, 185, 129, 0.1)', color: '#10B981',
                border: '1px solid rgba(16, 185, 129, 0.2)',
                fontWeight: 700, fontSize: '0.7rem',
                padding: '4px 12px', borderRadius: 6,
              }}>
                <ShieldCheck size={13} /> Verified Module
              </span>
            </div>

            {/* Title */}
            <h1 style={{
              fontSize: '2.5rem', fontWeight: 800,
              letterSpacing: '-0.04em', lineHeight: 1.1,
              color: '#E6EDF3', marginBottom: '1.25rem',
            }}>
              {module.title}
            </h1>

            {/* Meta row */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', fontSize: '0.85rem', fontWeight: 600, color: '#6B7280' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <User size={15} />
                <span style={{ color: '#E6EDF3', fontFamily: 'monospace' }}>{module.seller}</span>
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Clock size={15} /> Updated {module.lastUpdated}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Download size={15} /> {module.stats.downloads} downloads
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Heart size={15} fill={liked ? '#EF4444' : 'none'} color={liked ? '#EF4444' : '#6B7280'} /> {module.stats.likes + (liked ? 1 : 0)} matches
              </span>
            </div>
          </div>

          {/* ── Tabs ── */}
          <div style={{ display: 'flex', borderBottom: '1px solid #1F2933', marginBottom: '2rem', gap: 8 }}>
            {TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '1rem 1.25rem',
                  fontSize: '0.875rem', fontWeight: 700,
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: activeTab === tab ? '#5B8CFF' : '#6B7280',
                  borderBottom: activeTab === tab ? '2px solid #5B8CFF' : '2px solid transparent',
                  marginBottom: -1,
                  transition: 'all 0.2s ease',
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
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'Overview' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>

                  {/* Description */}
                  <div>
                    <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: '#9AA4AF' }}>
                      {module.fullDescription}
                    </p>
                  </div>

                  {/* Feature chips */}
                  <div>
                    <h4 style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#6B7280', marginBottom: '1rem' }}>
                      Key Features
                    </h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                      {['Optimized Code', 'Mainnet Ready', 'Clean Architecture', 'Developer API'].map(f => (
                        <span key={f} style={{
                          display: 'inline-flex', alignItems: 'center', gap: 8,
                          background: '#11161C', color: '#E6EDF3',
                          border: '1px solid #1F2933',
                          fontSize: '0.8rem', fontWeight: 600,
                          padding: '8px 16px', borderRadius: 8,
                        }}>
                          <CheckCircle size={14} style={{ color: '#5B8CFF' }} /> {f}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Code preview */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <Terminal size={16} style={{ color: '#5B8CFF' }} />
                        <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9AA4AF' }}>
                          Module Interface
                        </span>
                      </div>
                      <button
                        onClick={copyCode}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 8,
                          fontSize: '0.75rem', fontWeight: 700,
                          color: copied ? '#10B981' : '#6B7280',
                          background: 'none', border: 'none', cursor: 'pointer',
                          transition: 'color 0.2s',
                        }}
                      >
                        {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
                        {copied ? 'Copied!' : 'Copy Snippet'}
                      </button>
                    </div>

                    {/* Code block */}
                    <div style={{
                      background: '#040608',
                      borderRadius: 12,
                      padding: '1.5rem',
                      border: '1px solid #1F2933',
                      boxShadow: '0 20px 50px rgba(0,0,0,0.4)',
                      overflow: 'hidden',
                    }}>
                      <pre style={{
                        margin: 0, fontSize: '0.875rem',
                        fontFamily: "'JetBrains Mono', monospace",
                        color: '#9AA4AF', lineHeight: 1.6,
                        overflowX: 'auto',
                      }}>
                        <code>{module.codeSnippet}</code>
                      </pre>
                    </div>
                  </div>

                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '6rem 2rem', gap: 16 }}>
                  <Package size={48} style={{ color: '#1F2933' }} />
                  <p style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#6B7280' }}>
                    Data Coming Soon
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ══ RIGHT SIDEBAR ════════════════════════════════════ */}
        <div style={{ position: 'sticky', top: 96 }}>
          <div className="card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>

            {/* Price block */}
            <div style={{ paddingBottom: '1.5rem', borderBottom: '1px solid #1F2933' }}>
              <p style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6B7280', marginBottom: 12 }}>
                Current Price
              </p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{ fontSize: '2.5rem', fontWeight: 800, color: '#E6EDF3', lineHeight: 1 }}>
                  {module.price}
                </span>
                <span style={{ fontSize: '1.125rem', fontWeight: 700, color: '#5B8CFF' }}>ETH</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#6B7280', marginTop: 8 }}>
                ≈ ${(parseFloat(module.price) * 3500).toLocaleString()} USD
              </p>
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <button
                className="gradient-btn"
                onClick={() => alert(`Buy ${module.title}`)}
                style={{ width: '100%', justifyContent: 'center', padding: '1rem', fontSize: '1rem', borderRadius: 10 }}
              >
                <ShoppingCart size={18} /> Buy with ETH
              </button>

              <button
                onClick={() => alert('Download')}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                  padding: '1rem', fontSize: '0.925rem', fontWeight: 700,
                  background: '#11161C', color: '#E6EDF3',
                  border: '1px solid #1F2933',
                  borderRadius: 10, cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#1F2933'; e.currentTarget.style.borderColor = '#2A3441'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#11161C'; e.currentTarget.style.borderColor = '#1F2933'; }}
              >
                <Download size={18} /> Documentation
              </button>
            </div>

            {/* Secondary actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button
                onClick={() => alert('Confirm')}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '1rem', borderRadius: 10,
                  background: 'rgba(16, 185, 129, 0.05)', color: '#10B981',
                  border: '1px solid rgba(16, 185, 129, 0.1)',
                  fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer',
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <CheckCircle size={16} /> Audit Status
                </span>
                <ChevronRight size={16} />
              </button>

              <button
                onClick={() => setLiked(v => !v)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '1rem', borderRadius: 10,
                  background: liked ? 'rgba(239, 68, 68, 0.05)' : 'transparent',
                  color: liked ? '#EF4444' : '#6B7280',
                  border: `1px solid ${liked ? 'rgba(239, 68, 68, 0.2)' : '#1F2933'}`,
                  fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Heart size={16} fill={liked ? '#EF4444' : 'none'} />
                  {liked ? 'Wishlisted' : 'Add to Wishlist'}
                </span>
                <span style={{ fontSize: '0.8rem' }}>{module.stats.likes + (liked ? 1 : 0)}</span>
              </button>
            </div>

            {/* Share / link */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 24, paddingTop: '1rem' }}>
              {[{ icon: <Share2 size={16} />, label: 'Share' }, { icon: <ExternalLink size={16} />, label: 'Contract' }].map(a => (
                <button key={a.label} style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  fontSize: '0.8rem', fontWeight: 700, color: '#6B7280',
                  background: 'none', border: 'none', cursor: 'pointer',
                  transition: 'color 0.2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.color = '#E6EDF3'}
                  onMouseLeave={e => e.currentTarget.style.color = '#6B7280'}
                >
                  {a.icon} {a.label}
                </button>
              ))}
            </div>
          </div>

          {/* Seller trust badge */}
          <div style={{
            marginTop: 16, padding: '1rem 1.5rem',
            background: 'rgba(91, 140, 255, 0.05)',
            border: '1px solid rgba(91, 140, 255, 0.1)',
            borderRadius: 12,
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <ShieldCheck size={24} style={{ color: '#5B8CFF' }} />
            <div>
              <p style={{ fontSize: '0.85rem', fontWeight: 800, color: '#E6EDF3', marginBottom: 2 }}>Secure Purchase</p>
              <p style={{ fontSize: '0.75rem', color: '#9AA4AF', lineHeight: 1.4 }}>Verification complete. Listing is authentic.</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 992px) {
          [data-detail-grid] { grid-template-columns: 1fr !important; gap: 4rem; }
          [data-detail-grid] > div:last-child { position: static !important; }
        }
      `}</style>
    </motion.div>
  );
};

export default ModuleDetail;
