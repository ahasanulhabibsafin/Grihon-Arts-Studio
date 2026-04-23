import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ShoppingBag, User, Search, Heart } from 'lucide-react';

export default function Navbar({ onAdminClick, onHomeClick, onNavigate, currentView }: { 
  onAdminClick: () => void, 
  onHomeClick: () => void,
  onNavigate: (view: any) => void,
  currentView: string
}) {
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems = [
    { name: 'Posters', view: 'Posters' },
    { name: 'Social Media', view: 'Social Media' },
    { name: 'Illustrations', view: 'Illustrations' },
    { name: 'Manuals', view: 'manuals' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-grihon-bg/80 backdrop-blur-md border-b border-grihon-accent/20">
      <div className="grihon-container h-20 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <button 
            onClick={onHomeClick} 
            className="text-3xl font-display text-grihon-earth hover:opacity-70 transition-opacity"
          >
            Grihon Arts Studio
          </button>
          <div className="hidden md:flex gap-8">
            {navItems.map((item) => (
              <button 
                key={item.name} 
                onClick={() => onNavigate(item.view)}
                className={`text-sm font-medium transition-colors ${
                  currentView === item.view ? 'text-grihon-earth' : 'hover:text-grihon-earth'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-6">
          <div className="hidden lg:flex items-center bg-white border border-grihon-accent/40 rounded-full px-4 py-2">
            <Search size={16} className="text-gray-400" />
            <input type="text" placeholder="Search graphics..." className="bg-transparent border-none outline-none text-sm px-2 w-40" />
          </div>

          <div className="flex items-center gap-1 md:gap-3">
            <button className="p-2 hover:bg-grihon-accent/20 rounded-full transition-colors text-grihon-ink">
              <Heart size={20} />
            </button>
            <button className="p-2 hover:bg-grihon-accent/20 rounded-full transition-colors text-grihon-ink">
              <ShoppingBag size={20} />
            </button>
            
            <button 
              onClick={onAdminClick} 
              className={`p-2 transition-all rounded-full ${currentView === 'admin' ? "bg-grihon-earth text-white" : "hover:bg-grihon-accent/20 text-grihon-ink"}`}
              title="Studio Management"
            >
              <User size={20} />
            </button>

            <button 
              className="md:hidden p-2 hover:bg-grihon-accent/20 rounded-full"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-0 w-full bg-grihon-bg border-b border-grihon-accent/20 p-6 md:hidden shadow-xl"
          >
            <div className="flex flex-col gap-6">
              {navItems.map((item) => (
                <button 
                  key={item.name} 
                  onClick={() => {
                    onNavigate(item.view);
                    setIsOpen(false);
                  }}
                  className="text-left text-2xl font-display"
                >
                  {item.name}
                </button>
              ))}
              <div className="flex items-center bg-white border border-grihon-accent/40 rounded-full px-4 py-3">
                <Search size={20} className="text-gray-400" />
                <input type="text" placeholder="Search graphics..." className="bg-transparent border-none outline-none text-base px-2 w-full" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
