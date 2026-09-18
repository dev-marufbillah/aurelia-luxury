import React from 'react';
import { mockStats, revenueData, categoryData, mockOrders } from '../data';
import {
  DollarSign,
  ShoppingCart,
  Package,
  Users,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Clock,
  Eye,
} from 'lucide-react';

function StatCard({ title, value, growth, icon: Icon, color }: {
  title: string;
  value: string;
  growth: number;
  icon: React.ElementType;
  color: string;
}) {
  const isPositive = growth > 0;
  return (
    <div className="bg-luxury-card border border-luxury-border rounded-2xl p-6 hover:border-luxury-accent/30 transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-lg ${
          isPositive ? 'bg-green-500/10 text-luxury-success' : 'bg-red-500/10 text-luxury-danger'
        }`}>
          {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {Math.abs(growth)}%
        </div>
      </div>
      <p className="text-luxury-muted text-sm mb-1">{title}</p>
      <p className="text-2xl font-bold text-luxury-text font-playfair">{value}</p>
    </div>
  );
}

function MiniChart({ data }: { data: typeof revenueData }) {
  const max = Math.max(...data.map((d) => d.revenue));
  return (
    <div className="flex items-end gap-2 h-40">
      {data.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-2">
          <div className="w-full relative group">
            <div
              className="w-full bg-gradient-to-t from-gold-500/80 to-gold-400/40 rounded-t-lg transition-all duration-300 hover:from-gold-400 hover:to-gold-300/60 cursor-pointer"
              style={{ height: `${(d.revenue / max) * 120}px` }}
            />
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-luxury-darker border border-luxury-border rounded-lg px-2 py-1 text-xs text-luxury-text whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              ৳{(d.revenue / 1000).toFixed(0)}K
            </div>
          </div>
          <span className="text-[10px] text-luxury-muted">{d.month}</span>
        </div>
      ))}
    </div>
  );
}

function CategoryChart({ data }: { data: typeof categoryData }) {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  let offset = 0;

  return (
    <div className="flex items-center gap-8">
      <div className="relative w-40 h-40">
        <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
          {data.map((d, i) => {
            const dashArray = (d.value / total) * 100;
            const dashOffset = -offset;
            offset += dashArray;
            return (
              <circle
                key={i}
                cx="18"
                cy="18"
                r="15.5"
                fill="none"
                stroke={d.color}
                strokeWidth="3"
                strokeDasharray={`${dashArray} ${100 - dashArray}`}
                strokeDashoffset={dashOffset}
                className="transition-all duration-500"
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-lg font-bold text-luxury-text">{total}%</p>
            <p className="text-[10px] text-luxury-muted">Total</p>
          </div>
        </div>
      </div>
      <div className="space-y-2 flex-1">
        {data.map((d, i) => (
          <div key={i} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }} />
              <span className="text-luxury-muted">{d.name}</span>
            </div>
            <span className="text-luxury-text font-medium">{d.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const statusStyles: Record<string, string> = {
  pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  processing: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  shipped: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  delivered: 'bg-green-500/10 text-green-400 border-green-500/20',
  cancelled: 'bg-red-500/10 text-red-400 border-red-500/20',
};

export default function Dashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value={`৳${(mockStats.totalRevenue / 100000).toFixed(1)}L`}
          growth={mockStats.revenueGrowth}
          icon={DollarSign}
          color="bg-gradient-to-br from-gold-500 to-gold-700"
        />
        <StatCard
          title="Total Orders"
          value={mockStats.totalOrders.toLocaleString()}
          growth={mockStats.orderGrowth}
          icon={ShoppingCart}
          color="bg-gradient-to-br from-blue-500 to-blue-700"
        />
        <StatCard
          title="Products"
          value={mockStats.totalProducts.toLocaleString()}
          growth={mockStats.productGrowth}
          icon={Package}
          color="bg-gradient-to-br from-purple-500 to-purple-700"
        />
        <StatCard
          title="Customers"
          value={mockStats.totalCustomers.toLocaleString()}
          growth={mockStats.customerGrowth}
          icon={Users}
          color="bg-gradient-to-br from-emerald-500 to-emerald-700"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="xl:col-span-2 bg-luxury-card border border-luxury-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-playfair text-lg font-bold text-luxury-text">Revenue Overview</h3>
              <p className="text-sm text-luxury-muted">Last 7 months performance</p>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-luxury-success flex items-center gap-1">
                <ArrowUpRight className="w-4 h-4" /> +23.5%
              </span>
            </div>
          </div>
          <MiniChart data={revenueData} />
        </div>

        {/* Category Distribution */}
        <div className="bg-luxury-card border border-luxury-border rounded-2xl p-6">
          <h3 className="font-playfair text-lg font-bold text-luxury-text mb-6">Sales by Category</h3>
          <CategoryChart data={categoryData} />
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-luxury-card border border-luxury-border rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-playfair text-lg font-bold text-luxury-text">Recent Orders</h3>
            <p className="text-sm text-luxury-muted">Latest customer orders</p>
          </div>
          <button className="text-sm text-luxury-accent hover:text-gold-400 transition-colors flex items-center gap-1">
            View All <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-luxury-border">
                <th className="text-left py-3 px-4 text-xs font-medium text-luxury-muted uppercase tracking-wider">Order ID</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-luxury-muted uppercase tracking-wider">Customer</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-luxury-muted uppercase tracking-wider">Amount</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-luxury-muted uppercase tracking-wider">Status</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-luxury-muted uppercase tracking-wider">Date</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-luxury-muted uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody>
              {mockOrders.slice(0, 5).map((order, i) => (
                <tr key={order.id} className="border-b border-luxury-border/50 hover:bg-luxury-border/10 transition-colors" style={{ animationDelay: `${i * 50}ms` }}>
                  <td className="py-4 px-4">
                    <span className="text-sm font-mono text-luxury-accent">{order.id}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <p className="text-sm text-luxury-text">{order.customer}</p>
                      <p className="text-xs text-luxury-muted">{order.email}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm font-medium text-luxury-text">৳{order.total.toLocaleString()}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium border ${statusStyles[order.status]}`}>
                      {order.status === 'pending' && <Clock className="w-3 h-3" />}
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-luxury-muted">{order.date}</td>
                  <td className="py-4 px-4">
                    <button className="p-2 rounded-lg hover:bg-luxury-border/30 text-luxury-muted hover:text-luxury-accent transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
