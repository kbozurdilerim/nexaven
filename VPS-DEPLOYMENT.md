# 🚀 Ubuntu 24.04 LTS VPS Deployment Rehberi

## Nexaven Website - nexaven.com.tr

Adım adım VPS'e deployment yönergeleri.

---

## 📋 Ön Koşullar

- ✅ Ubuntu 24.04 LTS VPS
- ✅ Root SSH erişimi
- ✅ nexaven.com.tr domain adı
- ✅ Tüm proje dosyaları

---

## 🔌 Adım 1: VPS'ye SSH Bağlantısı Yapın

```bash
ssh root@your-vps-ip
```

Örnek:
```bash
ssh root@192.168.1.100
```

---

## 📂 Adım 2: Proje Dosyalarını Kopyalayın

### Windows Powershell'den:
```powershell
scp -r "a:\Nexaven Website" root@your-vps-ip:/tmp/
```

### Linux/Mac'ten:
```bash
scp -r ./Nexaven\ Website root@your-vps-ip:/tmp/
```

VPS'de kontrol edin:
```bash
ls -la /tmp/Nexaven\ Website/
```

---

## 🚀 Adım 3: Deployment Script'ini Çalıştırın

### 3.1 Deploy Script'e Erişim Sağlayın

```bash
cd /tmp/Nexaven\ Website/deploy
chmod +x deploy.sh
```

### 3.2 Script'i Çalıştırın

```bash
./deploy.sh
```

**Script otomatik olarak şunları yapacak:**

✅ System paketlerini güncelle
✅ Node.js 20 kurulu
✅ Nginx kurulumu ve yapılandırması
✅ SQLite3 kurulumu
✅ `nexaven` kullanıcısı oluşturma
✅ Proje dosyalarını `/var/www/nexaven` konumuna kopyala
✅ Backend bağımlılıklarını yükle
✅ Frontend'i build et
✅ Nginx virtual host yapılandırması
✅ Systemd servisi kurulumu
✅ Let's Encrypt SSL sertifikası

> ⏱️ **Not:** Script ~10-15 dakika sürebilir.

---

## 🔐 Adım 4: Admin Hesabı Oluşturma

Script tamamlandıktan sonra:

### 4.1 VPS'de Node.js Console'u Açın

```bash
cd /var/www/nexaven/backend
node
```

### 4.2 Hash Oluşturun

Konsol içinde şu kodu çalıştırın:

```javascript
const bcrypt = require('bcryptjs');
bcrypt.hash('Admin@123', 10).then(hash => console.log(hash));
```

**Çıktı örneği:**
```
$2a$10$abcdefghijklmnopqrstuvwxyzABC...
```

Bu değeri kopyalayın ve `Ctrl+D` ile çıkın.

### 4.3 SQLite Veritabanına Admin Ekleyin

```bash
sqlite3 /var/www/nexaven/backend/nexaven.db
```

Veritabanında şu komutu çalıştırın (HASH_DEGERI yerine yukarıdaki hash'i yapıştırın):

```sql
INSERT INTO users (id, email, password, full_name, role) 
VALUES ('admin-001', 'admin@nexaven.com.tr', 'HASH_DEGERI', 'Admin Kullanıcısı', 'admin');
```

Örnek:
```sql
INSERT INTO users (id, email, password, full_name, role) 
VALUES ('admin-001', 'admin@nexaven.com.tr', '$2a$10$abcdefghijklmnopqrstuvwxyzABC...', 'Admin Kullanıcısı', 'admin');
```

Kontrol edin:
```sql
SELECT * FROM users;
```

Çıkın:
```sql
.quit
```

---

## ✅ Adım 5: Hizmetleri Kontrol Edin

### 5.1 Backend Servisi

```bash
sudo systemctl status nexaven
```

**Çıktı olması gerekenler:**
```
● nexaven.service - Nexaven Website Backend Service
     Loaded: loaded
     Active: active (running)
```

### 5.2 Nginx Web Sunucusu

```bash
sudo systemctl status nginx
```

### 5.3 Backend Logları

```bash
tail -f /var/log/nexaven/backend.log
```

---

## 🌐 Adım 6: Website'e Erişim

### 6.1 HTTP → HTTPS Otomatik Yönlendirme

```
http://nexaven.com.tr → https://nexaven.com.tr
```

### 6.2 Ana Sayfa

```
https://nexaven.com.tr
```

Mavi Nexaven logosu ve hoş geldiniz sayfasını görmeniz gerekir.

### 6.3 Admin Paneline Giriş

```
https://nexaven.com.tr/admin
```

- **Email:** admin@nexaven.com.tr
- **Şifre:** Admin@123

Admin paneline girmek için:
1. Email alanına `admin@nexaven.com.tr` yazın
2. Şifre alanına `Admin@123` yazın
3. "Giriş Yap" butonuna tıklayın

---

## 🎯 Adım 7: İçerik Yönetimi

Admin panelinden yönetebileceğiniz şeyler:

### 7.1 Hizmetleri Ekleyin

**Admin Panel → Hizmetler → Yeni Hizmet**

Örnek hizmet:
```
Başlık: Web Tasarımı
Açıklama: Modern ve responsive web sitesi tasarımı
İkon: ⭐
```

### 7.2 Hakkında Sayfasını Özelleştirin

**Admin Panel → Hakkında**

- Başlık, İçerik
- Vizyonunuz
- Misyonunuz

### 7.3 Özel Sayfalar Oluşturun

**Admin Panel → Sayfalar → Yeni Sayfa**

Örnek:
```
Başlık: Fiyatlandırma
URL: fiyatlandirma
İçerik: Hizmet fiyatlarınız
```

---

## 🔄 VPS Yönetimi

### Servisi Yeniden Başlatma

```bash
sudo systemctl restart nexaven
```

### Servisi Durdurma

```bash
sudo systemctl stop nexaven
```

### Servisi Başlatma

```bash
sudo systemctl start nexaven
```

### Backend Loglarını İzleme

```bash
tail -f /var/log/nexaven/backend.log
```

### Nginx Logları

```bash
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

---

## 🔧 Sorun Giderme

### Sorunu Çöz: "Connection Refused"

```bash
# Backend'in çalışıp çalışmadığını kontrol et
sudo systemctl status nexaven

# Eğer çalışmıyorsa başlat
sudo systemctl restart nexaven

# Logları kontrol et
tail -f /var/log/nexaven/backend.log
```

### Sorunu Çöz: SSL/HTTPS Hatası

```bash
# Let's Encrypt sertifikalarını kontrol et
sudo certbot certificates

# Sertifikayı yenile
sudo certbot renew

# Nginx'i yeniden başlat
sudo systemctl restart nginx
```

### Sorunu Çöz: Database Hatası

```bash
# Database'in var olup olmadığını kontrol et
ls -la /var/www/nexaven/backend/nexaven.db

# Eğer yoksa reset et
rm /var/www/nexaven/backend/nexaven.db

# Backend'i yeniden başlat (database otomatik oluşacak)
sudo systemctl restart nexaven
```

---

## 📊 Sistem Kaynaklarını Kontrol Edin

### CPU ve Hafıza Kullanımı

```bash
top
```

Veya:

```bash
htop
```

### Disk Alanı

```bash
df -h
```

### Veritabanı Boyutu

```bash
du -sh /var/www/nexaven/backend/nexaven.db
```

---

## 🔒 Güvenlik Kontrolleri

### 1. Firewall (UFW)

```bash
# UFW etkinleştir
sudo ufw enable

# SSH erişimini aç
sudo ufw allow 22/tcp

# HTTP/HTTPS erişimini aç
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Durumu kontrol et
sudo ufw status
```

### 2. SSH Anahtarı Koruma

```bash
# SSH ayrıntılarını kontrol et
sudo sshd -T | grep permitrootlogin
```

### 3. Otomatik Güncellemeler

```bash
# Unattended upgrades kur
sudo apt install -y unattended-upgrades
sudo dpkg-reconfigure -plow unattended-upgrades
```

---

## 📈 İzleme ve Yedekleme

### Günlük Yedekleme (Crontab)

```bash
# Crontab düzenle
sudo crontab -e
```

Şu satırı ekle (günde bir kez saat 2:00'de):

```bash
0 2 * * * tar -czf /tmp/nexaven-backup-$(date +\%Y\%m\%d).tar.gz /var/www/nexaven
```

### Yedeklemeyi Manuel Yapma

```bash
tar -czf /tmp/nexaven-backup.tar.gz /var/www/nexaven
# Dosyayı indir
scp root@your-vps-ip:/tmp/nexaven-backup.tar.gz ./
```

---

## 📞 Yardım ve Destek

### Hızlı Komutlar Özeti

```bash
# Backend durumunu kontrol et
sudo systemctl status nexaven

# Backend'i yeniden başlat
sudo systemctl restart nexaven

# Logları gör
tail -f /var/log/nexaven/backend.log

# Database'e erişim
sqlite3 /var/www/nexaven/backend/nexaven.db

# Nginx test
sudo nginx -t

# Nginx yeniden başlat
sudo systemctl restart nginx

# Node.js versiyonunu kontrol et
node --version

# npm versiyonunu kontrol et
npm --version
```

---

## ✨ Tamamlandı!

🎉 nexaven.com.tr siteniz şimdi:

- ✅ **İnsan tarafından erişilebilir**
- ✅ **HTTPS/SSL korunuyor**
- ✅ **Admin paneline sahip**
- ✅ **Dinamik içerik yönetimi**
- ✅ **Tam işlevsel**

---

## 📝 Sonraki Adımlar

1. **Email Yapılandırması:** SMTP ayarlarını yapın
2. **CDN:** CloudFlare gibi bir CDN ekleyin
3. **Monitoring:** Uptime monitoring aracı kur
4. **Backup:** Otomatik yedekleme kurun
5. **Analytics:** Google Analytics ekleyin

---

**Başarılar! 🚀**
