# 🔧 VPS Hazırlık Rehberi

## Ubuntu 24.04 LTS için Gerekli Paketler

Build hatası alıyorsanız, VPS'nizde gerekli paketler kurulu değildir. Bu rehber tüm gereksinimleri kuracaktır.

---

## 🚀 Hızlı Kurulum (Otomatik)

### Tek Komutla Tüm Paketleri Kur

```bash
# VPS'ye bağlanın
ssh root@your-vps-ip

# Setup script'i indirin ve çalıştırın
curl -fsSL https://get.docker.com | sh
sudo apt update && sudo apt install -y docker-compose-plugin
```

**VEYA** hazır script'i kullanın:

```bash
# Proje dosyalarını kopyalayın
scp -r "Nexaven Website" root@your-vps-ip:/opt/nexaven

# VPS'de script'i çalıştırın
ssh root@your-vps-ip
cd /opt/nexaven/deploy
chmod +x vps-setup.sh
./vps-setup.sh
```

---

## 📦 Manuel Kurulum (Adım Adım)

### 1. Sistem Güncelleme

```bash
sudo apt update
sudo apt upgrade -y
```

### 2. Temel Paketler

```bash
sudo apt install -y \
    curl \
    wget \
    git \
    vim \
    nano \
    net-tools \
    software-properties-common \
    apt-transport-https \
    ca-certificates \
    gnupg \
    lsb-release \
    build-essential
```

### 3. Docker Repository Ayarları

```bash
# Docker GPG key ekle
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# Repository ekle
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt update
```

### 4. Docker Engine Kurulumu

```bash
sudo apt install -y \
    docker-ce \
    docker-ce-cli \
    containerd.io \
    docker-buildx-plugin \
    docker-compose-plugin
```

### 5. Docker Servisi

```bash
sudo systemctl start docker
sudo systemctl enable docker
sudo systemctl status docker
```

### 6. Docker Kullanıcı İzinleri (Opsiyonel)

```bash
# Root değilseniz kullanıcıyı docker grubuna ekleyin
sudo usermod -aG docker $USER

# Değişiklikleri aktif et
newgrp docker

# Test et (sudo olmadan)
docker ps
```

### 7. Kurulum Testi

```bash
# Docker version
docker --version

# Docker Compose version
docker compose version

# Hello World test
docker run --rm hello-world
```

---

## ✅ Kurulum Kontrolü

Tüm komutlar çalışmalı:

```bash
# Docker çalışıyor mu?
docker ps

# Docker Compose var mı?
docker compose version

# Build çalışıyor mu?
docker build --help
```

---

## 🔧 Build Hatası Çözümleri

### Hata 1: "docker: command not found"

**Çözüm:**
```bash
# Docker kur
curl -fsSL https://get.docker.com | sh
sudo systemctl start docker
```

### Hata 2: "docker compose: command not found"

**Çözüm:**
```bash
# Docker Compose plugin kur
sudo apt install -y docker-compose-plugin

# Kontrol et
docker compose version
```

### Hata 3: "permission denied"

**Çözüm:**
```bash
# Kullanıcıyı docker grubuna ekle
sudo usermod -aG docker $USER
newgrp docker

# VEYA sudo ile çalıştır
sudo docker compose up -d
```

### Hata 4: "Cannot connect to Docker daemon"

**Çözüm:**
```bash
# Docker servisini başlat
sudo systemctl start docker
sudo systemctl enable docker

# Durumu kontrol et
sudo systemctl status docker
```

### Hata 5: Build sırasında "no space left on device"

**Çözüm:**
```bash
# Disk alanını kontrol et
df -h

# Docker temizliği
docker system prune -a --volumes
```

### Hata 6: "failed to solve with frontend dockerfile.v0"

**Çözüm:**
```bash
# BuildKit'i devre dışı bırak
export DOCKER_BUILDKIT=0

# Veya cache'siz build
docker compose build --no-cache
```

### Hata 7: "unable to prepare context"

**Çözüm:**
```bash
# Doğru dizinde olduğunuzdan emin olun
cd /opt/nexaven

# .dockerignore kontrol et
ls -la

# Yeniden build
docker compose build
```

---

## 🎯 Nexaven Deployment

Tüm paketler kurulduktan sonra:

### 1. Proje Dosyalarını Kopyalayın

```bash
# Lokal makineden
scp -r "Nexaven Website" root@your-vps-ip:/opt/nexaven
```

### 2. VPS'de Build ve Deploy

```bash
# VPS'ye bağlan
ssh root@your-vps-ip

# Proje dizinine git
cd /opt/nexaven

# Environment ayarla
cp .env.example .env
nano .env  # JWT_SECRET değiştir

# Build ve başlat
docker compose build
docker compose up -d
```

### 3. Durumu Kontrol Et

```bash
# Container'lar çalışıyor mu?
docker compose ps

# Loglar
docker compose logs -f

# Health check
curl http://localhost/api/health
```

---

## 📊 Sistem Gereksinimleri

### Minimum:
- **CPU:** 1 core
- **RAM:** 2 GB
- **Disk:** 20 GB
- **OS:** Ubuntu 24.04 LTS

### Önerilen:
- **CPU:** 2 cores
- **RAM:** 4 GB
- **Disk:** 40 GB
- **OS:** Ubuntu 24.04 LTS

### Kurulu Paketler (Toplam):
```
Docker Engine       ~200 MB
Docker Compose      ~50 MB
Build tools         ~100 MB
Temel paketler      ~50 MB
─────────────────────────────
TOPLAM             ~400 MB
```

---

## 🔍 Detaylı Kontrol

```bash
# Sistem bilgileri
uname -a
lsb_release -a

# Docker bilgileri
docker info
docker version

# Disk alanı
df -h

# Hafıza kullanımı
free -h

# Network
ip addr show
```

---

## 📞 Yardım

### Hala Hata Alıyorsanız:

1. **Logları toplayın:**
   ```bash
   docker compose logs > error.log
   ```

2. **Sistem bilgilerini kontrol edin:**
   ```bash
   docker info > system-info.txt
   ```

3. **Hatayı tam olarak kopyalayın:**
   - Build sırasındaki tüm çıktı
   - Hangi aşamada durdu
   - Hata mesajı

---

## ✨ Tamamlandı!

Kurulum tamamlandıktan sonra:

```bash
# Test
docker run --rm hello-world

# Nexaven deploy
cd /opt/nexaven
docker compose up -d
```

**Başarılar! 🚀**
