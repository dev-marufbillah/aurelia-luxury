import { Star, Heart, ShoppingBag, ArrowLeft, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (p: any) => void;
  isWishlisted: boolean;
  onToggleWishlist: (id: string) => void;
}

export default function ProductDetail({ product, onBack, onAddToCart, isWishlisted, onToggleWishlist }: ProductDetailProps) {
  return (
    <div className="min-h-screen bg-white text-aurelia-black animate-fade-in">
      {/* Navigation */}
      <div className="border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-20 py-5 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest hover:text-aurelia-gold transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Collection
          </button>
          <span className="font-playfair text-xl font-bold tracking-widest hidden sm:block">AURELIA</span>
          <div className="w-20" /> {/* Spacer */}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-20 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left: Images */}
          <div className="space-y-4">
            <div className="aspect-[4/5] bg-aurelia-cream overflow-hidden group">
              <img src={product.image} alt={product.name} className="w-full h-full object-contain transition-transform duration-1000 group-hover:scale-110" />
            </div>
          </div>

          {/* Right: Info */}
          <div className="flex flex-col">
            <div className="mb-8 pb-8 border-b border-gray-100">
              <p className="font-montserrat text-xs font-bold uppercase tracking-[0.4em] text-aurelia-gold mb-4">{product.brand}</p>
              <h1 className="font-playfair text-4xl lg:text-5xl font-bold leading-tight mb-4">{product.name}</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-aurelia-gold text-aurelia-gold" />)}
                  <span className="text-xs font-bold ml-1">(4.9)</span>
                </div>
                <div className="h-4 w-[1px] bg-gray-200" />
                <span className="text-xs text-gray-400 uppercase tracking-widest">SKU: {product.id}</span>
              </div>
            </div>

            <div className="mb-10">
              <div className="flex items-baseline gap-4 mb-2">
                <span className="font-playfair text-3xl font-bold">৳{product.price.toLocaleString()}</span>
                <span className="text-gray-400 line-through text-lg">৳{(product.price * 1.15).toLocaleString()}</span>
              </div>
              <p className="text-xs text-green-600 font-bold uppercase tracking-widest">In Stock · Ready to Ship</p>
            </div>

            <p className="font-montserrat text-sm text-gray-600 font-light leading-relaxed mb-10 tracking-wide">
              Experience the pinnacle of luxury with the {product.name} from {product.brand}. 
              Crafted with meticulous attention to detail and premium materials, this piece represents 
              the core of our signature collection. Designed for those who appreciate timeless elegance.
            </p>

            <div className="flex gap-4 mb-12">
              <button 
                onClick={() => onAddToCart(product)}
                className="flex-1 aurelia-btn-dark h-14 flex items-center justify-center gap-3"
              >
                <ShoppingBag className="w-4 h-4" /> Add To Bag
              </button>
              <button 
                onClick={() => onToggleWishlist(product.id)}
                className={`w-14 h-14 border border-gray-200 flex items-center justify-center transition-all hover:border-aurelia-gold ${isWishlisted ? 'bg-aurelia-gold border-aurelia-gold text-white' : 'text-aurelia-black'}`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Product Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-gray-100">
              <div className="flex flex-col items-center text-center">
                <ShieldCheck className="w-6 h-6 text-aurelia-gold mb-3 stroke-1" />
                <span className="text-[9px] font-bold uppercase tracking-widest">Authentic</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <Truck className="w-6 h-6 text-aurelia-gold mb-3 stroke-1" />
                <span className="text-[9px] font-bold uppercase tracking-widest">Express Ship</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <RotateCcw className="w-6 h-6 text-aurelia-gold mb-3 stroke-1" />
                <span className="text-[9px] font-bold uppercase tracking-widest">Easy Return</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
