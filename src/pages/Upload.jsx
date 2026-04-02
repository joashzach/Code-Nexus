import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, X, CheckCircle, AlertCircle, FileCode, Check } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const Upload = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: 'Frontend',
    file: null
  });

  const [errors, setErrors]       = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const categories = ['Frontend', 'Backend', 'Blockchain', 'UI/UX', 'DevOps', 'Other'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleDragOver  = (e) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) { setFormData(prev => ({ ...prev, file })); setErrors(prev => ({ ...prev, file: '' })); }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) { setFormData(prev => ({ ...prev, file })); setErrors(prev => ({ ...prev, file: '' })); }
  };

  const validate = () => {
    const e = {};
    if (!formData.title.trim()) e.title = 'Title is required';
    if (!formData.description.trim()) e.description = 'Description is required';
    if (!formData.price || isNaN(formData.price) || parseFloat(formData.price) <= 0)
      e.price = 'Enter a valid price in ETH';
    if (!formData.file) e.file = 'Please upload a code module file';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 5000);
      setFormData({ title: '', description: '', price: '', category: 'Frontend', file: null });
    }, 2000);
  };

  const labelStyle = {
    display: 'block',
    fontSize: '0.7rem',
    fontWeight: 700,
    color: 'var(--color-text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    marginBottom: '0.5rem',
  };

  const errorStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    color: '#F87171',
    fontSize: '0.75rem',
    fontWeight: 600,
    marginTop: '0.35rem',
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '4.5rem 1.5rem 4rem',
    }}>
      <div style={{ width: '100%', maxWidth: 660 }}>

        {/* ── Page Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          style={{ textAlign: 'center', marginBottom: '2.25rem' }}
        >
          <span style={{
            display: 'inline-block',
            background: 'var(--color-bg-surface)',
            color: 'var(--color-brand-primary)',
            fontWeight: 700,
            padding: '4px 14px',
            borderRadius: 99,
            fontSize: '0.67rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            border: '1px solid var(--color-border-subtle)',
            marginBottom: '1rem',
          }}>
            Partner Program
          </span>
          <h1 style={{
            fontSize: 'clamp(1.6rem, 4vw, 2.5rem)',
            fontWeight: 900,
            letterSpacing: '-0.04em',
            color: 'var(--color-text-primary)',
            lineHeight: 1.15,
            marginBottom: '0.65rem',
          }}>
            List Your Code <span style={{ color: 'var(--color-brand-primary)' }}>Module</span>
          </h1>
          <p style={{
            color: 'var(--color-text-secondary)',
            fontSize: '0.9rem',
            lineHeight: 1.6,
            maxWidth: 380,
            margin: '0 auto',
          }}>
            Turn your code into a digital asset. Set your price and earn ETH for every purchase.
          </p>
        </motion.div>

        {/* ── Form Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.45 }}
          style={{
            background: 'var(--color-bg-card)',
            border: '1px solid var(--color-border-subtle)',
            borderRadius: 16,
            boxShadow: 'var(--shadow-soft)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Success banner */}
          <AnimatePresence>
            {isSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                style={{
                  position: 'absolute', inset: '0 0 auto 0',
                  background: '#5B8CFF', color: '#fff',
                  padding: '0.85rem 1.5rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                  fontWeight: 700, fontSize: '0.875rem', zIndex: 10,
                }}
              >
                <CheckCircle size={18} /> Module submitted to the blockchain!
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

              {/* ── File Drop Zone ── */}
              <div>
                <label style={labelStyle}>Module File</label>
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById('file-upload').click()}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: `1.5px dashed ${errors.file ? '#F87171' : isDragging ? 'var(--color-brand-primary)' : 'var(--color-border-subtle)'}`,
                    borderRadius: 12,
                    padding: '2.25rem 1.5rem',
                    background: isDragging ? 'rgba(91,140,255,0.05)' : errors.file ? 'rgba(248,113,113,0.04)' : 'var(--color-bg-surface)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    position: 'relative',
                  }}
                >
                  <input
                    id="file-upload"
                    type="file"
                    style={{ display: 'none' }}
                    onChange={handleFileSelect}
                    accept=".zip,.rar,.tar,.gz,.js,.ts,.py,.go"
                  />

                  {!formData.file ? (
                    <>
                      <div style={{
                        width: 48, height: 48, borderRadius: 10,
                        background: 'var(--color-bg-card)',
                        border: '1px solid var(--color-border-subtle)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'var(--color-text-muted)', marginBottom: '0.85rem',
                      }}>
                        <UploadCloud size={24} />
                      </div>
                      <p style={{ fontWeight: 700, color: 'var(--color-text-primary)', fontSize: '0.925rem', marginBottom: '0.25rem' }}>
                        Drag & drop your module
                      </p>
                      <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>
                        .zip, .js, .ts, .py · Max 50 MB
                      </p>
                    </>
                  ) : (
                    <>
                      <div style={{
                        width: 48, height: 48, borderRadius: 10,
                        background: 'rgba(91,140,255,0.08)',
                        border: '1px solid rgba(91,140,255,0.2)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'var(--color-brand-primary)', marginBottom: '0.85rem',
                      }}>
                        <FileCode size={24} />
                      </div>
                      <p style={{ fontWeight: 700, color: 'var(--color-text-primary)', fontSize: '0.925rem', marginBottom: '0.25rem', textAlign: 'center' }}>
                        {formData.file.name}
                      </p>
                      <p style={{ color: 'var(--color-text-muted)', fontSize: '0.77rem', fontFamily: 'monospace', background: 'var(--color-bg-card)', padding: '2px 10px', borderRadius: 6, marginBottom: '0.75rem' }}>
                        {(formData.file.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setFormData(prev => ({ ...prev, file: null })); }}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 5,
                          color: '#F87171', fontSize: '0.75rem', fontWeight: 700,
                          background: 'none', border: 'none', cursor: 'pointer',
                          textTransform: 'uppercase', letterSpacing: '0.05em',
                        }}
                      >
                        <X size={13} /> Remove
                      </button>

                      {/* Checkmark badge */}
                      <div style={{
                        position: 'absolute', top: 12, right: 12,
                        color: 'var(--color-brand-primary)',
                        background: 'var(--color-bg-card)',
                        border: '1px solid var(--color-border-subtle)',
                        borderRadius: '50%', padding: 5,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <Check size={14} />
                      </div>
                    </>
                  )}
                </div>
                {errors.file && (
                  <p style={errorStyle}><AlertCircle size={13} /> {errors.file}</p>
                )}
              </div>

              {/* ── Title + Category ── */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={labelStyle}>Title</label>
                  <input
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    style={{ width: '100%', borderColor: errors.title ? '#F87171' : undefined }}
                    placeholder="e.g. Auth Pro Module"
                  />
                  {errors.title && <p style={errorStyle}><AlertCircle size={13} /> {errors.title}</p>}
                </div>
                <div>
                  <label style={labelStyle}>Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    style={{ width: '100%', cursor: 'pointer', appearance: 'none' }}
                  >
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
              </div>

              {/* ── Description ── */}
              <div>
                <label style={labelStyle}>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  style={{ width: '100%', resize: 'vertical', borderColor: errors.description ? '#F87171' : undefined }}
                  placeholder="What does your module do? How does it help developers?"
                />
                {errors.description && <p style={errorStyle}><AlertCircle size={13} /> {errors.description}</p>}
              </div>

              {/* ── Price ── */}
              <div>
                <label style={labelStyle}>Price (ETH)</label>
                <div style={{ position: 'relative' }}>
                  <span style={{
                    position: 'absolute', left: 14, top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--color-text-muted)',
                    fontWeight: 700, fontSize: '1rem',
                    pointerEvents: 'none',
                  }}>Ξ</span>
                  <input
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    style={{ width: '100%', paddingLeft: '2.2rem', borderColor: errors.price ? '#F87171' : undefined }}
                    placeholder="0.00"
                    type="number"
                    step="0.001"
                    min="0"
                  />
                </div>
                {errors.price && <p style={errorStyle}><AlertCircle size={13} /> {errors.price}</p>}
              </div>

              {/* ── Divider ── */}
              <div style={{ height: 1, background: 'var(--color-border-subtle)', margin: '0.25rem 0' }} />

              {/* ── Submit ── */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="gradient-btn"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  padding: '0.85rem',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  borderRadius: 10,
                }}
              >
                <AnimatePresence mode="wait">
                  {isSubmitting ? (
                    <motion.span key="spin" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.25)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.7s linear infinite' }} />
                      Submitting…
                    </motion.span>
                  ) : (
                    <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <UploadCloud size={18} /> Complete Listing & Upload
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

            </div>
          </form>
        </motion.div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default Upload;
