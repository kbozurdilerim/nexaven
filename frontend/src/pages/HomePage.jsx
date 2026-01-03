import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { publicAPI } from '../api';
import { Sparkles, ArrowRight } from 'lucide-react';

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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-dark-800 to-dark-900 py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block mb-4 px-4 py-2 bg-primary-500/20 rounded-full">
            <span className="text-primary-500 font-semibold">Hoş Geldiniz</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Nexaven ile İşletmenizi
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-blue-400">
              {' '}Büyütün
            </span>
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            En iyi hizmetleri sunarak sizin başarınızın ortağı olmak için buradayız.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/services" className="btn-primary flex items-center justify-center gap-2">
              Hizmetleri Keşfet
              <ArrowRight size={20} />
            </Link>
            <Link to="/about" className="btn-secondary">
              Hakkında Bize
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Hizmetlerimiz</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Profesyonel hizmetlerle işletmenizin ihtiyaçlarına çözüm sunuyoruz.
            </p>
          </div>

          {loading ? (
            <div className="text-center text-gray-400">Yükleniyor...</div>
          ) : services.length === 0 ? (
            <div className="text-center text-gray-400">Henüz hizmet eklenmemiştir.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service) => (
                <div key={service.id} className="card hover:border-primary-500">
                  <div className="text-4xl mb-4">
                    <Sparkles className="text-primary-500" size={40} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-gray-400">{service.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Bugün Başlayın</h2>
          <p className="text-lg mb-8 text-blue-100">
            Kaydolarak tüm hizmetlere erişim sağlayın.
          </p>
          <Link to="/register" className="bg-white text-primary-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100">
            Ücretsiz Kaydol
          </Link>
        </div>
      </section>
    </div>
  );
}
