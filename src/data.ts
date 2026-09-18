import { User, Product, Order, DashboardStats } from './types';

export const mockStats: DashboardStats = {
  totalRevenue: 84500000,
  totalOrders: 1284,
  totalProducts: 456,
  totalCustomers: 8932,
  revenueGrowth: 23.5,
  orderGrowth: 18.2,
  productGrowth: 5.8,
  customerGrowth: 12.4,
};

export const mockUsers: User[] = [
  { id: '1', name: 'Maruf Salauddin', email: 'marufsalauddinofficial@gmail.com', role: 'super_admin', avatar: 'MS', status: 'active', lastLogin: '2 min ago', createdAt: '2024-01-15' },
  { id: '2', name: 'Ayesha Rahman', email: 'ayesha@aurelia.com', role: 'admin', avatar: 'AR', status: 'active', lastLogin: '1 hr ago', createdAt: '2024-02-20' },
  { id: '3', name: 'Karim Hossain', email: 'karim@aurelia.com', role: 'manager', avatar: 'KH', status: 'active', lastLogin: '3 hrs ago', createdAt: '2024-03-10' },
  { id: '4', name: 'Nadia Islam', email: 'nadia@aurelia.com', role: 'staff', avatar: 'NI', status: 'inactive', lastLogin: '2 days ago', createdAt: '2024-04-05' },
  { id: '5', name: 'Rafiq Ahmed', email: 'rafiq@aurelia.com', role: 'admin', avatar: 'RA', status: 'active', lastLogin: '5 hrs ago', createdAt: '2024-03-22' },
  { id: '6', name: 'Sadia Begum', email: 'sadia@aurelia.com', role: 'staff', avatar: 'SB', status: 'suspended', lastLogin: '1 week ago', createdAt: '2024-05-01' },
];

export const mockProducts: Product[] = [
  { id: 'P001', name: 'Oud Wood Eau de Parfum', brand: 'TOM FORD', category: 'Perfume', price: 34500, stock: 12, status: 'active', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1000&auto=format&fit=crop', sales: 189 },
  { id: 'P002', name: 'Submariner Date', brand: 'ROLEX', category: 'Watches', price: 620000, stock: 5, status: 'active', image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1000&auto=format&fit=crop', sales: 42 },
  { id: 'P003', name: 'Wayfarer Classic', brand: 'RAY-BAN', category: 'Eyewear', price: 18500, stock: 34, status: 'active', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1000&auto=format&fit=crop', sales: 356 },
  { id: 'P004', name: 'Puzzle Bag', brand: 'LOEWE', category: 'Bags & Leather', price: 295000, stock: 8, status: 'active', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000&auto=format&fit=crop', sales: 92 },
  { id: 'P005', name: 'Aventus', brand: 'CREED', category: 'Perfume', price: 46000, stock: 15, status: 'active', image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1000&auto=format&fit=crop', sales: 312 },
  { id: 'P006', name: 'Speedmaster Moonwatch', brand: 'OMEGA', category: 'Watches', price: 720000, stock: 3, status: 'active', image: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?q=80&w=1000&auto=format&fit=crop', sales: 28 },
  { id: 'P007', name: 'Meisterstück Card Holder', brand: 'MONTBLANC', category: 'Bags & Leather', price: 21000, stock: 22, status: 'active', image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1000&auto=format&fit=crop', sales: 167 },
  { id: 'P008', name: 'PO0714SM', brand: 'PERSOL', category: 'Eyewear', price: 22500, stock: 18, status: 'active', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1000&auto=format&fit=crop', sales: 145 },
  { id: 'P009', name: 'Diamond Tennis Bracelet', brand: 'CARTIER', category: 'Jewelry', price: 1250000, stock: 2, status: 'active', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000&auto=format&fit=crop', sales: 15 },
  { id: 'P010', name: 'Baccarat Rouge 540', brand: 'MAISON FRANCIS KURKDJIAN', category: 'Perfume', price: 58000, stock: 0, status: 'draft', image: 'https://images.unsplash.com/photo-1622618991746-fe6004dc3a47?q=80&w=1000&auto=format&fit=crop', sales: 450 },
];

export const mockOrders: Order[] = [
  { id: 'ORD-7001', customer: 'Fatima Al-Rashid', email: 'fatima@email.com', total: 654500, status: 'delivered', items: 2, date: '2025-01-15', paymentMethod: 'Credit Card' },
  { id: 'ORD-7002', customer: 'Ahmed Khan', email: 'ahmed@email.com', total: 720000, status: 'shipped', items: 1, date: '2025-01-14', paymentMethod: 'Bank Transfer' },
  { id: 'ORD-7003', customer: 'Sarah Williams', email: 'sarah@email.com', total: 46000, status: 'processing', items: 1, date: '2025-01-14', paymentMethod: 'Credit Card' },
  { id: 'ORD-7004', customer: 'Mohammad Ali', email: 'ali@email.com', total: 295000, status: 'pending', items: 1, date: '2025-01-13', paymentMethod: 'PayPal' },
  { id: 'ORD-7005', customer: 'Lisa Chen', email: 'lisa@email.com', total: 67000, status: 'delivered', items: 2, date: '2025-01-12', paymentMethod: 'Credit Card' },
  { id: 'ORD-7006', customer: 'Omar Hassan', email: 'omar@email.com', total: 1250000, status: 'cancelled', items: 1, date: '2025-01-11', paymentMethod: 'Bank Transfer' },
  { id: 'ORD-7007', customer: 'Priya Sharma', email: 'priya@email.com', total: 34500, status: 'shipped', items: 1, date: '2025-01-10', paymentMethod: 'Credit Card' },
  { id: 'ORD-7008', customer: 'James Brown', email: 'james@email.com', total: 21000, status: 'processing', items: 1, date: '2025-01-10', paymentMethod: 'PayPal' },
];

export const revenueData = [
  { month: 'Jul', revenue: 4500000, orders: 189 },
  { month: 'Aug', revenue: 5200000, orders: 202 },
  { month: 'Sep', revenue: 4950000, orders: 195 },
  { month: 'Oct', revenue: 6800000, orders: 234 },
  { month: 'Nov', revenue: 8500000, orders: 367 },
  { month: 'Dec', revenue: 12200000, orders: 498 },
  { month: 'Jan', revenue: 9850000, orders: 378 },
];

export const categoryData = [
  { name: 'Watches', value: 45, color: '#C6A15B' },
  { name: 'Perfume', value: 20, color: '#60a5fa' },
  { name: 'Leather', value: 15, color: '#4ade80' },
  { name: 'Jewelry', value: 12, color: '#c084fc' },
  { name: 'Eyewear', value: 8, color: '#f87171' },
];
