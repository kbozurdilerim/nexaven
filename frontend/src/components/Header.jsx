import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, LogIn, UserPlus } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../AuthContext';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-dark-800 border-b border-dark-700 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-primary-500">
          Nexaven
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="hover:text-primary-500 transition">
            Ana Sayfa
          </Link>
          <Link to="/about" className="hover:text-primary-500 transition">
            Hakkında
          </Link>
          <Link to="/services" className="hover:text-primary-500 transition">
            Hizmetler
          @@          <Link to="/özellikleri" className="hover:text-primary-500 transition">
          @@            Özellikleri
          @@          </Link>
          @@          <Link to="/indir" className="hover:text-primary-500 transition">
          @@            İndir
          @@          </Link>
          @@          <Link to="/iletisim" className="hover:text-primary-500 transition">
          @@            İletişim
          @@          </Link>
          </Link>

          {/* Admin Link */}
          {isAdmin && (
            <Link to="/admin" className="hover:text-primary-500 transition text-primary-500">
              Admin Panel
            </Link>
          )}

          {/* Auth Buttons */}
          <div className="flex gap-4">
            {!user ? (
              <>
                <Link to="/login" className="btn-secondary flex items-center gap-2">
                  <LogIn size={18} />
                  Giriş
                </Link>
                <Link to="/register" className="btn-primary flex items-center gap-2">
                  <UserPlus size={18} />
                  Kayıt Ol
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-400">{user.full_name}</span>
                <button
                  onClick={handleLogout}
                  className="btn-secondary flex items-center gap-2"
                >
                  <LogOut size={18} />
                  Çıkış
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="absolute top-full left-0 right-0 bg-dark-800 border-b border-dark-700 md:hidden">
            <div className="flex flex-col p-4 gap-4">
              <Link to="/" onClick={() => setMenuOpen(false)}>
                Ana Sayfa
              </Link>
              <Link to="/about" onClick={() => setMenuOpen(false)}>
                Hakkında
              </Link>
              <Link to="/services" onClick={() => setMenuOpen(false)}>
                @@              <Link to="/özellikleri" onClick={() => setMenuOpen(false)}>
                @@                Özellikleri
                @@              </Link>
                @@              <Link to="/indir" onClick={() => setMenuOpen(false)}>
                @@                İndir
                @@              </Link>
                @@              <Link to="/iletisim" onClick={() => setMenuOpen(false)}>
                @@                İletişim
                @@              </Link>
                Hizmetler
              </Link>
              {isAdmin && (
                <Link to="/admin" onClick={() => setMenuOpen(false)} className="text-primary-500">
                  Admin Panel
                </Link>
              )}
              {!user ? (
                <>
                  <Link to="/login" onClick={() => setMenuOpen(false)}>
                    Giriş
                  </Link>
                  <Link to="/register" onClick={() => setMenuOpen(false)}>
                    Kayıt Ol
                  </Link>
                </>
              ) : (
                <button onClick={handleLogout}>
                  Çıkış
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
