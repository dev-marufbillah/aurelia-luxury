import { useState } from 'react';
import { getCategories, addCategory, deleteCategory, CategoryItem } from '../auth';
import { Plus, Trash2, FolderOpen, X, ImagePlus } from 'lucide-react';

export default function CategoryManager() {
  const [cats, setCats] = useState<CategoryItem[]>(getCategories());
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newImage, setNewImage] = useState('');
  const [msg, setMsg] = useState('');

  const refresh = () => setCats(getCategories());

  const handleAdd = () => {
    if (!newName.trim()) { setMsg('Category name is required.'); return; }
    addCategory(newName.trim(), newImage.trim());
    setNewName('');
    setNewImage('');
    setShowForm(false);
    setMsg('Category added successfully!');
    refresh();
    setTimeout(() => setMsg(''), 2000);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Delete category "${name}"?`)) {
      deleteCategory(id);
      setMsg(`"${name}" deleted.`);
      refresh();
      setTimeout(() => setMsg(''), 2000);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-luxury-text font-playfair">Categories</h2>
          <p className="text-xs text-luxury-muted mt-1">Manage product categories. These won't appear in navbar — only in shop filters & admin.</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-gold-500 to-gold-600 text-luxury-darker rounded-xl text-sm font-semibold hover:from-gold-400 hover:to-gold-500 transition-all"
        >
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </div>

      {msg && (
        <div className="p-3 bg-luxury-accent/10 border border-luxury-accent/20 text-luxury-accent text-xs rounded-xl">
          {msg}
        </div>
      )}

      {showForm && (
        <div className="bg-luxury-card border border-luxury-border rounded-2xl p-6 space-y-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-luxury-text">New Category</h3>
            <button onClick={() => setShowForm(false)} className="text-luxury-muted hover:text-luxury-text">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div>
            <label className="block text-xs text-luxury-muted uppercase tracking-wider mb-2">Category Name *</label>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="e.g. Wallets"
              className="w-full px-4 py-3 bg-luxury-darker border border-luxury-border rounded-xl text-sm text-luxury-text placeholder-luxury-muted focus:outline-none focus:border-luxury-accent/50 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs text-luxury-muted uppercase tracking-wider mb-2">Image URL (optional)</label>
            <div className="flex items-center gap-2">
              <ImagePlus className="w-4 h-4 text-luxury-muted flex-shrink-0" />
              <input
                type="text"
                value={newImage}
                onChange={(e) => setNewImage(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-4 py-3 bg-luxury-darker border border-luxury-border rounded-xl text-sm text-luxury-text placeholder-luxury-muted focus:outline-none focus:border-luxury-accent/50 transition-all"
              />
            </div>
          </div>
          <button onClick={handleAdd} className="px-6 py-3 bg-gradient-to-r from-gold-500 to-gold-600 text-luxury-darker rounded-xl text-sm font-semibold hover:from-gold-400 hover:to-gold-500 transition-all">
            Save Category
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {cats.map((cat) => (
          <div key={cat.id} className="bg-luxury-card border border-luxury-border rounded-2xl overflow-hidden group hover:border-luxury-accent/30 transition-all">
            <div className="h-32 overflow-hidden relative">
              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/25" />
              <div className="absolute top-3 right-3">
                <button
                  onClick={() => handleDelete(cat.id, cat.name)}
                  className="p-2 bg-luxury-card/80 rounded-lg hover:bg-luxury-danger hover:text-white transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <FolderOpen className="w-4 h-4 text-luxury-accent" />
                <h4 className="text-sm font-semibold text-luxury-text">{cat.name}</h4>
              </div>
              <p className="text-[10px] text-luxury-muted">/{cat.slug} · Created {cat.createdAt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
