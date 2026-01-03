import { useEffect, useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { BarChart3, Settings, FileText, Zap } from 'lucide-react';

export default function AdminDashboard() {
  const { isAdmin, user } = useAuth();
  const location = useLocation();

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Erişim Reddedildi</h1>
          <p className="text-gray-400">Bu sayfaya erişim yetkiniz yok.</p>
        </div>
      </div>
    );
  }

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-dark-800 border-r border-dark-700">
        <div className="p-6 border-b border-dark-700">
          <h2 className="text-xl font-bold">Admin Panel</h2>
          <p className="text-sm text-gray-400 mt-1">{user?.full_name}</p>
        </div>

        <nav className="p-4 space-y-2">
          <Link
            to="/admin"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              isActive('/admin')
                ? 'bg-primary-600 text-white'
                : 'text-gray-400 hover:bg-dark-700'
            }`}
          >
            <BarChart3 size={20} />
            Dashboard
          </Link>

          <Link
            to="/admin/services"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              isActive('/admin/services')
                ? 'bg-primary-600 text-white'
                : 'text-gray-400 hover:bg-dark-700'
            }`}
          >
            <Zap size={20} />
            Hizmetler
          </Link>

          <Link
            to="/admin/about"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              isActive('/admin/about')
                ? 'bg-primary-600 text-white'
                : 'text-gray-400 hover:bg-dark-700'
            }`}
          >
            <FileText size={20} />
            Hakkında
          </Link>

          <Link
            to="/admin/pages"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              isActive('/admin/pages')
                ? 'bg-primary-600 text-white'
                : 'text-gray-400 hover:bg-dark-700'
            }`}
          >
            <Settings size={20} />
            Sayfalar
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}
