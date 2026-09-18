import { useState } from 'react';
import { mockProducts } from '../data';
import { Product } from '../types';
import {
  Plus,
  Search,
  Filter,
  Edit3,
  Trash2,
  Eye,

  X,
  Package,
} from 'lucide-react';

const statusColors: Record<string, string> = {
  active: 'bg-green-500/10 text-green-400 border-green-500/20',
  draft: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  archived: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
};

export default function Products() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  const categories = ['all', ...new Set(mockProducts.map((p) => p.category))];

  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = filterCategory === 'all' || p.category === filterCategory;
    return matchSearch && matchCategory;
  });

  const handleDelete = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center gap-3 flex-1 w-full sm:w-auto">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-luxury-muted" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-luxury-card border border-luxury-border rounded-xl text-sm text-luxury-text placeholder-luxury-muted focus:outline-none focus:border-luxury-accent/50 transition-all"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-luxury-muted" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="pl-10 pr-8 py-2.5 bg-luxury-card border border-luxury-border rounded-xl text-sm text-luxury-text focus:outline-none focus:border-luxury-accent/50 transition-all appearance-none cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>
              ))}
            </select>
          </div>
        </div>
        <button
          onClick={() => { setEditProduct(null); setShowModal(true); }}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-gold-500 to-gold-600 text-luxury-darker rounded-xl text-sm font-semibold hover:from-gold-400 hover:to-gold-500 transition-all shadow-lg shadow-gold-500/20"
        >
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
        {filtered.map((product, i) => (
          <div
            key={product.id}
            className="bg-luxury-card border border-luxury-border rounded-2xl overflow-hidden hover:border-luxury-accent/30 transition-all duration-300 group"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <div className="h-48 bg-gradient-to-br from-luxury-border/30 to-luxury-dark flex items-center justify-center relative overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/15" />
              <div className="absolute top-3 right-3">
                <span className={`text-xs font-medium px-2.5 py-1 rounded-lg border ${statusColors[product.status]}`}>
                  {product.status}
                </span>
              </div>
              <div className="absolute inset-0 bg-luxury-darker/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <button className="p-2.5 bg-luxury-card/80 rounded-xl hover:bg-luxury-accent hover:text-luxury-darker transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => { setEditProduct(product); setShowModal(true); }}
                  className="p-2.5 bg-luxury-card/80 rounded-xl hover:bg-luxury-accent hover:text-luxury-darker transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="p-2.5 bg-luxury-card/80 rounded-xl hover:bg-luxury-danger hover:text-white transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="p-5">
              <p className="text-xs text-luxury-accent font-medium mb-1">{product.brand}</p>
              <h3 className="text-sm font-semibold text-luxury-text mb-2 truncate">{product.name}</h3>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-luxury-text font-playfair">৳{product.price.toLocaleString()}</span>
                <div className="text-right">
                  <p className="text-xs text-luxury-muted">Stock: {product.stock}</p>
                  <p className="text-xs text-luxury-muted">Sales: {product.sales}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-luxury-muted">
          <Package className="w-16 h-16 mb-4 opacity-30" />
          <p className="text-lg font-medium">No products found</p>
          <p className="text-sm">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="bg-luxury-dark border border-luxury-border rounded-2xl w-full max-w-lg p-6 animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-playfair text-xl font-bold text-luxury-text">
                {editProduct ? 'Edit Product' : 'Add New Product'}
              </h3>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-luxury-card rounded-lg transition-colors">
                <X className="w-5 h-5 text-luxury-muted" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-luxury-muted uppercase tracking-wider mb-2">Product Name</label>
                <input
                  type="text"
                  defaultValue={editProduct?.name || ''}
                  placeholder="Enter product name"
                  className="w-full px-4 py-3 bg-luxury-card border border-luxury-border rounded-xl text-sm text-luxury-text placeholder-luxury-muted focus:outline-none focus:border-luxury-accent/50 transition-all"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-luxury-muted uppercase tracking-wider mb-2">Brand</label>
                  <input
                    type="text"
                    defaultValue={editProduct?.brand || ''}
                    placeholder="Brand name"
                    className="w-full px-4 py-3 bg-luxury-card border border-luxury-border rounded-xl text-sm text-luxury-text placeholder-luxury-muted focus:outline-none focus:border-luxury-accent/50 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs text-luxury-muted uppercase tracking-wider mb-2">Category</label>
                  <select defaultValue={editProduct?.category || categories.find((c) => c !== 'all') || ''} className="w-full px-4 py-3 bg-luxury-card border border-luxury-border rounded-xl text-sm text-luxury-text focus:outline-none focus:border-luxury-accent/50 transition-all">
                    {categories.filter((c) => c !== 'all').map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-luxury-muted uppercase tracking-wider mb-2">Price (৳)</label>
                  <input
                    type="number"
                    defaultValue={editProduct?.price || ''}
                    placeholder="0"
                    className="w-full px-4 py-3 bg-luxury-card border border-luxury-border rounded-xl text-sm text-luxury-text placeholder-luxury-muted focus:outline-none focus:border-luxury-accent/50 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs text-luxury-muted uppercase tracking-wider mb-2">Stock</label>
                  <input
                    type="number"
                    defaultValue={editProduct?.stock || ''}
                    placeholder="0"
                    className="w-full px-4 py-3 bg-luxury-card border border-luxury-border rounded-xl text-sm text-luxury-text placeholder-luxury-muted focus:outline-none focus:border-luxury-accent/50 transition-all"
                  />
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="w-full py-3 bg-gradient-to-r from-gold-500 to-gold-600 text-luxury-darker rounded-xl text-sm font-semibold hover:from-gold-400 hover:to-gold-500 transition-all shadow-lg shadow-gold-500/20 mt-2"
              >
                {editProduct ? 'Update Product' : 'Add Product'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
