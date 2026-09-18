import { useMemo, useState, useEffect } from 'react';
import { AdminPage, Product } from './types';
import { getSession, logout, isAdmin, AuthUser } from './auth';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Products from './components/Products';
import Orders from './components/Orders';
import Customers from './components/Customers';
import AdminPanel from './components/AdminPanel';
import Analytics from './components/Analytics';
import Settings from './components/Settings';
import CategoryManager from './components/CategoryManager';
import Storefront from './components/Storefront';
import Cart, { CartItem } from './components/Cart';
import Checkout from './components/Checkout';
import ProductDetail from './components/ProductDetail';
import Shop from './components/Shop';
import WishlistPage from './components/Wishlist';
import InfoPage from './components/InfoPage';
import AuthPage from './components/AuthPage';

function AdminDashboard({ onLogout, user }: { onLogout: () => void; user: AuthUser }) {
  const [currentPage, setCurrentPage] = useState<AdminPage>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard />;
      case 'products': return <Products />;
      case 'categories': return <CategoryManager />;
      case 'orders': return <Orders />;
      case 'customers': return <Customers />;
      case 'admins': return <AdminPanel />;
      case 'analytics': return <Analytics />;
      case 'settings': return <Settings />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-luxury-darker animate-fade-in">
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
        <Header currentPage={currentPage} sidebarCollapsed={sidebarCollapsed} />
        <div className="px-8 py-2 flex items-center justify-between">
          <p className="text-[10px] text-luxury-muted uppercase tracking-widest">
            Logged in as <span className="text-luxury-accent font-bold">{user.name}</span> · {user.role.replace('_', ' ')}
          </p>
          <button onClick={onLogout} className="text-[10px] uppercase tracking-widest font-bold bg-luxury-card border border-luxury-border px-4 py-2 rounded-none text-luxury-muted hover:text-luxury-accent transition-all flex items-center gap-2">
            Exit to Storefront
          </button>
        </div>
        <main className="p-8 pt-2">{renderPage()}</main>
      </div>
    </div>
  );
}

const infoContent: Record<string, { title: string; label: string; paragraphs: string[] }> = {
  heritage: {
    title: 'Our Heritage', label: 'The Aurelia World',
    paragraphs: [
      'AURELIA was created for clients who appreciate discretion, refinement and timeless design.',
      'From Gulshan evenings to destination gifting, every product is chosen to feel intentional and elevated.',
    ],
  },
  'our-story': {
    title: 'Our Story', label: 'About AURELIA',
    paragraphs: [
      'AURELIA is a curated luxury lifestyle destination built around authenticity and premium presentation.',
      'We focus on products that feel personal and lasting — perfumes, watches, leather accessories, eyewear and gifts.',
    ],
  },
  'about-aurelia': {
    title: 'About AURELIA', label: 'Brand Profile',
    paragraphs: [
      'Our design language is minimal and editorial. Our service philosophy is private, polished and premium.',
      'Every touchpoint is crafted to reflect a modern luxury house rather than a discount marketplace.',
    ],
  },
  journal: { title: 'Journal', label: 'Editorial Notes', paragraphs: ['The AURELIA journal features product stories, gifting guides and style editorials.'] },
  contact: { title: 'Contact', label: 'Client Services', paragraphs: ['Email: hello@aurelia.com · Phone: +880 1711 000000 · Dhaka, Bangladesh'] },
  shipping: { title: 'Shipping', label: 'Delivery', paragraphs: ['Secure delivery across Bangladesh with complimentary delivery on qualifying orders.'] },
  returns: { title: 'Returns', label: 'Policy', paragraphs: ['Returns accepted within return window if items remain unused and in original packaging.'] },
  faq: { title: 'FAQ', label: 'Questions', paragraphs: ['This storefront supports cart, checkout, search, wishlist and integrated admin dashboard.'] },
  'privacy-policy': { title: 'Privacy Policy', label: 'Legal', paragraphs: ['We value discretion and responsible handling of personal information.'] },
};

export default function App() {
  const [view, setView] = useState<'store' | 'auth' | 'admin' | 'checkout' | 'detail' | 'shop' | 'wishlist' | 'info'>('store');
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [shopCategory, setShopCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [currentInfoKey, setCurrentInfoKey] = useState<string>('heritage');

  // Restore session on mount
  useEffect(() => {
    const session = getSession();
    if (session) setCurrentUser(session);
  }, []);

  const handleAuthSuccess = (user: AuthUser) => {
    setCurrentUser(user);
    if (isAdmin(user)) {
      setView('admin');
    } else {
      setView('store');
    }
  };

  const handleLogout = () => {
    logout();
    setCurrentUser(null);
    setView('store');
    window.scrollTo(0, 0);
  };

  const handleAccountClick = () => {
    if (currentUser && isAdmin(currentUser)) {
      setView('admin');
    } else {
      setView('auth');
    }
  };

  const addToCart = (product: { id: string; name: string; brand: string; price: number; image: string }) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) return prev.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...prev, { ...product, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const updateQuantity = (id: string, quantity: number) => setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)));
  const removeItem = (id: string) => setCartItems((prev) => prev.filter((item) => item.id !== id));
  const toggleWishlist = (id: string) => setWishlist((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  const openShop = (category: string) => { setShopCategory(category); setSearchQuery(''); setView('shop'); window.scrollTo(0, 0); };
  const handleSearch = (query: string) => { setSearchQuery(query); setShopCategory('All'); setView('shop'); window.scrollTo(0, 0); };
  const openProductDetail = (product: Product) => { setSelectedProduct(product); setView('detail'); window.scrollTo(0, 0); };
  const openInfoPage = (key: string) => { if (key in infoContent) { setCurrentInfoKey(key); setView('info'); window.scrollTo(0, 0); } };
  const navigateHome = () => { setView('store'); window.scrollTo(0, 0); };

  const currentInfo = useMemo(() => infoContent[currentInfoKey] || infoContent.heritage, [currentInfoKey]);

  const renderContent = () => {
    switch (view) {
      case 'checkout':
        return <Checkout items={cartItems} onBack={() => { setView('store'); setCartOpen(true); }} onOrderComplete={() => { setCartItems([]); navigateHome(); }} />;
      case 'auth':
        return <AuthPage onSuccess={handleAuthSuccess} onBack={navigateHome} />;
      case 'admin':
        return currentUser && isAdmin(currentUser)
          ? <AdminDashboard onLogout={handleLogout} user={currentUser} />
          : <AuthPage onSuccess={handleAuthSuccess} onBack={navigateHome} />;
      case 'detail':
        return selectedProduct ? <ProductDetail product={selectedProduct} onBack={navigateHome} onAddToCart={addToCart} isWishlisted={wishlist.includes(selectedProduct.id)} onToggleWishlist={toggleWishlist} /> : null;
      case 'shop':
        return <Shop initialCategory={shopCategory} searchQuery={searchQuery} onBack={navigateHome} onAddToCart={addToCart} onViewProduct={openProductDetail} wishlist={wishlist} onToggleWishlist={toggleWishlist} />;
      case 'wishlist':
        return <WishlistPage wishlistIds={wishlist} onBack={navigateHome} onAddToCart={addToCart} onRemove={toggleWishlist} onViewProduct={openProductDetail} />;
      case 'info':
        return <InfoPage title={currentInfo.title} label={currentInfo.label} paragraphs={currentInfo.paragraphs} onBack={navigateHome} />;
      default:
        return (
          <Storefront
            onAdminLogin={handleAccountClick}
            onAddToCart={addToCart}
            cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
            onCartOpen={() => setCartOpen(true)}
            onCategoryClick={openShop}
            onProductClick={openProductDetail}
            onSearch={handleSearch}
            onWishlistClick={() => setView('wishlist')}
            wishlistCount={wishlist.length}
            onInfoNavigate={openInfoPage}
            activeCategory={shopCategory}
          />
        );
    }
  };

  return (
    <>
      {renderContent()}
      <Cart items={cartItems} isOpen={cartOpen} onClose={() => setCartOpen(false)} onUpdateQuantity={updateQuantity} onRemove={removeItem} onCheckout={() => { setCartOpen(false); setView('checkout'); }} />
    </>
  );
}
