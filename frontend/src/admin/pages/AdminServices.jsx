import { useEffect, useState } from 'react';
import { adminAPI } from '../../api';
import { Trash2, Edit2, Plus } from 'lucide-react';

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: 'star'
  });

  const fetchServices = async () => {
    try {
      const response = await adminAPI.getServices();
      setServices(response.data);
    } catch (error) {
      console.error('Failed to fetch services:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingId) {
        await adminAPI.updateService(editingId, formData);
      } else {
        await adminAPI.createService(formData);
      }
      
      setFormData({ title: '', description: '', icon: 'star' });
      setEditingId(null);
      setShowForm(false);
      fetchServices();
    } catch (error) {
      console.error('Failed to save service:', error);
    }
  };

  const handleEdit = (service) => {
    setFormData({
      title: service.title,
      description: service.description,
      icon: service.icon
    });
    setEditingId(service.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Bu hizmeti silmek istediğinizden emin misiniz?')) {
      try {
        await adminAPI.deleteService(id);
        fetchServices();
      } catch (error) {
        console.error('Failed to delete service:', error);
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">Hizmetler</h1>
          <p className="text-gray-400 mt-2">Hizmetleri yönetin ve düzenleyin</p>
        </div>
        <button
          onClick={() => {
            setFormData({ title: '', description: '', icon: 'star' });
            setEditingId(null);
            setShowForm(!showForm);
          }}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={20} />
          Yeni Hizmet
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="card mb-8">
          <h2 className="text-2xl font-bold mb-6">
            {editingId ? 'Hizmeti Düzenle' : 'Yeni Hizmet Ekle'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Hizmet Adı</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Hizmet adını giriniz"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Açıklama</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Hizmetin açıklaması"
                rows="4"
                className="w-full bg-dark-800 text-white border border-dark-600 rounded-lg px-4 py-2 focus:outline-none focus:border-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">İkon</label>
              <select
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              >
                <option value="star">⭐ Yıldız</option>
                <option value="bolt">⚡ Şimşek</option>
                <option value="heart">❤️ Kalp</option>
                <option value="rocket">🚀 Roket</option>
              </select>
            </div>

            <div className="flex gap-4">
              <button type="submit" className="btn-primary">
                {editingId ? 'Güncelle' : 'Ekle'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="btn-secondary"
              >
                İptal
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Services List */}
      {loading ? (
        <div className="text-gray-400">Yükleniyor...</div>
      ) : services.length === 0 ? (
        <div className="card text-center text-gray-400">
          Henüz hizmet eklenmemiştir.
        </div>
      ) : (
        <div className="space-y-4">
          {services.map((service) => (
            <div key={service.id} className="card flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-xl font-bold">{service.title}</h3>
                <p className="text-gray-400 mt-2">{service.description}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(service)}
                  className="bg-blue-600 hover:bg-blue-700 p-2 rounded-lg"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => handleDelete(service.id)}
                  className="bg-red-600 hover:bg-red-700 p-2 rounded-lg"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
