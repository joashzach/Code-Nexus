import { useState } from 'react';
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
    <div className="max-w-4xl mx-auto px-6 py-20 space-y-12 min-h-screen">
      
      <div className="text-center space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="bg-[#11161C] text-[#5B8CFF] font-bold px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest border border-[#1F2933]">
            Partner Program
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#E6EDF3] mt-6 mb-4 tracking-tight">
            List Your Code <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5B8CFF] to-[#8B5CF6]">Module</span>
          </h1>
          <p className="text-[#9AA4AF] max-w-xl mx-auto mt-2 text-lg">
            Turn your code into a digital asset. Upload, set your price, and earn ETH for every purchase.
          </p>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        className="card p-8 md:p-12 relative overflow-hidden"
      >
        <AnimatePresence>
          {isSuccess && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute inset-x-0 top-0 bg-[#5B8CFF] text-white py-4 px-6 flex items-center justify-center gap-3 z-10 font-bold shadow-lg"
            >
              <CheckCircle size={20} /> Module uploaded successfully and submitted to the blockchain!
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="space-y-10">
          
          {/* File Upload Area */}
          <div className="space-y-4">
            <label className="text-xs font-bold text-[#9AA4AF] uppercase tracking-widest">Code Module Content</label>
            <div 
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={cn(
                "relative group flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-12 transition-all duration-300 cursor-pointer overflow-hidden",
                isDragging 
                  ? "border-[#5B8CFF] bg-[#5B8CFF]/5" 
                  : "border-[#1F2933] bg-[#0F141A] hover:border-[#2A3441] hover:bg-[#11161C]",
                errors.file && "border-red-500/30 bg-red-500/5 text-red-400"
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
                  <div className="w-16 h-16 bg-[#11161C] text-[#6B7280] rounded-xl flex items-center justify-center mb-6 border border-[#2A3441] group-hover:text-[#5B8CFF] group-hover:border-[#5B8CFF] transition-all">
                    <UploadCloud size={32} />
                  </div>
                  <p className="text-[#E6EDF3] font-bold text-xl mb-1">Drag & drop your module</p>
                  <p className="text-[#6B7280] text-sm">Supported files: .zip, .js, .ts (Max 50MB)</p>
                </>
              ) : (
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-[#5B8CFF]/10 text-[#5B8CFF] rounded-xl flex items-center justify-center mb-6 border border-[#5B8CFF]/20 shadow-lg shadow-[#5B8CFF]/5">
                    <FileCode size={32} />
                  </div>
                  <p className="text-[#E6EDF3] font-bold text-xl mb-1">{formData.file.name}</p>
                  <p className="text-[#6B7280] text-sm font-mono uppercase tracking-widest bg-[#1F2933] px-3 py-1.5 rounded-lg mt-3">
                    {(formData.file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                  <button 
                    type="button" 
                    onClick={(e) => { e.stopPropagation(); setFormData(prev => ({ ...prev, file: null })); }}
                    className="mt-8 flex items-center gap-2 text-red-400 font-bold text-xs uppercase hover:bg-red-500/10 px-4 py-2 rounded-lg transition-colors"
                  >
                    <X size={15} /> Remove File
                  </button>
                </div>
              )}

              {/* Success Decoration */}
              {formData.file && (
                <div className="absolute top-4 right-4 text-[#5B8CFF] bg-[#11161C] rounded-full p-2 border border-[#5B8CFF]/20">
                  <Check size={18} />
                </div>
              )}
            </div>
            {errors.file && (
              <p className="text-red-400 text-xs font-bold flex items-center gap-2 mt-1">
                <AlertCircle size={14} /> {errors.file}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#9AA4AF] uppercase tracking-widest">Listing Title</label>
              <input 
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className={cn(
                  "w-full",
                  errors.title && "border-red-500 focus:border-red-500 focus:ring-red-500/10"
                )}
                placeholder="e.g. Authentication Pro Module"
              />
              {errors.title && (
                <p className="text-red-400 text-xs font-bold flex items-center gap-2">
                  <AlertCircle size={14} /> {errors.title}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-[#9AA4AF] uppercase tracking-widest">Category</label>
              <select 
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full cursor-pointer appearance-none"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-[#9AA4AF] uppercase tracking-widest">Brief Description</label>
            <textarea 
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={5}
              className={cn(
                "w-full",
                errors.description && "border-red-500 focus:border-red-500 focus:ring-red-500/10"
              )}
              placeholder="Explain what your module does and how it helps other developers..."
            />
            {errors.description && (
              <p className="text-red-400 text-xs font-bold flex items-center gap-2">
                <AlertCircle size={14} /> {errors.description}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-[#9AA4AF] uppercase tracking-widest">Listing Price (ETH)</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none font-bold text-[#6B7280]">
                Ξ
              </div>
              <input 
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className={cn(
                  "w-full pl-10",
                  errors.price && "border-red-500 focus:border-red-500 focus:ring-red-500/10"
                )}
                placeholder="0.00"
              />
            </div>
            {errors.price && (
              <p className="text-red-400 text-xs font-bold flex items-center gap-2">
                <AlertCircle size={14} /> {errors.price}
              </p>
            )}
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full gradient-btn py-5 rounded-xl text-lg font-bold flex items-center justify-center gap-3 relative overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {isSubmitting ? (
                <motion.div 
                  key="submitting"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  Finalizing listing...
                </motion.div>
              ) : (
                <motion.div 
                  key="idle"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex items-center gap-3"
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
