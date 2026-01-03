import { useEffect, useState } from 'react';
import { adminAPI } from '../../api';
import { Trash2, Edit2, Plus, Eye, EyeOff } from 'lucide-react';

export default function AdminPages() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    type: 'custom',
    is_published: 1
  });

  const fetchPages = async () => {
    try {
      const response = await adminAPI.getPages();
      setPages(response.data);
    } catch (error) {
      console.error('Failed to fetch pages:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingId) {
        await adminAPI.updatePage(editingId, formData);
      } else {
        await adminAPI.createPage(formData);
      }
      
      setFormData({
        title: '',
        slug: '',
        content: '',
        type: 'custom',
        is_published: 1
      });
      setEditingId(null);
      setShowForm(false);
      fetchPages();
    } catch (error) {
      console.error('Failed to save page:', error);
    }
  };

  const handleEdit = (page) => {
    setFormData({
      title: page.title,
      slug: page.slug,
      content: page.content,
      type: page.type,
      is_published: page.is_published
    });
    setEditingId(page.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Bu sayfayı silmek istediğinizden emin misiniz?')) {
      try {
        await adminAPI.deletePage(id);
        fetchPages();
      } catch (error) {
        console.error('Failed to delete page:', error);
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">Sayfalar</h1>
          <p className="text-gray-400 mt-2">Özel sayfalar oluşturun ve yönetin</p>
        </div>
        <button
          onClick={() => {
            setFormData({
              title: '',
              slug: '',
              content: '',
              type: 'custom',
              is_published: 1
            });
            setEditingId(null);
            setShowForm(!showForm);
          }}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={20} />
          Yeni Sayfa
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="card mb-8">
          <h2 className="text-2xl font-bold mb-6">
            {editingId ? 'Sayfayı Düzenle' : 'Yeni Sayfa Ekle'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Başlık</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    setFormData({
                      ...formData,
                      title,
                      slug: title.toLowerCase().replace(/\s+/g, '-')
                    });
                  }}
                  placeholder="Sayfa başlığı"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">URL Adresi</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="sayfa-adresi"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">İçerik</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Sayfa içeriği"
                rows="8"
                className="w-full bg-dark-800 text-white border border-dark-600 rounded-lg px-4 py-2 focus:outline-none focus:border-primary-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Tür</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                >
                  <option value="custom">Özel</option>
                  <option value="page">Sayfa</option>
                  <option value="blog">Blog</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Durum</label>
                <select
                  value={formData.is_published}
                  onChange={(e) => setFormData({ ...formData, is_published: parseInt(e.target.value) })}
                >
                  <option value={1}>Yayınlanmış</option>
                  <option value={0}>Taslak</option>
                </select>
              </div>
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

      {/* Pages List */}
      {loading ? (
        <div className="text-gray-400">Yükleniyor...</div>
      ) : pages.length === 0 ? (
        <div className="card text-center text-gray-400">
          Henüz sayfa oluşturulmamıştır.
        </div>
      ) : (
        <div className="space-y-4">
          {pages.map((page) => (
            <div key={page.id} className="card flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold">{page.title}</h3>
                  {page.is_published ? (
                    <Eye size={18} className="text-green-500" />
                  ) : (
                    <EyeOff size={18} className="text-gray-500" />
                  )}
                </div>
                <p className="text-gray-400 mt-1">/{page.slug}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(page)}
                  className="bg-blue-600 hover:bg-blue-700 p-2 rounded-lg"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => handleDelete(page.id)}
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
