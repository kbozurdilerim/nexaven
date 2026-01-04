/**
 * Admin User Credentials
 * 
 * Default Admin Account:
 * - Email: admin@nexaven.com
 * - Password: Admin@123456
 * 
 * ⚠️ PRODUCTION SECURITY NOTES:
 * 1. Change the default password immediately after first login
 * 2. Use strong passwords (minimum 12 characters)
 * 3. Enable 2FA (Two-Factor Authentication)
 * 4. Regularly audit admin access logs
 * 5. Use different passwords for different environments (dev, staging, prod)
 * 6. Store passwords in secure vaults (e.g., Vault, 1Password, LastPass)
 * 7. Limit admin accounts to authorized personnel only
 * 
 * Setup Instructions:
 * 
 * Option 1: Using Node REPL
 * -----------
 * cd backend
 * node
 * 
 * In REPL:
 * > const seed = await import('./seed-admin.js');
 * > await seed.default();
 * > .exit
 * 
 * Option 2: Using npm script
 * -----------
 * npm run seed:admin
 * (add this to package.json scripts)
 * 
 * Option 3: Using Node command
 * -----------
 * cd backend
 * node seed-admin.js
 */

export const ADMIN_CREDENTIALS = {
  email: 'admin@nexaven.com',
  password: 'Admin@123456',
  full_name: 'Admin Kullanıcı',
  role: 'admin'
};

export const DEMO_USERS = [
  {
    email: 'demo@example.com',
    password: 'Demo@123456',
    full_name: 'Demo Kullanıcı',
    role: 'user'
  }
];

export const ADMIN_ACCOUNTS_INFO = `
╔══════════════════════════════════════════════════════════════╗
║                  ADMIN HESAP BİLGİLERİ                      ║
╠══════════════════════════════════════════════════════════════╣
║ E-posta: admin@nexaven.com                                   ║
║ Şifre: Admin@123456                                          ║
║ Rol: Admin (Tüm İzinler)                                     ║
╚══════════════════════════════════════════════════════════════╝

🔒 GÜVENLİK UYARILARI:

1. İlk girişten sonra şifreyi değiştirin
2. En az 12 karakter ve karışık karakterler kullanın
3. 2FA (İki Faktörlü Kimlik Doğrulama) aktif edin
4. Düzenli olarak erişim günlüklerini kontrol edin
5. Admin hesaplarını sınırlı tutun

📝 İLK ADIMLAR:

1. Uygulamayı başlatın: npm run dev
2. Login sayfasına gidin: http://localhost:3000/login
3. Admin hesabı ile giriş yapın
4. Admin paneline erişin: http://localhost:3000/admin
5. Profil ayarlarından şifreyi değiştirin
`;

export default ADMIN_CREDENTIALS;
