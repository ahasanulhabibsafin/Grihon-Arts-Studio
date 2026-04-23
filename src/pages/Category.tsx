import React from 'react';
import { motion } from 'motion/react';
import GraphicCard from '../components/GraphicCard';
import ProductModal from '../components/ProductModal';

export default function Category({ title, graphics, onDesignSelect }: { title: string, graphics: any[], onDesignSelect: (id: string) => void }) {
  return (
    <div className="pt-32 min-h-screen">
      <section className="grihon-container mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-grihon-clay mb-4 block">Archive Collection</span>
          <h1 className="text-7xl md:text-9xl font-display leading-[0.8] mb-6">{title}</h1>
          <p className="text-lg text-gray-500 max-w-xl">
            A curated selection of {title.toLowerCase()} specifically designed for high-end studio projects and creative professional use at Grihon Arts Studio.
          </p>
        </motion.div>
      </section>

      <section className="grihon-container py-12 border-t border-grihon-accent/20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {graphics.map((graphic) => (
            <GraphicCard 
              key={graphic.id} 
              graphic={graphic} 
              onPromptSelect={() => onDesignSelect(graphic.id)}
            />
          ))}
        </div>

        {graphics.length === 0 && (
          <div className="py-40 text-center">
            <h2 className="text-4xl font-display text-gray-300">No {title} found in the archive yet.</h2>
            <p className="text-gray-400 mt-4">The studio is currently working on new releases.</p>
          </div>
        )}
      </section>

      <footer className="bg-grihon-ink text-grihon-bg py-24 mt-20">
        <div className="grihon-container">
          <p className="text-xs uppercase tracking-widest font-bold text-grihon-accent/40 mb-2">Grihon Studio</p>
          <p className="text-2xl font-display">Back to home</p>
        </div>
      </footer>
    </div>
  );
}
