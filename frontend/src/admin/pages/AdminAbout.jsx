import { useEffect, useState } from 'react';
import { adminAPI } from '../../api';

export default function AdminAbout() {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    vision: '',
    mission: ''
  });

  const fetchAbout = async () => {
    try {
      const response = await adminAPI.getAbout();
      const data = response.data;
      setAbout(data);
      setFormData({
        title: data.title || '',
        content: data.content || '',
        vision: data.vision || '',
        mission: data.mission || ''
      });
    } catch (error) {
      console.error('Failed to fetch about:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAbout();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await adminAPI.updateAbout(formData);
      fetchAbout();
      alert('Hakkında sayfası başarıyla güncellendi!');
    } catch (error) {
      console.error('Failed to update about:', error);
      alert('Güncelleme başarısız oldu!');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-gray-400">Yükleniyor...</div>;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Hakkında Sayfası</h1>
        <p className="text-gray-400 mt-2">Hakkında sayfasının içeriğini düzenleyin</p>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Başlık</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Hakkında sayfası başlığı"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">İçerik</label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Şirketiniz hakkındaki bilgileri yazınız"
              rows="8"
              className="w-full bg-dark-800 text-white border border-dark-600 rounded-lg px-4 py-2 focus:outline-none focus:border-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Vizyonumuz</label>
            <textarea
              value={formData.vision}
              onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
              placeholder="Vizyonunuzu yazınız"
              rows="4"
              className="w-full bg-dark-800 text-white border border-dark-600 rounded-lg px-4 py-2 focus:outline-none focus:border-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Misyonumuz</label>
            <textarea
              value={formData.mission}
              onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
              placeholder="Misyonunuzu yazınız"
              rows="4"
              className="w-full bg-dark-800 text-white border border-dark-600 rounded-lg px-4 py-2 focus:outline-none focus:border-primary-500"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={saving}
              className="btn-primary disabled:opacity-50"
            >
              {saving ? 'Kaydediliyor...' : 'Kaydet'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
