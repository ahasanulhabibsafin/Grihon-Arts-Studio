import React from 'react';
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut, User as FirebaseUser } from 'firebase/auth';
import { collection, query, onSnapshot, addDoc, deleteDoc, doc, serverTimestamp, orderBy } from 'firebase/firestore';
import { auth, db, handleFirestoreError } from './lib/firebase';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Category from './pages/Category';
import ProductModal from './components/ProductModal';
import Manuals from './pages/Manuals';

export default function App() {
  const [view, setView] = React.useState<'home' | 'admin' | 'archive' | 'manuals' | 'Posters' | 'Social Media' | 'Illustrations'>('home');
  const [selectedDesignId, setSelectedDesignId] = React.useState<string | null>(null);
  const [graphics, setGraphics] = React.useState<any[]>([]);
  const [user, setUser] = React.useState<FirebaseUser | null>(null);
  const [loading, setLoading] = React.useState(true);

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

  // Auth Listener
  React.useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
  }, []);

  // Firestore Listener
  React.useEffect(() => {
    const q = query(collection(db, 'graphics'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setGraphics(data);
      setLoading(false);
    }, (error) => {
      console.error("Firestore Error:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleLogout = () => signOut(auth);

  const handleAddGraphic = async (newGraphic: any) => {
    try {
      await addDoc(collection(db, 'graphics'), {
        ...newGraphic,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      handleFirestoreError(error, 'create', 'graphics');
    }
  };

  const handleDeleteGraphic = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'graphics', id));
    } catch (error) {
      handleFirestoreError(error, 'delete', `graphics/${id}`);
    }
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
    if (view === 'admin') return <Admin user={user} graphics={graphics} onAdd={handleAddGraphic} onDelete={handleDeleteGraphic} />;
    if (view === 'archive') return <Category title="Archive" graphics={graphics} onDesignSelect={setSelectedDesignId} />;
    if (view === 'manuals') return <Manuals />;
    
    const categoryGraphics = graphics.filter(g => g.category === view);
    return <Category title={view} graphics={categoryGraphics} onDesignSelect={setSelectedDesignId} />;
  };

  const selectedGraphic = graphics.find(g => g.id === selectedDesignId);

  return (
    <div className="min-h-screen bg-grihon-bg">
      <Navbar 
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
        onAdminClick={() => setView('admin')}
        onHomeClick={() => { setView('home'); setSelectedDesignId(null); }}
        onNavigate={(v: any) => { setView(v); setSelectedDesignId(null); }}
        activeView={view}
      />
      
      {renderView()}

      <ProductModal 
        graphic={selectedGraphic} 
        onClose={() => setSelectedDesignId(null)} 
      />
    </div>
  );
}
