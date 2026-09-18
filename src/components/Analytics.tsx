import { revenueData, categoryData, mockStats } from '../data';
import {
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Eye,
  ShoppingBag,
  CreditCard,
  Globe,
  Smartphone,
  Monitor,
} from 'lucide-react';

const topProducts = [
  { name: 'Oud Royal Perfume', sales: 312, revenue: 4680000, trend: 12 },
  { name: 'Cashmere Scarf', sales: 278, revenue: 1807000, trend: 8 },
  { name: 'Italian Leather Handbag', sales: 201, revenue: 5628000, trend: -3 },
  { name: 'Silk Cashmere Blazer', sales: 156, revenue: 1950000, trend: 15 },
  { name: 'Pearl Earrings', sales: 145, revenue: 3190000, trend: 5 },
];

const trafficSources = [
  { source: 'Direct', visits: 34500, percentage: 38, icon: Globe },
  { source: 'Social Media', visits: 28200, percentage: 31, icon: Smartphone },
  { source: 'Organic Search', visits: 18900, percentage: 21, icon: Monitor },
  { source: 'Referral', visits: 9100, percentage: 10, icon: ArrowUpRight },
];

export default function Analytics() {
  const maxRevenue = Math.max(...revenueData.map((d) => d.revenue));

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-luxury-card border border-luxury-border rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-luxury-darker" />
            </div>
            <div>
              <p className="text-xs text-luxury-muted">Avg Order Value</p>
              <p className="text-xl font-bold text-luxury-text font-playfair">৳{Math.round(mockStats.totalRevenue / mockStats.totalOrders).toLocaleString()}</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs text-luxury-success">
            <TrendingUp className="w-3 h-3" /> +8.3% vs last month
          </div>
        </div>

        <div className="bg-luxury-card border border-luxury-border rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
              <Eye className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-luxury-muted">Conversion Rate</p>
              <p className="text-xl font-bold text-luxury-text font-playfair">4.8%</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs text-luxury-success">
            <TrendingUp className="w-3 h-3" /> +1.2% vs last month
          </div>
        </div>

        <div className="bg-luxury-card border border-luxury-border rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-luxury-muted">Return Rate</p>
              <p className="text-xl font-bold text-luxury-text font-playfair">2.1%</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs text-luxury-danger">
            <TrendingDown className="w-3 h-3" /> -0.5% vs last month
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-luxury-card border border-luxury-border rounded-2xl p-6">
        <h3 className="font-playfair text-lg font-bold text-luxury-text mb-6">Monthly Revenue Breakdown</h3>
        <div className="space-y-4">
          {revenueData.map((d, i) => (
            <div key={i} className="flex items-center gap-4">
              <span className="text-sm text-luxury-muted w-10">{d.month}</span>
              <div className="flex-1 h-8 bg-luxury-dark rounded-lg overflow-hidden relative">
                <div
                  className="h-full bg-gradient-to-r from-gold-500 to-gold-400 rounded-lg transition-all duration-700 flex items-center justify-end pr-3"
                  style={{ width: `${(d.revenue / maxRevenue) * 100}%` }}
                >
                  <span className="text-[10px] font-bold text-luxury-darker">৳{(d.revenue / 1000).toFixed(0)}K</span>
                </div>
              </div>
              <span className="text-xs text-luxury-muted w-16 text-right">{d.orders} orders</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="bg-luxury-card border border-luxury-border rounded-2xl p-6">
          <h3 className="font-playfair text-lg font-bold text-luxury-text mb-6">Top Performing Products</h3>
          <div className="space-y-4">
            {topProducts.map((product, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-luxury-dark/50 transition-colors">
                <span className="text-lg font-bold text-luxury-accent w-8 text-center font-playfair">#{i + 1}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-luxury-text">{product.name}</p>
                  <p className="text-xs text-luxury-muted">{product.sales} sales • ৳{(product.revenue / 1000).toFixed(0)}K revenue</p>
                </div>
                <span className={`flex items-center gap-1 text-xs font-medium ${
                  product.trend > 0 ? 'text-luxury-success' : 'text-luxury-danger'
                }`}>
                  {product.trend > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {Math.abs(product.trend)}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-luxury-card border border-luxury-border rounded-2xl p-6">
          <h3 className="font-playfair text-lg font-bold text-luxury-text mb-6">Traffic Sources</h3>
          <div className="space-y-5">
            {trafficSources.map((source, i) => {
              const SourceIcon = source.icon;
              return (
                <div key={i}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <SourceIcon className="w-4 h-4 text-luxury-accent" />
                      <span className="text-sm text-luxury-text">{source.source}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-luxury-muted">{source.visits.toLocaleString()} visits</span>
                      <span className="text-sm font-medium text-luxury-text">{source.percentage}%</span>
                    </div>
                  </div>
                  <div className="h-2 bg-luxury-dark rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-gold-500 to-gold-400 rounded-full transition-all duration-700"
                      style={{ width: `${source.percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Category Breakdown */}
          <div className="mt-8 pt-6 border-t border-luxury-border">
            <h4 className="text-sm font-medium text-luxury-text mb-4">Category Distribution</h4>
            <div className="flex flex-wrap gap-2">
              {categoryData.map((cat, i) => (
                <div key={i} className="flex items-center gap-2 px-3 py-1.5 bg-luxury-dark rounded-lg">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                  <span className="text-xs text-luxury-muted">{cat.name}</span>
                  <span className="text-xs font-medium text-luxury-text">{cat.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
