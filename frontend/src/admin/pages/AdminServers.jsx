import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Server, Users, Zap, AlertCircle } from 'lucide-react';
import { publicAPI } from '../../api';

export default function AdminServers() {
  const [servers, setServers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    max_players: 32,
    location: '',
    status: 'active'
  });

  useEffect(() => {
    loadServers();
  }, []);

  const loadServers = async () => {
    try {
      const data = await publicAPI.getServices();
      setServers(data || []);
    } catch (error) {
      console.error('Error loading servers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'max_players' ? parseInt(value) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      // Update
      setServers(servers.map(s => s.id === editingId ? { ...s, ...formData } : s));
    } else {
      // Add
      setServers([...servers, { ...formData, id: Date.now(), created_at: new Date().toISOString() }]);
    }
    resetForm();
  };

  const handleDelete = (id) => {
    if (confirm('Sunucuyu silmek istediğinize emin misiniz?')) {
      setServers(servers.filter(s => s.id !== id));
    }
  };

  const handleEdit = (server) => {
    setFormData({
      name: server.name || '',
      description: server.description || '',
      max_players: server.max_players || 32,
      location: server.location || '',
      status: server.status || 'active'
    });
    setEditingId(server.id);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      max_players: 32,
      location: '',
      status: 'active'
    });
    setEditingId(null);
    setShowForm(false);
  };

  const activeServers = servers.filter(s => s.status === 'active').length;
  const totalPlayers = servers.reduce((sum, s) => sum + (s.max_players || 0), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Sunucu Yönetimi</h1>
          <p className="text-slate-400 mt-1">Assetto Corsa sunucularınızı yönetin</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="mt-4 sm:mt-0 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Yeni Sunucu
        </button>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-dark-800/50 border border-slate-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Aktif Sunucular</p>
              <p className="text-2xl font-bold text-white mt-2">{activeServers}</p>
            </div>
            <Server className="w-8 h-8 text-orange-400" />
          </div>
        </div>
        <div className="bg-dark-800/50 border border-slate-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Toplam Sunucu</p>
              <p className="text-2xl font-bold text-white mt-2">{servers.length}</p>
            </div>
            <Server className="w-8 h-8 text-cyan-400" />
          </div>
        </div>
        <div className="bg-dark-800/50 border border-slate-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Toplam Kapasite</p>
              <p className="text-2xl font-bold text-white mt-2">{totalPlayers}</p>
            </div>
            <Users className="w-8 h-8 text-green-400" />
          </div>
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-dark-800/50 border border-slate-700 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            {editingId ? 'Sunucuyu Düzenle' : 'Yeni Sunucu Oluştur'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  Sunucu Adı *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-dark-900/50 border border-slate-700 rounded px-3 py-2 text-white focus:outline-none focus:border-orange-500"
                  placeholder="Sunucu Adı"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  Konum
                </label>
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full bg-dark-900/50 border border-slate-700 rounded px-3 py-2 text-white focus:outline-none focus:border-orange-500"
                >
                  <option value="">Seçin</option>
                  <option value="EU-West">AB Batısı</option>
                  <option value="EU-Central">AB Merkezi</option>
                  <option value="Middle-East">Orta Doğu</option>
                  <option value="Asia">Asya</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Açıklama
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className="w-full bg-dark-900/50 border border-slate-700 rounded px-3 py-2 text-white focus:outline-none focus:border-orange-500"
                placeholder="Sunucu açıklaması"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  Max. Oyuncu
                </label>
                <input
                  type="number"
                  name="max_players"
                  value={formData.max_players}
                  onChange={handleChange}
                  min="1"
                  max="1000"
                  className="w-full bg-dark-900/50 border border-slate-700 rounded px-3 py-2 text-white focus:outline-none focus:border-orange-500"
                />
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
                  <option value="maintenance">Bakım</option>
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

      {/* Servers List */}
      {loading ? (
        <div className="text-center py-12 text-slate-400">Yükleniyor...</div>
      ) : servers.length === 0 ? (
        <div className="bg-dark-800/50 border border-slate-700 rounded-lg p-12 text-center">
          <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-400">Henüz sunucu eklenmemiş</p>
        </div>
      ) : (
        <div className="bg-dark-800/50 border border-slate-700 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700 bg-dark-900/50">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Adı</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Konum</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Kapasite</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Durum</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-slate-300">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {servers.map((server) => (
                  <tr key={server.id} className="border-b border-slate-700 hover:bg-dark-900/30 transition-colors">
                    <td className="px-6 py-4 text-white">{server.name}</td>
                    <td className="px-6 py-4 text-slate-400">{server.location || '-'}</td>
                    <td className="px-6 py-4 text-slate-400">{server.max_players} oyuncu</td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                        server.status === 'active' ? 'bg-green-500/20 text-green-400' :
                        server.status === 'maintenance' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {server.status === 'active' ? 'Aktif' : server.status === 'maintenance' ? 'Bakım' : 'İnaktif'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleEdit(server)}
                        className="text-blue-400 hover:text-blue-300 mr-4 inline-flex items-center"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(server.id)}
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
