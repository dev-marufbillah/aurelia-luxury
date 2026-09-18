import { useState } from 'react';
import { Search, Mail, MapPin, Calendar } from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  email: string;
  avatar: string;
  totalSpent: number;
  orders: number;
  location: string;
  joinDate: string;
  tier: 'platinum' | 'gold' | 'silver' | 'bronze';
}

const customers: Customer[] = [
  { id: '1', name: 'Fatima Al-Rashid', email: 'fatima@email.com', avatar: 'FA', totalSpent: 485000, orders: 12, location: 'Dubai, UAE', joinDate: '2024-01-10', tier: 'platinum' },
  { id: '2', name: 'Ahmed Khan', email: 'ahmed@email.com', avatar: 'AK', totalSpent: 320000, orders: 8, location: 'Dhaka, BD', joinDate: '2024-02-15', tier: 'gold' },
  { id: '3', name: 'Sarah Williams', email: 'sarah@email.com', avatar: 'SW', totalSpent: 195000, orders: 6, location: 'London, UK', joinDate: '2024-03-20', tier: 'gold' },
  { id: '4', name: 'Mohammad Ali', email: 'ali@email.com', avatar: 'MA', totalSpent: 560000, orders: 15, location: 'Riyadh, SA', joinDate: '2024-01-05', tier: 'platinum' },
  { id: '5', name: 'Lisa Chen', email: 'lisa@email.com', avatar: 'LC', totalSpent: 128000, orders: 4, location: 'Singapore', joinDate: '2024-04-12', tier: 'silver' },
  { id: '6', name: 'Omar Hassan', email: 'omar@email.com', avatar: 'OH', totalSpent: 95000, orders: 3, location: 'Cairo, EG', joinDate: '2024-05-01', tier: 'silver' },
  { id: '7', name: 'Priya Sharma', email: 'priya@email.com', avatar: 'PS', totalSpent: 67000, orders: 2, location: 'Mumbai, IN', joinDate: '2024-06-15', tier: 'bronze' },
  { id: '8', name: 'James Brown', email: 'james@email.com', avatar: 'JB', totalSpent: 245000, orders: 7, location: 'New York, US', joinDate: '2024-02-28', tier: 'gold' },
];

const tierColors: Record<string, string> = {
  platinum: 'from-gray-300 to-gray-100 text-gray-800',
  gold: 'from-gold-400 to-gold-600 text-luxury-darker',
  silver: 'from-gray-400 to-gray-500 text-white',
  bronze: 'from-amber-600 to-amber-800 text-white',
};

const tierBorders: Record<string, string> = {
  platinum: 'border-gray-300/30',
  gold: 'border-gold-400/30',
  silver: 'border-gray-400/30',
  bronze: 'border-amber-600/30',
};

export default function Customers() {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = customers.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Customers', value: '8,932', sub: '+12.4% this month' },
          { label: 'Platinum Members', value: '234', sub: 'Top tier' },
          { label: 'Avg. Lifetime Value', value: '৳186K', sub: 'Per customer' },
          { label: 'Repeat Rate', value: '68%', sub: '+5.2% improvement' },
        ].map((stat, i) => (
          <div key={i} className="bg-luxury-card border border-luxury-border rounded-xl p-4">
            <p className="text-xs text-luxury-muted uppercase tracking-wider">{stat.label}</p>
            <p className="text-xl font-bold text-luxury-text font-playfair mt-1">{stat.value}</p>
            <p className="text-xs text-luxury-success mt-1">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-luxury-muted" />
        <input
          type="text"
          placeholder="Search customers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-luxury-card border border-luxury-border rounded-xl text-sm text-luxury-text placeholder-luxury-muted focus:outline-none focus:border-luxury-accent/50 transition-all"
        />
      </div>

      {/* Customer Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((customer) => (
          <div
            key={customer.id}
            className={`bg-luxury-card border ${tierBorders[customer.tier]} rounded-2xl p-5 hover:border-luxury-accent/40 transition-all duration-300 group`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tierColors[customer.tier]} flex items-center justify-center font-bold text-sm`}>
                  {customer.avatar}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-luxury-text">{customer.name}</h3>
                  <p className="text-xs text-luxury-muted flex items-center gap-1">
                    <Mail className="w-3 h-3" /> {customer.email}
                  </p>
                </div>
              </div>
              <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-md bg-gradient-to-r ${tierColors[customer.tier]}`}>
                {customer.tier}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-luxury-dark/50 rounded-lg p-3">
                <p className="text-xs text-luxury-muted">Total Spent</p>
                <p className="text-sm font-bold text-luxury-accent">৳{(customer.totalSpent / 1000).toFixed(0)}K</p>
              </div>
              <div className="bg-luxury-dark/50 rounded-lg p-3">
                <p className="text-xs text-luxury-muted">Orders</p>
                <p className="text-sm font-bold text-luxury-text">{customer.orders}</p>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-luxury-muted">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" /> {customer.location}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" /> {customer.joinDate}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
