import React from 'react';
import { motion } from 'motion/react';
import { Plus, Trash2, ExternalLink, Image as ImageIcon, Link as LinkIcon, DollarSign, Type, FileText } from 'lucide-react';
import { formatDownloadUrl } from '../lib/utils';

export default function Admin({ user, graphics, onAdd, onDelete }: { user: any, graphics: any[], onAdd: (g: any) => void, onDelete: (id: string) => void }) {
  const [formData, setFormData] = React.useState({
    title: '',
    description: '',
    category: 'Posters',
    previewUrl: '',
    downloadUrl: '',
    price: 0,
  });

  const isAdmin = user?.email === 'safinbakshi013@gmail.com';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.previewUrl || !formData.downloadUrl) return;
    
    onAdd(formData);

    setFormData({
      title: '',
      description: '',
      category: 'Posters',
      previewUrl: '',
      downloadUrl: '',
      price: 0,
    });
  };

  if (!isAdmin) {
    return (
      <div className="pt-40 grihon-container min-h-screen text-center">
        <h1 className="text-6xl font-display mb-4">Access Denied</h1>
        <p className="text-gray-500 uppercase tracking-widest text-xs">This sanctuary is for Grihon studio admins only.</p>
      </div>
    );
  }

  return (
    <div className="pt-32 grihon-container min-h-screen pb-20">
      <div className="mb-16">
        <h1 className="text-7xl font-display leading-[0.8] mb-4">Studio Archive</h1>
        <p className="text-grihon-earth font-medium tracking-widest text-sm uppercase">Curate Your Digital Sanctuary</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Form */}
        <div className="lg:col-span-5">
          <div className="bg-white p-10 rounded-[2rem] shadow-xl border border-grihon-accent/20 sticky top-32">
            <h2 className="text-3xl font-display mb-8">Add New Asset</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="label-text">Asset Title</label>
                  <input 
                    type="text" 
                    className="grihon-input" 
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                  />
                </div>
                <div>
                  <label className="label-text">Category</label>
                  <select 
                    className="grihon-input"
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value})}
                  >
                    <option value="Posters">Posters</option>
                    <option value="Social Media">Social Media</option>
                    <option value="Illustrations">Illustrations</option>
                    <option value="Logos">Logos</option>
                  </select>
                </div>
                <div>
                  <label className="label-text">Price ($)</label>
                  <input 
                    type="number" 
                    className="grihon-input" 
                    value={formData.price}
                    onChange={e => setFormData({...formData, price: Number(e.target.value)})}
                  />
                </div>
              </div>

              <div>
                <label className="label-text">Description</label>
                <textarea 
                  className="grihon-input h-24 resize-none"
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                />
              </div>

              <div>
                <label className="label-text">Cloudinary Preview URL</label>
                <input 
                  type="url" 
                  className="grihon-input" 
                  value={formData.previewUrl}
                  onChange={e => setFormData({...formData, previewUrl: e.target.value})}
                />
              </div>

              <div>
                <label className="label-text">Google Drive Download URL</label>
                <input 
                  type="url" 
                  className="grihon-input" 
                  value={formData.downloadUrl}
                  onChange={e => setFormData({...formData, downloadUrl: e.target.value})}
                />
              </div>

              <button type="submit" className="grihon-button w-full h-14 text-lg">
                Archive Asset
              </button>
            </form>
          </div>
        </div>

        {/* List */}
        <div className="lg:col-span-7">
          <div className="space-y-6">
            {graphics.map((graphic) => (
              <motion.div 
                layout
                key={graphic.id}
                className="bg-white p-6 rounded-3xl flex items-center gap-8 shadow-sm border border-grihon-accent/10 hover:shadow-lg transition-all"
              >
                <div className="w-24 h-24 bg-grihon-accent/10 rounded-2xl overflow-hidden flex-shrink-0">
                  <img src={graphic.previewUrl} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="tag-sage">{graphic.category}</span>
                    <span className="text-sm font-bold text-grihon-earth">${graphic.price}</span>
                  </div>
                  <h3 className="text-2xl font-display leading-tight">{graphic.title}</h3>
                  <div className="flex gap-4 mt-3">
                    <a href={graphic.previewUrl} target="_blank" className="text-[10px] font-bold text-gray-400 hover:text-grihon-earth flex items-center gap-1">
                      VIEW PREVIEW <ExternalLink size={10} />
                    </a>
                    <a 
                      href={formatDownloadUrl(graphic.downloadUrl)} 
                      target="_blank" 
                      className="text-[10px] font-bold text-grihon-sage-dark hover:opacity-70 flex items-center gap-1"
                    >
                      TEST DOWNLOAD <ExternalLink size={10} />
                    </a>
                  </div>
                </div>
                <button 
                  onClick={() => onDelete(graphic.id)}
                  className="p-4 text-gray-300 hover:text-red-400 hover:bg-red-50 transition-colors rounded-2xl"
                >
                  <Trash2 size={24} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      <style>{`
        .label-text {
          display: block;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #9ca3af;
          margin-bottom: 0.5rem;
        }
      `}</style>
    </div>
  );
}
