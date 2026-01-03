# 🎯 Nexaven Website - Deployment Rehberleri

## 📚 Hangi Rehberi Kullanmalıyım?

### 🚀 Hızlı Başlangıç (5 dakika)
**Lokal testmek istiyorum**
👉 [QUICKSTART.md](QUICKSTART.md)

### 🐳 Docker Deployment (10 dakika) - ⭐ ÖNERİLEN
**VPS'ye en kolay ve hızlı kurulum**
👉 [DOCKER-DEPLOYMENT.md](DOCKER-DEPLOYMENT.md)
👉 [DOCKER-QUICKSTART.md](DOCKER-QUICKSTART.md)

### 📦 Native Deployment (20 dakika)
**Manuel Nginx + Node.js kurulumu**
👉 [VPS-DEPLOYMENT.md](VPS-DEPLOYMENT.md)

### 📖 Genel Bilgiler
**Proje hakkında detaylı bilgi**
👉 [README.md](README.md)
👉 [SUMMARY.md](SUMMARY.md)
👉 [TECH-STACK.md](TECH-STACK.md)

---

## 🎯 Hızlı Karar Tablosu

| Durum | Önerilen Rehber |
|-------|-----------------|
| "Hemen test etmek istiyorum" | [QUICKSTART.md](QUICKSTART.md) |
| "VPS'ye kolay deploy etmek istiyorum" | [DOCKER-DEPLOYMENT.md](DOCKER-DEPLOYMENT.md) ⭐ |
| "Manuel kurulum yapmak istiyorum" | [VPS-DEPLOYMENT.md](VPS-DEPLOYMENT.md) |
| "Docker öğrenmek istiyorum" | [DOCKER-QUICKSTART.md](DOCKER-QUICKSTART.md) |
| "Teknik detaylar lazım" | [TECH-STACK.md](TECH-STACK.md) |

---

## 🐳 Docker vs Native

| Özellik | Docker | Native |
|---------|---------|---------|
| **Kurulum Süresi** | ⚡ 10 dk | ⏱️ 20 dk |
| **Kolay mı?** | ✅ Çok kolay | ⚠️ Orta |
| **Güncelleme** | ✅ Tek komut | ⚠️ Manuel |
| **Yedekleme** | ✅ Kolay | ⚠️ Manuel |
| **Taşınabilirlik** | ✅ Her yerde çalışır | ❌ Sisteme bağlı |
| **Performans** | ✅ İyi | ✅ Biraz daha iyi |
| **Önerilen** | **⭐ EVET** | Uzmanlar için |

---

## 📂 Dosya Rehberi

```
📚 Dokümantasyon:
├── START-HERE.md           ← BU DOSYA - Nereden başlamalı?
├── README.md               ← Genel bilgiler
├── SUMMARY.md              ← Proje özeti
├── TECH-STACK.md           ← Teknoloji detayları
│
🚀 Deployment:
├── QUICKSTART.md           ← Lokal test (5 dk)
├── DOCKER-DEPLOYMENT.md    ← Docker (10 dk) ⭐ ÖNERİLEN
├── DOCKER-QUICKSTART.md    ← Docker mini rehber
└── VPS-DEPLOYMENT.md       ← Native (20 dk)
│
⚙️ Yapılandırma:
├── docker-compose.yml      ← Docker Compose config
├── Dockerfile.backend      ← Backend Docker image
├── Dockerfile.frontend     ← Frontend Docker image
├── .env.example            ← Environment örneği
└── deploy/
    ├── docker-deploy.sh    ← Otomatik Docker kurulum
    ├── deploy.sh           ← Otomatik Native kurulum
    ├── nexaven.conf        ← Nginx config
    └── nexaven.service     ← Systemd service
```

---

## ⚡ Hızlı Komutlar

### Lokal Test
```bash
# Backend
cd backend && npm install && npm run dev

# Frontend (yeni terminal)
cd frontend && npm install && npm run dev
```

### Docker Deployment
```bash
# Otomatik
./deploy/docker-deploy.sh

# Manuel
docker compose build
docker compose up -d
```

### Native Deployment
```bash
./deploy/deploy.sh
```

---

## 🎯 Önerilen Akış

### 1️⃣ İlk Adım: Lokal Test
```bash
# Backend ve Frontend'i lokal çalıştır
cd backend && npm run dev
cd frontend && npm run dev
```
📖 Detay: [QUICKSTART.md](QUICKSTART.md)

### 2️⃣ İkinci Adım: VPS'ye Deploy
```bash
# Docker ile (önerilen)
./deploy/docker-deploy.sh
```
📖 Detay: [DOCKER-DEPLOYMENT.md](DOCKER-DEPLOYMENT.md)

### 3️⃣ Üçüncü Adım: Admin Hesabı
```bash
# Container'a gir ve admin oluştur
docker compose exec backend sh
```
📖 Her iki deployment rehberinde de anlatılıyor

### 4️⃣ Dördüncü Adım: İçerik Ekle
- Admin paneline gir
- Hizmetler ekle
- Hakkında sayfasını düzenle
- Özel sayfalar oluştur

---

## 🆘 Sorun Giderme

### "Hangi yöntemi seçmeliyim?"
👉 **Docker Compose** - En kolay ve esnek

### "Docker nedir, bilmiyorum"
👉 [DOCKER-QUICKSTART.md](DOCKER-QUICKSTART.md) - Temel komutlar var

### "Manuel kurulum yapmak istiyorum"
👉 [VPS-DEPLOYMENT.md](VPS-DEPLOYMENT.md)

### "Hata aldım"
1. Hangi yöntemi kullandınız?
   - Docker: [DOCKER-DEPLOYMENT.md](DOCKER-DEPLOYMENT.md) → Sorun Giderme bölümü
   - Native: [VPS-DEPLOYMENT.md](VPS-DEPLOYMENT.md) → Sorun Giderme bölümü
2. Logları kontrol edin:
   - Docker: `docker compose logs -f`
   - Native: `tail -f /var/log/nexaven/backend.log`

---

## 📞 İletişim

Rehberlerdeki sorun giderme bölümlerini kontrol edin. Çoğu sorun orada çözülüyor!

---

## ✨ Başarılar!

**Önerilen sıralama:**
1. ⚡ [QUICKSTART.md](QUICKSTART.md) - Lokal test
2. 🐳 [DOCKER-DEPLOYMENT.md](DOCKER-DEPLOYMENT.md) - VPS deploy ⭐
3. 🎉 Admin paneli ile içerik ekle!

**Başarılar! 🚀**
