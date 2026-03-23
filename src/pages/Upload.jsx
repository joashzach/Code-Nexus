import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, X, CheckCircle, AlertCircle, FileCode, Check } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge tailwind classes
 */
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Upload Page component for sellers.
 * Features a beautiful centered form with drag & drop simulation.
 */
const Upload = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: 'Frontend',
    file: null
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // CATEGORIES List
  const categories = ['Frontend', 'Backend', 'Blockchain', 'UI/UX', 'DevOps', 'Other'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, file: file }));
      setErrors(prev => ({ ...prev, file: '' }));
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, file: file }));
      setErrors(prev => ({ ...prev, file: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.price || isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Please enter a valid price in ETH';
    }
    if (!formData.file) newErrors.file = 'Please upload a code module file (ZIP/JS)';
    return newErrors;
  };

  /**
   * ON SUBMIT:
   * // TODO: connect to backend / IPFS / smart contract
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      console.log('Submitting module to IPFS...', formData);
      setIsSubmitting(false);
      setIsSuccess(true);
      // Reset after success
      setTimeout(() => setIsSuccess(false), 5000);
      setFormData({
        title: '',
        description: '',
        price: '',
        category: 'Frontend',
        file: null
      });
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12 min-h-screen">
      
      <div className="text-center space-y-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 font-bold px-4 py-1.5 rounded-full text-xs uppercase tracking-widest shadow-sm border border-purple-200 dark:border-purple-800">
            Sell your code
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mt-6 mb-4">
            Upload Code <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">Module</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto mt-2">
            Turn your code into a valuable asset. Upload, set your price, and earn ETH for every purchase.
          </p>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card p-8 md:p-12 relative overflow-hidden"
      >
        <AnimatePresence>
          {isSuccess && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute inset-x-0 top-0 bg-green-500 text-white py-4 px-6 flex items-center justify-center gap-3 z-10 font-bold shadow-lg"
            >
              <CheckCircle size={20} /> Module uploaded successfully and submitted to the blockchain!
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* File Upload Area */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-tight">Code Module File</label>
            <div 
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={cn(
                "relative group flex flex-col items-center justify-center border-2 border-dashed rounded-3xl p-10 transition-all duration-300 cursor-pointer overflow-hidden",
                isDragging 
                  ? "border-purple-500 bg-purple-50/30 dark:bg-purple-900/10 scale-[0.99]" 
                  : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 hover:bg-slate-100/50 dark:hover:bg-slate-800/30",
                errors.file && "border-red-500/50 bg-red-50/30 dark:bg-red-900/10"
              )}
              onClick={() => document.getElementById('file-upload').click()}
            >
              <input 
                id="file-upload" 
                type="file" 
                className="hidden" 
                onChange={handleFileSelect}
                accept=".zip,.rar,.tar,.gz,.js,.ts,.py,.go"
              />
              
              {!formData.file ? (
                <>
                  <div className="w-20 h-20 bg-white/80 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-300 dark:text-slate-600 mb-4 shadow-xl shadow-purple-500/5 group-hover:scale-110 transition-transform">
                    <UploadCloud size={40} />
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 font-bold text-lg mb-1">Drag & drop your module</p>
                  <p className="text-slate-400 dark:text-slate-500 text-sm">Supported files: .zip, .js, .ts (Max 50MB)</p>
                </>
              ) : (
                <div className="flex flex-col items-center text-center animate-in zoom-in-95 duration-300">
                  <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-green-500/10">
                    <FileCode size={40} />
                  </div>
                  <p className="text-slate-700 dark:text-slate-200 font-bold text-lg mb-1">{formData.file.name}</p>
                  <p className="text-slate-400 dark:text-slate-500 text-sm font-mono uppercase tracking-widest bg-slate-200/50 dark:bg-white/5 px-3 py-1 rounded-lg mt-2">
                    {(formData.file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                  <button 
                    type="button" 
                    onClick={(e) => { e.stopPropagation(); setFormData(prev => ({ ...prev, file: null })); }}
                    className="mt-6 flex items-center gap-1.5 text-red-500 font-bold text-xs uppercase hover:bg-red-500/10 dark:hover:bg-red-500/20 px-4 py-2 rounded-full transition-colors"
                  >
                    <X size={14} /> Remove File
                  </button>
                </div>
              )}

              {/* Success Decoration */}
              {formData.file && (
                <div className="absolute top-4 right-4 text-green-500 bg-white dark:bg-slate-800 rounded-full p-1.5 shadow-lg shadow-green-500/20 border border-green-500/20">
                  <Check size={20} />
                </div>
              )}
            </div>
            {errors.file && (
              <p className="text-red-500 text-xs font-bold flex items-center gap-1 pl-1">
                <AlertCircle size={14} /> {errors.file}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-tight">Module Title</label>
              <input 
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className={cn(
                  "w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl py-4 px-6 focus:outline-none focus:ring-4 focus:ring-purple-500/10 focus:border-purple-600 transition-all dark:text-white placeholder:text-slate-400",
                  errors.title && "border-red-500 focus:border-red-500 focus:ring-red-500/10 shadow-lg shadow-red-500/5"
                )}
                placeholder="e.g. Authentication Pro Module"
              />
              {errors.title && (
                <p className="text-red-500 text-xs font-bold flex items-center gap-1 pl-1">
                  <AlertCircle size={14} /> {errors.title}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-tight">Category</label>
              <select 
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl py-4 px-6 focus:outline-none focus:ring-4 focus:ring-purple-500/10 focus:border-purple-600 transition-all dark:text-white cursor-pointer appearance-none shadow-sm hover:shadow-md"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-tight">Brief Description</label>
            <textarea 
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className={cn(
                "w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl py-4 px-6 focus:outline-none focus:ring-4 focus:ring-purple-500/10 focus:border-purple-600 transition-all dark:text-white placeholder:text-slate-400 resize-none",
                errors.description && "border-red-500 focus:border-red-500 focus:ring-red-500/10 shadow-lg shadow-red-500/5"
              )}
              placeholder="Explain what your module does and how it helps other developers..."
            />
            {errors.description && (
              <p className="text-red-500 text-xs font-bold flex items-center gap-1 pl-1">
                <AlertCircle size={14} /> {errors.description}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-tight">Listing Price (ETH)</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none font-bold text-slate-400 group-focus-within:text-purple-500 transition-colors">
                Ξ
              </div>
              <input 
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className={cn(
                  "w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl py-4 pl-12 pr-6 focus:outline-none focus:ring-4 focus:ring-purple-500/10 focus:border-purple-600 transition-all dark:text-white placeholder:text-slate-400 font-bold",
                  errors.price && "border-red-500 focus:border-red-500 focus:ring-red-500/10 shadow-lg shadow-red-500/5"
                )}
                placeholder="0.00"
              />
            </div>
            {errors.price && (
              <p className="text-red-500 text-xs font-bold flex items-center gap-1 pl-1">
                <AlertCircle size={14} /> {errors.price}
              </p>
            )}
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full gradient-btn py-5 rounded-2xl text-lg font-bold flex items-center justify-center gap-2 shadow-2xl hover:shadow-purple-500/40 relative group overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {isSubmitting ? (
                <motion.div 
                  key="submitting"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Uploading to dApp...
                </motion.div>
              ) : (
                <motion.div 
                  key="idle"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-2"
                >
                  <UploadCloud size={22} />
                  Complete Listing & Upload
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Upload;
