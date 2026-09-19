import { useState, useEffect, useCallback } from 'react';
import { mockProducts } from '../data';
import {
  ShoppingBag,
  Search,
  User,
  Heart,
  ArrowRight,
  Menu,
  X,
  ChevronRight,
  ShieldCheck,
  Package,
  Truck,
  Star,
} from 'lucide-react';
import { Product } from '../types';

interface StorefrontProps {
  onAdminLogin: () => void;
  onAddToCart?: (product: { id: string; name: string; brand: string; price: number; image: string }) => void;
  cartCount?: number;
  onCartOpen?: () => void;
  onCategoryClick?: (category: string) => void;
  onProductClick?: (product: Product) => void;
  onSearch?: (query: string) => void;
  onWishlistClick?: () => void;
  wishlistCount?: number;
  onInfoNavigate?: (key: string) => void;
  activeCategory?: string;
}

/* ─── Hero slides (5 Luxurious Dynamic Slides) ──────────────── */
const heroSlides = [
  {
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2000&auto=format&fit=crop',
    tag: 'Luxury Lifestyle Store',
    title: 'TIMELESS.\nREFINED. YOURS.',
    sub: 'Curated luxury pieces for those who appreciate the finer things.',
  },
  {
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=2000&auto=format&fit=crop',
    tag: 'Signature Watches',
    title: 'PRECISION.\nCRAFTED. ELEGANT.',
    sub: 'Swiss-made timepieces that define a generation of excellence.',
  },
  {
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=2000&auto=format&fit=crop',
    tag: 'Exclusive Fragrance',
    title: 'AURA OF\nSOPHISTICATION.',
    sub: 'Bespoke scents crafted for the modern visionary and elegant soul.',
  },
  {
    image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=2000&auto=format&fit=crop',
    tag: 'The Leather Edit',
    title: 'UNCOMPROMISING\nQUALITY.',
    sub: 'Handcrafted leather goods that age beautifully with your journey.',
  },
  {
    image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=2000&auto=format&fit=crop',
    tag: 'Fine Jewelry',
    title: 'BRILLIANCE.\nUNLEASHED.',
    sub: 'Exquisite jewelry pieces reflecting pure elegance and grace.',
  },
];

/* ─── Categories ────────────────────────────────────── */
const categories = [
  { name: 'Perfume', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=700&auto=format&fit=crop' },
  { name: 'Watches', image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=700&auto=format&fit=crop' },
  { name: 'Eyewear', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=700&auto=format&fit=crop' },
  { name: 'Bags & Leather', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=700&auto=format&fit=crop' },
  { name: 'Jewelry', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=700&auto=format&fit=crop' },
];

/* ─── Testimonials ──────────────────────────────────── */
const testimonials = [
  {
    name: 'Tasnim Rahman',
    location: 'Gulshan',
    text: '“Aurelia’s service is exceptional. The products are authentic and beautifully packaged.”',
  },
  {
    name: 'Fahim Ahmed',
    location: 'Banani',
    text: '“The packaging, the quality, the experience — everything was perfect. Highly recommended.”',
  },
  {
    name: 'Sabrina Islam',
    location: 'Baridhara',
    text: '“Premium products and a seamless shopping experience. Truly a luxury experience.”',
  },
];

/* ─── Instagram Gallery ─────────────────────────────── */
const galleryImages = [
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=500&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=500&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=500&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=500&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=500&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=500&auto=format&fit=crop',
];

export default function Storefront({
  onAdminLogin,
  onAddToCart,
  cartCount: externalCartCount,
  onCartOpen,
  onCategoryClick,
  onProductClick,
  onSearch,
  onWishlistClick,
  wishlistCount = 0,
  onInfoNavigate,
  activeCategory,
}: StorefrontProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);
  const [internalCart, setInternalCart] = useState(0);
  const [localWishlist, setLocalWishlist] = useState<string[]>([]);
  const [notification, setNotification] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchInput, setShowSearchInput] = useState(false);

  const cartCount = externalCartCount ?? internalCart;

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setHeroIndex((i) => (i + 1) % heroSlides.length), 6000);
    return () => clearInterval(t);
  }, []);

  const handleAddToCart = useCallback((product: typeof mockProducts[0]) => {
    if (onAddToCart) {
      onAddToCart({ id: product.id, name: product.name, brand: product.brand, price: product.price, image: product.image });
    } else {
      setInternalCart((c) => c + 1);
    }
    setNotification(`${product.name} added to bag`);
    setTimeout(() => setNotification(''), 2200);
  }, [onAddToCart]);

  const toggleLocalWishlist = (id: string) => {
    setLocalWishlist((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() && onSearch) {
      onSearch(searchQuery.trim());
      setShowSearchInput(false);
    }
  };

  const slide = heroSlides[heroIndex];

  return (
    <div className="storefront-body min-h-screen">
      {notification && (
        <div className="fixed top-6 right-6 z-[300] bg-aurelia-black text-aurelia-ivory text-xs font-montserrat uppercase tracking-widest px-5 py-3 shadow-2xl animate-fade-in flex items-center gap-3">
          <ShoppingBag className="w-4 h-4 text-aurelia-gold" />
          {notification}
        </div>
      )}

      {/* 1. Announcement Bar */}
      <div className="bg-aurelia-black py-2 text-center">
        <p className="font-montserrat text-[10px] md:text-[11px] text-aurelia-ivory uppercase tracking-[0.32em] font-medium">
          — Complimentary Delivery on Orders Above ৳5,000 —
        </p>
      </div>

      {/* 2. Premium Navigation */}
      <nav className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-white/95 backdrop-blur-lg shadow-[0_1px_0_rgba(0,0,0,0.08)] h-[74px]' : 'bg-white h-[82px]'
      }`}>
        <div className="max-w-[1440px] mx-auto h-full px-6 lg:px-20 flex items-center justify-between">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex-shrink-0 focus:outline-none">
            <span className="font-playfair text-2xl md:text-[28px] font-bold tracking-[0.08em] text-aurelia-black uppercase">AURELIA</span>
          </button>

          {/* Desktop Nav with Zoom & Underline */}
          <div className="hidden lg:flex items-center gap-8 font-montserrat text-[11.5px] font-bold uppercase tracking-[0.15em]">
            {['New Arrivals', 'Perfume', 'Watches', 'Eyewear', 'Bags & Leather', 'Jewelry', 'Gifts'].map((n) => {
              const isActive = activeCategory === n;
              const matchedCat = categories.find(c => c.name === n);
              return (
                <div key={n} className="relative group/nav">
                  <button 
                    onClick={() => onCategoryClick?.(n)} 
                    className={`relative py-1 transition-transform duration-300 group ${isActive ? 'text-aurelia-gold scale-110' : 'text-aurelia-black/90 hover:text-aurelia-gold hover:scale-110'}`}
                  >
                    {n}
                    <span className={`absolute bottom-0 left-0 h-[1.5px] bg-aurelia-gold transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover/nav:w-full'}`} />
                  </button>
                  
                  {/* Mega Dropdown Hover Effect */}
                  {matchedCat && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover/nav:opacity-100 group-hover/nav:visible transition-all duration-300 z-50">
                      <div className="bg-white border border-black/8 shadow-xl p-5 w-[240px] animate-fade-in">
                        <div className="aspect-[4/3] overflow-hidden mb-3">
                          <img src={matchedCat.image} alt={matchedCat.name} className="w-full h-full object-cover transition-transform duration-700 group-hover/nav:scale-110" />
                        </div>
                        <p className="font-playfair text-base font-semibold text-aurelia-black mb-1">{matchedCat.name}</p>
                        <p className="font-montserrat text-[9px] text-aurelia-muted uppercase tracking-[0.3em] mb-3">Explore Collection</p>
                        <button
                          onClick={() => onCategoryClick?.(n)} 
                          className="w-full py-2 bg-aurelia-black text-aurelia-ivory text-[9px] font-bold uppercase tracking-[0.25em] hover:bg-aurelia-gold hover:text-aurelia-black transition-colors"
                        >
                          Shop {n}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4 md:gap-5">
            <div className="relative hidden sm:block">
              {showSearchInput ? (
                <form onSubmit={handleSearchSubmit} className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center bg-white border-b border-aurelia-black animate-fade-in">
                  <input
                    autoFocus
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="w-44 md:w-60 bg-transparent px-2 py-1 text-xs focus:outline-none"
                  />
                  <button type="submit" className="p-1"><Search className="w-4 h-4" /></button>
                  <button type="button" onClick={() => setShowSearchInput(false)} className="p-1"><X className="w-4 h-4" /></button>
                </form>
              ) : (
                <button onClick={() => setShowSearchInput(true)} className="p-1 text-aurelia-black/70 hover:text-aurelia-gold transition-colors">
                  <Search className="w-[18px] h-[18px] stroke-[1.5]" />
                </button>
              )}
            </div>

            <button onClick={onAdminLogin} className="p-1 text-aurelia-black/70 hover:text-aurelia-gold transition-colors">
              <User className="w-[18px] h-[18px] stroke-[1.5]" />
            </button>

            <button onClick={onWishlistClick} className="p-1 text-aurelia-black/70 hover:text-aurelia-gold transition-colors hidden sm:block relative">
              <Heart className="w-[18px] h-[18px] stroke-[1.5]" />
              {wishlistCount > 0 && <span className="absolute -top-1 -right-1 w-3 h-3 bg-aurelia-gold rounded-full" />}
            </button>

            <button onClick={onCartOpen} className="p-1 text-aurelia-black/70 hover:text-aurelia-gold transition-colors relative">
              <ShoppingBag className="w-[18px] h-[18px] stroke-[1.5]" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-[18px] h-[18px] bg-aurelia-gold text-aurelia-black text-[9px] font-bold flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            <button className="lg:hidden p-1 text-aurelia-black" onClick={() => setMobileOpen(true)}>
              <Menu className="w-6 h-6 stroke-[1.5]" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[100] bg-aurelia-black text-aurelia-ivory flex flex-col animate-fade-in">
          <div className="flex items-center justify-between px-8 pt-8 pb-10 border-b border-aurelia-border">
            <span className="font-playfair text-2xl font-bold tracking-widest uppercase">AURELIA</span>
            <button onClick={() => setMobileOpen(false)}><X className="w-7 h-7" /></button>
          </div>
          <nav className="flex-1 px-8 py-10 space-y-7">
            {['New Arrivals', 'Perfume', 'Watches', 'Eyewear', 'Bags & Leather', 'Jewelry', 'Gifts'].map((n, i) => (
              <div key={n} className="animate-fade-up opacity-0" style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'forwards' }}>
                <button onClick={() => { onCategoryClick?.(n); setMobileOpen(false); }} className="flex items-center justify-between w-full text-left font-playfair text-2xl italic text-aurelia-ivory/90 hover:text-aurelia-gold transition-colors uppercase">
                  {n} <ChevronRight className="w-5 h-5 stroke-1" />
                </button>
              </div>
            ))}
          </nav>
        </div>
      )}

      {/* 3. HERO (Dynamic 5 Slides) */}
      <section className="relative h-[620px] md:h-[620px] bg-aurelia-black overflow-hidden flex items-center">
        {heroSlides.map((s, i) => (
          <div key={i} className={`absolute inset-0 transition-opacity duration-1000 ${i === heroIndex ? 'opacity-100' : 'opacity-0'}`}>
            <img src={s.image} alt="hero" className={`w-full h-full object-cover ${i === heroIndex ? 'animate-kenburns' : ''}`} />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/15" />
          </div>
        ))}

        <div className="relative z-10 max-w-[1440px] mx-auto w-full px-6 lg:px-20">
          <div className="max-w-xl">
            <div className="mb-6 animate-fade-up opacity-0 delay-100" style={{ animationFillMode: 'forwards' }}>
              <span className="font-montserrat text-[10px] font-bold uppercase tracking-[0.35em] text-aurelia-gold">{slide.tag}</span>
            </div>
            <div className="animate-fade-up opacity-0 delay-200" style={{ animationFillMode: 'forwards' }}>
              <h1 className="font-playfair text-5xl md:text-7xl lg:text-[82px] font-bold leading-[0.95] tracking-tight text-aurelia-ivory whitespace-pre-line mb-6 uppercase">
                {slide.title}
              </h1>
            </div>
            <div className="animate-fade-up opacity-0 delay-300" style={{ animationFillMode: 'forwards' }}>
              <p className="font-montserrat text-sm md:text-base font-light tracking-wide text-aurelia-ivory/70 mb-10 max-w-sm leading-relaxed">
                {slide.sub}
              </p>
            </div>
            <div className="animate-fade-up opacity-0 delay-400 flex flex-wrap gap-4" style={{ animationFillMode: 'forwards' }}>
              <button onClick={() => onCategoryClick?.('All')} className="aurelia-btn-gold">Explore Collection</button>
              <button onClick={() => onInfoNavigate?.('heritage')} className="aurelia-btn-outline">Discover Aurelia</button>
            </div>
          </div>
        </div>

        {/* Slide Indicators (01 to 05) */}
        <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 z-10 hidden md:flex flex-col items-center gap-3 text-aurelia-ivory/50">
          {heroSlides.map((_, i) => (
            <button key={i} onClick={() => setHeroIndex(i)} className={`text-[10px] font-montserrat tracking-[0.3em] ${i === heroIndex ? 'text-aurelia-gold' : 'hover:text-aurelia-ivory'}`}>
              0{i + 1}
            </button>
          ))}
        </div>
      </section>

      {/* 4. EXPLORE THE COLLECTION */}
      <section className="py-10 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
          <div className="gold-rule mb-6">
            <span className="font-montserrat text-[11px] font-bold uppercase tracking-[0.35em] text-aurelia-black">Explore The Collection</span>
          </div>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 md:grid md:grid-cols-5 md:gap-4">
            {categories.map((cat) => (
              <div key={cat.name} onClick={() => onCategoryClick?.(cat.name)} className="min-w-[220px] md:min-w-0 group cursor-pointer relative overflow-hidden aspect-[3/2] md:aspect-[4/5]">
                <img src={cat.image} alt={cat.name} className="product-card-img w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/45 transition-slow" />
                <div className="absolute inset-x-0 bottom-0 p-4 text-center">
                  <h3 className="font-montserrat text-aurelia-ivory text-[10px] font-semibold uppercase tracking-[0.28em]">{cat.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. NEW ARRIVALS */}
      <section className="py-10 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
          <div className="flex items-end justify-between mb-6">
            <h2 className="font-playfair text-[32px] md:text-[40px] font-medium tracking-tight text-aurelia-black uppercase">New Arrivals</h2>
            <button onClick={() => onCategoryClick?.('All')} className="hidden sm:flex items-center gap-2 font-montserrat text-[10px] font-bold uppercase tracking-[0.25em] text-aurelia-black hover:text-aurelia-gold transition-colors group">
              View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {mockProducts.slice(0, 4).map((product) => (
              <div key={product.id} className="product-card group cursor-pointer" onClick={() => onProductClick?.(product)}>
                <div className="relative overflow-hidden bg-[#fbfaf7] aspect-[4/5] mb-4 flex items-center justify-center p-4 border border-black/5">
                  <img src={product.image} alt={product.name} className="product-card-img w-full h-full object-contain" />
                  <div className="img-overlay" />
                  <button onClick={(e) => { e.stopPropagation(); toggleLocalWishlist(product.id); }} className="absolute top-3 right-3 p-1.5 text-aurelia-black/55 hover:text-aurelia-gold transition-colors">
                    <Heart className={`w-4 h-4 ${localWishlist.includes(product.id) ? 'fill-aurelia-gold text-aurelia-gold' : ''}`} />
                  </button>
                  <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-slow">
                    <button onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }} className="w-full py-3 bg-aurelia-black text-aurelia-ivory font-montserrat text-[10px] font-bold uppercase tracking-[0.25em] hover:bg-aurelia-gold hover:text-aurelia-black transition-colors">
                      Add To Bag
                    </button>
                  </div>
                </div>
                <div>
                  <p className="font-montserrat text-[9px] font-bold uppercase tracking-[0.25em] text-aurelia-muted mb-1">{product.brand}</p>
                  <h3 className="font-montserrat text-sm font-medium text-aurelia-black mb-1 truncate">{product.name}</h3>
                  <p className="font-montserrat text-[10px] text-aurelia-black/55 mb-2">{product.category}</p>
                  <p className="font-playfair text-lg font-bold text-aurelia-black tracking-tight">৳{product.price.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. SIGNATURE COLLECTION */}
      <section className="bg-aurelia-black text-aurelia-ivory mt-4">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 min-h-[360px]">
          <div className="relative overflow-hidden order-2 lg:order-1">
            <img src="https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1400&auto=format&fit=crop" alt="Signature collection" className="w-full h-full object-cover hover:scale-105 transition-xslow" />
          </div>
          <div className="order-1 lg:order-2 px-8 md:px-16 py-12 flex flex-col justify-center">
            <span className="font-montserrat text-[10px] font-bold uppercase tracking-[0.35em] text-aurelia-gold mb-4">The Signature Edit</span>
            <h2 className="font-playfair text-4xl md:text-5xl font-medium leading-tight mb-5">Luxury, Curated Differently.</h2>
            <p className="font-montserrat text-sm text-aurelia-ivory/65 leading-relaxed max-w-sm mb-8">Discover carefully selected pieces designed to elevate everyday moments.</p>
            <button onClick={() => onCategoryClick?.('All')} className="self-start px-8 py-3 border border-aurelia-gold text-aurelia-gold font-montserrat text-[10px] font-bold uppercase tracking-[0.22em] hover:bg-aurelia-gold hover:text-aurelia-black transition-slow">
              Explore Signature Collection
            </button>
          </div>
        </div>
      </section>

      {/* 7. THE AURELIA EDIT */}
      <section className="py-10 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
          <div className="flex items-end justify-between mb-6">
            <h2 className="font-playfair text-[30px] md:text-[38px] font-medium tracking-tight text-aurelia-black uppercase">The Aurelia Edit</h2>
            <button onClick={() => onCategoryClick?.('All')} className="hidden sm:flex items-center gap-2 font-montserrat text-[10px] font-bold uppercase tracking-[0.25em] text-aurelia-black hover:text-aurelia-gold transition-colors group">
              View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {mockProducts.slice(4, 8).map((product) => (
              <div key={product.id} className="product-card group cursor-pointer">
                <div className="relative overflow-hidden bg-[#fbfaf7] aspect-[4/5] mb-4 p-4 border border-black/5" onClick={() => onProductClick?.(product)}>
                  <img src={product.image} alt={product.name} className="product-card-img w-full h-full object-contain" />
                  <button onClick={(e) => { e.stopPropagation(); toggleLocalWishlist(product.id); }} className="absolute top-3 right-3 p-1.5 text-aurelia-black/55 hover:text-aurelia-gold transition-colors">
                    <Heart className={`w-4 h-4 ${localWishlist.includes(product.id) ? 'fill-aurelia-gold text-aurelia-gold' : ''}`} />
                  </button>
                </div>
                <div>
                  <p className="font-montserrat text-[9px] font-bold uppercase tracking-[0.25em] text-aurelia-muted mb-1">{product.brand}</p>
                  <h3 className="font-montserrat text-sm font-medium text-aurelia-black mb-1 truncate">{product.name}</h3>
                  <div className="flex items-center gap-0.5 mb-2">
                    {[...Array(5)].map((_, idx) => <Star key={idx} className="w-2.5 h-2.5 fill-aurelia-gold text-aurelia-gold" />)}
                    <span className="font-montserrat text-[9px] text-aurelia-muted ml-1">(4.8)</span>
                  </div>
                  <p className="font-playfair text-lg font-bold text-aurelia-black mb-3">৳{product.price.toLocaleString()}</p>
                  <button onClick={() => handleAddToCart(product)} className="w-full border border-aurelia-gold/50 py-2.5 font-montserrat text-[9px] font-bold uppercase tracking-[0.24em] text-aurelia-black hover:bg-aurelia-gold hover:text-aurelia-black transition-colors">
                    Add To Bag
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. LUXURY BENEFITS */}
      <section className="py-8 bg-white border-t border-b border-black/5">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {[
            { icon: ShieldCheck, title: 'Authentic Products', sub: 'Every piece is carefully selected for quality and authenticity.' },
            { icon: Package, title: 'Premium Packaging', sub: 'Every order arrives beautifully prepared for a memorable experience.' },
            { icon: Truck, title: 'Secure Delivery', sub: 'Reliable and secure delivery across Bangladesh.' },
          ].map(({ icon: Icon, title, sub }) => (
            <div key={title} className="flex items-start gap-4">
              <Icon className="w-6 h-6 text-aurelia-gold flex-shrink-0 stroke-[1.3]" />
              <div>
                <h4 className="font-montserrat text-[10px] font-bold uppercase tracking-[0.24em] text-aurelia-black mb-1">{title}</h4>
                <p className="font-montserrat text-xs text-aurelia-black/55 leading-relaxed">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. BRAND STORY */}
      <section className="bg-aurelia-black text-aurelia-ivory mt-4">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2">
          <div className="relative overflow-hidden min-h-[320px]">
            <img src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1200&auto=format&fit=crop" alt="Aurelia story" className="w-full h-full object-cover hover:scale-105 transition-xslow" />
          </div>
          <div className="px-8 md:px-16 py-12 flex flex-col justify-center">
            <span className="font-montserrat text-[10px] font-bold uppercase tracking-[0.35em] text-aurelia-gold mb-4">The Aurelia Story</span>
            <h2 className="font-playfair text-4xl md:text-5xl font-medium leading-tight mb-5">Elegance Is In The Details.</h2>
            <p className="font-montserrat text-sm text-aurelia-ivory/65 leading-relaxed max-w-sm mb-8">AURELIA brings carefully curated luxury lifestyle products together in one refined destination.</p>
            <button onClick={() => onInfoNavigate?.('our-story')} className="self-start px-8 py-3 border border-aurelia-gold text-aurelia-gold font-montserrat text-[10px] font-bold uppercase tracking-[0.22em] hover:bg-aurelia-gold hover:text-aurelia-black transition-slow">
              Our Story
            </button>
          </div>
        </div>
      </section>

      {/* 10. GIFT BANNER */}
      <section className="relative h-[260px] md:h-[320px] overflow-hidden bg-aurelia-black">
        <img src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1600&auto=format&fit=crop" alt="Gift collection" className="absolute inset-0 w-full h-full object-cover opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/20" />
        <div className="relative z-10 max-w-[1440px] mx-auto h-full px-6 lg:px-20 flex items-center">
          <div className="max-w-md text-aurelia-ivory">
            <h2 className="font-playfair text-3xl md:text-4xl font-medium mb-3 uppercase">Find A Gift They’ll Remember</h2>
            <p className="font-montserrat text-sm text-aurelia-ivory/70 leading-relaxed mb-5">Curated gifts for birthdays, weddings, anniversaries and unforgettable moments.</p>
            <button onClick={() => onCategoryClick?.('Gifts')} className="aurelia-btn-outline">Explore Gifts</button>
          </div>
        </div>
      </section>

      {/* 11. THE AURELIA EXPERIENCE */}
      <section className="py-14 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20 text-center">
          <div className="gold-rule mb-8">
            <span className="font-montserrat text-[11px] font-bold uppercase tracking-[0.35em] text-aurelia-black">The Aurelia Experience</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((item) => (
              <div key={item.name} className="border border-black/8 bg-white p-6 text-left hover:border-aurelia-gold transition-slow">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, idx) => <Star key={idx} className="w-3 h-3 fill-aurelia-gold text-aurelia-gold" />)}
                </div>
                <p className="font-montserrat text-sm text-aurelia-black/60 leading-7 mb-4">{item.text}</p>
                <div>
                  <p className="font-montserrat text-[10px] font-bold uppercase tracking-[0.2em] text-aurelia-black">{item.name}</p>
                  <p className="font-montserrat text-[10px] uppercase tracking-[0.2em] text-aurelia-muted mt-1">{item.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. INSTAGRAM GALLERY */}
      <section className="py-10 bg-white text-center">
        <div className="gold-rule mb-8">
          <span className="font-montserrat text-[11px] font-bold uppercase tracking-[0.35em] text-aurelia-black">Follow The Aurelia World</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 px-1">
          {galleryImages.map((img, idx) => (
            <div key={idx} className="aspect-[5/4] overflow-hidden group relative cursor-pointer">
              <img src={img} alt="gallery" className="w-full h-full object-cover transition-slow group-hover:scale-110" />
              <div className="absolute inset-0 bg-aurelia-black/0 group-hover:bg-aurelia-black/20 transition-slow flex items-center justify-center">
                <span className="text-white opacity-0 group-hover:opacity-100 transition-slow font-montserrat text-[9px] uppercase tracking-widest font-bold">View</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 13. NEWSLETTER */}
      <section className="py-10 bg-aurelia-black text-aurelia-ivory">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-8 items-center border border-white/5 px-6 md:px-10 py-8">
            <div>
              <h2 className="font-playfair text-3xl md:text-4xl font-medium mb-3 uppercase">Enter The World Of Luxury</h2>
              <p className="font-montserrat text-sm text-aurelia-ivory/55 leading-relaxed">Be the first to discover new collections, exclusive pieces and curated stories.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input type="email" placeholder="Your email address" className="flex-1 bg-transparent border border-white/15 px-4 py-3 text-sm text-aurelia-ivory placeholder:text-aurelia-ivory/25 focus:outline-none focus:border-aurelia-gold" />
              <button className="px-8 py-3 bg-aurelia-gold text-aurelia-black font-montserrat text-[10px] font-bold uppercase tracking-[0.25em] hover:bg-aurelia-ivory transition-colors">Subscribe</button>
            </div>
          </div>
        </div>
      </section>

      {/* 14. FOOTER */}
      <footer className="bg-aurelia-black text-aurelia-ivory border-t border-aurelia-border pt-12 pb-10 font-montserrat">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 mb-14">
            <div className="col-span-2 lg:col-span-1">
              <h3 className="font-playfair text-2xl font-bold tracking-[0.12em] mb-5 uppercase">AURELIA</h3>
              <p className="text-xs text-aurelia-muted font-light leading-relaxed tracking-wide mb-4">Luxury Lifestyle Store<br />Dhaka, Bangladesh</p>
            </div>

            <div>
              <h5 className="text-[9px] font-bold uppercase tracking-[0.3em] text-aurelia-gold mb-6">Shop</h5>
              <ul className="space-y-3 text-xs text-aurelia-muted">
                {['New Arrivals', 'Perfume', 'Watches', 'Eyewear', 'Bags & Leather', 'Jewelry', 'Gifts'].map((l) => (
                  <li key={l}><button onClick={() => onCategoryClick?.(l)} className="hover:text-aurelia-ivory transition-colors uppercase text-left">{l}</button></li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="text-[9px] font-bold uppercase tracking-[0.3em] text-aurelia-gold mb-6">About</h5>
              <ul className="space-y-3 text-xs text-aurelia-muted">
                {[
                  ['Our Story', 'our-story'],
                  ['About Aurelia', 'about-aurelia'],
                  ['Journal', 'journal'],
                  ['Contact', 'contact'],
                ].map(([label, key]) => (
                  <li key={key}><button onClick={() => onInfoNavigate?.(key)} className="hover:text-aurelia-ivory transition-colors uppercase text-left">{label}</button></li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="text-[9px] font-bold uppercase tracking-[0.3em] text-aurelia-gold mb-6">Customer Care</h5>
              <ul className="space-y-3 text-xs text-aurelia-muted">
                {[
                  ['Shipping', 'shipping'],
                  ['Returns', 'returns'],
                  ['FAQ', 'faq'],
                  ['Privacy Policy', 'privacy-policy'],
                ].map(([label, key]) => (
                  <li key={key}><button onClick={() => onInfoNavigate?.(key)} className="hover:text-aurelia-ivory transition-colors uppercase text-left">{label}</button></li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="text-[9px] font-bold uppercase tracking-[0.3em] text-aurelia-gold mb-6">Contact</h5>
              <div className="text-xs text-aurelia-muted leading-7 uppercase">
                <p>Dhaka, Bangladesh</p>
                <p>hello@aurelia.com</p>
                <p>+880 1711 000000</p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-aurelia-border flex flex-col md:flex-row items-center justify-between gap-5">
            <p className="text-[9px] text-aurelia-muted uppercase tracking-[0.3em]">© 2026 AURELIA. All Rights Reserved.</p>
            <button onClick={onAdminLogin} className="text-[9px] text-aurelia-muted hover:text-aurelia-gold transition-colors uppercase tracking-[0.3em] border border-aurelia-muted/20 px-3 py-1">
              Admin Portal
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}