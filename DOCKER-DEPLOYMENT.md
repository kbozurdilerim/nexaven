# 🐳 Docker Compose Deployment Rehberi

## Nexaven Website - Docker ile Kurulum

Docker Compose kullanarak Nexaven web sitesini kolayca deploy edin.

---

## 📋 Ön Koşullar

- ✅ Docker 24+ yüklü
- ✅ Docker Compose v2+ yüklü
- ✅ VPS veya lokal makine
- ✅ 2GB+ RAM
- ✅ Domain adı (opsiyonel)

---

## 🚀 Hızlı Başlangıç (5 Dakika)

### 1. Projeyi VPS'ye Kopyalayın

```bash
# Windows'dan
scp -r "Nexaven Website" root@your-vps-ip:/opt/nexaven

# Linux/Mac'ten
scp -r ./Nexaven\ Website root@your-vps-ip:/opt/nexaven
```

### 2. VPS'ye Bağlanın

```bash
ssh root@your-vps-ip
cd /opt/nexaven
```

### 3. Environment Dosyasını Oluşturun

```bash
cat > .env << 'EOF'
JWT_SECRET=nexaven-super-secret-key-2024
NODE_ENV=production
EOF
```

### 4. Docker Compose ile Başlatın

```bash
docker-compose up -d
```

✅ **BITTI!** Website çalışıyor!

---

## 🌐 Erişim

### Lokal
- 🌐 Frontend: http://localhost
- 🔧 Backend API: http://localhost:5000

### VPS (Domain ile)
- 🌐 Website: http://your-domain.com
- 🔐 Admin: http://your-domain.com/admin
- 🔧 API: http://your-domain.com/api

---

## 🔧 Docker Kurulumu (Ubuntu 24.04)

### Adım 1: Docker Yükleyin

```bash
# Sistem güncelle
sudo apt update && sudo apt upgrade -y

# Docker'ın resmi GPG key'ini ekle
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Docker repository ekle
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Docker yükle
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Docker'ı başlat
sudo systemctl start docker
sudo systemctl enable docker

# Versiyonu kontrol et
docker --version
docker compose version
```

### Adım 2: Docker Compose Yükleyin (v2)

```bash
# Genellikle yukarıdaki komutla gelir, eğer yoksa:
sudo apt install -y docker-compose-plugin

# Kontrol et
docker compose version
```

---

## 📦 Deployment Adımları

### 1. Proje Dosyalarını Hazırlayın

```bash
# Proje dizinine git
cd /opt/nexaven

# Dosya yapısını kontrol et
ls -la
# Görmeniz gerekenler:
# - docker-compose.yml
# - Dockerfile.backend
# - Dockerfile.frontend
# - backend/
# - frontend/
```

### 2. Environment Değişkenlerini Ayarlayın

```bash
# .env dosyası oluştur
nano .env
```

İçeriği:
```env
JWT_SECRET=güvenli-secret-key-buraya
NODE_ENV=production
```

Kaydet: `Ctrl+O`, `Enter`, `Ctrl+X`

### 3. Docker Image'larını Build Edin

```bash
# Build işlemi (ilk seferde 5-10 dakika sürebilir)
docker compose build

# İlerlemesi görebilirsiniz:
# [+] Building backend...
# [+] Building frontend...
```

### 4. Container'ları Başlatın

```bash
# Arka planda başlat
docker compose up -d

# Logları görmek için
docker compose logs -f
```

### 5. Durumu Kontrol Edin

```bash
# Container'ların durumunu gör
docker compose ps

# Çıktı:
# NAME                COMMAND             STATUS
# nexaven-backend     "node server.js"    Up (healthy)
# nexaven-frontend    "nginx -g ..."      Up
```

---

## 🔐 Admin Hesabı Oluşturma

### Yöntem 1: Backend Container'da

```bash
# Backend container'a gir
docker compose exec backend sh

# Node console aç
node

# Hash oluştur
const bcrypt = require('bcryptjs');
bcrypt.hash('Admin@123', 10).then(hash => console.log(hash));

# Hash'i kopyala (Ctrl+C ile çık)
```

### Yöntem 2: SQLite Direkt

```bash
# Backend container'a gir
docker compose exec backend sh

# SQLite aç
sqlite3 nexaven.db

# Admin ekle (HASH_BURASI yerine yukarıdaki hash'i yapıştır)
INSERT INTO users (id, email, password, full_name, role) 
VALUES ('admin-001', 'admin@nexaven.com.tr', 'HASH_BURASI', 'Admin', 'admin');

# Kontrol et
SELECT * FROM users;

# Çık
.quit
exit
```

---

## 🎯 Docker Compose Komutları

### Container Yönetimi

```bash
# Başlat
docker compose up -d

# Durdur
docker compose down

# Yeniden başlat
docker compose restart

# Sadece backend'i yeniden başlat
docker compose restart backend

# Logları gör
docker compose logs -f

# Sadece backend logları
docker compose logs -f backend

# Container durumu
docker compose ps

# Container'a gir
docker compose exec backend sh
docker compose exec frontend sh
```

### Build ve Güncelleme

```bash
# Rebuild (kod değişikliği sonrası)
docker compose build

# Rebuild ve restart
docker compose up -d --build

# Force rebuild (cache olmadan)
docker compose build --no-cache

# Sadece backend rebuild
docker compose build backend
```

### Temizleme

```bash
# Container'ları durdur ve sil
docker compose down

# Container + Volume'leri sil
docker compose down -v

# Container + Image'ları sil
docker compose down --rmi all

# Sistem temizliği
docker system prune -a
```

---

## 🔄 Kod Güncellemeleri

### Backend Güncellemesi

```bash
# 1. Yeni kodu çek (git kullanıyorsanız)
git pull

# 2. Backend'i rebuild et
docker compose build backend

# 3. Container'ı yeniden başlat
docker compose up -d backend
```

### Frontend Güncellemesi

```bash
# 1. Yeni kodu çek
git pull

# 2. Frontend'i rebuild et
docker compose build frontend

# 3. Container'ı yeniden başlat
docker compose up -d frontend
```

### Her İkisini Güncelle

```bash
docker compose down
docker compose build
docker compose up -d
```

---

## 🌐 Domain ve SSL Yapılandırması

### Nginx Proxy Manager Kullanarak (Önerilen)

#### 1. Nginx Proxy Manager Yükleyin

```bash
# docker-compose.nginx.yml oluştur
cat > docker-compose.nginx.yml << 'EOF'
version: '3.8'
services:
  nginx-proxy-manager:
    image: jc21/nginx-proxy-manager:latest
    ports:
      - "80:80"
      - "443:443"
      - "81:81"
    volumes:
      - npm-data:/data
      - npm-letsencrypt:/etc/letsencrypt
    restart: unless-stopped

volumes:
  npm-data:
  npm-letsencrypt:
EOF

# Başlat
docker compose -f docker-compose.nginx.yml up -d
```

#### 2. Nginx Proxy Manager'a Giriş Yapın

- 🌐 URL: http://your-vps-ip:81
- 📧 Email: `admin@example.com`
- 🔐 Password: `changeme`

İlk giriş sonrası şifreyi değiştirin!

#### 3. Proxy Host Ekleyin

1. **Proxy Hosts** → **Add Proxy Host**
2. **Details:**
   - Domain: `nexaven.com.tr`
   - Scheme: `http`
   - Forward Hostname: `nexaven-frontend`
   - Forward Port: `80`
3. **SSL:**
   - SSL Certificate: Request new SSL Certificate
   - Force SSL: ✅
   - Email: your@email.com
4. **Save**

✅ **HTTPS aktif!** https://nexaven.com.tr

---

## 📊 Monitoring ve Loglar

### Log Görüntüleme

```bash
# Tüm loglar
docker compose logs -f

# Son 100 satır
docker compose logs --tail=100

# Backend logları
docker compose logs -f backend

# Frontend logları
docker compose logs -f frontend

# Zaman damgalı loglar
docker compose logs -f -t
```

### Container İstatistikleri

```bash
# CPU, RAM kullanımı
docker stats

# Sadece Nexaven container'ları
docker stats nexaven-backend nexaven-frontend
```

### Health Check

```bash
# Backend health
curl http://localhost:5000/api/health

# Container health durumu
docker inspect nexaven-backend --format='{{.State.Health.Status}}'
```

---

## 💾 Yedekleme

### Database Yedekleme

```bash
# Veritabanını yedekle
docker compose exec backend sh -c "cd /app/backend && tar -czf /tmp/nexaven-db-backup.tar.gz nexaven.db"

# Yedek dosyasını kopyala
docker cp nexaven-backend:/tmp/nexaven-db-backup.tar.gz ./nexaven-db-backup-$(date +%Y%m%d).tar.gz
```

### Tam Yedekleme

```bash
# Volume'ü yedekle
docker run --rm -v nexaven_nexaven-db:/data -v $(pwd):/backup alpine tar czf /backup/nexaven-volume-backup-$(date +%Y%m%d).tar.gz /data

# İndir
scp root@your-vps-ip:/opt/nexaven/nexaven-volume-backup-*.tar.gz ./
```

### Otomatik Yedekleme (Cron)

```bash
# Backup script oluştur
cat > /opt/nexaven/backup.sh << 'EOF'
#!/bin/bash
DATE=$(date +%Y%m%d)
docker compose -f /opt/nexaven/docker-compose.yml exec -T backend sh -c "cd /app/backend && tar -czf /tmp/db-backup-$DATE.tar.gz nexaven.db"
docker cp nexaven-backend:/tmp/db-backup-$DATE.tar.gz /backups/
find /backups -name "db-backup-*.tar.gz" -mtime +7 -delete
EOF

chmod +x /opt/nexaven/backup.sh

# Crontab ekle (her gün saat 2'de)
(crontab -l 2>/dev/null; echo "0 2 * * * /opt/nexaven/backup.sh") | crontab -
```

---

## 🔧 Sorun Giderme

### Container Başlatılamıyor

```bash
# Logları kontrol et
docker compose logs backend
docker compose logs frontend

# Container'ları yeniden oluştur
docker compose down
docker compose up -d
```

### Port Çakışması

```bash
# Çakışan portları bul
sudo netstat -tulpn | grep :80
sudo netstat -tulpn | grep :5000

# Portları değiştir (docker-compose.yml)
# frontend ports: - "8080:80"
# backend ports: - "5001:5000"
```

### Database Erişim Sorunu

```bash
# Volume'ü kontrol et
docker volume ls

# Volume'ü yeniden oluştur
docker compose down -v
docker compose up -d
```

### Image Build Hatası

```bash
# Cache'siz build
docker compose build --no-cache

# Docker disk alanı temizle
docker system prune -a
```

---

## 🎯 Production En İyi Uygulamalar

### 1. Resource Limits

`docker-compose.yml` dosyasına ekleyin:

```yaml
services:
  backend:
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 512M
        reservations:
          cpus: '0.5'
          memory: 256M
```

### 2. Restart Policy

```yaml
services:
  backend:
    restart: unless-stopped  # Sistem yeniden başlatıldığında otomatik başlat
```

### 3. Logging

```yaml
services:
  backend:
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
```

### 4. Network Isolation

```yaml
networks:
  nexaven-network:
    driver: bridge
    internal: false  # İnternet erişimi için
```

---

## 📈 Performance İpuçları

### 1. Multi-stage Build Kullanın

✅ Zaten yapılandırılmış (Dockerfile.frontend'de)

### 2. Layer Caching

- `package*.json` dosyalarını önce kopyalayın
- `npm install` önce çalışsın
- Kod değişikliklerinde sadece son layer rebuild olur

### 3. Image Boyutunu Küçültün

```bash
# Image boyutlarını kontrol et
docker images | grep nexaven

# Alpine tabanlı image'lar kullanın (✅ zaten kullanılıyor)
```

---

## 🔒 Güvenlik

### 1. Secret Management

```bash
# .env dosyasını git'e eklemeyin
echo ".env" >> .gitignore

# Docker secrets kullanın (swarm mode)
docker secret create jwt_secret -
# Secret'i giriniz...
```

### 2. Non-root User

Dockerfile'a ekleyin:

```dockerfile
# Root yerine node kullanıcısı kullan
USER node
```

### 3. Network Isolation

```bash
# Backend'i internete kapatın
# docker-compose.yml:
networks:
  backend-network:
    internal: true  # Sadece frontend erişebilir
```

---

## 📋 Checklist

Deployment öncesi kontrol listesi:

- [ ] Docker ve Docker Compose yüklü
- [ ] `.env` dosyası oluşturuldu
- [ ] JWT_SECRET güvenli
- [ ] Domain DNS ayarları yapıldı
- [ ] Firewall portları açık (80, 443)
- [ ] SSL sertifikası yapılandırıldı
- [ ] Admin hesabı oluşturuldu
- [ ] Backup stratejisi ayarlandı
- [ ] Monitoring kuruldu
- [ ] Log rotasyon ayarlandı

---

## 🚀 Deployment Scripti

Hepsini tek komutta yapmak için:

```bash
#!/bin/bash
# deploy-docker.sh

set -e

echo "🚀 Nexaven Docker Deployment"
echo "================================"

# 1. Docker yükle
echo "1. Docker yükleniyor..."
curl -fsSL https://get.docker.com | sh
sudo systemctl start docker
sudo systemctl enable docker

# 2. Proje dizinine git
cd /opt/nexaven

# 3. Environment ayarla
echo "2. Environment ayarlanıyor..."
cat > .env << EOF
JWT_SECRET=$(openssl rand -hex 32)
NODE_ENV=production
EOF

# 4. Build ve başlat
echo "3. Container'lar build ediliyor..."
docker compose build

echo "4. Container'lar başlatılıyor..."
docker compose up -d

# 5. Health check
echo "5. Health check yapılıyor..."
sleep 10
docker compose ps

echo "================================"
echo "✅ Deployment tamamlandı!"
echo "🌐 Frontend: http://$(hostname -I | awk '{print $1}')"
echo "🔧 Backend: http://$(hostname -I | awk '{print $1}'):5000"
echo ""
echo "Admin hesabı oluşturmak için:"
echo "docker compose exec backend sh"
```

Çalıştırın:

```bash
chmod +x deploy-docker.sh
./deploy-docker.sh
```

---

## ✨ Tamamlandı!

Docker Compose ile Nexaven siteniz artık çalışıyor! 🎉

**Hızlı komutlar:**

```bash
docker compose up -d        # Başlat
docker compose down         # Durdur
docker compose logs -f      # Logları izle
docker compose restart      # Yeniden başlat
```

**Yardım için:**
- Docker Docs: https://docs.docker.com
- Docker Compose: https://docs.docker.com/compose

**Başarılar! 🚀**
