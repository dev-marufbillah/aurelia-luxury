import React from 'react';
import { AdminPage } from '../types';
import { Bell, Search } from 'lucide-react';

interface HeaderProps {
  currentPage: AdminPage;
  sidebarCollapsed: boolean;
}

const pageTitles: Record<AdminPage, { title: string; subtitle: string }> = {
  dashboard: { title: 'Dashboard', subtitle: 'Welcome back, Maruf! Here\'s your business overview.' },
  products: { title: 'Products', subtitle: 'Manage your luxury product catalog.' },
  orders: { title: 'Orders', subtitle: 'Track and manage customer orders.' },
  customers: { title: 'Customers', subtitle: 'View and manage your customer base.' },
  admins: { title: 'Admin Panel', subtitle: 'Manage admin users and permissions.' },
  analytics: { title: 'Analytics', subtitle: 'Deep insights into your business performance.' },
  settings: { title: 'Settings', subtitle: 'Configure your store settings.' },
  categories: { title: 'Categories', subtitle: 'Add, edit and manage product categories.' },
};

export default function Header({ currentPage, sidebarCollapsed }: HeaderProps) {
  const { title, subtitle } = pageTitles[currentPage];
  const [searchFocused, setSearchFocused] = React.useState(false);

  return (
    <header className={`sticky top-0 z-40 bg-luxury-darker/80 backdrop-blur-xl border-b border-luxury-border transition-all duration-300 ${sidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
      <div className="flex items-center justify-between px-8 py-4">
        <div>
          <h2 className="font-playfair text-2xl font-bold text-luxury-text">{title}</h2>
          <p className="text-sm text-luxury-muted mt-0.5">{subtitle}</p>
        </div>

        <div className="flex items-center gap-4">
          {/* Search */}
          <div className={`relative transition-all duration-300 ${searchFocused ? 'w-72' : 'w-56'}`}>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-luxury-muted" />
            <input
              type="text"
              placeholder="Search anything..."
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className="w-full pl-10 pr-4 py-2.5 bg-luxury-card border border-luxury-border rounded-xl text-sm text-luxury-text placeholder-luxury-muted focus:outline-none focus:border-luxury-accent/50 focus:ring-1 focus:ring-luxury-accent/20 transition-all"
            />
          </div>

          {/* Notifications */}
          <button className="relative p-2.5 rounded-xl bg-luxury-card border border-luxury-border hover:border-luxury-accent/30 transition-all group">
            <Bell className="w-5 h-5 text-luxury-muted group-hover:text-luxury-accent transition-colors" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-luxury-danger rounded-full text-[10px] font-bold text-white flex items-center justify-center">
              3
            </span>
          </button>

          {/* Time */}
          <div className="text-right hidden lg:block">
            <p className="text-xs text-luxury-muted">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
            </p>
            <p className="text-sm text-luxury-text font-medium">
              {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
