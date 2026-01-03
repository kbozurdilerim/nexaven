import { useEffect, useState } from 'react';
import { publicAPI } from '../api';
import { Sparkles } from 'lucide-react';

export default function ServicesPage() {
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
      {/* Header */}
      <section className="bg-gradient-to-br from-dark-800 to-dark-900 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Hizmetlerimiz</h1>
          <p className="text-gray-400">Profesyonel hizmetlerle işletmenizi büyütün.</p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center text-gray-400">Yükleniyor...</div>
          ) : services.length === 0 ? (
            <div className="text-center text-gray-400">Henüz hizmet eklenmemiştir.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <div key={service.id} className="card hover:border-primary-500 group">
                  <div className="mb-6 group-hover:scale-110 transition">
                    <Sparkles className="text-primary-500" size={48} />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                  <p className="text-gray-400 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="mt-6 pt-6 border-t border-dark-700">
                    <button className="text-primary-500 hover:text-primary-400 font-semibold flex items-center gap-2">
                      Detaylı Bilgi →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-dark-800 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Sizin İçin Doğru Hizmet?</h2>
          <p className="text-gray-400 mb-8">
            Hangi hizmeti önerelim diye soruyorsanız, iletişime geçin.
          </p>
          <button className="btn-primary">
            Bizimle İletişime Geçin
          </button>
        </div>
      </section>
    </div>
  );
}
