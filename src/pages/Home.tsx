import React from 'react';
import { motion } from 'motion/react';
import GraphicCard from '../components/GraphicCard';
import ProductModal from '../components/ProductModal';
import { ArrowRight, Star } from 'lucide-react';

export default function Home({ graphics, onNavigate, onDesignSelect }: { graphics: any[], onNavigate: (v: any) => void, onDesignSelect: (id: string) => void }) {
  // Filter for grid
  const trendingGraphics = graphics.slice(0, 3);

  return (
    <div className="pt-20 min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden py-20">
        {/* Background Leaves - Decorative */}
        <img src="https://res.cloudinary.com/dq7vvvj88/image/upload/v1/grihon/leaves-bg.png" className="leaf-decoration -left-20 top-0 w-80 rotate-12" alt="" />
        <img src="https://res.cloudinary.com/dq7vvvj88/image/upload/v1/grihon/leaves-bg.png" className="leaf-decoration -right-20 bottom-10 w-80 -rotate-45" alt="" />

        <div className="grihon-container relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-[10vw] lg:text-[7vw] leading-[0.9] mb-8 text-grihon-ink">
              <span className="font-script text-grihon-clay block mb-2">Art that feels</span>
              for home.
            </h1>
            <p className="text-lg md:text-xl text-grihon-ink/70 mb-10 max-w-sm leading-relaxed">
              Curated craft, digital assets and creative inspiration for home and illustrations. Find your unique style here.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => onNavigate('archive')}
                className="grihon-button bg-grihon-earth shadow-lg px-10 h-14"
              >
                Explore Collection
              </button>
              <button 
                onClick={() => onNavigate('manuals')}
                className="text-grihon-ink font-bold border-b border-grihon-ink pb-1 h-14 px-4 hover:opacity-70 transition-opacity"
              >
                Download Free Manuals
              </button>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-square w-full max-w-md mx-auto">
              {/* Illustration Placeholder matching style */}
              <div className="absolute inset-0 bg-[#E8D3B9]/20 rounded-[3rem] -rotate-3" />
              <div className="relative h-full w-full bg-white rounded-[3rem] shadow-2xl overflow-hidden border-8 border-white p-4">
                <img 
                  src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200" 
                  className="w-full h-full object-cover rounded-[2rem]"
                  alt="Artistic illustration"
                />
              </div>
              {/* Floating Element with enhanced design */}
              <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-white rounded-[2.5rem] shadow-2xl p-3 hidden md:block group/float">
                <div className="relative h-full w-full overflow-hidden rounded-[2rem] border-2 border-grihon-accent/10">
                  <img 
                    src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=400" 
                    className="w-full h-full object-cover transform scale-110 group-hover/float:scale-100 transition-transform duration-1000" 
                    alt="Studio Selection" 
                  />
                  {/* Floating Design Badge */}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full shadow-sm">
                    <span className="text-[8px] font-bold tracking-[0.2em] text-grihon-clay uppercase">Studio Pick</span>
                  </div>
                </div>
                {/* Decorative shadow element */}
                <div className="absolute -z-10 inset-0 bg-grihon-earth/5 blur-2xl rounded-full transform translate-y-4" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trending Designs - Studio Signature */}
      <section className="grihon-container py-24 border-t border-grihon-accent/10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-grihon-clay mb-4 block">Trending Designs</span>
            <h2 className="text-6xl font-display leading-none">Studio Signature</h2>
          </div>
          <button 
            onClick={() => onNavigate('archive')}
            className="text-sm font-bold tracking-widest uppercase border-b-2 border-grihon-earth pb-1 hover:opacity-70 transition-opacity"
          >
            Check All Archives
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {trendingGraphics.map((graphic) => (
            <GraphicCard 
              key={graphic.id} 
              graphic={graphic} 
              onPromptSelect={() => onDesignSelect(graphic.id)}
            />
          ))}
        </div>
      </section>

      {/* New Uploads Section */}
      <section className="grihon-container py-24 border-t border-grihon-accent/10">
        <div className="flex items-center gap-4 mb-16">
          <div className="h-px bg-grihon-earth flex-grow opacity-20" />
          <div className="text-center px-8">
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-grihon-clay mb-2 block">Fresh in Studio</span>
            <h2 className="text-5xl font-display">New Uploads</h2>
          </div>
          <div className="h-px bg-grihon-earth flex-grow opacity-20" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {graphics.slice(0, 4).map((graphic) => (
            <div key={graphic.id} className="relative group cursor-pointer" onClick={() => onDesignSelect(graphic.id)}>
              <div className="aspect-[3/4] overflow-hidden rounded-3xl bg-grihon-accent/5">
                <img 
                  src={graphic.previewUrl} 
                  alt={graphic.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-grihon-ink/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                   <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase">
                     View Details
                   </div>
                </div>
              </div>
              <div className="mt-4">
                <h4 className="font-display text-lg mb-1">{graphic.title}</h4>
                <p className="text-xs text-gray-400 uppercase tracking-widest">{graphic.category}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Inside Grihon Section */}
      <section className="grihon-container py-24 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="bg-grihon-peach/30 p-12 rounded-[3rem] relative">
            <img 
              src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&q=80&w=1200" 
              alt="Inside Grihon" 
              className="w-full aspect-video object-cover rounded-2xl shadow-xl"
            />
          </div>
          <div>
            <h2 className="text-6xl md:text-8xl leading-none mb-8">Inside Grihon</h2>
            <p className="text-lg text-grihon-ink/70 leading-relaxed mb-8 max-w-lg">
              "Grihon Arts Studio represents the convergence of artisanal craft and modern digital innovation. We celebrate the beauty of digital illustrations while maintaining the warmth and touch of home in every design."
            </p>
            <p className="text-sm italic text-grihon-clay font-medium">— Safin, Creative Director</p>
          </div>
        </div>
      </section>

      {/* Trending / New Arrivals */}
      <section className="grihon-container py-24 border-t border-grihon-accent/20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-4xl mb-8">Trending / New Arrivals</h2>
            <p className="text-gray-500 mb-10 max-w-md">Our latest creations designed to elevate your creative project. Minimal, high-impact assets for the modern designer.</p>
            <div className="space-y-6">
               <div className="flex items-start gap-4 p-4 hover:bg-white rounded-2xl cursor-pointer transition-colors">
                  <span className="w-8 h-8 bg-grihon-clay rounded-full flex items-center justify-center text-white text-xs">01</span>
                  <div>
                    <h4 className="font-bold">Earthy Texture Pack</h4>
                    <p className="text-sm text-gray-500">New in Illustrations</p>
                  </div>
               </div>
               <div className="flex items-start gap-4 p-4 hover:bg-white rounded-2xl cursor-pointer transition-colors">
                  <span className="w-8 h-8 bg-grihon-clay rounded-full flex items-center justify-center text-white text-xs">02</span>
                  <div>
                    <h4 className="font-bold">Minimal Poster Layouts</h4>
                    <p className="text-sm text-gray-500">Featured in Social Media</p>
                  </div>
               </div>
            </div>
          </div>

          <div>
            <h2 className="text-4xl mb-8">Testimonials</h2>
            <div className="space-y-8">
              {[
                { name: "Sarah J.", text: "Grihon's assets transformed our brand identity perfectly." },
                { name: "Marc K.", text: "The quality is simply unmatched for professional use." }
              ].map((test, i) => (
                <div key={i} className="flex gap-4 items-start bg-white p-8 rounded-[2rem] shadow-sm">
                  <Star className="text-grihon-earth fill-grihon-earth" size={16} />
                  <div>
                    <p className="text-lg italic mb-2">"{test.text}"</p>
                    <p className="text-xs uppercase tracking-widest font-bold text-gray-400">— {test.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid - Quick Browse */}
      <section className="grihon-container py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {trendingGraphics.map((graphic) => (
            <GraphicCard 
              key={graphic.id} 
              graphic={graphic} 
              onPromptSelect={onDesignSelect}
            />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-grihon-clay text-grihon-bg pt-24 pb-12">
        <div className="grihon-container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-20">
            <div>
              <h2 className="text-7xl font-display mb-4">Grihon</h2>
              <p className="text-grihon-accent/40 text-xs tracking-widest font-bold uppercase">Arts and Studio</p>
            </div>
            <div className="flex flex-col items-center gap-6">
               <p className="text-lg font-display">Start creating with Grihon</p>
               <button 
                onClick={() => onNavigate('archive')}
                className="bg-[#E8D3B9] text-grihon-ink px-12 py-4 rounded-full font-bold text-sm tracking-widest uppercase shadow-xl hover:scale-105 transition-transform"
               >
                 Browse All Graphics
               </button>
            </div>
          </div>
          
          <div className="h-px bg-grihon-bg/10 w-full mb-12" />
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-[0.2em] font-bold text-grihon-bg/40">
            <div className="flex gap-12">
              <a href="#">Instagram</a>
              <a href="#">Pinterest</a>
              <a href="#">Behance</a>
            </div>
            <p>© 2026 Grihon Studio. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
