import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowDown, Heart, Share2, ShieldCheck, Download, Check } from 'lucide-react';
import { formatDownloadUrl } from '../lib/utils';

export default function ProductModal({ graphic, onClose }: { graphic: any, onClose: () => void }) {
  const [copied, setCopied] = React.useState(false);

  if (!graphic) return null;

  const handleShare = () => {
    const url = new URL(window.location.origin + window.location.pathname);
    url.searchParams.set('design', graphic.id);
    navigator.clipboard.writeText(url.toString());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 overflow-hidden"
      >
        <div className="absolute inset-0 bg-grihon-ink/40 backdrop-blur-sm" onClick={onClose} />
        
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative bg-grihon-bg w-full max-w-6xl max-h-full overflow-y-auto rounded-[2rem] shadow-2xl flex flex-col md:flex-row"
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 z-10 p-2 bg-white/80 hover:bg-white rounded-full transition-colors"
          >
            <X size={24} />
          </button>

          {/* Image Section */}
          <div className="w-full md:w-1/2 h-[50vh] md:h-auto bg-grihon-accent/10">
            <img 
              src={graphic.previewUrl} 
              alt={graphic.title} 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details Section */}
          <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col">
            <div className="mb-8">
              <span className="tag-sage mb-4 inline-block">{graphic.category}</span>
              <h1 className="text-5xl md:text-7xl font-display leading-[0.9] mb-6">
                {graphic.title}
              </h1>
              <p className="text-3xl font-display text-grihon-earth mb-8">
                ${graphic.price} <span className="text-sm font-sans text-gray-400 font-normal">USD</span>
              </p>
              
              <div className="h-px bg-grihon-accent/40 w-full mb-8" />
              
              <div className="prose prose-stone">
                <h4 className="text-sm uppercase tracking-widest font-bold text-gray-400 mb-4 font-sans">Description</h4>
                <p className="text-lg leading-relaxed text-grihon-ink/80">
                  {graphic.description || "A high-quality digital asset curated specifically for premium studio projects and creative professional use at Grihon Arts."}
                </p>
              </div>
            </div>

            <div className="mt-auto space-y-4">
              <div className="flex gap-4">
                <a 
                  href={formatDownloadUrl(graphic.downloadUrl)} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="grihon-button flex-grow flex gap-3 h-16 text-lg"
                >
                  <Download size={20} /> DOWNLOAD NOW
                </a>
                <button className="h-16 w-16 flex items-center justify-center border-2 border-grihon-accent rounded-full hover:bg-grihon-accent/20 transition-all">
                  <Heart size={24} />
                </button>
              </div>
              
              <div className="flex items-center justify-between text-xs font-medium text-gray-400 uppercase tracking-widest pt-6 border-t border-grihon-accent/20">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={14} className="text-grihon-sage-dark" /> Original Quality • High-Res
                </div>
                <button 
                  onClick={handleShare}
                  className="flex items-center gap-2 cursor-pointer hover:text-grihon-earth transition-colors"
                >
                  {copied ? (
                    <span className="flex items-center gap-1 text-grihon-sage-dark"><Check size={14} /> Copied</span>
                  ) : (
                    <span className="flex items-center gap-1"><Share2 size={14} /> Share Link</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
