#!/bin/bash

# Nexaven Website - Docker Compose Quick Deploy
# Ubuntu 24.04 LTS

set -e

echo "=========================================="
echo "🐳 Nexaven Docker Compose Deployment"
echo "=========================================="
echo ""

# Renkler
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 1. Docker kontrol et
echo -e "${BLUE}[1/6]${NC} Docker kurulumu kontrol ediliyor..."
if ! command -v docker &> /dev/null; then
    echo -e "${RED}Docker bulunamadı. Yükleniyor...${NC}"
    curl -fsSL https://get.docker.com | sh
    sudo systemctl start docker
    sudo systemctl enable docker
    echo -e "${GREEN}✓ Docker yüklendi${NC}"
else
    echo -e "${GREEN}✓ Docker zaten yüklü${NC}"
fi

# 2. Docker Compose kontrol et
echo -e "${BLUE}[2/6]${NC} Docker Compose kontrol ediliyor..."
if ! docker compose version &> /dev/null; then
    echo -e "${RED}Docker Compose bulunamadı. Yükleniyor...${NC}"
    sudo apt update
    sudo apt install -y docker-compose-plugin
    echo -e "${GREEN}✓ Docker Compose yüklendi${NC}"
else
    echo -e "${GREEN}✓ Docker Compose zaten yüklü${NC}"
fi

# 3. .env dosyası oluştur
echo -e "${BLUE}[3/6]${NC} Environment dosyası oluşturuluyor..."
if [ ! -f .env ]; then
    JWT_SECRET=$(openssl rand -hex 32)
    cat > .env << EOF
JWT_SECRET=${JWT_SECRET}
NODE_ENV=production
PORT=5000
EOF
    echo -e "${GREEN}✓ .env dosyası oluşturuldu${NC}"
else
    echo -e "${GREEN}✓ .env dosyası zaten mevcut${NC}"
fi

# 4. Eski container'ları temizle
echo -e "${BLUE}[4/6]${NC} Eski container'lar temizleniyor..."
docker compose down 2>/dev/null || true
echo -e "${GREEN}✓ Temizlik tamamlandı${NC}"

# 5. Build
echo -e "${BLUE}[5/6]${NC} Container'lar build ediliyor (bu işlem 5-10 dakika sürebilir)..."
docker compose build --no-cache
echo -e "${GREEN}✓ Build tamamlandı${NC}"

# 6. Başlat
echo -e "${BLUE}[6/6]${NC} Container'lar başlatılıyor..."
docker compose up -d
echo -e "${GREEN}✓ Container'lar başlatıldı${NC}"

# Durumu kontrol et
echo ""
echo "Durum kontrol ediliyor..."
sleep 5
docker compose ps

# IP adresini al
IP=$(hostname -I | awk '{print $1}')

echo ""
echo "=========================================="
echo -e "${GREEN}✅ Deployment Başarılı!${NC}"
echo "=========================================="
echo ""
echo -e "${BLUE}Frontend:${NC} http://${IP}"
echo -e "${BLUE}Admin Panel:${NC} http://${IP}/admin"
echo -e "${BLUE}Backend API:${NC} http://${IP}:5000"
echo ""
echo "=========================================="
echo ""
echo -e "${BLUE}Sonraki Adımlar:${NC}"
echo ""
echo "1. Admin hesabı oluştur:"
echo "   docker compose exec backend sh"
echo "   node"
echo "   > const bcrypt = require('bcryptjs');"
echo "   > bcrypt.hash('Admin@123', 10).then(hash => console.log(hash));"
echo ""
echo "2. Hash'i veritabanına ekle:"
echo "   docker compose exec backend sqlite3 nexaven.db"
echo "   INSERT INTO users VALUES ('admin-001', 'admin@nexaven.com.tr', 'HASH_BURASI', 'Admin', 'admin', 1, CURRENT_TIMESTAMP);"
echo ""
echo "3. Logları izle:"
echo "   docker compose logs -f"
echo ""
echo "=========================================="
echo -e "${GREEN}Başarılar! 🚀${NC}"
echo "=========================================="
