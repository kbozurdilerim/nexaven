import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { publicAPI } from '../api';
import { Download, Zap, BarChart3, Users, Shield, Flame, Check, ArrowRight } from 'lucide-react';

export default function HomePage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await publicAPI.getServices();
        setServices(response.data);
      } catch (error) {
        console.error('Failed to fetch services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Gerçek Zamanlı İzleme",
      description: "CPU, RAM, GPU ve ağ kullanımını anlık olarak takip edin"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Detaylı İstatistikler",
      description: "Sunucu performansı ve oyuncu verilerini analiz edin"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Oyuncu Yönetimi",
      description: "Kullanıcıları, ligleri ve etkinlikleri kolayca yönetin"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Güvenilir Altyapı",
      description: "Stabil ve hızlı sunucu performansı garantisi"
    },
    {
      icon: <Flame className="w-8 h-8" />,
      title: "Modular Sistem",
      description: "Eklentiler ve özelleştirmelerle genişletin"
    },
    {
      icon: <Check className="w-8 h-8" />,
      title: "Kolay Kullanım",
      description: "Sezgisel arayüz ile dakikalar içinde başlayın"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        </div>

        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <div className="inline-block mb-4 px-4 py-2 bg-orange-500 bg-opacity-20 rounded-full border border-orange-500 border-opacity-50">
            <span className="text-orange-400 text-sm font-semibold">ASSETTO CORSA SUNUCU YÖNETİMİ</span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Yarışın Ötesine Geçin
          </h1>
          <p className="text-xl sm:text-2xl text-slate-300 mb-8">
            Nexaven ile Sunucu Performansını Yükseltin. Profesyonel Assetto Corsa Sunucu Yönetim Platformu
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/indir"
              className="px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition flex items-center justify-center gap-2 text-lg"
            >
              <Download size={20} /> Ücretsiz İndir
            </Link>
            <Link
              to="/about"
              className="px-8 py-4 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition flex items-center justify-center gap-2 text-lg"
            >
              Hakkında <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800 bg-opacity-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-center">
            Güçlü Özellikler
          </h2>
          <p className="text-slate-300 text-center mb-12 max-w-2xl mx-auto">
            Nexaven, sunucu yönetimini kolaylaştıran kapsamlı araçlar ve özellikler sunar
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-slate-800 rounded-lg p-6 hover:bg-slate-700 transition border border-slate-700 hover:border-orange-500"
              >
                <div className="text-orange-500 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Control Panel Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center">
            Kontrol Paneli
          </h2>
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-slate-700 p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Sunucu Performansı</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">CPU</span>
                    <div className="w-32 h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div className="w-1/2 h-full bg-orange-500"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">RAM</span>
                    <div className="w-32 h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div className="w-2/3 h-full bg-orange-500"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">GPU</span>
                    <div className="w-32 h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div className="w-1/3 h-full bg-orange-500"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Sunucu Listesi</h3>
                <div className="space-y-3">
                  <div className="bg-slate-700 p-3 rounded border border-slate-600">
                    <div className="flex justify-between">
                      <span className="text-white">GTS Sprint Server</span>
                      <span className="text-green-400">Açık</span>
                    </div>
                    <div className="text-slate-400 text-sm">Oyuncu: 15/32</div>
                  </div>
                  <div className="bg-slate-700 p-3 rounded border border-slate-600">
                    <div className="flex justify-between">
                      <span className="text-white">Drift Arena</span>
                      <span className="text-green-400">Açık</span>
                    </div>
                    <div className="text-slate-400 text-sm">Oyuncu: 12/32</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800 bg-opacity-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-center">
            Fiyatlandırma
          </h2>
          <p className="text-slate-300 text-center mb-12">
            Tüm paketler 30 gün ücretsiz deneme ile gelir
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Basic */}
            <div className="bg-slate-800 rounded-lg p-8 border border-slate-700 hover:border-orange-500 transition">
              <h3 className="text-2xl font-bold text-white mb-2">Basic</h3>
              <p className="text-slate-400 mb-6">1 Sunucu</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">₺99</span>
                <span className="text-slate-400">/ay</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-slate-300">
                  <Check size={18} className="text-orange-500" />
                  1 Assetto Corsa Sunucusu
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <Check size={18} className="text-orange-500" />
                  Temel İstatistikler
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <Check size={18} className="text-orange-500" />
                  E-mail Destek
                </li>
              </ul>
              <button className="w-full px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition">
                Seç
              </button>
            </div>

            {/* Pro */}
            <div className="bg-gradient-to-br from-orange-900 to-slate-800 rounded-lg p-8 border-2 border-orange-500 relative">
              <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                Popüler
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
              <p className="text-slate-300 mb-6">5 Sunucu</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">₺399</span>
                <span className="text-slate-300">/ay</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-white">
                  <Check size={18} className="text-orange-300" />
                  5 Assetto Corsa Sunucusu
                </li>
                <li className="flex items-center gap-2 text-white">
                  <Check size={18} className="text-orange-300" />
                  Detaylı İstatistikler
                </li>
                <li className="flex items-center gap-2 text-white">
                  <Check size={18} className="text-orange-300" />
                  Lig Sistemi
                </li>
                <li className="flex items-center gap-2 text-white">
                  <Check size={18} className="text-orange-300" />
                  Öncelikli Destek
                </li>
              </ul>
              <button className="w-full px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition font-semibold">
                Seç
              </button>
            </div>

            {/* Enterprise */}
            <div className="bg-slate-800 rounded-lg p-8 border border-slate-700 hover:border-orange-500 transition">
              <h3 className="text-2xl font-bold text-white mb-2">Enterprise</h3>
              <p className="text-slate-400 mb-6">Sınırsız Sunucu</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">Özel</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-slate-300">
                  <Check size={18} className="text-orange-500" />
                  Sınırsız Sunucu
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <Check size={18} className="text-orange-500" />
                  Tüm Özellikler
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <Check size={18} className="text-orange-500" />
                  24/7 Destek
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <Check size={18} className="text-orange-500" />
                  Dedike Hesap Yöneticisi
                </li>
              </ul>
              <button className="w-full px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition">
                İletişime Geçin
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Hemen Başlayın</h2>
          <p className="text-slate-300 mb-8">
            30 gün ücretsiz deneme süresi ile tüm özellikleri keşfedin
          </p>
          <Link
            to="/indir"
            className="px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition inline-flex items-center gap-2 text-lg"
          >
            <Download size={20} /> Ücretsiz İndir
          </Link>
        </div>
      </section>
    </div>
  );
}
