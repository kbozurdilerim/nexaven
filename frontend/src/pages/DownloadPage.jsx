import React, { useState } from 'react';
import { Download, Check, Star, Clock, Users, MessageSquare } from 'lucide-react';

export default function DownloadPage() {
  const [selectedVersion, setSelectedVersion] = useState('stable');

  const versions = {
    stable: {
      title: 'Stable (Kararlı)',
      version: 'v2.5.1',
      date: '2024-01-15',
      size: '145 MB',
      description: 'Üretim ortamı için tavsiye edilen sürüm. Tam test edilmiş ve stabil.',
      features: [
        'Tam özellik seti',
        'Hata düzeltmeleri',
        'Performans optimizasyonları',
        '30 gün ücretsiz deneme'
      ],
      downloadUrl: '#',
      changelog: 'https://docs.nexaven.com/changelog/2.5.1'
    },
    beta: {
      title: 'Beta (Deneysel)',
      version: 'v2.6.0-beta.3',
      date: '2024-01-20',
      size: '152 MB',
      description: 'Yeni özellikler ve iyileştirmeler. Test ve geribildirim için idealdir.',
      features: [
        'Yeni özellikler erken erişim',
        'İyileştirilmiş UI',
        'Hata düzeltmeleri',
        'Komunite desteği'
      ],
      downloadUrl: '#',
      changelog: 'https://docs.nexaven.com/changelog/2.6.0-beta'
    },
    source: {
      title: 'Kaynak Kodu',
      version: 'v2.5.1',
      date: '2024-01-15',
      size: '8.2 MB',
      description: 'GitHub\'dan açık kaynak olarak indirin. Kendi özelleştirmelerinizi yapın.',
      features: [
        'Tam kaynak kodu',
        'MIT Lisansı',
        'Kustom geliştirme imkanı',
        'Komunite katkıları'
      ],
      downloadUrl: 'https://github.com/nexaven/nexaven-server',
      changelog: 'https://github.com/nexaven/nexaven-server/releases'
    }
  };

  const currentVersion = versions[selectedVersion];

  const systemRequirements = [
    { name: 'İşletim Sistemi', value: 'Windows 10+ / Linux / macOS 10.14+' },
    { name: 'RAM (Minimum)', value: '4 GB' },
    { name: 'RAM (Önerilen)', value: '8 GB+' },
    { name: 'Depolama', value: '200 MB SSD' },
    { name: 'CPU', value: 'Intel i5 / AMD Ryzen 5 veya daha iyi' },
    { name: 'Internet', value: '10 Mbps+ (kararlı bağlantı)' }
  ];

  const tutorials = [
    { title: 'Kurulum Rehberi', duration: '5 min', url: '#' },
    { title: 'İlk Sunucu Oluşturma', duration: '10 min', url: '#' },
    { title: 'Oyuncu Davet Etme', duration: '3 min', url: '#' },
    { title: 'Admin Paneli Öğretici', duration: '15 min', url: '#' }
  ];

  const faq = [
    {
      q: 'Lisans nedir?',
      a: 'Nexaven MIT Lisansı altında sunulur. Ticari ve kişisel kullanım için özgürsünüz.'
    },
    {
      q: 'Güncellemeler ücretsiz mi?',
      a: 'Evet, tüm güncellemeler ücretsiz. Premium eklentiler isteğe bağlıdır.'
    },
    {
      q: 'Eski sürümü kullanabilir miyim?',
      a: 'Evet, ancak güvenlik ve hata düzeltmeleri için en son sürüme güncellemenizi öneririz.'
    },
    {
      q: 'Windows Defender uyarı veriyor?',
      a: 'Yeni yayımlanan uygulamalar için Microsoft tarafından standarttır. Güvenle indirebilirsiniz.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500/10 to-cyan-500/10 border-b border-orange-500/20">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
              Nexaven'i İndirin
            </span>
          </h1>
          <p className="text-xl text-slate-300">
            Tüm platformlar için ücretsiz indirme seçenekleri
          </p>
        </div>
      </div>

      {/* Download Section */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Version Tabs */}
        <div className="flex flex-wrap gap-4 mb-8">
          {Object.entries(versions).map(([key, value]) => (
            <button
              key={key}
              onClick={() => setSelectedVersion(key)}
              className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 ${
                selectedVersion === key
                  ? 'bg-orange-500 text-white'
                  : 'bg-dark-800 text-slate-300 hover:bg-dark-700 border border-slate-700'
              }`}
            >
              {value.title}
            </button>
          ))}
        </div>

        {/* Download Card */}
        <div className="bg-dark-800/50 border border-slate-700 rounded-lg p-8 mb-12">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="inline-block bg-orange-500/10 border border-orange-500/30 px-3 py-1 rounded-full text-sm text-orange-400 mb-4">
                {currentVersion.version}
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">{currentVersion.title}</h2>
              <p className="text-slate-300 mb-6">{currentVersion.description}</p>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center text-slate-300">
                  <Clock className="w-4 h-4 mr-2 text-orange-400" />
                  Güncelleme: {currentVersion.date}
                </div>
                <div className="flex items-center text-slate-300">
                  <Download className="w-4 h-4 mr-2 text-orange-400" />
                  Dosya Boyutu: {currentVersion.size}
                </div>
              </div>

              <div className="space-y-2 mb-8">
                {currentVersion.features.map((feature, i) => (
                  <div key={i} className="flex items-center text-slate-300">
                    <Check className="w-5 h-5 mr-3 text-green-500" />
                    {feature}
                  </div>
                ))}
              </div>

              <div className="flex gap-4">
                <a
                  href={currentVersion.downloadUrl}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center"
                >
                  <Download className="w-5 h-5 mr-2" />
                  İndir
                </a>
                <a
                  href={currentVersion.changelog}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-slate-600 hover:border-orange-500 text-slate-300 hover:text-orange-400 px-8 py-3 rounded-lg font-semibold transition-all duration-300"
                >
                  Değişiklikler
                </a>
              </div>
            </div>

            <div className="bg-dark-900/50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Sistem Gereksinimleri</h3>
              <div className="space-y-3">
                {systemRequirements.map((req, i) => (
                  <div key={i} className="pb-3 border-b border-slate-700 last:border-0">
                    <div className="text-sm text-slate-400">{req.name}</div>
                    <div className="text-slate-200 font-medium">{req.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Start Guides */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Hızlı Başlangıç Rehberleri</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {tutorials.map((tutorial, i) => (
              <a
                key={i}
                href={tutorial.url}
                className="bg-dark-800/50 hover:bg-dark-800 border border-slate-700 hover:border-orange-500/50 rounded-lg p-4 transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-3">
                  <MessageSquare className="w-5 h-5 text-orange-400" />
                  <span className="text-xs text-slate-400">{tutorial.duration}</span>
                </div>
                <h3 className="font-semibold text-white group-hover:text-orange-400 transition-colors">
                  {tutorial.title}
                </h3>
              </a>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Sık Sorulan Sorular</h2>
          <div className="space-y-4">
            {faq.map((item, i) => (
              <div key={i} className="bg-dark-800/50 border border-slate-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-orange-400 mb-2">{item.q}</h3>
                <p className="text-slate-300">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Support CTA */}
      <div className="bg-gradient-to-r from-orange-500/10 to-cyan-500/10 border-t border-orange-500/20 mt-16">
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Sorun mu yaşıyorsunuz?</h2>
          <p className="text-slate-300 mb-6">
            Destek ekibimiz 7/24 yardıma hazır. Discord'a katılın ya da bize yazın.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://discord.gg/nexaven" className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
              Discord Sunucusu
            </a>
            <a href="mailto:support@nexaven.com" className="border border-orange-500 text-orange-400 hover:bg-orange-500/10 px-6 py-2 rounded-lg font-semibold transition-colors">
              E-posta ile İletişim
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
