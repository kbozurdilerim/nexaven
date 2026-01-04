import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initDB } from './database.js';
import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';
import publicRoutes from './routes/public.js';
import { authenticateToken } from './middleware/auth.js';
@@import bcrypt from 'bcryptjs';
@@import { v4 as uuidv4 } from 'uuid';
@@import { getDatabase } from './database.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Database
await initDB();
@@
@@// Auto-create admin user if not exists
@@async function ensureAdminExists() {
@@  try {
@@    const db = getDatabase();
@@    const adminEmail = 'admin@nexaven.com';
@@    const adminPassword = 'Admin@123456';
@@    
@@    const existingAdmin = await db.get(
@@      'SELECT * FROM users WHERE email = ? AND role = ?',
@@      [adminEmail, 'admin']
@@    );
@@
@@    if (!existingAdmin) {
@@      const hashedPassword = await bcrypt.hash(adminPassword, 10);
@@      const userId = uuidv4();
@@      
@@      await db.run(
@@        'INSERT INTO users (id, email, password, full_name, role) VALUES (?, ?, ?, ?, ?)',
@@        [userId, adminEmail, hashedPassword, 'Admin Kullanıcı', 'admin']
@@      );
@@      
@@      console.log('✓ Admin kullanıcı oluşturuldu');
@@      console.log(`  E-posta: ${adminEmail}`);
@@      console.log(`  Şifre: ${adminPassword}`);
@@    }
@@  } catch (error) {
@@    console.error('Admin oluşturma hatası:', error);
@@  }
@@}
@@
@@await ensureAdminExists();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/public', publicRoutes);
app.use('/api/admin', authenticateToken, adminRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
