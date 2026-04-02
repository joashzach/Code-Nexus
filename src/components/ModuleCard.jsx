import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code, Download, Heart, ShoppingCart } from 'lucide-react';

// Refined category colors - more professional, less neon
const categoryColor = {
  Frontend:   { bg: 'rgba(91, 140, 255, 0.08)', text: '#5B8CFF', border: 'rgba(91, 140, 255, 0.2)' },
  Backend:    { bg: 'rgba(139, 92, 246, 0.08)', text: '#A78BFA', border: 'rgba(139, 92, 246, 0.2)' },
  Blockchain: { bg: 'rgba(16, 185, 129, 0.08)', text: '#34D399', border: 'rgba(16, 185, 129, 0.2)' },
  DevOps:     { bg: 'rgba(239, 68, 68, 0.08)',   text: '#F87171', border: 'rgba(239, 68, 68, 0.2)' },
  'UI/UX':    { bg: 'rgba(244, 114, 182, 0.08)', text: '#F472B6', border: 'rgba(244, 114, 182, 0.2)' },
  Other:      { bg: 'rgba(156, 163, 175, 0.08)', text: '#9CA3AF', border: 'rgba(156, 163, 175, 0.2)' },
};

const ModuleCard = ({ module }) => {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const accent = categoryColor[module.category] || categoryColor.Other;

  const handleBuyClick = (e) => {
    e.stopPropagation();
    alert(`Initiating purchase: ${module.title} — ${module.price} ETH`);
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
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
      {/* Header row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
        {/* Icon */}
        <div style={{
          width: 44, height: 44, borderRadius: 10,
          background: 'var(--color-bg-surface)',
          border: '1px solid var(--color-border-subtle)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: accent.text, flexShrink: 0,
        }}>
          <Code size={20} />
        </div>

        {/* Category pill */}
        <span style={{
          background: accent.bg,
          color: accent.text,
          fontWeight: 700, fontSize: '0.65rem',
          padding: '4px 10px', borderRadius: 6,
          letterSpacing: '0.05em', textTransform: 'uppercase',
          border: `1px solid ${accent.border}`,
        }}>
          {module.category}
        </span>
      </div>

      {/* Title */}
      <h3 className="line-clamp-1" style={{
        fontSize: '1.125rem', fontWeight: 700,
        color: 'var(--color-text-primary)', marginBottom: '0.5rem',
      }}>
        {module.title}
      </h3>

      {/* Description */}
      <p className="line-clamp-3" style={{
        fontSize: '0.875rem', color: 'var(--color-text-secondary)',
        lineHeight: 1.6, flexGrow: 1, marginBottom: '1.5rem',
      }}>
        {module.description}
      </p>

      {/* Stats row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: '1.25rem' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>
          <Download size={14} /> {module.stats.downloads}
        </span>
        <button
          onClick={e => { e.stopPropagation(); setLiked(l => !l); }}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            fontSize: '0.75rem', fontWeight: 600,
            color: liked ? '#EF4444' : 'var(--color-text-muted)',
            background: 'none', border: 'none', cursor: 'pointer',
            padding: 0, transition: 'color 0.2s',
          }}
        >
          <motion.div animate={{ scale: liked ? [1, 1.3, 1] : 1 }} transition={{ duration: 0.2 }}>
            <Heart size={14} fill={liked ? '#EF4444' : 'none'} />
          </motion.div>
          {module.stats.likes + (liked ? 1 : 0)}
        </button>
      </div>

      {/* Price + Buy */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderTop: '1px solid var(--color-border-subtle)', paddingTop: '1.25rem',
      }}>
        <div>
          <div style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-text-muted)', marginBottom: 2 }}>Price</div>
          <div style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>
            {module.price} <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>ETH</span>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleBuyClick}
          className="gradient-btn"
          style={{
            padding: '0.5rem 1rem',
            fontSize: '0.8rem',
            borderRadius: 8,
          }}
        >
          <ShoppingCart size={14} /> Buy
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ModuleCard;
