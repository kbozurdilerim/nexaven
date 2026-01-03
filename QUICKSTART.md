# 🚀 Hızlı Başlangıç Rehberi

## Lokal Geliştirme (Windows/Mac/Linux)

### 1. Proje Dosyalarını Hazırlayın
Proje zaten tamamlanmış durumda. Dizin yapısı:
```
Nexaven Website/
├── backend/       (Node.js Backend)
├── frontend/      (React Frontend)
└── deploy/        (VPS Deployment)
```

### 2. Backend'i Çalıştırın

```bash
cd backend
npm install
npm run dev
```

✅ Çıktı: Server running on port 5000

### 3. Frontend'i Çalıştırın (Yeni Terminal)

```bash
cd frontend
npm install
npm run dev
```

✅ Çıktı: http://localhost:3000

### 4. Tarayıcıda Açın
- Ana sayfa: http://localhost:3000
- Hizmetler: http://localhost:3000/services
- Hakkında: http://localhost:3000/about

## 📝 Test Verileri

### Admin Hesabı Oluşturma

1. Backend terminaline gidin
2. Node.js console açın:
   ```bash
   node
   ```

3. Şu kodu çalıştırın:
   ```javascript
   const bcrypt = require('bcryptjs');
   bcrypt.hash('Admin@123', 10).then(hash => console.log(hash));
   ```

4. Hash çıktısını kopyalayın

5. SQLite veritabanına admin ekleyin:
   ```bash
   sqlite3 nexaven.db
   ```

6. Veritabanında şu SQL'i çalıştırın:
   ```sql
   INSERT INTO users (id, email, password, full_name, role) 
   VALUES ('admin-001', 'admin@nexaven.com.tr', '[HASH_BURASI]', 'Admin', 'admin');
   ```

### Admin Paneline Giriş
- URL: http://localhost:3000/admin
- Email: admin@nexaven.com.tr
- Şifre: Admin@123

## 🎯 Admin Panelinden İçerik Yönetimi

### 1. Hizmet Eklemek
1. Admin Paneli → Hizmetler
2. "Yeni Hizmet" butonuna tıklayın
3. Başlık, Açıklama ve İkon seçin
4. Ekle butonuna tıklayın
5. Hizmet hemen ana sayfada görünecek

### 2. Hakkında Sayfasını Düzenlemek
1. Admin Paneli → Hakkında
2. Başlık, İçerik, Vizyon ve Misyon yazın
3. Kaydet butonuna tıklayın

### 3. Özel Sayfa Oluşturmak
1. Admin Paneli → Sayfalar
2. "Yeni Sayfa" butonuna tıklayın
3. Başlık, URL Adresi (slug) ve İçerik yazın
4. Yayınlanmış/Taslak durumunu seçin
5. Ekle butonuna tıklayın

## 🌐 VPS'ye Deployment

### Ön Koşullar
- Ubuntu 24.04 LTS VPS
- SSH erişimi
- nexaven.com.tr domain adınız

### Adım 1: Dosyaları VPS'ye Kopyalayın

```bash
# Windows Powershell'den:
scp -r "a:\Nexaven Website" root@your-vps-ip:/tmp/

# veya SCP ile:
scp -r ./Nexaven\ Website root@your-vps-ip:/tmp/
```

### Adım 2: VPS'ye SSH ile Bağlanın

```bash
ssh root@your-vps-ip
cd /tmp/Nexaven\ Website/deploy
```

### Adım 3: Deployment Script'ini Çalıştırın

```bash
chmod +x deploy.sh
./deploy.sh
```

Script otomatik olarak:
- ✅ Node.js ve npm kuracak
- ✅ Nginx yapılandıracak
- ✅ SSL sertifikası (Let's Encrypt) kuracak
- ✅ Systemd servisi kurulacak
- ✅ Database başlatılacak

### Adım 4: Admin Paneline Erişim

VPS'de admin hesabı oluşturun:

```bash
ssh root@your-vps-ip
cd /var/www/nexaven/backend
node
```

```javascript
const bcrypt = require('bcryptjs');
const db = require('./database.js');

// Hash oluştur
bcrypt.hash('Admin@123', 10).then(hash => {
    console.log(hash);
});
```

Hash'i veritabanına ekleyin:

```bash
sqlite3 /var/www/nexaven/backend/nexaven.db
```

```sql
INSERT INTO users (id, email, password, full_name, role) 
VALUES ('admin-001', 'admin@nexaven.com.tr', '[HASH_BURASI]', 'Admin', 'admin');
```

### Adım 5: Website'i Kontrol Edin

- https://nexaven.com.tr → Ana sayfa
- https://nexaven.com.tr/admin → Admin Panel
- Email: admin@nexaven.com.tr
- Şifre: Admin@123

## 📱 Responsive Design Test

Frontend otomatik olarak responsive:
- Mobil (320px - 480px) ✅
- Tablet (481px - 768px) ✅
- Desktop (769px+) ✅

## 🐛 Sorun Giderme

### Backend bağlantı hatası
```
Backend terminalini kontrol edin:
- "Server running on port 5000" mesajını görün
- CORS ayarlarını kontrol edin
```

### Database hataları
```bash
# Database'i sıfırla
rm nexaven.db
# Backend'i yeniden başlat
npm run dev
```

### Nginx hatası (VPS)
```bash
sudo nginx -t
sudo systemctl restart nginx
sudo tail -f /var/log/nginx/error.log
```

## 🔧 Önemli Dosyalar

| Dosya | Açıklama |
|-------|----------|
| backend/server.js | Backend server |
| frontend/src/App.jsx | Frontend app |
| deploy/nexaven.conf | Nginx config |
| deploy/nexaven.service | Systemd service |
| deploy/deploy.sh | Deployment script |

## 📞 Hızlı Komutlar

```bash
# Backend
cd backend && npm run dev

# Frontend  
cd frontend && npm run dev

# Backend build
cd backend && npm install

# Frontend build
cd frontend && npm run build

# VPS'de servisi yeniden başlat
sudo systemctl restart nexaven
```

## ✨ İlk Adımlar Özeti

1. ✅ Backend'i çalıştır (`npm run dev`)
2. ✅ Frontend'i çalıştır (`npm run dev`)
3. ✅ Admin hesabı oluştur
4. ✅ Admin paneline gir
5. ✅ Hizmet ekle
6. ✅ Hakkında sayfasını düzenle
7. ✅ VPS'ye deploy et

🎉 Tamamlandı! Siteniz hazır!
