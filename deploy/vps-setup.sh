#!/bin/bash

# Nexaven VPS Hazırlık Script'i
# Ubuntu 24.04 LTS için tüm gerekli paketleri kurar

set -e

echo "============================================="
echo "🔧 Nexaven VPS Hazırlık Başlıyor"
echo "============================================="
echo ""

# Renkler
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# 1. Sistem güncelleme
echo -e "${BLUE}[1/8]${NC} Sistem paketleri güncelleniyor..."
sudo apt update
sudo apt upgrade -y
echo -e "${GREEN}✓ Sistem güncellendi${NC}\n"

# 2. Temel araçlar
echo -e "${BLUE}[2/8]${NC} Temel araçlar kuruluyor..."
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
echo -e "${GREEN}✓ Temel araçlar kuruldu${NC}\n"

# 3. Docker GPG key ekle
echo -e "${BLUE}[3/8]${NC} Docker GPG key ekleniyor..."
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg
echo -e "${GREEN}✓ Docker GPG key eklendi${NC}\n"

# 4. Docker repository ekle
echo -e "${BLUE}[4/8]${NC} Docker repository ekleniyor..."
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update
echo -e "${GREEN}✓ Docker repository eklendi${NC}\n"

# 5. Docker Engine kur
echo -e "${BLUE}[5/8]${NC} Docker Engine kuruluyor..."
sudo apt install -y \
    docker-ce \
    docker-ce-cli \
    containerd.io \
    docker-buildx-plugin \
    docker-compose-plugin
echo -e "${GREEN}✓ Docker Engine kuruldu${NC}\n"

# 6. Docker servisi başlat
echo -e "${BLUE}[6/8]${NC} Docker servisi başlatılıyor..."
sudo systemctl start docker
sudo systemctl enable docker
echo -e "${GREEN}✓ Docker servisi aktif${NC}\n"

# 7. Docker kullanıcı izinleri (opsiyonel)
echo -e "${BLUE}[7/8]${NC} Docker kullanıcı izinleri ayarlanıyor..."
if [ "$USER" != "root" ]; then
    sudo usermod -aG docker $USER
    echo -e "${YELLOW}⚠ Değişikliklerin etkili olması için logout/login yapın veya şunu çalıştırın:${NC}"
    echo -e "${YELLOW}   newgrp docker${NC}"
fi
echo -e "${GREEN}✓ İzinler ayarlandı${NC}\n"

# 8. Kurulum testi
echo -e "${BLUE}[8/8]${NC} Kurulum test ediliyor..."
echo ""
echo "Docker version:"
docker --version
echo ""
echo "Docker Compose version:"
docker compose version
echo ""
echo -e "${GREEN}✓ Test başarılı${NC}\n"

# Hello World test
echo -e "${YELLOW}Docker test ediliyor...${NC}"
sudo docker run --rm hello-world
echo ""

echo "============================================="
echo -e "${GREEN}✅ VPS Hazırlık Tamamlandı!${NC}"
echo "============================================="
echo ""
echo -e "${BLUE}Yüklenen Paketler:${NC}"
echo "  ✓ Docker Engine $(docker --version | awk '{print $3}')"
echo "  ✓ Docker Compose $(docker compose version --short)"
echo "  ✓ curl, wget, git"
echo "  ✓ Build tools"
echo ""
echo -e "${BLUE}Sonraki Adım:${NC}"
echo "  1. Proje dosyalarını kopyalayın:"
echo "     scp -r 'Nexaven Website' root@vps-ip:/opt/nexaven"
echo ""
echo "  2. Docker deployment çalıştırın:"
echo "     cd /opt/nexaven"
echo "     chmod +x deploy/docker-deploy.sh"
echo "     ./deploy/docker-deploy.sh"
echo ""
echo "============================================="
