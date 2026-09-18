/* ───────────────────────────────────────────────────────
   AURELIA — Auth + Store (localStorage-based persistence)
   ─────────────────────────────────────────────────────── */

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'super_admin' | 'admin' | 'customer';
  avatar: string;
  createdAt: string;
}

const USERS_KEY = 'aurelia_users';
const SESSION_KEY = 'aurelia_session';
const CATEGORIES_KEY = 'aurelia_categories';

// ─── Super Admin seed ──────────────────────────────────
const SUPER_ADMIN: AuthUser = {
  id: 'sa-001',
  name: 'Maruf Salauddin',
  email: 'marufsalauddinoffcal@gmail.com',
  phone: '01711000000',
  role: 'super_admin',
  avatar: 'MS',
  createdAt: '2024-01-01',
};
const SUPER_ADMIN_PASSWORD = 'Aurelia@1';   // 8 chars: Upper + Lower + Number + Symbol

// ─── Init ──────────────────────────────────────────────
function getUsers(): (AuthUser & { password: string })[] {
  const raw = localStorage.getItem(USERS_KEY);
  if (!raw) {
    const seed = [{ ...SUPER_ADMIN, password: SUPER_ADMIN_PASSWORD }];
    localStorage.setItem(USERS_KEY, JSON.stringify(seed));
    return seed;
  }
  return JSON.parse(raw);
}

function saveUsers(users: (AuthUser & { password: string })[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// ─── Login ─────────────────────────────────────────────
export function login(emailOrPhone: string, password: string): { ok: boolean; user?: AuthUser; error?: string } {
  const users = getUsers();
  const u = users.find(
    (u) =>
      (u.email.toLowerCase() === emailOrPhone.toLowerCase() || u.phone === emailOrPhone) &&
      u.password === password
  );
  if (!u) return { ok: false, error: 'Email/Phone or password is incorrect.' };
  const { password: _, ...session } = u;
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return { ok: true, user: session };
}

// ─── Register (customer only) ──────────────────────────
export function register(data: {
  name: string;
  email: string;
  phone: string;
  password: string;
}): { ok: boolean; user?: AuthUser; error?: string } {
  const users = getUsers();

  if (data.password.length < 8) return { ok: false, error: 'Password must be at least 8 characters.' };
  if (!/[A-Z]/.test(data.password)) return { ok: false, error: 'Password must contain an uppercase letter.' };
  if (!/[a-z]/.test(data.password)) return { ok: false, error: 'Password must contain a lowercase letter.' };
  if (!/[0-9]/.test(data.password)) return { ok: false, error: 'Password must contain a number.' };
  if (!/[^A-Za-z0-9]/.test(data.password)) return { ok: false, error: 'Password must contain a special character.' };

  if (users.find((u) => u.email.toLowerCase() === data.email.toLowerCase())) {
    return { ok: false, error: 'An account with this email already exists.' };
  }
  if (users.find((u) => u.phone === data.phone)) {
    return { ok: false, error: 'An account with this phone number already exists.' };
  }

  const newUser: AuthUser & { password: string } = {
    id: `cust-${Date.now()}`,
    name: data.name,
    email: data.email,
    phone: data.phone,
    role: 'customer',
    avatar: data.name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2),
    createdAt: new Date().toISOString().split('T')[0],
    password: data.password,
  };

  users.push(newUser);
  saveUsers(users);

  const { password: _, ...session } = newUser;
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return { ok: true, user: session };
}

// ─── Session ───────────────────────────────────────────
export function getSession(): AuthUser | null {
  const raw = localStorage.getItem(SESSION_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
}

export function isAdmin(user: AuthUser | null): boolean {
  return user?.role === 'super_admin' || user?.role === 'admin';
}

export function isSuperAdmin(user: AuthUser | null): boolean {
  return user?.role === 'super_admin';
}

// ─── Admin: Manage Users ───────────────────────────────
export function getAllUsers(): AuthUser[] {
  return getUsers().map(({ password: _, ...u }) => u);
}

export function setUserRole(userId: string, role: 'admin' | 'customer'): boolean {
  const users = getUsers();
  const idx = users.findIndex((u) => u.id === userId);
  if (idx === -1) return false;
  if (users[idx].role === 'super_admin') return false; // can't change super admin
  users[idx].role = role;
  saveUsers(users);
  return true;
}

export function deleteUser(userId: string): boolean {
  const users = getUsers();
  const target = users.find((u) => u.id === userId);
  if (!target || target.role === 'super_admin') return false;
  saveUsers(users.filter((u) => u.id !== userId));
  return true;
}

// ─── Admin: Category Management ────────────────────────
export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
}

const DEFAULT_CATEGORIES: CategoryItem[] = [
  { id: 'cat-1', name: 'Perfume', slug: 'perfume', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=700&auto=format&fit=crop', createdAt: '2024-01-01' },
  { id: 'cat-2', name: 'Watches', slug: 'watches', image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=700&auto=format&fit=crop', createdAt: '2024-01-01' },
  { id: 'cat-3', name: 'Eyewear', slug: 'eyewear', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=700&auto=format&fit=crop', createdAt: '2024-01-01' },
  { id: 'cat-4', name: 'Bags & Leather', slug: 'bags-leather', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=700&auto=format&fit=crop', createdAt: '2024-01-01' },
  { id: 'cat-5', name: 'Jewelry', slug: 'jewelry', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=700&auto=format&fit=crop', createdAt: '2024-01-01' },
  { id: 'cat-6', name: 'Grooming', slug: 'grooming', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=700&auto=format&fit=crop', createdAt: '2024-01-01' },
  { id: 'cat-7', name: 'Shoes', slug: 'shoes', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=700&auto=format&fit=crop', createdAt: '2024-01-01' },
];

export function getCategories(): CategoryItem[] {
  const raw = localStorage.getItem(CATEGORIES_KEY);
  if (!raw) {
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(DEFAULT_CATEGORIES));
    return DEFAULT_CATEGORIES;
  }
  return JSON.parse(raw);
}

export function addCategory(name: string, imageUrl: string): CategoryItem {
  const cats = getCategories();
  const newCat: CategoryItem = {
    id: `cat-${Date.now()}`,
    name,
    slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    image: imageUrl || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=700&auto=format&fit=crop',
    createdAt: new Date().toISOString().split('T')[0],
  };
  cats.push(newCat);
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(cats));
  return newCat;
}

export function deleteCategory(id: string): boolean {
  const cats = getCategories();
  const filtered = cats.filter((c) => c.id !== id);
  if (filtered.length === cats.length) return false;
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(filtered));
  return true;
}
