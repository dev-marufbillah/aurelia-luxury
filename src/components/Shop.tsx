import { Search, Heart, ChevronDown } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Product } from '../types';
import { mockProducts } from '../data';

interface ShopProps {
  initialCategory: string;
  onBack: () => void;
  onAddToCart: (p: Product) => void;
  onViewProduct: (p: Product) => void;
  wishlist: string[];
  onToggleWishlist: (id: string) => void;
  searchQuery?: string;
}

type SortMode = 'featured' | 'price-low' | 'price-high' | 'name';

export default function Shop({ initialCategory, onBack, onAddToCart, onViewProduct, wishlist, onToggleWishlist, searchQuery }: ShopProps) {
  const [sortMode, setSortMode] = useState<SortMode>('featured');

  const filteredProducts = useMemo(() => {
    const normalizedCategory = initialCategory.toLowerCase();

    const filtered = mockProducts.filter((p) => {
      const productCategory = p.category.toLowerCase();
      const matchesCategory =
        initialCategory === 'All' ||
        normalizedCategory === 'new arrivals' ||
        normalizedCategory === 'gifts' ||
        productCategory.includes(normalizedCategory) ||
        normalizedCategory.includes(productCategory);

      const matchesSearch = !searchQuery ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });

    const sorted = [...filtered];
    if (sortMode === 'price-low') sorted.sort((a, b) => a.price - b.price);
    if (sortMode === 'price-high') sorted.sort((a, b) => b.price - a.price);
    if (sortMode === 'name') sorted.sort((a, b) => a.name.localeCompare(b.name));
    return sorted;
  }, [initialCategory, searchQuery, sortMode]);

  return (
    <div className="min-h-screen bg-white text-aurelia-black animate-fade-in">
      <div className="bg-aurelia-black py-4 text-center">
        <button onClick={onBack} className="text-aurelia-ivory font-montserrat text-[10px] font-bold uppercase tracking-[0.4em] hover:text-aurelia-gold transition-colors">
          ← Back to Homepage
        </button>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-20 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <span className="font-montserrat text-xs font-bold uppercase tracking-[0.4em] text-aurelia-gold mb-4 block">
              {searchQuery ? 'Search Results' : 'Curated Collection'}
            </span>
            <h1 className="font-playfair text-5xl font-bold tracking-tight uppercase">
              {searchQuery ? `“${searchQuery}”` : initialCategory === 'All' ? 'The Shop' : initialCategory}
            </h1>
          </div>

          <div className="flex items-center gap-6 border-b border-gray-100 pb-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">{filteredProducts.length} items</span>
            <div className="relative">
              <select
                value={sortMode}
                onChange={(e) => setSortMode(e.target.value as SortMode)}
                className="appearance-none bg-transparent pr-6 text-[10px] font-bold uppercase tracking-[0.2em] hover:text-aurelia-gold transition-colors cursor-pointer outline-none"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name</option>
              </select>
              <ChevronDown className="w-3 h-3 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="py-40 text-center">
            <Search className="w-12 h-12 mx-auto mb-6 text-gray-200 stroke-1" />
            <h3 className="font-playfair text-2xl mb-2">No products found</h3>
            <p className="text-gray-400 text-sm">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-card group cursor-pointer" onClick={() => onViewProduct(product)}>
                <div className="relative aspect-[4/5] bg-aurelia-cream overflow-hidden mb-6 p-6 flex items-center justify-center border border-black/5">
                  <img src={product.image} alt={product.name} className="product-card-img w-full h-full object-contain" />
                  <div className="img-overlay" />
                  <button
                    onClick={(e) => { e.stopPropagation(); onToggleWishlist(product.id); }}
                    className="absolute top-4 right-4 p-3 bg-white/80 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-slow"
                  >
                    <Heart className={`w-4 h-4 ${wishlist.includes(product.id) ? 'fill-aurelia-gold text-aurelia-gold' : 'text-aurelia-black/50'}`} />
                  </button>
                  <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-slow">
                    <button
                      onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
                      className="w-full py-4 bg-aurelia-black text-aurelia-ivory font-montserrat text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-aurelia-gold hover:text-aurelia-black transition-colors"
                    >
                      Add To Bag
                    </button>
                  </div>
                </div>
                <div>
                  <p className="font-montserrat text-[9px] font-bold uppercase tracking-[0.25em] text-aurelia-muted mb-1">{product.brand}</p>
                  <h3 className="font-montserrat text-sm font-medium mb-2 group-hover:text-aurelia-gold transition-colors truncate">{product.name}</h3>
                  <p className="font-playfair font-bold text-lg">৳{product.price.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
