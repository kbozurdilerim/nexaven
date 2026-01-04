import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'general',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simüle edilen gönderim
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
      setFormData({ name: '', email: '', phone: '', subject: 'general', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }, 1000);
  };

  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'E-posta',
      value: 'support@nexaven.com',
      description: 'Yanıt süresi: 2 saat içinde',
      link: 'mailto:support@nexaven.com'
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: 'Discord',
      value: 'Discord Sunucusu',
      description: 'Canlı destek ve komunite',
      link: 'https://discord.gg/nexaven'
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Telefon',
      value: '+90 (312) 999-8800',
      description: 'Pazartesi-Cuma, 09:00-18:00 CET',
      link: 'tel:+903129998800'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Ofis',
      value: 'Ankara, Türkiye',
      description: 'Bölge: Merkez, Çankaya',
      link: '#'
    }
  ];

  const faqItems = [
    {
      q: 'İşletmek için teknik destek lazım mı?',
      a: 'Hayır. Nexaven tamamen yönetilen bir hizmettir. Biz altyapıyı yönetiyoruz, siz sadece sunucuyu çalıştırırsınız.'
    },
    {
      q: 'Aylık ödemede indirim var mı?',
      a: 'Evet. Yıllık planlara %20 indirim ve kurumsal aboneliklere özel fiyatlar sunuyoruz.'
    },
    {
      q: 'Veri migrasyon hizmeti sağlıyorsunuz mu?',
      a: 'Evet. Eski sunuculardan veri transferi tamamen ücretsiz ve güvenilir şekilde yapılır.'
    },
    {
      q: 'Ücretsiz denemeye kredi kartı lazım mı?',
      a: 'Hayır. 30 günlük ücretsiz deneme tamamen risksiz. Herhangi bir ödeme bilgisi gerekmez.'
    },
    {
      q: 'Bağlantısını keserseniz ne olur?',
      a: 'Sunucu 30 gün boyunca pasif kalabilir. Verileri kaybetmezsiniz. İstediğiniz zaman devam edebilirsiniz.'
    },
    {
      q: 'Başka bir sağlayıcıdan taşıyabilir miyim?',
      a: 'Evet, tamamen ücretsiz taşıma hizmeti sunuyoruz. Siz sadece oturum açın, gerisini biz hallederiz.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500/10 to-cyan-500/10 border-b border-orange-500/20">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
              Bize Ulaşın
            </span>
          </h1>
          <p className="text-xl text-slate-300">
            Sorularınız ve önerileriniz için biz buradayız. 7/24 destek ekibi hazır.
          </p>
        </div>
      </div>

      {/* Contact Methods */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactMethods.map((method, i) => (
            <a
              key={i}
              href={method.link}
              target={method.link.startsWith('http') ? '_blank' : '_self'}
              rel={method.link.startsWith('http') ? 'noopener noreferrer' : ''}
              className="bg-dark-800/50 border border-slate-700 hover:border-orange-500/50 rounded-lg p-6 transition-all duration-300 group hover:bg-dark-800"
            >
              <div className="text-orange-400 mb-3 group-hover:scale-110 transition-transform">
                {method.icon}
              </div>
              <h3 className="font-semibold text-white mb-2">{method.title}</h3>
              <p className="text-orange-400 font-medium mb-2">{method.value}</p>
              <p className="text-sm text-slate-400">{method.description}</p>
            </a>
          ))}
        </div>

        {/* Contact Form */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="bg-dark-800/50 border border-slate-700 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Mesaj Gönderin</h2>
              
              {submitted && (
                <div className="mb-6 bg-green-500/10 border border-green-500/30 text-green-400 p-4 rounded-lg flex items-center">
                  <div className="w-5 h-5 mr-3 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">✓</div>
                  Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Adınız *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-dark-900/50 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-colors"
                      placeholder="Ad Soyad"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      E-posta *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-dark-900/50 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-colors"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Telefon (İsteğe Bağlı)
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-dark-900/50 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-colors"
                      placeholder="+90 XXX XXX XXXX"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Konu *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full bg-dark-900/50 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500 transition-colors"
                    >
                      <option value="general">Genel Soru</option>
                      <option value="support">Teknik Destek</option>
                      <option value="billing">Faturalandırma</option>
                      <option value="partnership">İş Ortaklığı</option>
                      <option value="other">Diğer</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Mesajınız *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full bg-dark-900/50 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-colors resize-none"
                    placeholder="Mesajınızı buraya yazın..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center"
                >
                  <Send className="w-5 h-5 mr-2" />
                  {loading ? 'Gönderiliyor...' : 'Mesajı Gönder'}
                </button>
              </form>
            </div>
          </div>

          {/* Side Info */}
          <div>
            <div className="bg-dark-800/50 border border-slate-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-orange-400" />
                Çalışma Saatleri
              </h3>
              <div className="space-y-3 text-slate-300">
                <div>
                  <div className="font-medium text-white">Pazartesi - Cuma</div>
                  <div>09:00 - 18:00 (CET)</div>
                </div>
                <div>
                  <div className="font-medium text-white">Cumartesi - Pazar</div>
                  <div>Discord: Her Zaman</div>
                </div>
              </div>
            </div>

            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-6 mt-6">
              <h3 className="text-lg font-semibold text-orange-400 mb-3">Hızlı Cevap</h3>
              <p className="text-slate-300 text-sm mb-4">
                Önemli bir konunuz varsa Discord sunucumuza katılıp destek kanalında yazabilirsiniz.
              </p>
              <a
                href="https://discord.gg/nexaven"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
              >
                Discord'a Katıl
              </a>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-8">Sık Sorulan Sorular</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {faqItems.map((item, i) => (
              <div key={i} className="bg-dark-800/50 border border-slate-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-orange-400 mb-2">{item.q}</h3>
                <p className="text-slate-300">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
