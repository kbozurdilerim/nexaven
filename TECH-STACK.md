# 🏗️ Nexaven Website - Teknoloji Özeti

## Proje Yapısı ve Mimarisi

```
Nexaven Website/
│
├── 📁 backend/                    (Node.js/Express API Server)
│   ├── routes/
│   │   ├── auth.js               (Login, Register endpoints)
│   │   ├── public.js             (Hakkında, Hizmetler, Sayfalar)
│   │   └── admin.js              (Admin CRUD operations)
│   ├── middleware/
│   │   └── auth.js               (JWT verification)
│   ├── database.js               (SQLite async wrapper)
│   ├── server.js                 (Express app)
│   ├── package.json              (Dependencies)
│   ├── .env                      (Environment variables)
│   └── nexaven.db                (SQLite database - otomatik oluşur)
│
├── 📁 frontend/                  (React SPA)
│   ├── src/
│   │   ├── pages/
│   │   │   ├── HomePage.jsx      (Ana sayfa)
│   │   │   ├── AboutPage.jsx     (Hakkında)
│   │   │   ├── ServicesPage.jsx  (Hizmetler)
│   │   │   ├── LoginPage.jsx     (Giriş)
│   │   │   └── RegisterPage.jsx  (Kayıt)
│   │   ├── components/
│   │   │   └── Header.jsx        (Navigation)
│   │   ├── admin/
│   │   │   ├── AdminDashboard.jsx (Admin layout)
│   │   │   └── pages/
│   │   │       ├── AdminHome.jsx
│   │   │       ├── AdminServices.jsx
│   │   │       ├── AdminAbout.jsx
│   │   │       └── AdminPages.jsx
│   │   ├── App.jsx               (Router)
│   │   ├── AuthContext.jsx       (Auth state)
│   │   ├── api.js                (API client)
│   │   ├── index.css             (Tailwind styles)
│   │   └── main.jsx              (Entry point)
│   ├── vite.config.js            (Vite configuration)
│   ├── tailwind.config.js        (Tailwind theme)
│   ├── postcss.config.js         (PostCSS config)
│   ├── package.json              (Dependencies)
│   ├── .env.development          (Dev API URL)
│   └── .env.production           (Prod API URL)
│
├── 📁 deploy/                    (VPS Deployment)
│   ├── nexaven.conf              (Nginx config)
│   ├── nexaven.service           (Systemd service)
│   └── deploy.sh                 (Deployment script)
│
├── 📄 README.md                  (Ana dokumentasyon)
├── 📄 QUICKSTART.md              (Hızlı başlangıç)
├── 📄 VPS-DEPLOYMENT.md          (VPS rehberi)
├── 📄 Dockerfile.backend         (Docker backend)
├── 📄 Dockerfile.frontend        (Docker frontend)
├── 📄 docker-compose.yml         (Docker compose)
└── 📄 .gitignore                 (Git ignore)
```

---

## 🔧 Backend Teknolojileri

### Framework & Server
- **Node.js 20+** - JavaScript runtime
- **Express.js 4.18** - Web framework
- **CORS** - Cross-origin request handling

### Authentication & Security
- **JWT (jsonwebtoken)** - Token-based auth
- **bcryptjs** - Password hashing
- **UUID** - Unique IDs

### Database
- **SQLite3** - Lightweight SQL database
- **Custom Async Wrapper** - Promise-based operations

### API Endpoints

#### Authentication
```
POST   /api/auth/register
POST   /api/auth/login
```

#### Public (No Auth Required)
```
GET    /api/public/about
GET    /api/public/services
GET    /api/public/pages
GET    /api/public/pages/:slug
```

#### Admin (JWT Required + Admin Role)
```
GET    /api/admin/dashboard
GET    /api/admin/services
POST   /api/admin/services
PUT    /api/admin/services/:id
DELETE /api/admin/services/:id

GET    /api/admin/about
PUT    /api/admin/about

GET    /api/admin/pages
POST   /api/admin/pages
PUT    /api/admin/pages/:id
DELETE /api/admin/pages/:id
```

---

## ⚛️ Frontend Teknolojileri

### Core
- **React 18.2** - UI library
- **React Router DOM 6.20** - Client-side routing
- **Vite 5** - Build tool

### Styling
- **Tailwind CSS 3.4** - Utility-first CSS
- **Custom Dark Theme** - Dark mode design system

### Icons & UI
- **Lucide React** - Beautiful SVG icons

### API Client
- **Axios 1.6** - HTTP requests
- **Auto Token Management** - JWT handling

### State Management
- **Context API** - Authentication state
- **React Hooks** - Local state

### Key Components
```
App (Main Router)
├── Header (Navigation)
├── HomePage (Hero + Services)
├── AboutPage (Vision/Mission)
├── ServicesPage (Service Listing)
├── LoginPage (Auth form)
├── RegisterPage (Auth form)
└── AdminDashboard (Nested routing)
    ├── AdminHome (Stats)
    ├── AdminServices (CRUD)
    ├── AdminAbout (Editor)
    └── AdminPages (CRUD)
```

---

## 🗄️ Database Şeması

### Users Table
```sql
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,          -- bcrypt hashed
  full_name TEXT NOT NULL,
  role TEXT DEFAULT 'user',        -- 'user' or 'admin'
  is_active BOOLEAN DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Services Table
```sql
CREATE TABLE services (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  order_num INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Pages Table
```sql
CREATE TABLE pages (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  type TEXT,                       -- 'custom', 'page', 'blog'
  is_published BOOLEAN DEFAULT 1,
  order_num INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### About Table
```sql
CREATE TABLE about (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT,
  vision TEXT,
  mission TEXT,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Settings Table
```sql
CREATE TABLE settings (
  key TEXT PRIMARY KEY,
  value TEXT,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🎨 Design System

### Tailwind Dark Theme
```javascript
{
  dark: {
    900: '#0f0f0f',    // Background
    800: '#1a1a1a',    // Cards
    700: '#2d2d2d',    // Borders
    600: '#404040',    // Hover
    500: '#535353'     // Text
  },
  primary: {
    500: '#3b82f6',    // Light blue
    600: '#2563eb',    // Primary
    700: '#1d4ed8'     // Dark blue
  }
}
```

### Component Classes
```css
.btn-primary      /* Blue primary button */
.btn-secondary    /* Dark secondary button */
.card             /* Dark card with border */
```

---

## 📊 Authentication Flow

### Registration
1. User fills form → POST /api/auth/register
2. Backend hashes password (bcrypt)
3. Create user in database
4. Return JWT token
5. Store token in localStorage
6. Redirect to home

### Login
1. User enters email/password → POST /api/auth/login
2. Verify email in database
3. Compare password hash
4. Return JWT token if valid
5. Store token + user data
6. Redirect to admin if admin

### Protected Routes
1. Check token in localStorage
2. Verify JWT with backend
3. Check user role (admin)
4. Allow/deny access

---

## 🚀 Deployment Architecture

### VPS Setup (Ubuntu 24.04)
```
                    Internet (HTTPS)
                         ↓
                    Nginx (Reverse Proxy)
                    /              \
                   /                \
            Frontend                 Backend
         (React SPA)           (Node.js Server)
      /usr/share/nginx/html    Port 5000
                                /var/www/nexaven
                                      ↓
                                   SQLite
                              /var/www/nexaven/
                              backend/nexaven.db
```

### Systemd Service
- **Service Name:** nexaven
- **User:** nexaven
- **Working Dir:** /var/www/nexaven/backend
- **Port:** 5000
- **Auto Restart:** Yes
- **Log File:** /var/log/nexaven/backend.log

### Nginx Proxy
- **Listen:** 80 (HTTP) → Redirect to 443
- **SSL/TLS:** Let's Encrypt cert
- **Gzip Compression:** Enabled
- **Caching:** Static files (30 days)

---

## 📦 Dependencies Summary

### Backend
```json
{
  "express": "^4.18.2",
  "cors": "^2.8.5",
  "dotenv": "^16.3.1",
  "bcryptjs": "^2.4.3",
  "jsonwebtoken": "^9.1.2",
  "sqlite3": "^5.1.6",
  "uuid": "^9.0.1"
}
```

### Frontend
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.20.1",
  "axios": "^1.6.2",
  "lucide-react": "^0.294.0"
}
```

---

## ⚡ Performance Optimizations

1. **Gzip Compression** - Nginx gzip enabled
2. **Static Caching** - 30-day cache for assets
3. **JWT Tokens** - Stateless auth
4. **Database** - Indexed primary keys
5. **Build Optimization** - Vite minification
6. **Lazy Loading** - Route-based code splitting

---

## 🔒 Security Features

1. **Password Hashing** - bcryptjs with salt
2. **JWT Validation** - Token expiration (30 days)
3. **CORS Protection** - Origin checking
4. **HTTPS/SSL** - Let's Encrypt
5. **Input Validation** - Form validation
6. **SQL Injection** - Parameterized queries
7. **XSS Protection** - React sanitization

---

## 📈 Scalability Considerations

### Future Upgrades
1. **PostgreSQL** - Replace SQLite for production scale
2. **Redis** - Caching layer
3. **CDN** - CloudFlare distribution
4. **Load Balancing** - Multiple backend instances
5. **Docker** - Containerization ready
6. **Monitoring** - Prometheus/Grafana

### Docker Support
```bash
# Build images
docker-compose build

# Run services
docker-compose up
```

---

## 🎯 Feature Checklist

- ✅ User Registration & Login
- ✅ Admin Authentication
- ✅ Dark Theme Design
- ✅ Responsive Layout
- ✅ Service Management (CRUD)
- ✅ About Page Editor
- ✅ Custom Pages Creator
- ✅ Admin Dashboard
- ✅ User Profiles
- ✅ Content Publishing
- ✅ REST API
- ✅ JWT Auth
- ✅ SQLite Database
- ✅ Nginx Reverse Proxy
- ✅ SSL/HTTPS
- ✅ Systemd Service
- ✅ Docker Ready

---

## 📚 Documentation Files

| File | Açıklama |
|------|----------|
| README.md | Ana dokumentasyon |
| QUICKSTART.md | Hızlı başlangıç |
| VPS-DEPLOYMENT.md | VPS deployment rehberi |
| TECH-STACK.md | Bu dosya |

---

## 🔗 Useful Links

- **React Docs:** https://react.dev
- **Express Docs:** https://expressjs.com
- **Tailwind Docs:** https://tailwindcss.com
- **Vite Docs:** https://vitejs.dev
- **SQLite Docs:** https://www.sqlite.org

---

**Teknoloji Stack tamam! 🎉**
