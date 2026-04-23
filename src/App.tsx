import React from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Category from './pages/Category';
import ProductModal from './components/ProductModal';
import Manuals from './pages/Manuals';
import { INITIAL_GRAPHICS, Graphic } from './data/graphics';

export default function App() {
  const [view, setView] = React.useState<'home' | 'admin' | 'archive' | 'manuals' | 'Posters' | 'Social Media' | 'Illustrations'>('home');
  const [selectedDesignId, setSelectedDesignId] = React.useState<string | null>(null);
  const [graphics, setGraphics] = React.useState<Graphic[]>(INITIAL_GRAPHICS);
  const [loading, setLoading] = React.useState(false);

  // Read initial ID from URL
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const designId = params.get('design');
    if (designId) setSelectedDesignId(designId);
  }, []);

  // Update URL when design selection changes
  React.useEffect(() => {
    const url = new URL(window.location.href);
    if (selectedDesignId) {
      url.searchParams.set('design', selectedDesignId);
    } else {
      url.searchParams.delete('design');
    }
    window.history.replaceState({}, '', url);
  }, [selectedDesignId]);

  const handleAddGraphic = (newGraphic: any) => {
    const graphic: Graphic = {
      ...newGraphic,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString()
    };
    setGraphics(prev => [graphic, ...prev]);
  };

  const handleDeleteGraphic = (id: string) => {
    setGraphics(prev => prev.filter(g => g.id !== id));
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-grihon-bg text-grihon-clay">
        <h1 className="text-4xl animate-pulse font-display">Grihon Arts Studio</h1>
      </div>
    );
  }

  const renderView = () => {
    if (view === 'home') return <Home graphics={graphics} onNavigate={(v: any) => setView(v)} onDesignSelect={setSelectedDesignId} />;
    // Admin is now just a local session manager, no auth for this version
    if (view === 'admin') return <Admin user={null} graphics={graphics} onAdd={handleAddGraphic} onDelete={handleDeleteGraphic} />;
    if (view === 'archive') return <Category title="Archive" graphics={graphics} onDesignSelect={setSelectedDesignId} />;
    if (view === 'manuals') return <Manuals />;
    
    const categoryGraphics = graphics.filter(g => g.category === view);
    return <Category title={view} graphics={categoryGraphics} onDesignSelect={setSelectedDesignId} />;
  };

  const selectedGraphic = graphics.find(g => g.id === selectedDesignId);

  return (
    <div className="min-h-screen bg-grihon-bg">
      <Navbar 
        onHomeClick={() => setView('home')} 
        onAdminClick={() => setView('admin')}
        onNavigate={(v: any) => setView(v)} 
        currentView={view} 
      />
      
      <main>
        {renderView()}
      </main>

      <ProductModal 
        graphic={selectedGraphic} 
        onClose={() => setSelectedDesignId(null)} 
      />
    </div>
  );
}
