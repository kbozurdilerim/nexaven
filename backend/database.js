import sqlite3 from 'sqlite3';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = process.env.DB_PATH || path.join(__dirname, 'data', 'nexaven.db');

// Ensure DB directory exists
fs.mkdirSync(path.dirname(dbPath), { recursive: true });

class Database {
  constructor() {
    this.db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('Database open error:', err);
      } else {
        console.log('SQLite database connected');
      }
    });
    this.db.configure('busyTimeout', 5000);
  }

  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, changes: this.changes });
        }
      });
    });
  }

  get(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  all(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  exec(sql) {
    return new Promise((resolve, reject) => {
      this.db.exec(sql, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  close() {
    return new Promise((resolve, reject) => {
      this.db.close((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}

let instance = null;

export function getDatabase() {
  if (!instance) {
    instance = new Database();
  }
  return instance;
}

export async function initDB() {
  const db = getDatabase();
  
  try {
    // Users table
    await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        full_name TEXT NOT NULL,
        role TEXT DEFAULT 'user',
        is_active BOOLEAN DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Pages table
    await db.exec(`
      CREATE TABLE IF NOT EXISTS pages (
        id TEXT PRIMARY KEY,
        slug TEXT UNIQUE NOT NULL,
        title TEXT NOT NULL,
        content TEXT,
        type TEXT,
        is_published BOOLEAN DEFAULT 1,
        order_num INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Services table
    await db.exec(`
      CREATE TABLE IF NOT EXISTS services (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        icon TEXT,
        order_num INTEGER DEFAULT 0,
        is_active BOOLEAN DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // About content table
    await db.exec(`
      CREATE TABLE IF NOT EXISTS about (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        content TEXT,
        vision TEXT,
        mission TEXT,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Settings table
    await db.exec(`
      CREATE TABLE IF NOT EXISTS settings (
        key TEXT PRIMARY KEY,
        value TEXT,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Database initialization error:', error);
  }
}
