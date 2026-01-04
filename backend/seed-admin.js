/**
 * Admin User Seed Script
 * 
 * ADMIN CREDENTIALS:
 * Email: admin@nexaven.com
 * Password: Admin@123456
 * 
 * USAGE:
 * Run this in Node REPL or as a standalone script:
 * node backend/seed-admin.js
 * 
 * OR in Node REPL:
 * const adminSeed = require('./seed-admin.js');
 * adminSeed.createAdminUser();
 */

import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { getDatabase, initDB } from './database.js';

const ADMIN_CREDENTIALS = {
  email: 'admin@nexaven.com',
  password: 'Admin@123456',
  full_name: 'Admin Kullanıcı',
  role: 'admin'
};

export async function createAdminUser() {
  try {
    console.log('\n🔐 Admin Kullanıcı Oluşturma Başladı...\n');

    // Initialize database
    await initDB();
    const db = getDatabase();

    // Check if admin already exists
    const existingAdmin = await db.get(
      'SELECT * FROM users WHERE email = ?',
      [ADMIN_CREDENTIALS.email]
    );

    if (existingAdmin) {
      console.log(`✓ Admin kullanıcı zaten mevcut: ${ADMIN_CREDENTIALS.email}`);
      console.log(`\n📝 Giriş Bilgileri:`);
      console.log(`   E-posta: ${ADMIN_CREDENTIALS.email}`);
      console.log(`   Şifre: ${ADMIN_CREDENTIALS.password}`);
      return;
    }

    // Create new admin
    const hashedPassword = await bcrypt.hash(ADMIN_CREDENTIALS.password, 10);
    const userId = uuidv4();

    await db.run(
      'INSERT INTO users (id, email, password, full_name, role) VALUES (?, ?, ?, ?, ?)',
      [userId, ADMIN_CREDENTIALS.email, hashedPassword, ADMIN_CREDENTIALS.full_name, ADMIN_CREDENTIALS.role]
    );

    console.log('✓ Admin kullanıcı başarıyla oluşturuldu!\n');
    console.log(`📝 Giriş Bilgileri:`);
    console.log(`   E-posta: ${ADMIN_CREDENTIALS.email}`);
    console.log(`   Şifre: ${ADMIN_CREDENTIALS.password}`);
    console.log(`   Rol: ${ADMIN_CREDENTIALS.role}`);
    console.log(`\n⚠️  Güvenlik İpuçları:`);
    console.log(`   1. Admin şifresini ilk girişten sonra değiştirin`);
    console.log(`   2. Güçlü bir şifre kullanın (min. 12 karakter)`);
    console.log(`   3. 2FA (İki Faktörlü Kimlik Doğrulama) etkinleştirin`);
    console.log(`\n✨ Giriş sayfasına gidin: http://localhost:3000/login\n`);

  } catch (error) {
    console.error('❌ Hata:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  createAdminUser().then(() => process.exit(0));
}

export default createAdminUser;
