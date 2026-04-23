import { motion } from 'motion/react';
import { ArrowDown, Heart, Eye } from 'lucide-react';
import { formatDownloadUrl } from '../lib/utils';

interface GraphicProps {
  id: string;
  title: string;
  description: string;
  category: string;
  previewUrl: string;
  downloadUrl: string;
  price: number;
}

export default function GraphicCard({ graphic, onPromptSelect }: { graphic: GraphicProps, onPromptSelect: (g: any) => void }) {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grihon-card group"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-grihon-accent/10">
        <img 
          src={graphic.previewUrl} 
          alt={graphic.title} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
          loading="lazy" 
        />
        
        {/* Hover Actions */}
        <div className="absolute inset-0 bg-grihon-ink/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <button 
            onClick={() => onPromptSelect(graphic)}
            className="p-3 bg-white text-grihon-ink rounded-full hover:bg-grihon-earth hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0"
          >
            <Eye size={20} />
          </button>
          <button className="p-3 bg-white text-grihon-ink rounded-full hover:bg-grihon-earth hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 delay-75">
            <Heart size={20} />
          </button>
        </div>

        <div className="absolute top-4 left-4">
          <span className="tag-sage">{graphic.category}</span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-display leading-tight flex-grow">{graphic.title}</h3>
          <p className="font-bold text-grihon-earth">${graphic.price}</p>
        </div>
        <p className="text-sm text-gray-500 line-clamp-2 mb-6">{graphic.description}</p>
        
        <a 
          href={formatDownloadUrl(graphic.downloadUrl)} 
          target="_blank" 
          rel="noopener noreferrer"
          className="grihon-button w-full flex gap-2 text-sm"
        >
          DOWNLOAD <ArrowDown size={14} />
        </a>
      </div>
    </motion.div>
  );
}
