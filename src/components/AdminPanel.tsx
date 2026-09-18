import { useState } from 'react';
import { mockUsers } from '../data';
import { User } from '../types';
import {
  Crown,
  Shield,
  ShieldCheck,
  UserCog,
  UserPlus,
  Edit3,
  Trash2,
  Ban,
  CheckCircle2,
  X,
  Lock,
  Key,
  AlertTriangle,
} from 'lucide-react';

const roleConfig: Record<string, { icon: React.ElementType; color: string; label: string; permissions: string[] }> = {
  super_admin: {
    icon: Crown,
    color: 'from-gold-400 to-gold-600 text-luxury-darker',
    label: 'Super Admin',
    permissions: ['Full Access', 'Manage Admins', 'Delete Data', 'System Settings', 'Financial Reports'],
  },
  admin: {
    icon: ShieldCheck,
    color: 'from-blue-400 to-blue-600 text-white',
    label: 'Admin',
    permissions: ['Manage Products', 'Manage Orders', 'View Reports', 'Customer Support'],
  },
  manager: {
    icon: Shield,
    color: 'from-purple-400 to-purple-600 text-white',
    label: 'Manager',
    permissions: ['Manage Products', 'View Orders', 'Basic Reports'],
  },
  staff: {
    icon: UserCog,
    color: 'from-gray-400 to-gray-600 text-white',
    label: 'Staff',
    permissions: ['View Products', 'View Orders'],
  },
};

const statusColors: Record<string, string> = {
  active: 'text-green-400 bg-green-500/10',
  inactive: 'text-yellow-400 bg-yellow-500/10',
  suspended: 'text-red-400 bg-red-500/10',
};

export default function AdminPanel() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleStatusToggle = (userId: string) => {
    setUsers(users.map((u) => {
      if (u.id === userId) {
        return { ...u, status: u.status === 'active' ? 'suspended' : 'active' };
      }
      return u;
    }));
  };

  const handleDelete = (userId: string) => {
    if (users.find((u) => u.id === userId)?.role === 'super_admin') return;
    setUsers(users.filter((u) => u.id !== userId));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Super Admin Banner */}
      <div className="bg-gradient-to-r from-gold-500/10 via-gold-400/5 to-transparent border border-gold-500/20 rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center flex-shrink-0">
            <Crown className="w-7 h-7 text-luxury-darker" />
          </div>
          <div>
            <h3 className="font-playfair text-xl font-bold text-luxury-accent">Super Admin Panel</h3>
            <p className="text-sm text-luxury-muted mt-1">
              আমি মালিক থাকব, বাকিরা সীমিত ক্ষমতার admin হবে — নিরাপদ, professional, real business-এর মতো
            </p>
            <div className="flex items-center gap-3 mt-3">
              <span className="flex items-center gap-1 text-xs text-luxury-success">
                <CheckCircle2 className="w-3 h-3" /> Full Control
              </span>
              <span className="flex items-center gap-1 text-xs text-luxury-warning">
                <Lock className="w-3 h-3" /> Role-based Access
              </span>
              <span className="flex items-center gap-1 text-xs text-luxury-info">
                <Key className="w-3 h-3" /> Permission Management
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Role Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(roleConfig).map(([role, config]) => {
          const count = users.filter((u) => u.role === role).length;
          const RoleIcon = config.icon;
          return (
            <div key={role} className="bg-luxury-card border border-luxury-border rounded-xl p-4 hover:border-luxury-accent/20 transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${config.color} flex items-center justify-center`}>
                  <RoleIcon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-luxury-text">{config.label}</p>
                  <p className="text-xs text-luxury-muted">{count} user{count !== 1 ? 's' : ''}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Admin Button */}
      <div className="flex justify-end">
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-gold-500 to-gold-600 text-luxury-darker rounded-xl text-sm font-semibold hover:from-gold-400 hover:to-gold-500 transition-all shadow-lg shadow-gold-500/20"
        >
          <UserPlus className="w-4 h-4" /> Add Admin
        </button>
      </div>

      {/* Admin Users List */}
      <div className="space-y-4">
        {users.map((user) => {
          const config = roleConfig[user.role];
          const RoleIcon = config.icon;
          const isSuperAdmin = user.role === 'super_admin';

          return (
            <div
              key={user.id}
              className={`bg-luxury-card border rounded-2xl p-5 transition-all duration-300 hover:border-luxury-accent/30 ${
                isSuperAdmin ? 'border-gold-500/30 ring-1 ring-gold-500/10' : 'border-luxury-border'
              }`}
            >
              <div className="flex items-center gap-4 flex-wrap">
                {/* Avatar */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${config.color} flex items-center justify-center font-bold text-sm flex-shrink-0`}>
                  {user.avatar}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm font-semibold text-luxury-text">{user.name}</h3>
                    {isSuperAdmin && (
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-gradient-to-r from-gold-400 to-gold-600 text-luxury-darker">
                        Owner
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-luxury-muted truncate">{user.email}</p>
                </div>

                {/* Role Badge */}
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-gradient-to-r ${config.color}`}>
                    <RoleIcon className="w-3 h-3" />
                    {config.label}
                  </span>
                </div>

                {/* Status */}
                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium ${statusColors[user.status]}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    user.status === 'active' ? 'bg-green-400' : user.status === 'inactive' ? 'bg-yellow-400' : 'bg-red-400'
                  }`} />
                  {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                </span>

                {/* Last Login */}
                <span className="text-xs text-luxury-muted whitespace-nowrap hidden md:block">
                  Last login: {user.lastLogin}
                </span>

                {/* Actions */}
                {!isSuperAdmin && (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setSelectedUser(user)}
                      className="p-2 rounded-lg hover:bg-luxury-border/30 text-luxury-muted hover:text-luxury-accent transition-colors"
                      title="Edit"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleStatusToggle(user.id)}
                      className={`p-2 rounded-lg hover:bg-luxury-border/30 transition-colors ${
                        user.status === 'active' ? 'text-luxury-muted hover:text-luxury-warning' : 'text-luxury-muted hover:text-luxury-success'
                      }`}
                      title={user.status === 'active' ? 'Suspend' : 'Activate'}
                    >
                      {user.status === 'active' ? <Ban className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="p-2 rounded-lg hover:bg-red-500/10 text-luxury-muted hover:text-luxury-danger transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
                {isSuperAdmin && (
                  <div className="flex items-center gap-1 text-luxury-muted">
                    <Lock className="w-4 h-4" />
                    <span className="text-xs">Protected</span>
                  </div>
                )}
              </div>

              {/* Permissions Preview */}
              <div className="mt-3 flex items-center gap-2 flex-wrap">
                {config.permissions.map((perm) => (
                  <span key={perm} className="text-[10px] px-2 py-0.5 bg-luxury-dark rounded-md text-luxury-muted border border-luxury-border">
                    {perm}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Admin Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowAddModal(false)}>
          <div className="bg-luxury-dark border border-luxury-border rounded-2xl w-full max-w-lg p-6 animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-playfair text-xl font-bold text-luxury-text">Add New Admin</h3>
              <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-luxury-card rounded-lg transition-colors">
                <X className="w-5 h-5 text-luxury-muted" />
              </button>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-3 mb-5 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-yellow-400">Only Super Admin can add new admin users. Each role has specific permissions.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs text-luxury-muted uppercase tracking-wider mb-2">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter full name"
                  className="w-full px-4 py-3 bg-luxury-card border border-luxury-border rounded-xl text-sm text-luxury-text placeholder-luxury-muted focus:outline-none focus:border-luxury-accent/50 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs text-luxury-muted uppercase tracking-wider mb-2">Email</label>
                <input
                  type="email"
                  placeholder="Enter email address"
                  className="w-full px-4 py-3 bg-luxury-card border border-luxury-border rounded-xl text-sm text-luxury-text placeholder-luxury-muted focus:outline-none focus:border-luxury-accent/50 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs text-luxury-muted uppercase tracking-wider mb-2">Role</label>
                <select className="w-full px-4 py-3 bg-luxury-card border border-luxury-border rounded-xl text-sm text-luxury-text focus:outline-none focus:border-luxury-accent/50 transition-all">
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                  <option value="staff">Staff</option>
                </select>
                <p className="text-[10px] text-luxury-muted mt-1">Note: Super Admin role cannot be assigned to others.</p>
              </div>
              <div>
                <label className="block text-xs text-luxury-muted uppercase tracking-wider mb-2">Temporary Password</label>
                <input
                  type="password"
                  placeholder="Set temporary password"
                  className="w-full px-4 py-3 bg-luxury-card border border-luxury-border rounded-xl text-sm text-luxury-text placeholder-luxury-muted focus:outline-none focus:border-luxury-accent/50 transition-all"
                />
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-full py-3 bg-gradient-to-r from-gold-500 to-gold-600 text-luxury-darker rounded-xl text-sm font-semibold hover:from-gold-400 hover:to-gold-500 transition-all shadow-lg shadow-gold-500/20 mt-2"
              >
                Add Admin User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Role Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedUser(null)}>
          <div className="bg-luxury-dark border border-luxury-border rounded-2xl w-full max-w-md p-6 animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-playfair text-xl font-bold text-luxury-text">Edit Role</h3>
              <button onClick={() => setSelectedUser(null)} className="p-2 hover:bg-luxury-card rounded-lg transition-colors">
                <X className="w-5 h-5 text-luxury-muted" />
              </button>
            </div>
            <div className="flex items-center gap-3 mb-6 p-3 bg-luxury-card rounded-xl">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${roleConfig[selectedUser.role].color} flex items-center justify-center font-bold text-xs`}>
                {selectedUser.avatar}
              </div>
              <div>
                <p className="text-sm font-medium text-luxury-text">{selectedUser.name}</p>
                <p className="text-xs text-luxury-muted">{selectedUser.email}</p>
              </div>
            </div>
            <div className="space-y-3 mb-6">
              {(['admin', 'manager', 'staff'] as const).map((role) => {
                const config = roleConfig[role];
                const RoleIcon = config.icon;
                return (
                  <label
                    key={role}
                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                      selectedUser.role === role
                        ? 'border-luxury-accent/50 bg-luxury-accent/5'
                        : 'border-luxury-border hover:border-luxury-accent/20'
                    }`}
                  >
                    <input type="radio" name="role" value={role} defaultChecked={selectedUser.role === role} className="accent-gold-500" />
                    <RoleIcon className="w-4 h-4 text-luxury-accent" />
                    <div>
                      <p className="text-sm text-luxury-text">{config.label}</p>
                      <p className="text-[10px] text-luxury-muted">{config.permissions.join(' • ')}</p>
                    </div>
                  </label>
                );
              })}
            </div>
            <button
              onClick={() => setSelectedUser(null)}
              className="w-full py-3 bg-gradient-to-r from-gold-500 to-gold-600 text-luxury-darker rounded-xl text-sm font-semibold hover:from-gold-400 hover:to-gold-500 transition-all"
            >
              Update Role
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
