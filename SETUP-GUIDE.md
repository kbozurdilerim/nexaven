# 🎮 Nexaven - Assetto Corsa Sunucu Yönetim Platformu

Modern, profesyonel ve kullanıcı dostu Assetto Corsa sunucu yönetim sistemi.

## 📋 İçindekiler

- [Özellikler](#özellikler)
- [Teknoloji Yığını](#teknoloji-yığını)
- [Kurulum](#kurulum)
- [Admin Hesabı](#admin-hesabı)
- [Proje Yapısı](#proje-yapısı)
- [Yapılandırma](#yapılandırma)
- [Dağıtım](#dağıtım)

## ✨ Özellikler

### Frontend
- ✅ Modern React 18 uygulaması
- ✅ Assetto Corsa temalı koyu tasarım
- ✅ Responsive ve mobil uyumlu arayüz
- ✅ Admin kontrol paneli
- ✅ Sunucu yönetimi
- ✅ Kullanıcı yönetimi
- ✅ Real-time istatistikler

### Backend
- ✅ Express.js RESTful API
- ✅ SQLite veritabanı
- ✅ JWT kimlik doğrulama
- ✅ Rol tabanlı erişim kontrolü (RBAC)
- ✅ Güvenli şifre hashleme (bcryptjs)
- ✅ CORS desteği
- ✅ Sağlık kontrolü endpoint'i

### Dağıtım
- ✅ Docker & Docker Compose
- ✅ Alpine Linux optimizasyonu
- ✅ Nginx ters proxy
- ✅ Otomatik health checks
- ✅ Veritabanı persistensi

## 🛠 Teknoloji Yığını

### Frontend
```
React 18.2.0          - UI kütüphanesi
Vite 5.0.8            - Derleme aracı
React Router 6.20.1   - Rotalama
Tailwind CSS 3.4.1    - Stil
Axios 1.6.2           - HTTP istemcisi
Lucide React 0.294.0  - İconlar
```

### Backend
```
Node.js 20            - Runtime
Express 4.18.2        - Web framework
SQLite3 5.1.6         - Veritabanı
JWT 9.0.2             - Kimlik doğrulama
bcryptjs 2.4.3        - Şifre hashleme
uuid 9.0.1            - Kimlik oluşturma
```

### DevOps
```
Docker & Compose      - Konteynerizasyon
Nginx                 - Web sunucusu
Alpine Linux          - Hafif OS
```

## 🚀 Kurulum

### Gereksinimler
- Node.js 18+
- npm veya yarn
- Docker & Docker Compose (dağıtım için)

### Yerel Geliştirme

1. **Depoyu klonlayın**
```bash
git clone <repo-url>
cd nexaven
```

2. **Bağımlılıkları yükleyin**
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

3. **Ortam değişkenlerini ayarlayın**
```bash
# Backend
cd backend
cp .env.example .env
# .env dosyasını düzenleyin
```

4. **Uygulamayı başlatın**
```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend
cd frontend
npm run dev
```

Uygulama http://localhost:5173'te açılacak

## 🔐 Admin Hesabı

### Otomatik Admin Oluşturma

Admin kullanıcısı sunucu başladığında otomatik olarak oluşturulur:

**Giriş Bilgileri:**
```
E-posta: admin@nexaven.com
Şifre: Admin@123456
```

### Manuel Admin Oluşturma

Node REPL kullanarak:
```bash
cd backend
node
```

```javascript
const seed = await import('./seed-admin.js');
await seed.default();
.exit
```

### İlk Kurulum Adımları

1. `/login` sayfasına gidin
2. Admin bilgileri ile giriş yapın
3. `/admin` paneline erişin
4. **İlk olarak şifreyi değiştirin**
5. Sunucuları, kullanıcıları ve sayfaları yönetin

## 📁 Proje Yapısı

```
nexaven/
├── backend/
│   ├── data/                    # SQLite veritabanı
│   ├── middleware/
│   │   └── auth.js             # JWT doğrulama
│   ├── routes/
│   │   ├── auth.js             # Kimlik doğrulama rotaları
│   │   ├── admin.js            # Admin rotaları
│   │   └── public.js           # Genel rotalar
│   ├── database.js             # Veritabanı konfigürasyonu
│   ├── server.js               # Ana sunucu dosyası
│   ├── seed-admin.js           # Admin oluşturma script'i
│   ├── ADMIN-CREDENTIALS.js    # Admin bilgileri dokumentasyonu
│   ├── package.json
│   └── .env                    # Ortam değişkenleri
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── HomePage.jsx         # Ana sayfa
│   │   │   ├── FeaturesPage.jsx     # Özellikler
│   │   │   ├── DownloadPage.jsx     # İndirme
│   │   │   ├── ContactPage.jsx      # İletişim
│   │   │   ├── AboutPage.jsx        # Hakkında
│   │   │   ├── ServicesPage.jsx     # Hizmetler
│   │   │   ├── LoginPage.jsx        # Giriş
│   │   │   └── RegisterPage.jsx     # Kayıt
│   │   ├── admin/
│   │   │   ├── AdminDashboard.jsx   # Admin layout
│   │   │   └── pages/
│   │   │       ├── AdminHome.jsx         # Dashboard anasayfa
│   │   │       ├── AdminServers.jsx      # Sunucu yönetimi
│   │   │       ├── AdminUsers.jsx        # Kullanıcı yönetimi
│   │   │       ├── AdminAbout.jsx        # Hakkında sayfası
│   │   │       ├── AdminPages.jsx        # Sayfa yönetimi
│   │   │       └── AdminServices.jsx     # Hizmet yönetimi
│   │   ├── components/
│   │   │   ├── Header.jsx          # Navigasyon
│   │   │   └── ...
│   │   ├── App.jsx                 # Uygulamara router
│   │   ├── AuthContext.jsx         # Kimlik doğrulama state
│   │   ├── api.js                  # API istemcisi
│   │   ├── index.css               # Global stiller
│   │   └── main.jsx                # Entry point
│   ├── postcss.config.js           # PostCSS config
│   ├── postcss.config.cjs          # PostCSS CommonJS
│   ├── tailwind.config.js          # Tailwind konfigürasyonu
│   ├── vite.config.js              # Vite konfigürasyonu
│   ├── package.json
│   └── index.html
│
├── docker-compose.yml              # Docker Compose konfigürasyonu
├── Dockerfile.backend              # Backend Docker image
├── Dockerfile.frontend             # Frontend Docker image
├── .env.example                    # Örnek ortam değişkenleri
└── README.md                       # Bu dosya
```

## ⚙️ Yapılandırma

### Ortam Değişkenleri

**Backend (.env)**
```env
PORT=5000
JWT_SECRET=your-secret-key-here
NODE_ENV=development
DB_PATH=./data/nexaven.db
```

**Frontend (.env, isteğe bağlı)**
```env
VITE_API_URL=http://localhost:5000
```

## 🐳 Docker Dağıtımı

### Yerel Docker İle Çalıştırma

```bash
docker-compose up -d
```

### Docker İmajlarını Oluşturma

```bash
# Backend
docker build -f Dockerfile.backend -t nexaven-backend .

# Frontend
docker build -f Dockerfile.frontend -t nexaven-frontend .
```

### VPS Dağıtımı

1. **Sunucuya SSH ile bağlanın**
```bash
ssh root@your-vps-ip
```

2. **Docker Compose dosyasını yükleyin**
```bash
# docker-compose.yml ve Dockerfile'ları sunucuya kopyalayın
scp docker-compose.yml root@your-vps-ip:/app/
scp Dockerfile.* root@your-vps-ip:/app/
```

3. **Konteynerları başlatın**
```bash
cd /app
docker-compose up -d
```

4. **DNS ayarlarını yapılandırın**
```
A kaydı: nexaven.com.tr -> VPS_IP
TTL: 3600
```

5. **SSL (Let's Encrypt) ayarlayın**
```bash
docker-compose exec frontend certbot certonly --standalone -d nexaven.com.tr
```

## 📊 API Endpoints

### Kimlik Doğrulama
```
POST /api/auth/register    - Kayıt ol
POST /api/auth/login       - Giriş yap
```

### Genel
```
GET  /api/public/services   - Hizmetleri getir
GET  /api/public/about      - Hakkında bilgilerini getir
GET  /api/health            - Sağlık kontrolü
```

### Admin (Korumalı)
```
GET    /api/admin/services      - Tüm hizmetleri getir
POST   /api/admin/services      - Hizmet oluştur
PUT    /api/admin/services/:id  - Hizmet güncelle
DELETE /api/admin/services/:id  - Hizmet sil

GET    /api/admin/about         - Hakkında bilgilerini getir
PUT    /api/admin/about         - Hakkında güncelle
```

## 🔒 Güvenlik

### Öneriler

1. **Şifre Yönetimi**
   - Admin şifresini ilk girişten sonra değiştirin
   - En az 12 karakter, karışık karakterler kullanın
   - Düzenli olarak şifreyi güncelleyin

2. **Token Yönetimi**
   - JWT_SECRET'i güçlü ve benzersiz yapın
   - Production'da .env dosyasını gizli tutun
   - Token süresi (30 gün) düzenli olarak kontrol edin

3. **Veritabanı**
   - Düzenli yedekleme yapın
   - Üretim ortamında şifrelenmiş bağlantı kullanın
   - SQL injection'a karşı korumalı SQL ifadeleri kullanın

4. **HTTPS**
   - Production'da HTTPS zorunlu kullanın
   - Let's Encrypt'ten ücretsiz sertifikat alın
   - Sertifikayı düzenli olarak yenileyin

## 📝 Veritabanı Şeması

### users
```sql
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

### services
```sql
CREATE TABLE services (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  max_players INTEGER,
  location TEXT,
  status TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

### Diğer Tablolar
- pages
- about
- settings

## 🐛 Sorun Giderme

### Veritabanı Bağlantı Hatası
```
Çözüm: DB_PATH ortam değişkeninin doğru olduğunu kontrol edin
```

### Admin Paneline Erişememe
```
Çözüm: Admin rolüne sahip olduğunuzdan emin olun
Token'ın geçerli olup olmadığını kontrol edin
```

### Docker Hataları
```
# Logları kontrol edin
docker-compose logs

# Konteyner yeniden başlatın
docker-compose restart

# Veritabanını sıfırla
docker volume rm nexaven-db
docker-compose up -d
```

## 📞 Destek

- **Discord:** https://discord.gg/nexaven
- **E-posta:** support@nexaven.com
- **İssue Tracker:** GitHub Issues

## 📄 Lisans

MIT License - Bkz [LICENSE](LICENSE)

## 🙏 Katkıda Bulunma

Katkılarınız hoş geldiniz! Lütfen:

1. Branch'inizi oluşturun (`git checkout -b feature/amazing-feature`)
2. Değişikliklerinizi commit'leyin (`git commit -m 'Add amazing feature'`)
3. Branch'inizi push'layın (`git push origin feature/amazing-feature`)
4. Pull Request açın

---

**Nexaven ile Yarışı Ötesine Geçin! 🏁**
