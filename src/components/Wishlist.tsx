import { Trash2, ShoppingBag, Heart } from 'lucide-react';
import { mockProducts } from '../data';

interface WishlistProps {
  wishlistIds: string[];
  onBack: () => void;
  onAddToCart: (p: any) => void;
  onRemove: (id: string) => void;
  onViewProduct: (p: any) => void;
}

export default function Wishlist({ wishlistIds, onBack, onAddToCart, onRemove, onViewProduct }: WishlistProps) {
  const wishlistedItems = mockProducts.filter(p => wishlistIds.includes(p.id));

  return (
    <div className="min-h-screen bg-white text-aurelia-black animate-fade-in">
      <div className="bg-aurelia-black py-4 text-center">
        <button onClick={onBack} className="text-aurelia-ivory font-montserrat text-[10px] font-bold uppercase tracking-[0.4em] hover:text-aurelia-gold transition-colors">
          ← Back to Homepage
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-20 py-16 lg:py-24">
        <div className="text-center mb-20">
          <span className="font-montserrat text-xs font-bold uppercase tracking-[0.4em] text-aurelia-gold mb-4 block">Personal Selection</span>
          <h1 className="font-playfair text-5xl font-bold tracking-tight">MY WISHLIST</h1>
        </div>

        {wishlistedItems.length === 0 ? (
          <div className="py-24 text-center border-y border-gray-100">
            <Heart className="w-12 h-12 mx-auto mb-6 text-gray-200 stroke-1" />
            <h3 className="font-playfair text-2xl mb-4 italic text-gray-400">Your wishlist is empty</h3>
            <button onClick={onBack} className="aurelia-btn-dark">Start Shopping</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {wishlistedItems.map((product) => (
              <div key={product.id} className="group border border-gray-100 p-6 hover:border-aurelia-gold transition-slow relative">
                <button 
                  onClick={() => onRemove(product.id)}
                  className="absolute top-4 right-4 p-2 text-gray-300 hover:text-red-500 transition-colors z-10"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                
                <div className="aspect-square bg-aurelia-cream overflow-hidden mb-6 cursor-pointer" onClick={() => onViewProduct(product)}>
                  <img src={product.image} alt={product.name} className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110" />
                </div>

                <div className="text-center">
                  <p className="font-montserrat text-[9px] font-bold uppercase tracking-[0.2em] text-aurelia-muted mb-2">{product.brand}</p>
                  <h3 className="font-montserrat text-sm font-medium mb-4 truncate">{product.name}</h3>
                  <p className="font-playfair text-xl font-bold mb-6">৳{product.price.toLocaleString()}</p>
                  
                  <button 
                    onClick={() => onAddToCart(product)}
                    className="w-full py-4 bg-aurelia-black text-aurelia-ivory font-montserrat text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-aurelia-gold hover:text-aurelia-black transition-all flex items-center justify-center gap-3"
                  >
                    <ShoppingBag className="w-4 h-4" /> Add To Bag
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
