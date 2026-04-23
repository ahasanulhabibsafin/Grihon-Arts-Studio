import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Download, FileText, ArrowRight } from 'lucide-react';

const MANUALS = [
  {
    title: "Digital Art Fundamentals",
    description: "A comprehensive guide to color theory, composition, and digital brush techniques used at Grihon Studio.",
    fileSize: "12.4 MB",
    type: "PDF Guide",
    color: "bg-grihon-clay/10"
  },
  {
    title: "Eco-Design Standards",
    description: "Our manifesto on sustainable creative practices and earthy aesthetic principles for modern brands.",
    fileSize: "8.1 MB",
    type: "Design Manifesto",
    color: "bg-grihon-earth/10"
  },
  {
    title: "Social Media Strategy",
    description: "Master the art of minimal digital presence and high-impact visual storytelling on social platforms.",
    fileSize: "15.2 MB",
    type: "Workshop PDF",
    color: "bg-grihon-accent/10"
  }
];

export default function Manuals() {
  return (
    <div className="pt-32 min-h-screen bg-grihon-bg">
      <section className="grihon-container mb-24">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-xs font-bold tracking-[0.4em] uppercase text-grihon-clay mb-6 block">Resource Library</span>
            <h1 className="text-7xl md:text-8xl font-display leading-[0.8] mb-8">Free Manuals</h1>
            <p className="text-xl text-gray-500 leading-relaxed">
              We believe in sharing the craft. Access our curated library of professional design manuals, manifestos, and technical guides developed inside the studio.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="grihon-container mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MANUALS.map((manual, i) => (
            <motion.div
              key={manual.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`p-10 rounded-[2.5rem] ${manual.color} group hover:shadow-xl transition-all duration-500 border border-transparent hover:border-grihon-earth/20`}
            >
              <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform">
                <BookOpen className="text-grihon-earth" size={28} />
              </div>
              <h3 className="text-3xl font-display mb-4">{manual.title}</h3>
              <p className="text-gray-500 mb-8 leading-relaxed">
                {manual.description}
              </p>
              <div className="flex items-center justify-between pt-6 border-t border-grihon-ink/5">
                <div className="text-xs uppercase tracking-widest font-bold text-grihon-clay">
                  {manual.type} • {manual.fileSize}
                </div>
                <button className="flex items-center gap-2 font-bold text-grihon-earth group-hover:gap-3 transition-all">
                  DOWNLOAD <Download size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Newsletter / Stay Updated */}
      <section className="bg-grihon-clay py-32 rounded-t-[4rem]">
        <div className="grihon-container text-center text-grihon-bg">
          <h2 className="text-5xl md:text-7xl font-display mb-8">Never miss a guide.</h2>
          <p className="text-grihon-bg/60 mb-12 max-w-lg mx-auto">
            Join the Grihon community to receive new manuals and studio updates directly in your inbox.
          </p>
          <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="YOUR EMAIL" 
              className="bg-white/10 border border-white/20 px-8 h-16 rounded-full w-full focus:outline-none focus:border-white transition-colors"
            />
            <button className="bg-grihon-bg text-grihon-ink px-10 h-16 rounded-full font-bold tracking-widest uppercase hover:bg-grihon-earth hover:text-white transition-all">
              Join Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
