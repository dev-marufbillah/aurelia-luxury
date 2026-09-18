import { useState } from 'react';
import { mockOrders } from '../data';
import { Order } from '../types';
import {
  Search,

  Eye,
  Clock,
  CheckCircle2,
  Truck,
  PackageCheck,
  XCircle,
  Download,

} from 'lucide-react';

const statusConfig: Record<string, { color: string; icon: React.ElementType; label: string }> = {
  pending: { color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20', icon: Clock, label: 'Pending' },
  processing: { color: 'bg-blue-500/10 text-blue-400 border-blue-500/20', icon: CheckCircle2, label: 'Processing' },
  shipped: { color: 'bg-purple-500/10 text-purple-400 border-purple-500/20', icon: Truck, label: 'Shipped' },
  delivered: { color: 'bg-green-500/10 text-green-400 border-green-500/20', icon: PackageCheck, label: 'Delivered' },
  cancelled: { color: 'bg-red-500/10 text-red-400 border-red-500/20', icon: XCircle, label: 'Cancelled' },
};

export default function Orders() {
  const [orders] = useState<Order[]>(mockOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const statuses = ['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'];

  const filtered = orders.filter((o) => {
    const matchSearch = o.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === 'all' || o.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const statusCounts = statuses.reduce((acc, s) => {
    acc[s] = s === 'all' ? orders.length : orders.filter((o) => o.status === s).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Status Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {statuses.map((s) => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
              filterStatus === s
                ? 'bg-luxury-accent text-luxury-darker'
                : 'bg-luxury-card border border-luxury-border text-luxury-muted hover:text-luxury-text hover:border-luxury-accent/30'
            }`}
          >
            {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
            <span className={`text-xs px-1.5 py-0.5 rounded-md ${
              filterStatus === s ? 'bg-luxury-darker/20' : 'bg-luxury-border'
            }`}>
              {statusCounts[s]}
            </span>
          </button>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-luxury-muted" />
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-luxury-card border border-luxury-border rounded-xl text-sm text-luxury-text placeholder-luxury-muted focus:outline-none focus:border-luxury-accent/50 transition-all"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-luxury-card border border-luxury-border rounded-xl text-sm text-luxury-muted hover:text-luxury-text hover:border-luxury-accent/30 transition-all">
          <Download className="w-4 h-4" /> Export
        </button>
      </div>

      {/* Orders Table */}
      <div className="bg-luxury-card border border-luxury-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-luxury-border bg-luxury-dark/50">
                <th className="text-left py-4 px-5 text-xs font-medium text-luxury-muted uppercase tracking-wider">Order</th>
                <th className="text-left py-4 px-5 text-xs font-medium text-luxury-muted uppercase tracking-wider">Customer</th>
                <th className="text-left py-4 px-5 text-xs font-medium text-luxury-muted uppercase tracking-wider">Items</th>
                <th className="text-left py-4 px-5 text-xs font-medium text-luxury-muted uppercase tracking-wider">Amount</th>
                <th className="text-left py-4 px-5 text-xs font-medium text-luxury-muted uppercase tracking-wider">Payment</th>
                <th className="text-left py-4 px-5 text-xs font-medium text-luxury-muted uppercase tracking-wider">Status</th>
                <th className="text-left py-4 px-5 text-xs font-medium text-luxury-muted uppercase tracking-wider">Date</th>
                <th className="text-left py-4 px-5 text-xs font-medium text-luxury-muted uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((order) => {
                const config = statusConfig[order.status];
                const StatusIcon = config.icon;
                return (
                  <tr
                    key={order.id}
                    className="border-b border-luxury-border/50 hover:bg-luxury-border/10 transition-colors cursor-pointer"
                    onClick={() => setSelectedOrder(order)}
                  >
                    <td className="py-4 px-5">
                      <span className="text-sm font-mono text-luxury-accent">{order.id}</span>
                    </td>
                    <td className="py-4 px-5">
                      <div>
                        <p className="text-sm text-luxury-text font-medium">{order.customer}</p>
                        <p className="text-xs text-luxury-muted">{order.email}</p>
                      </div>
                    </td>
                    <td className="py-4 px-5 text-sm text-luxury-text">{order.items}</td>
                    <td className="py-4 px-5">
                      <span className="text-sm font-semibold text-luxury-text">৳{order.total.toLocaleString()}</span>
                    </td>
                    <td className="py-4 px-5 text-sm text-luxury-muted">{order.paymentMethod}</td>
                    <td className="py-4 px-5">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border ${config.color}`}>
                        <StatusIcon className="w-3 h-3" />
                        {config.label}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-sm text-luxury-muted">{order.date}</td>
                    <td className="py-4 px-5">
                      <button className="p-2 rounded-lg hover:bg-luxury-border/30 text-luxury-muted hover:text-luxury-accent transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedOrder(null)}>
          <div className="bg-luxury-dark border border-luxury-border rounded-2xl w-full max-w-md p-6 animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-playfair text-xl font-bold text-luxury-text">Order Details</h3>
              <span className="font-mono text-luxury-accent text-sm">{selectedOrder.id}</span>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between py-3 border-b border-luxury-border">
                <span className="text-sm text-luxury-muted">Customer</span>
                <span className="text-sm text-luxury-text font-medium">{selectedOrder.customer}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-luxury-border">
                <span className="text-sm text-luxury-muted">Email</span>
                <span className="text-sm text-luxury-text">{selectedOrder.email}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-luxury-border">
                <span className="text-sm text-luxury-muted">Items</span>
                <span className="text-sm text-luxury-text">{selectedOrder.items}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-luxury-border">
                <span className="text-sm text-luxury-muted">Total</span>
                <span className="text-sm text-luxury-accent font-bold">৳{selectedOrder.total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-luxury-border">
                <span className="text-sm text-luxury-muted">Payment</span>
                <span className="text-sm text-luxury-text">{selectedOrder.paymentMethod}</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-sm text-luxury-muted">Status</span>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border ${statusConfig[selectedOrder.status].color}`}>
                  {statusConfig[selectedOrder.status].label}
                </span>
              </div>
            </div>
            <button
              onClick={() => setSelectedOrder(null)}
              className="w-full mt-6 py-3 bg-luxury-card border border-luxury-border rounded-xl text-sm text-luxury-text hover:border-luxury-accent/50 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
