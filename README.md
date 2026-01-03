# Nexaven Website

Karanlık temalı, yönetici ve müşteri panellerine sahip profesyonel bir web sitesi.

## 🚀 Özellikler

- **Karanlık Tema**: Modern ve profesyonel dark mode tasarım
- **Admin Paneli**: İçerik yönetimi için eksiksiz kontrol paneli
- **Müşteri Paneli**: Kullanıcı kaydı ve giriş sistemi
- **Hizmetler Yönetimi**: Admin panelinden hizmetleri ekle/sil/düzenle
- **Hakkında Sayfası**: Dinamik hakkında sayfası yönetimi
- **Özel Sayfalar**: İsteğe göre yeni sayfalar oluştur
- **Responsive Design**: Tüm cihazlarda uyumlu tasarım
- **JWT Authentication**: Güvenli kullanıcı doğrulama

## 📋 Teknoloji Stack

### Backend
- Node.js 20+
- Express.js
- SQLite3
- JWT (JSON Web Tokens)
- Bcrypt (Şifre Hashleme)

### Frontend
- React 18+
- React Router DOM
- Tailwind CSS
- Vite
- Lucide React (İkonlar)
- Axios

## 🔧 Lokal Kurulum

### Ön Koşullar
- Node.js 20+
- npm veya yarn

### Backend Kurulumu

```bash
cd backend
npm install
npm run dev
```

Backend şu adres üzerinde çalışacaktır: http://localhost:5000

### Frontend Kurulumu

```bash
cd frontend
npm install
npm run dev
```

Frontend şu adres üzerinde çalışacaktır: http://localhost:3000

## 📦 Deployment (VPS)

Ubuntu 24.04 LTS'ye deployment yapmak için:

```bash
cd deploy
chmod +x deploy.sh
./deploy.sh
```

Script otomatik olarak:
- Node.js ve Nginx'i kuracak
- Uygulamayı `/var/www/nexaven` dizinine yerleştirecek
- SSL sertifikası (Let's Encrypt) kuracak
- Systemd servisi yapılandıracak

## 📝 .env Dosyası

Backend için `.env` dosyası oluşturun:

```
PORT=5000
JWT_SECRET=your-secret-key-here
NODE_ENV=production
```

## 🔐 İlk Admin Hesabı Oluşturma

Veritabanına direkt erişerek admin hesabı oluşturun:

```bash
sqlite3 backend/nexaven.db
```

```sql
INSERT INTO users (id, email, password, full_name, role) 
VALUES ('123', 'admin@nexaven.com.tr', 'hashed_password', 'Admin', 'admin');
```

Şifre bcrypt ile hashlenmiş olmalıdır. Node.js'de hash oluşturmak için:

```javascript
const bcrypt = require('bcryptjs');
bcrypt.hash('your-password', 10).then(hash => console.log(hash));
```

## 🎨 Özelleştirme

### Renk Şeması
Tailwind config'ini düzenleyin: `frontend/tailwind.config.js`

### Logo ve Branding
- Header bileşenini düzenleyin: `frontend/src/components/Header.jsx`
- CSS stil dosyasını güncelleyin: `frontend/src/index.css`

## 📂 Dizin Yapısı

```
nexaven/
├── backend/
│   ├── routes/
│   ├── middleware/
│   ├── database.js
│   ├── server.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── admin/
│   │   ├── App.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
└── deploy/
    ├── nexaven.conf
    ├── nexaven.service
    └── deploy.sh
```

## 🛠️ Yönetim Komutları

### Backend Servisi
```bash
# Durumunu kontrol et
sudo systemctl status nexaven

# Restart et
sudo systemctl restart nexaven

# Logları gör
tail -f /var/log/nexaven/backend.log
```

### Nginx
```bash
# Nginx testini çalıştır
sudo nginx -t

# Nginx restart et
sudo systemctl restart nginx
```

## 📧 API Endpoints

### Authentication
- `POST /api/auth/register` - Yeni kullanıcı kaydı
- `POST /api/auth/login` - Kullanıcı girişi

### Public
- `GET /api/public/about` - Hakkında bilgileri
- `GET /api/public/services` - Tüm hizmetler
- `GET /api/public/pages` - Tüm sayfalar
- `GET /api/public/pages/:slug` - Belirli sayfa

### Admin (Authenticated)
- `GET /api/admin/dashboard` - Dashboard verileri
- `GET/POST/PUT/DELETE /api/admin/services` - Hizmet yönetimi
- `GET/PUT /api/admin/about` - Hakkında yönetimi
- `GET/POST/PUT/DELETE /api/admin/pages` - Sayfa yönetimi

## 🔒 Güvenlik

- Tüm şifreler bcrypt ile hashlanır
- JWT tokens 30 gün geçerli
- HTTPS/SSL zorunlu
- CORS yapılandırıldı
- SQL injection koruması

## 📞 İletişim & Destek

Website: https://nexaven.com.tr
Email: info@nexaven.com.tr

## 📄 Lisans

MIT License
