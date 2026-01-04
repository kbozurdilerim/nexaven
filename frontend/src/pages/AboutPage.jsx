import { useEffect, useState } from 'react';
import { publicAPI } from '../api';
import { Target, Eye, Gauge, Shield, Cpu, Users } from 'lucide-react';

const fallback = {
  title: 'Nexaven Hakkında',
  content:
    'Nexaven, Assetto Corsa sunucu yöneticileri için hız, güvenilirlik ve kontrolü bir araya getiren yönetim platformudur. Gerçek zamanlı izleme, otomasyon, güvenlik ve topluluk araçlarını tek panelde topluyoruz.',
  vision:
    'Dünyadaki tüm Assetto Corsa topluluklarının tek panelden yönetilebildiği, güvenli ve yüksek performanslı bir altyapı oluşturmak.',
  mission:
    'Sunucu sahiplerinin teknik yükünü azaltmak, oyunculara kusursuz bir deneyim sunmak ve toplulukları büyütmek için gerekli araçları sağlamak.'
};

export default function AboutPage() {
  const [about, setAbout] = useState(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await publicAPI.getAbout();
        setAbout({ ...fallback, ...(response.data || {}) });
      } catch (error) {
        console.error('Failed to fetch about:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-900">
        <span className="text-slate-400">Yükleniyor...</span>
      </div>
    );
  }

  const stats = [
    { label: 'Aktif Sunucu', value: '250+', icon: Gauge },
    { label: 'Topluluk', value: '50K+', icon: Users },
    { label: 'Bölgesel POP', value: '12', icon: Shield },
    { label: 'Çalışma Süresi', value: '99.95%', icon: Cpu }
  ];

  const pillars = [
    {
      title: 'Performans',
      desc: 'Düşük latency, yüksek FPS ve otomatik ölçekleme ile kesintisiz yarış deneyimi.',
      icon: Gauge
    },
    {
      title: 'Güvenlik',
      desc: 'Anticheat, IP bantlama, DDoS koruması ve yetkilendirme katmanları.',
      icon: Shield
    },
    {
      title: 'Kontrol',
      desc: 'Otomasyon, zamanlayıcılar, API entegrasyonları ve ayrıntılı loglama.',
      icon: Cpu
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900 text-white">
      {/* Hero */}
      <section className="border-b border-orange-500/20 bg-gradient-to-r from-orange-500/10 to-cyan-500/10">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <p className="text-sm uppercase tracking-[0.2em] text-orange-400">Nexaven Hakkında</p>
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
              {about.title}
            </h1>
            <p className="text-lg text-slate-300">
              {about.content}
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map(({ label, value, icon: Icon }, idx) => (
            <div key={idx} className="bg-dark-800/60 border border-slate-700 rounded-xl p-4 flex items-center gap-4">
              <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/30 text-orange-400">
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold">{value}</div>
                <div className="text-slate-400 text-sm">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Vision / Mission */}
      <section className="max-w-7xl mx-auto px-4 pb-12 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-dark-800/60 border border-slate-700 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Eye className="w-6 h-6 text-orange-400" />
              <h2 className="text-2xl font-semibold">Vizyonumuz</h2>
            </div>
            <p className="text-slate-300 leading-relaxed">{about.vision}</p>
          </div>
          <div className="bg-dark-800/60 border border-slate-700 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-6 h-6 text-cyan-400" />
              <h2 className="text-2xl font-semibold">Misyonumuz</h2>
            </div>
            <p className="text-slate-300 leading-relaxed">{about.mission}</p>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="max-w-7xl mx-auto px-4 pb-16 sm:px-6 lg:px-8">
        <h3 className="text-2xl font-bold mb-6">Dayanak Noktalarımız</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {pillars.map(({ title, desc, icon: Icon }, idx) => (
            <div key={idx} className="bg-dark-800/60 border border-slate-700 hover:border-orange-500/40 rounded-xl p-6 transition-all">
              <div className="p-3 w-fit rounded-lg bg-orange-500/10 border border-orange-500/30 text-orange-400 mb-4">
                <Icon className="w-5 h-5" />
              </div>
              <h4 className="text-xl font-semibold mb-2">{title}</h4>
              <p className="text-slate-300 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
