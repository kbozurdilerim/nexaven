import { useEffect, useState } from 'react';
import { adminAPI } from '../../api';
import { BarChart3, Users, Zap } from 'lucide-react';

export default function AdminHome() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await adminAPI.getDashboard();
        setStats(response.data);
      } catch (error) {
        console.error('Failed to fetch dashboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return <div className="text-gray-400">Yükleniyor...</div>;
  }

  const StatCard = ({ icon: Icon, label, value }) => (
    <div className="card">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-400 text-sm">{label}</p>
          <p className="text-4xl font-bold mt-2">{value}</p>
        </div>
        <Icon className="text-primary-500" size={32} />
      </div>
    </div>
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <p className="text-gray-400 mt-2">İstatistikleri ve özeti görüntüleyin</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon={Zap}
          label="Toplam Hizmet"
          value={stats?.totalServices || 0}
        />
        <StatCard
          icon={Users}
          label="Toplam Kullanıcı"
          value={stats?.totalUsers || 0}
        />
        <StatCard
          icon={BarChart3}
          label="Toplam Sayfa"
          value={stats?.totalPages || 0}
        />
      </div>

      <div className="mt-8 card">
        <h2 className="text-2xl font-bold mb-4">Hızlı Başlangıç</h2>
        <ul className="space-y-3 text-gray-400">
          <li>• Hizmetler sayfasından yeni hizmet ekleyin</li>
          <li>• Hakkında sayfasını özelleştirin</li>
          <li>• Özel sayfalar oluşturun ve yayınlayın</li>
          <li>• Kullanıcı ve istatistikleri takip edin</li>
        </ul>
      </div>
    </div>
  );
}
