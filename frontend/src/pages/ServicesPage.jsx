import { useEffect, useState } from 'react';
import { publicAPI } from '../api';
import { Server, Shield, Cpu, Zap, Gauge, Cloud, Wrench } from 'lucide-react';

const fallbackServices = [
  {
    title: 'Sunucu Kurulum & Hosting',
    description: 'Assetto Corsa için optimize edilmiş, düşük latency ve yüksek FPS sunan yönetilen hosting.',
    icon: Server,
  },
  {
    title: 'Gerçek Zamanlı İzleme',
    description: 'CPU, RAM, ping, oyuncu sayısı ve logları canlı takip edin. Eşik aştığında bildirim alın.',
    icon: Gauge,
  },
  {
    title: 'Otomasyon & Planlayıcı',
    description: 'Yarış başlangıcı, restart, mod güncellemesi gibi işleri zamanlayın, otomatik çalışsın.',
    icon: Zap,
  },
  {
    title: 'Güvenlik & Anticheat',
    description: 'IP bantlama, hız limitleri, DDoS koruması ve anticheat entegrasyonu ile güvenli kalın.',
    icon: Shield,
  },
  {
    title: 'Mod / Pist Yönetimi',
    description: 'Araç, pist ve mod paketlerini merkezi panelden yönetin, sürümlerinizi senkron tutun.',
    icon: Wrench,
  },
  {
    title: 'API & Entegrasyonlar',
    description: 'Discord botları, webhooklar ve dış sistemlerle entegrasyon için açık API.',
    icon: Cloud,
  },
];

export default function ServicesPage() {
  const [services, setServices] = useState(fallbackServices);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await publicAPI.getServices();
        const data = response.data || [];
        // Eğer admin panelden tanımlı hizmetler varsa onları göster, yoksa fallback kullan
        if (Array.isArray(data) && data.length > 0) {
          setServices(data.map((s) => ({
            ...s,
            icon: fallbackServices[s.id % fallbackServices.length]?.icon || Server,
          })));
        }
      } catch (error) {
        console.error('Failed to fetch services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900 text-white">
      {/* Hero */}
      <section className="border-b border-orange-500/20 bg-gradient-to-r from-orange-500/10 to-cyan-500/10">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <p className="text-sm uppercase tracking-[0.2em] text-orange-400">Hizmetler</p>
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight">Assetto Corsa için uçtan uca servisler</h1>
            <p className="text-lg text-slate-300">
              Kurulumdan güvenliğe, izleme ve otomasyona kadar her şeyi tek panelden yönetin.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {loading ? (
          <div className="text-center text-slate-400">Yükleniyor...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => {
              const Icon = service.icon || Server;
              return (
                <div
                  key={service.id || idx}
                  className="bg-dark-800/60 border border-slate-700 hover:border-orange-500/50 rounded-xl p-6 transition-all flex flex-col"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/30 text-orange-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs text-slate-400 uppercase tracking-wide">Pro</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{service.title || service.name}</h3>
                  <p className="text-slate-300 leading-relaxed flex-1">{service.description || 'Detay bilgisi yakında eklenecek.'}</p>
                  <div className="mt-6 flex items-center justify-between text-sm text-slate-400">
                    <span>7/24 izleme</span>
                    <span>Otomasyon</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="border-t border-orange-500/20 bg-gradient-to-r from-dark-900 via-dark-800 to-dark-900 py-16 px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center md:items-center md:justify-between gap-6">
          <div>
            <h2 className="text-3xl font-bold mb-2">30 gün ücretsiz deneyin</h2>
            <p className="text-slate-300">Kredi kartı gerekmez. Tüm özellikler aktif.</p>
          </div>
          <div className="flex gap-3">
            <a href="/indir" className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">İndir</a>
            <a href="/iletisim" className="border border-orange-500 text-orange-400 hover:bg-orange-500/10 px-6 py-3 rounded-lg font-semibold transition-colors">Satış ile görüş</a>
          </div>
        </div>
      </section>
    </div>
  );
}
