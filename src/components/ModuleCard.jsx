import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code, Download, Heart, ShoppingCart, ArrowUpRight } from 'lucide-react';

// Category accent colors  
const categoryColor = {
  Frontend:   { bg: '#ede9fe', text: '#7c3aed', dot: '#8b5cf6' },
  Backend:    { bg: '#dbeafe', text: '#1d4ed8', dot: '#3b82f6' },
  Blockchain: { bg: '#fef3c7', text: '#b45309', dot: '#f59e0b' },
  DevOps:     { bg: '#d1fae5', text: '#065f46', dot: '#10b981' },
  'UI/UX':    { bg: '#fce7f3', text: '#9d174d', dot: '#ec4899' },
  Other:      { bg: '#f1f5f9', text: '#475569', dot: '#94a3b8' },
};

const ModuleCard = ({ module }) => {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const accent = categoryColor[module.category] || categoryColor.Other;

  const handleBuyClick = (e) => {
    e.stopPropagation();
    // TODO: call smart contract (ethers.js)
    // TODO: send ETH payment
    alert(`Initiating purchase: ${module.title} — ${module.price} ETH`);
  };

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.015 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 340, damping: 24 }}
      onClick={() => navigate(`/module/${module.id}`)}
      className="card"
      style={{
        padding: '1.5rem',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Colored top accent line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 3,
        background: `linear-gradient(90deg, ${accent.dot}, transparent)`,
        borderRadius: '1.25rem 1.25rem 0 0',
      }} />

      {/* Header row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        {/* Icon */}
        <div style={{
          width: 48, height: 48, borderRadius: 14,
          background: accent.bg,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: accent.dot, flexShrink: 0,
          boxShadow: `0 4px 12px ${accent.dot}22`,
          transition: 'transform 0.3s ease',
        }}>
          <Code size={22} />
        </div>

        {/* Category pill */}
        <span style={{
          background: accent.bg,
          color: accent.text,
          fontWeight: 700, fontSize: '0.7rem',
          padding: '4px 10px', borderRadius: 9999,
          letterSpacing: '0.06em', textTransform: 'uppercase',
          border: `1px solid ${accent.dot}33`,
        }}>
          {module.category}
        </span>
      </div>

      {/* Title */}
      <h3 className="line-clamp-1" style={{
        fontSize: '1.05rem', fontWeight: 800,
        color: '#1e1b4b', marginBottom: '0.5rem',
        transition: 'color 0.2s',
      }}>
        {module.title}
      </h3>

      {/* Description */}
      <p className="line-clamp-3" style={{
        fontSize: '0.85rem', color: '#6b7280',
        lineHeight: 1.65, flexGrow: 1, marginBottom: '1.25rem',
      }}>
        {module.description}
      </p>

      {/* Stats row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: '1rem' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.78rem', fontWeight: 600, color: '#94a3b8' }}>
          <Download size={13} /> {module.stats.downloads}
        </span>
        <button
          onClick={e => { e.stopPropagation(); setLiked(l => !l); }}
          style={{
            display: 'flex', alignItems: 'center', gap: 5,
            fontSize: '0.78rem', fontWeight: 600,
            color: liked ? '#ef4444' : '#94a3b8',
            background: 'none', border: 'none', cursor: 'pointer',
            padding: 0, transition: 'color 0.2s',
          }}
        >
          <motion.div animate={{ scale: liked ? [1, 1.4, 1] : 1 }} transition={{ type: 'spring', stiffness: 400 }}>
            <Heart size={13} fill={liked ? '#ef4444' : 'none'} />
          </motion.div>
          {module.stats.likes + (liked ? 1 : 0)}
        </button>
      </div>

      {/* Price + Buy */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderTop: '1px solid rgba(139,92,246,0.08)', paddingTop: '1rem',
      }}>
        <div>
          <div style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#94a3b8', marginBottom: 2 }}>Price</div>
          <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#6d28d9' }}>
            {module.price} <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>ETH</span>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.94 }}
          onClick={handleBuyClick}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: '#1e1b4b',
            color: '#fff', fontWeight: 700, fontSize: '0.82rem',
            padding: '0.55rem 1.1rem', borderRadius: 12, border: 'none',
            cursor: 'pointer', boxShadow: '0 4px 14px rgba(30,27,75,0.24)',
            transition: 'background 0.2s',
          }}
        >
          <ShoppingCart size={15} /> Buy
        </motion.button>
      </div>

      {/* Hover overlay glow */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: '1.25rem',
        background: `radial-gradient(circle at 70% 110%, ${accent.dot}0d, transparent 60%)`,
        pointerEvents: 'none',
        transition: 'opacity 0.3s',
      }} />
    </motion.div>
  );
};

export default ModuleCard;
