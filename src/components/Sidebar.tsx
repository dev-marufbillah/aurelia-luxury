import React from 'react';
import { AdminPage } from '../types';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  ShieldCheck,
  BarChart3,
  Settings,
  LogOut,
  Crown,
  ChevronLeft,
  ChevronRight,
  FolderOpen,
} from 'lucide-react';

interface SidebarProps {
  currentPage: AdminPage;
  onPageChange: (page: AdminPage) => void;
  collapsed: boolean;
  onToggle: () => void;
}

const menuItems: { id: AdminPage; label: string; icon: React.ElementType }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'products', label: 'Products', icon: Package },
  { id: 'categories', label: 'Categories', icon: FolderOpen },
  { id: 'orders', label: 'Orders', icon: ShoppingCart },
  { id: 'customers', label: 'Customers', icon: Users },
  { id: 'admins', label: 'Admin Panel', icon: ShieldCheck },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ currentPage, onPageChange, collapsed, onToggle }: SidebarProps) {
  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-luxury-dark border-r border-luxury-border flex flex-col z-50 transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Logo */}
      <div className="p-6 flex items-center gap-3 border-b border-luxury-border">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center flex-shrink-0">
          <Crown className="w-5 h-5 text-luxury-darker" />
        </div>
        {!collapsed && (
          <div className="animate-fade-in">
            <h1 className="font-playfair text-xl font-bold text-luxury-accent tracking-wide">Aurelia</h1>
            <p className="text-[10px] text-luxury-muted uppercase tracking-[3px]">Luxury Admin</p>
          </div>
        )}
      </div>

      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-20 w-6 h-6 bg-luxury-card border border-luxury-border rounded-full flex items-center justify-center text-luxury-muted hover:text-luxury-accent transition-colors"
      >
        {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </button>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? 'bg-gradient-to-r from-gold-500/20 to-gold-600/10 text-luxury-accent border border-gold-500/30'
                  : 'text-luxury-muted hover:text-luxury-text hover:bg-luxury-card/50 border border-transparent'
              }`}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-luxury-accent' : 'group-hover:text-luxury-accent'}`} />
              {!collapsed && (
                <span className="text-sm font-medium animate-fade-in">{item.label}</span>
              )}
              {isActive && !collapsed && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-luxury-accent pulse-gold" />
              )}
            </button>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-luxury-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-luxury-darker font-bold text-sm flex-shrink-0">
            MS
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0 animate-fade-in">
              <p className="text-sm font-medium text-luxury-text truncate">Maruf Salauddin</p>
              <p className="text-xs text-luxury-accent flex items-center gap-1">
                <Crown className="w-3 h-3" /> Super Admin
              </p>
            </div>
          )}
          {!collapsed && (
            <button className="text-luxury-muted hover:text-luxury-danger transition-colors">
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
