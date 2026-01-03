# Nexaven Docker Compose - Hızlı Başlangıç

## 🚀 Tek Komutla Başlat

### Linux/Mac
```bash
chmod +x deploy/docker-deploy.sh
./deploy/docker-deploy.sh
```

### Windows (PowerShell)
```powershell
docker compose build
docker compose up -d
```

## 📦 Manuel Kurulum

### 1. Environment Ayarla
```bash
cp .env.example .env
# .env dosyasını düzenleyin
```

### 2. Build ve Başlat
```bash
docker compose build
docker compose up -d
```

### 3. Durumu Kontrol Et
```bash
docker compose ps
docker compose logs -f
```

## 🔑 Admin Hesabı Oluştur

```bash
# Backend container'a gir
docker compose exec backend sh

# Hash oluştur
node
> const bcrypt = require('bcryptjs');
> bcrypt.hash('Admin@123', 10).then(hash => console.log(hash));

# Veritabanına ekle
sqlite3 nexaven.db
INSERT INTO users VALUES ('admin-001', 'admin@nexaven.com.tr', 'HASH_VALUE', 'Admin', 'admin', 1, CURRENT_TIMESTAMP);
```

## 🌐 Erişim

- Frontend: http://localhost
- Admin: http://localhost/admin
- API: http://localhost:5000

## 📚 Detaylı Rehber

Tam rehber için: [DOCKER-DEPLOYMENT.md](DOCKER-DEPLOYMENT.md)

## 🔧 Yararlı Komutlar

```bash
# Başlat
docker compose up -d

# Durdur
docker compose down

# Yeniden başlat
docker compose restart

# Logları gör
docker compose logs -f

# Container'a gir
docker compose exec backend sh

# Rebuild
docker compose build --no-cache
```

## 🔒 Güvenlik

1. `.env` dosyasındaki `JWT_SECRET` değiştirin
2. Admin şifresini değiştirin
3. Production'da SSL kullanın (Nginx Proxy Manager)

## 📞 Yardım

Sorun yaşarsanız:
1. Logları kontrol edin: `docker compose logs -f`
2. Container durumunu kontrol edin: `docker compose ps`
3. Health check: `curl http://localhost:5000/api/health`

**Başarılar! 🎉**
