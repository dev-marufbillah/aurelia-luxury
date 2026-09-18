import { useState } from 'react';
import {
  Store,

  CreditCard,
  Bell,
  Shield,
  Palette,
  Mail,
  Save,
  Check,
} from 'lucide-react';

interface SettingSection {
  id: string;
  label: string;
  icon: React.ElementType;
}

const sections: SettingSection[] = [
  { id: 'general', label: 'General', icon: Store },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'payment', label: 'Payment', icon: CreditCard },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'email', label: 'Email', icon: Mail },
];

export default function Settings() {
  const [activeSection, setActiveSection] = useState('general');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-luxury-card border border-luxury-border rounded-2xl p-4 space-y-1 sticky top-24">
            {sections.map((section) => {
              const SectionIcon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${
                    activeSection === section.id
                      ? 'bg-luxury-accent/10 text-luxury-accent border border-luxury-accent/20'
                      : 'text-luxury-muted hover:text-luxury-text hover:bg-luxury-dark/50 border border-transparent'
                  }`}
                >
                  <SectionIcon className="w-4 h-4" />
                  {section.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3 space-y-6">
          {activeSection === 'general' && (
            <div className="bg-luxury-card border border-luxury-border rounded-2xl p-6 space-y-6">
              <h3 className="font-playfair text-lg font-bold text-luxury-text">Store Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs text-luxury-muted uppercase tracking-wider mb-2">Store Name</label>
                  <input
                    type="text"
                    defaultValue="Aurelia Luxury"
                    className="w-full px-4 py-3 bg-luxury-dark border border-luxury-border rounded-xl text-sm text-luxury-text focus:outline-none focus:border-luxury-accent/50 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs text-luxury-muted uppercase tracking-wider mb-2">Store URL</label>
                  <input
                    type="text"
                    defaultValue="aurelia-luxury.com"
                    className="w-full px-4 py-3 bg-luxury-dark border border-luxury-border rounded-xl text-sm text-luxury-text focus:outline-none focus:border-luxury-accent/50 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs text-luxury-muted uppercase tracking-wider mb-2">Contact Email</label>
                  <input
                    type="email"
                    defaultValue="hello@aurelia-luxury.com"
                    className="w-full px-4 py-3 bg-luxury-dark border border-luxury-border rounded-xl text-sm text-luxury-text focus:outline-none focus:border-luxury-accent/50 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs text-luxury-muted uppercase tracking-wider mb-2">Currency</label>
                  <select className="w-full px-4 py-3 bg-luxury-dark border border-luxury-border rounded-xl text-sm text-luxury-text focus:outline-none focus:border-luxury-accent/50 transition-all">
                    <option>BDT (৳)</option>
                    <option>USD ($)</option>
                    <option>EUR (€)</option>
                    <option>GBP (£)</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs text-luxury-muted uppercase tracking-wider mb-2">Store Description</label>
                <textarea
                  rows={3}
                  defaultValue="Aurelia — Your destination for luxury goods. Premium quality, exclusive collections."
                  className="w-full px-4 py-3 bg-luxury-dark border border-luxury-border rounded-xl text-sm text-luxury-text focus:outline-none focus:border-luxury-accent/50 transition-all resize-none"
                />
              </div>
            </div>
          )}

          {activeSection === 'appearance' && (
            <div className="bg-luxury-card border border-luxury-border rounded-2xl p-6 space-y-6">
              <h3 className="font-playfair text-lg font-bold text-luxury-text">Appearance Settings</h3>
              <div>
                <label className="block text-xs text-luxury-muted uppercase tracking-wider mb-3">Theme Color</label>
                <div className="flex gap-3">
                  {['#e2b86a', '#60a5fa', '#4ade80', '#f87171', '#c084fc', '#fbbf24'].map((color) => (
                    <button
                      key={color}
                      className="w-10 h-10 rounded-xl border-2 border-transparent hover:border-white/30 transition-all"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-luxury-dark rounded-xl">
                <div>
                  <p className="text-sm text-luxury-text">Dark Mode</p>
                  <p className="text-xs text-luxury-muted">Use dark theme for the admin panel</p>
                </div>
                <div className="w-12 h-7 bg-luxury-accent rounded-full p-1 cursor-pointer">
                  <div className="w-5 h-5 bg-luxury-darker rounded-full translate-x-5 transition-transform" />
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-luxury-dark rounded-xl">
                <div>
                  <p className="text-sm text-luxury-text">Compact Sidebar</p>
                  <p className="text-xs text-luxury-muted">Use collapsed sidebar by default</p>
                </div>
                <div className="w-12 h-7 bg-luxury-border rounded-full p-1 cursor-pointer">
                  <div className="w-5 h-5 bg-luxury-muted rounded-full transition-transform" />
                </div>
              </div>
            </div>
          )}

          {activeSection === 'payment' && (
            <div className="bg-luxury-card border border-luxury-border rounded-2xl p-6 space-y-6">
              <h3 className="font-playfair text-lg font-bold text-luxury-text">Payment Configuration</h3>
              {[
                { name: 'Credit Card (Stripe)', enabled: true },
                { name: 'PayPal', enabled: true },
                { name: 'Bank Transfer', enabled: true },
                { name: 'Cash on Delivery', enabled: false },
                { name: 'bKash', enabled: false },
              ].map((method) => (
                <div key={method.name} className="flex items-center justify-between p-4 bg-luxury-dark rounded-xl">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-luxury-accent" />
                    <span className="text-sm text-luxury-text">{method.name}</span>
                  </div>
                  <div className={`w-12 h-7 ${method.enabled ? 'bg-luxury-accent' : 'bg-luxury-border'} rounded-full p-1 cursor-pointer`}>
                    <div className={`w-5 h-5 ${method.enabled ? 'bg-luxury-darker translate-x-5' : 'bg-luxury-muted'} rounded-full transition-transform`} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeSection === 'notifications' && (
            <div className="bg-luxury-card border border-luxury-border rounded-2xl p-6 space-y-6">
              <h3 className="font-playfair text-lg font-bold text-luxury-text">Notification Preferences</h3>
              {[
                { label: 'New Order Alerts', desc: 'Get notified for every new order', enabled: true },
                { label: 'Low Stock Warnings', desc: 'Alert when product stock is below 5', enabled: true },
                { label: 'Customer Reviews', desc: 'Notify when a new review is posted', enabled: false },
                { label: 'Weekly Report', desc: 'Receive weekly performance summary', enabled: true },
                { label: 'Security Alerts', desc: 'Important security notifications', enabled: true },
              ].map((notif) => (
                <div key={notif.label} className="flex items-center justify-between p-4 bg-luxury-dark rounded-xl">
                  <div>
                    <p className="text-sm text-luxury-text">{notif.label}</p>
                    <p className="text-xs text-luxury-muted">{notif.desc}</p>
                  </div>
                  <div className={`w-12 h-7 ${notif.enabled ? 'bg-luxury-accent' : 'bg-luxury-border'} rounded-full p-1 cursor-pointer`}>
                    <div className={`w-5 h-5 ${notif.enabled ? 'bg-luxury-darker translate-x-5' : 'bg-luxury-muted'} rounded-full transition-transform`} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeSection === 'security' && (
            <div className="bg-luxury-card border border-luxury-border rounded-2xl p-6 space-y-6">
              <h3 className="font-playfair text-lg font-bold text-luxury-text">Security Settings</h3>
              <div>
                <label className="block text-xs text-luxury-muted uppercase tracking-wider mb-2">Two-Factor Authentication</label>
                <div className="flex items-center justify-between p-4 bg-luxury-dark rounded-xl">
                  <div>
                    <p className="text-sm text-luxury-text">Enable 2FA</p>
                    <p className="text-xs text-luxury-muted">Add an extra layer of security to your account</p>
                  </div>
                  <div className="w-12 h-7 bg-luxury-accent rounded-full p-1 cursor-pointer">
                    <div className="w-5 h-5 bg-luxury-darker rounded-full translate-x-5 transition-transform" />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-xs text-luxury-muted uppercase tracking-wider mb-2">Change Password</label>
                <div className="space-y-3">
                  <input type="password" placeholder="Current password" className="w-full px-4 py-3 bg-luxury-dark border border-luxury-border rounded-xl text-sm text-luxury-text placeholder-luxury-muted focus:outline-none focus:border-luxury-accent/50 transition-all" />
                  <input type="password" placeholder="New password" className="w-full px-4 py-3 bg-luxury-dark border border-luxury-border rounded-xl text-sm text-luxury-text placeholder-luxury-muted focus:outline-none focus:border-luxury-accent/50 transition-all" />
                  <input type="password" placeholder="Confirm new password" className="w-full px-4 py-3 bg-luxury-dark border border-luxury-border rounded-xl text-sm text-luxury-text placeholder-luxury-muted focus:outline-none focus:border-luxury-accent/50 transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-luxury-muted uppercase tracking-wider mb-2">Session Management</label>
                <div className="p-4 bg-luxury-dark rounded-xl">
                  <p className="text-sm text-luxury-text">Active Sessions: 2</p>
                  <p className="text-xs text-luxury-muted mt-1">Current device • Chrome on Windows</p>
                  <button className="text-xs text-luxury-danger mt-2 hover:underline">Revoke all other sessions</button>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'email' && (
            <div className="bg-luxury-card border border-luxury-border rounded-2xl p-6 space-y-6">
              <h3 className="font-playfair text-lg font-bold text-luxury-text">Email Configuration</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs text-luxury-muted uppercase tracking-wider mb-2">SMTP Host</label>
                  <input type="text" defaultValue="smtp.gmail.com" className="w-full px-4 py-3 bg-luxury-dark border border-luxury-border rounded-xl text-sm text-luxury-text focus:outline-none focus:border-luxury-accent/50 transition-all" />
                </div>
                <div>
                  <label className="block text-xs text-luxury-muted uppercase tracking-wider mb-2">SMTP Port</label>
                  <input type="text" defaultValue="587" className="w-full px-4 py-3 bg-luxury-dark border border-luxury-border rounded-xl text-sm text-luxury-text focus:outline-none focus:border-luxury-accent/50 transition-all" />
                </div>
                <div>
                  <label className="block text-xs text-luxury-muted uppercase tracking-wider mb-2">Email Username</label>
                  <input type="text" defaultValue="noreply@aurelia-luxury.com" className="w-full px-4 py-3 bg-luxury-dark border border-luxury-border rounded-xl text-sm text-luxury-text focus:outline-none focus:border-luxury-accent/50 transition-all" />
                </div>
                <div>
                  <label className="block text-xs text-luxury-muted uppercase tracking-wider mb-2">Email Password</label>
                  <input type="password" defaultValue="••••••••" className="w-full px-4 py-3 bg-luxury-dark border border-luxury-border rounded-xl text-sm text-luxury-text focus:outline-none focus:border-luxury-accent/50 transition-all" />
                </div>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all shadow-lg ${
                saved
                  ? 'bg-luxury-success text-luxury-darker shadow-green-500/20'
                  : 'bg-gradient-to-r from-gold-500 to-gold-600 text-luxury-darker hover:from-gold-400 hover:to-gold-500 shadow-gold-500/20'
              }`}
            >
              {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              {saved ? 'Saved!' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
