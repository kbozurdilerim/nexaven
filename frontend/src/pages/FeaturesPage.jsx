import React from 'react';
import { BarChart3, Zap, Users, Shield, Flame, CheckCircle, Globe, Gauge, Lock, Settings, Cpu, Wifi } from 'lucide-react';

export default function FeaturesPage() {
  const features = [
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'Real-Time İzleme',
      description: 'Sunucu performansını gerçek zamanlı olarak takip edin. CPU, RAM, GPU ve ağ kullanımını anlık görüntüleyin.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Oyuncu Yönetimi',
      description: 'Oyuncu profilerini, istatistiklerini ve lig puanlarını yönetin. Hızlı banlama ve uyarı sistemi.'
    },
    {
      icon: <Flame className="w-8 h-8" />,
      title: 'Yarış Yönetimi',
      description: 'Yarışları oluşturun, zamanla ve canlı olarak yönetin. Otomatik puanlama sistemi ile zaman kazanın.'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Güvenlik & Anticheat',
      description: 'Gelişmiş anticheat sistemi ile oyun bütünlüğü koruyun. IP bantlama ve DDoS koruması.'
    },
    {
      icon: <Gauge className="w-8 h-8" />,
      title: 'İleri Ayarlar',
      description: 'Fizik, araç, pist ayarlarını yaşanabilir deneyim için özelleştirin. Her detayı kontrol edin.'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Yüksek Performans',
      description: '1000+ oyuncu kapasitesi. Düşük latency, yüksek FPS. Enterprise-grade altyapı.'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Küresel CDN',
      description: '5 kıta üzerinde sunucular. Aşağı Batı AB, Orta Doğu, Asya ve daha fazlası.'
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: 'Veri Gizliliği',
      description: 'GDPR ve KVKK uyumlu. Oyuncu verisi tamamen korunur ve şifrelenir.'
    },
    {
      icon: <Settings className="w-8 h-8" />,
      title: 'Otomasyonlar',
      description: 'Otomatik yönetim görevleri ayarlayın. Zamanla işlemleri çalıştırın, işleri otomatikleştirin.'
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: 'API Entegrasyonu',
      description: 'Kendi uygulamalarınızı ve botlarınızı konekt edin. Açık ve tam dokümanteli API.'
    },
    {
      icon: <Wifi className="w-8 h-8" />,
      title: 'Canlı Yayın Desteği',
      description: 'OBS, Twitch ve YouTube entegrasyonu. Otomatik highlight grabber ve replay sistemi.'
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: '7/24 Destek',
      description: 'Türkçe konuşan destek ekibi. Discord, email ve canlı sohbet aracılığıyla anlık yardım.'
    }
  ];

  const specs = [
    { label: 'Max. Oyuncu', value: '1000+' },
    { label: 'Sunucu Sayısı', value: 'Sınırsız' },
    { label: 'Yarış Türleri', value: '50+' },
    { label: 'Harita', value: '150+' },
    { label: 'Araç', value: '200+' },
    { label: 'Ping Ortalaması', value: '<50ms' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500/10 to-cyan-500/10 border-b border-orange-500/20">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
              Nexaven'in Güçlü Özellikleri
            </span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl">
            Assetto Corsa sunucularını profesyonel düzeyde yönetmek için ihtiyacınız olan her şey
          </p>
        </div>
      </div>

      {/* Specs Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {specs.map((spec, i) => (
            <div key={i} className="bg-dark-800/50 border border-slate-700 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-orange-400">{spec.value}</div>
              <div className="text-sm text-slate-400">{spec.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-dark-800/50 hover:bg-dark-800 border border-slate-700 hover:border-orange-500/50 rounded-lg p-6 transition-all duration-300 group"
            >
              <div className="text-orange-400 mb-4 group-hover:text-orange-300 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-slate-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-orange-500/10 to-cyan-500/10 border-t border-orange-500/20">
        <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">30 Gün Ücretsiz Deneyin</h2>
          <p className="text-lg text-slate-300 mb-8">
            Kredi kartı gerekmez. Tüm özellikleri tam erişimle test edin.
          </p>
          <button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 inline-block">
            Hemen Başlayın
          </button>
        </div>
      </div>
    </div>
  );
}
