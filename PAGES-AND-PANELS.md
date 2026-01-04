# 📋 NEXAVEN - SAYFA VE PANELLERİ ÖZET

## 🌐 Genel Sayfalar (Public)

### 1. **Ana Sayfa** (`/`)
- Assetto Corsa ürün vitrin sayfası
- Hero bölümü: "Yarışın Ötesine Geçin" sloganı
- 6 özellik kartı (monitoring, stats, player mgmt, vb)
- Control panel preview
- 3-tier pricing ($99, $399, Enterprise)
- CTA: "Ücretsiz İndir"
- 30 gün ücretsiz deneme vurgusu

### 2. **Özellikler** (`/özellikleri`)
- 12 adet detaylı özellik kartı
- Sistem spesifikasyonları (Max oyuncu, sunucu, harita vb)
- Her özelliğin açıklaması ve ikonu
- İstatistik göstergeleri
- "Hemen Başlayın" CTA

### 3. **İndirme** (`/indir`)
- 3 sürüm seçeneği (Stable, Beta, Source)
- Her sürümün detaylı özellikleri
- Sistem gereksinimleri tablosu
- Hızlı başlangıç rehberleri
- Sık Sorulan Sorular (FAQ)
- Destek linkleri (Discord, E-posta)

### 4. **İletişim** (`/iletisim`)
- İletişim bilgileri (E-posta, Discord, Telefon, Ofis)
- İletişim formu (Ad, E-posta, Telefon, Konu, Mesaj)
- Çalışma saatleri (Pazartesi-Cuma 09:00-18:00)
- 6 adet FAQ
- Destek kanalları

### 5. **Hakkında** (`/about`)
- Şirket bilgileri
- Vizyonu ve misyonu
- Ekip hakkında

### 6. **Hizmetler** (`/services`)
- Sunulan hizmetler listesi
- Her hizmetin detayları

## 🔐 Kullanıcı İşlemleri

### 7. **Giriş Sayfası** (`/login`)
- E-posta ve şifre girişi
- "Beni hatırla" seçeneği
- "Şifremi unuttum" linki
- Kayıt sayfasına yönlendirme

### 8. **Kayıt Sayfası** (`/register`)
- Ad Soyad alanı
- E-posta alanı
- Şifre alanı
- Şifre onayı alanı
- Kullanım şartları kabul

## 👨‍💼 Admin Paneli

### 9. **Admin Dashboard** (`/admin`)
- Admin Layout (Sidebar + Main Content)
- Menu öğeleri:
  - Dashboard (İstatistikler)
  - Sunucular
  - Kullanıcılar
  - Hizmetler
  - Hakkında
  - Sayfalar

### 10. **Admin - Dashboard Anasayfa** (`/admin`)
- İstatistik kartları
- Sistem durumu
- Hoş geldiniz mesajı
- Son aktiviteler

### 11. **Admin - Sunucular** (`/admin/servers`)
**Fonksiyonlar:**
- Sunucu listesi (Tablo)
- Yeni sunucu oluştur
- Sunucu düzenle
- Sunucu sil

**Sunucu Bilgileri:**
- Adı
- Konum (AB Batısı, AB Merkezi, Orta Doğu, Asya)
- Açıklama
- Max oyuncu sayısı
- Durum (Aktif, İnaktif, Bakım)

**İstatistikler:**
- Aktif sunucu sayısı
- Toplam sunucu sayısı
- Toplam kapasite (oyuncu)

### 12. **Admin - Kullanıcılar** (`/admin/users`)
**Fonksiyonlar:**
- Kullanıcı listesi (Tablo)
- Yeni kullanıcı oluştur
- Kullanıcı düzenle
- Kullanıcı sil

**Kullanıcı Bilgileri:**
- Ad Soyad
- E-posta
- Rol (Kullanıcı, Admin, Moderatör)
- Durum (Aktif, İnaktif, Bantlandı)
- Katılış tarihi

**İstatistikler:**
- Toplam kullanıcı sayısı
- Aktif kullanıcı sayısı
- Admin sayısı

### 13. **Admin - Hizmetler** (`/admin/services`)
- Hizmet CRUD işlemleri
- Hizmet düzenleme
- Hizmet silme

### 14. **Admin - Hakkında** (`/admin/about`)
- Hakkında sayfası içeriği yönetimi
- Metin düzenleme
- Resim yükleme

### 15. **Admin - Sayfalar** (`/admin/pages`)
- Dinamik sayfa yönetimi
- Sayfa oluştur
- Sayfa düzenle
- Sayfa sil

## 🧭 Navigasyon Yapısı

```
HEADER (Tüm Sayfalarda)
├── Logo (Nexaven)
├── Ana Menu
│   ├── Ana Sayfa
│   ├── Hakkında
│   ├── Hizmetler
│   ├── Özellikleri
│   ├── İndir
│   ├── İletişim
│   └── Admin Panel (Sadece Admin'e Görünür)
└── Auth Buttons
    ├── Giriş
    └── Kayıt
    veya
    ├── Kullanıcı Adı
    └── Çıkış
```

## 🔐 Admin Hesabı

```
E-posta: admin@nexaven.com
Şifre: Admin@123456
```

### Erişim Yolları

1. **Web Üzerinden:**
   - http://localhost:3000/login
   - Admin e-postası ve şifresi ile giriş
   - http://localhost:3000/admin

2. **Node Script İle:**
   ```bash
   cd backend
   node seed-admin.js
   ```

3. **Node REPL İle:**
   ```bash
   cd backend
   node
   const seed = await import('./seed-admin.js');
   await seed.default();
   ```

## 🎨 Tasarım Özelikleri

### Renkler
- **Primary:** Orange (#f97316)
- **Secondary:** Cyan (#06b6d4)
- **Dark:** Dark-800, Dark-900
- **Light:** Slate-300, Slate-400

### İkonlar (Lucide React)
- Download, Zap, BarChart3, Users, Shield, Flame
- Check, ArrowRight, Server, Lock, Settings, Cpu, Wifi
- Plus, Edit2, Trash2, Mail, Phone, MapPin, Clock
- MessageSquare, Menu, X, LogOut, LogIn, UserPlus

### Responsive
- Mobile: 1 kolon
- Tablet: 2 kolon
- Desktop: 3+ kolon

## 📊 Veritabanı Şeması

### users
```sql
id | email | password | full_name | role | created_at
```

### services
```sql
id | name | description | max_players | location | status | created_at
```

### pages
```sql
id | title | slug | content | published | created_at
```

### about
```sql
id | title | content | updated_at
```

### settings
```sql
key | value | updated_at
```

## 🔗 API Endpoints

```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/public/services
GET    /api/public/about
GET    /api/health
GET    /api/admin/services
POST   /api/admin/services
PUT    /api/admin/services/:id
DELETE /api/admin/services/:id
GET    /api/admin/about
PUT    /api/admin/about
```

## 🚀 Geçerli Sayfaların Durumu

| Sayfa | URL | Durum | Notlar |
|-------|-----|-------|--------|
| Ana Sayfa | `/` | ✅ Tamamlandı | Assetto Corsa ürün sayfası |
| Özellikler | `/özellikleri` | ✅ Tamamlandı | 12 özellik kartı |
| İndir | `/indir` | ✅ Tamamlandı | 3 sürüm seçeneği |
| İletişim | `/iletisim` | ✅ Tamamlandı | Form + FAQ |
| Hakkında | `/about` | ✅ Tamamlandı | Statik sayfa |
| Hizmetler | `/services` | ✅ Tamamlandı | Hizmet listesi |
| Giriş | `/login` | ✅ Tamamlandı | Admin/Kullanıcı giriş |
| Kayıt | `/register` | ✅ Tamamlandı | Yeni kullanıcı |
| Admin Dashboard | `/admin` | ✅ Tamamlandı | İstatistikler |
| Sunucular | `/admin/servers` | ✅ Tamamlandı | CRUD işlemleri |
| Kullanıcılar | `/admin/users` | ✅ Tamamlandı | CRUD işlemleri |
| Hizmetler (Admin) | `/admin/services` | ✅ Tamamlandı | CRUD işlemleri |
| Hakkında (Admin) | `/admin/about` | ✅ Tamamlandı | İçerik yönetimi |
| Sayfalar (Admin) | `/admin/pages` | ✅ Tamamlandı | Sayfa yönetimi |

## 💾 Dosya Yapısı

```
frontend/src/pages/
├── HomePage.jsx          (Ana sayfa)
├── FeaturesPage.jsx      (Özellikler)
├── DownloadPage.jsx      (İndir)
├── ContactPage.jsx       (İletişim)
├── AboutPage.jsx         (Hakkında)
├── ServicesPage.jsx      (Hizmetler)
├── LoginPage.jsx         (Giriş)
└── RegisterPage.jsx      (Kayıt)

frontend/src/admin/pages/
├── AdminHome.jsx         (Dashboard)
├── AdminServers.jsx      (Sunucular)
├── AdminUsers.jsx        (Kullanıcılar)
├── AdminServices.jsx     (Hizmetler)
├── AdminAbout.jsx        (Hakkında)
└── AdminPages.jsx        (Sayfalar)
```

## 🎯 Özetle

✅ **15 Sayfa ve Panel Tamamlandı**
- 6 Genel Sayfa
- 2 Kimlik Doğrulama Sayfası
- 7 Admin Panel Sayfası

✅ **Tam İşlevsel Admin Sistemi**
- Sunucu yönetimi
- Kullanıcı yönetimi
- İçerik yönetimi

✅ **Korunmuş Rotalar**
- JWT kimlik doğrulama
- Rol tabanlı erişim
- Admin-only sayfalar

✅ **Modern UI/UX**
- Assetto Corsa teması
- Koyu tasarım
- Responsive layout
- Icon sistemi

---

**Sistem hazır ve produktif!** 🚀
