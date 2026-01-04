import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Users, Shield, Lock, Mail } from 'lucide-react';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    role: 'user',
    status: 'active'
  });

  useEffect(() => {
    // Demo users
    setUsers([
      {
        id: 1,
        full_name: 'Admin Kullanıcı',
        email: 'admin@nexaven.com',
        role: 'admin',
        status: 'active',
        created_at: '2024-01-01'
      },
      {
        id: 2,
        full_name: 'Demo Kullanıcı',
        email: 'demo@example.com',
        role: 'user',
        status: 'active',
        created_at: '2024-01-05'
      }
    ]);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setUsers(users.map(u => u.id === editingId ? { ...u, ...formData } : u));
    } else {
      setUsers([...users, {
        ...formData,
        id: Date.now(),
        created_at: new Date().toISOString().split('T')[0]
      }]);
    }
    resetForm();
  };

  const handleDelete = (id) => {
    if (confirm('Kullanıcıyı silmek istediğinize emin misiniz?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const handleEdit = (user) => {
    setFormData({
      full_name: user.full_name,
      email: user.email,
      role: user.role,
      status: user.status
    });
    setEditingId(user.id);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      full_name: '',
      email: '',
      role: 'user',
      status: 'active'
    });
    setEditingId(null);
    setShowForm(false);
  };

  const adminCount = users.filter(u => u.role === 'admin').length;
  const activeUsers = users.filter(u => u.status === 'active').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Kullanıcı Yönetimi</h1>
          <p className="text-slate-400 mt-1">Sistem kullanıcılarını yönetin ve kontrol edin</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="mt-4 sm:mt-0 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Yeni Kullanıcı
        </button>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-dark-800/50 border border-slate-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Toplam Kullanıcı</p>
              <p className="text-2xl font-bold text-white mt-2">{users.length}</p>
            </div>
            <Users className="w-8 h-8 text-orange-400" />
          </div>
        </div>
        <div className="bg-dark-800/50 border border-slate-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Aktif Kullanıcı</p>
              <p className="text-2xl font-bold text-white mt-2">{activeUsers}</p>
            </div>
            <Mail className="w-8 h-8 text-cyan-400" />
          </div>
        </div>
        <div className="bg-dark-800/50 border border-slate-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Admin Sayısı</p>
              <p className="text-2xl font-bold text-white mt-2">{adminCount}</p>
            </div>
            <Shield className="w-8 h-8 text-green-400" />
          </div>
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-dark-800/50 border border-slate-700 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            {editingId ? 'Kullanıcıyı Düzenle' : 'Yeni Kullanıcı Oluştur'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  Ad Soyad *
                </label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  required
                  className="w-full bg-dark-900/50 border border-slate-700 rounded px-3 py-2 text-white focus:outline-none focus:border-orange-500"
                  placeholder="Ad Soyad"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  E-posta *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-dark-900/50 border border-slate-700 rounded px-3 py-2 text-white focus:outline-none focus:border-orange-500"
                  placeholder="email@example.com"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  Rol
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full bg-dark-900/50 border border-slate-700 rounded px-3 py-2 text-white focus:outline-none focus:border-orange-500"
                >
                  <option value="user">Kullanıcı</option>
                  <option value="admin">Admin</option>
                  <option value="moderator">Moderatör</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  Durum
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full bg-dark-900/50 border border-slate-700 rounded px-3 py-2 text-white focus:outline-none focus:border-orange-500"
                >
                  <option value="active">Aktif</option>
                  <option value="inactive">İnaktif</option>
                  <option value="banned">Bantlandı</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded font-semibold transition-colors"
              >
                {editingId ? 'Güncelle' : 'Oluştur'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded font-semibold transition-colors"
              >
                İptal
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Users List */}
      {loading ? (
        <div className="text-center py-12 text-slate-400">Yükleniyor...</div>
      ) : (
        <div className="bg-dark-800/50 border border-slate-700 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700 bg-dark-900/50">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Ad Soyad</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">E-posta</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Rol</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Durum</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Katılış</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-slate-300">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-slate-700 hover:bg-dark-900/30 transition-colors">
                    <td className="px-6 py-4 text-white font-medium">{user.full_name}</td>
                    <td className="px-6 py-4 text-slate-400">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded text-sm font-medium ${
                        user.role === 'admin' ? 'bg-orange-500/20 text-orange-400' :
                        user.role === 'moderator' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-slate-700/50 text-slate-300'
                      }`}>
                        {user.role === 'admin' ? 'Admin' : user.role === 'moderator' ? 'Moderatör' : 'Kullanıcı'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                        user.status === 'active' ? 'bg-green-500/20 text-green-400' :
                        user.status === 'banned' ? 'bg-red-500/20 text-red-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {user.status === 'active' ? 'Aktif' : user.status === 'banned' ? 'Bantlandı' : 'İnaktif'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-400 text-sm">{user.created_at}</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleEdit(user)}
                        className="text-blue-400 hover:text-blue-300 mr-4 inline-flex items-center"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="text-red-400 hover:text-red-300 inline-flex items-center"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
