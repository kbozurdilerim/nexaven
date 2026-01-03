import { useEffect, useState } from 'react';
import { publicAPI } from '../api';
import { Target, Eye } from 'lucide-react';

export default function AboutPage() {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await publicAPI.getAbout();
        setAbout(response.data);
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
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-gray-400">Yükleniyor...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-dark-800 to-dark-900 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">{about?.title || 'Hakkında'}</h1>
          <p className="text-gray-400">Biz kimiz ve ne yaptığımız hakkında bilgi alın.</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Description */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Hikayemiz</h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              {about?.content || 'İçerik henüz eklenmemiştir.'}
            </p>
          </div>

          {/* Vision and Mission */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vision */}
            <div className="card">
              <div className="flex items-center gap-3 mb-4">
                <Eye className="text-primary-500" size={32} />
                <h3 className="text-2xl font-bold">Vizyonumuz</h3>
              </div>
              <p className="text-gray-400">
                {about?.vision || 'Vizyonumuz henüz eklenmemiştir.'}
              </p>
            </div>

            {/* Mission */}
            <div className="card">
              <div className="flex items-center gap-3 mb-4">
                <Target className="text-primary-500" size={32} />
                <h3 className="text-2xl font-bold">Misyonumuz</h3>
              </div>
              <p className="text-gray-400">
                {about?.mission || 'Misyonumuz henüz eklenmemiştir.'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
