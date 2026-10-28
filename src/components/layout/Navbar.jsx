import { useState } from 'react';
import { Menu, X, User, LogOut, BookOpen, ShoppingBag } from 'lucide-react';
import CheckoutStepper from '../checkout/CheckoutStepper';

export default function Navbar({
  currentView = 'home',
  isLoggedIn = false,
  isCheckout = false,
  checkoutStep = 1,
  onNavigate,
  onLoginClick,
  onRegisterClick,
  onLogoutClick,
  onLogoClick
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  return (
    <header className="w-full bg-white border-b border-[#F1F1F1] sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-3.5 md:py-4 flex items-center justify-between">
        {/* Logo */}
        <button
          type="button"
          onClick={onLogoClick}
          aria-label="videobelajar beranda"
          className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#3ECF4C]/40 rounded-sm text-left inline-flex items-center shrink-0"
        >
          <span className="font-extrabold text-[22px] md:text-[26px] tracking-tight leading-none select-none">
            <span className="text-[#F8A435]">video</span>
            <span className="text-[#F8A435]">b</span>
            <span className="text-[#FF4D00]">ela</span>
            <span className="text-[#F8A435]">jar</span>
          </span>
        </button>

        {/* If in Checkout mode: show Stepper */}
        {isCheckout ? (
          <div className="hidden md:block">
            <CheckoutStepper currentStep={checkoutStep} />
          </div>
        ) : (
          /* Normal Desktop Navigation */
          <div className="hidden md:flex items-center gap-6">
            <button
              type="button"
              onClick={() => onNavigate?.('kategori')}
              className={`text-sm font-medium transition-colors cursor-pointer py-1 ${
                currentView === 'kategori'
                  ? 'text-[#3ECF4C] font-semibold'
                  : 'text-[#4A4D54] hover:text-[#3ECF4C]'
              }`}
            >
              Kategori
            </button>

            {isLoggedIn ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  aria-label="Menu profil pengguna"
                  className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#3ECF4C] focus:outline-none focus:ring-2 focus:ring-[#3ECF4C]/40 cursor-pointer transition-transform hover:scale-105"
                >
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80"
                    alt="Avatar Pengguna"
                    className="w-full h-full object-cover"
                  />
                </button>

                {userDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-52 bg-white border border-[#F1F1F1] rounded-lg shadow-lg py-2 z-50"
                    onMouseLeave={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-semibold text-[#222325]">Jennie Ruby Jane</p>
                      <p className="text-xs text-[#7A7A7A] truncate">rubyjane@gmail.com</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onNavigate?.('profil');
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-[#333333] hover:bg-gray-50 flex items-center gap-2.5 cursor-pointer"
                    >
                      <User className="w-4 h-4 text-gray-500" />
                      <span>Profil Saya</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onNavigate?.('kelas');
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-[#333333] hover:bg-gray-50 flex items-center gap-2.5 cursor-pointer"
                    >
                      <BookOpen className="w-4 h-4 text-gray-500" />
                      <span>Kelas Saya</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onNavigate?.('pesanan');
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-[#333333] hover:bg-gray-50 flex items-center gap-2.5 cursor-pointer"
                    >
                      <ShoppingBag className="w-4 h-4 text-gray-500" />
                      <span>Pesanan Saya</span>
                    </button>

                    <div className="border-t border-gray-100 mt-1 pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          setUserDropdownOpen(false);
                          onLogoutClick?.();
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2.5 cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Keluar (Logout)</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={onLoginClick}
                  className="h-10 px-5 bg-[#3ECF4C] hover:bg-[#34BD41] active:bg-[#2DAA38] text-white font-medium text-sm rounded-md transition-colors whitespace-nowrap cursor-pointer shadow-xs"
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={onRegisterClick}
                  className="h-10 px-5 bg-white hover:bg-[#E8F9EE] border border-[#3ECF4C] text-[#3ECF4C] font-medium text-sm rounded-md transition-colors whitespace-nowrap cursor-pointer"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        )}

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-3">
          {isLoggedIn && !isCheckout && (
            <div className="w-8 h-8 rounded-full overflow-hidden border border-[#3ECF4C]">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80"
                alt="Avatar Pengguna"
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
            className="p-1.5 text-[#222325] hover:text-[#3ECF4C] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3ECF4C]/30 cursor-pointer"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" aria-hidden="true" />
            ) : (
              <Menu className="w-6 h-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#F1F1F1] px-5 py-4 space-y-4 animate-in slide-in-from-top duration-200">
          <div>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate?.('kategori');
              }}
              className={`w-full text-left py-2 text-base font-semibold transition-colors ${
                currentView === 'kategori' ? 'text-[#3ECF4C]' : 'text-[#222325]'
              }`}
            >
              Kategori
            </button>
          </div>

          <div className="border-t border-gray-100 pt-3">
            {isLoggedIn ? (
              <div className="space-y-2">
                <div className="flex items-center gap-3 py-1">
                  <div className="w-9 h-9 rounded-full overflow-hidden border border-[#3ECF4C]">
                    <img
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80"
                      alt="Avatar Pengguna"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#222325]">Jennie Ruby Jane</p>
                    <p className="text-xs text-[#7A7A7A]">rubyjane@gmail.com</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-100 space-y-1">
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onNavigate?.('profil');
                    }}
                    className="w-full text-left py-1.5 text-sm text-[#4A4D54] flex items-center gap-2"
                  >
                    <User className="w-4 h-4 text-gray-500" />
                    <span>Profil Saya</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onNavigate?.('kelas');
                    }}
                    className="w-full text-left py-1.5 text-sm text-[#4A4D54] flex items-center gap-2"
                  >
                    <BookOpen className="w-4 h-4 text-gray-500" />
                    <span>Kelas Saya</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onNavigate?.('pesanan');
                    }}
                    className="w-full text-left py-1.5 text-sm text-[#4A4D54] flex items-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4 text-gray-500" />
                    <span>Pesanan Saya</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onLogoutClick?.();
                  }}
                  className="w-full py-2.5 mt-2 text-center text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors cursor-pointer"
                >
                  Keluar (Logout)
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onLoginClick?.();
                  }}
                  className="w-full py-2.5 bg-[#3ECF4C] hover:bg-[#34BD41] text-white font-medium text-sm rounded-md transition-colors whitespace-nowrap text-center cursor-pointer"
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onRegisterClick?.();
                  }}
                  className="w-full py-2.5 bg-white border border-[#3ECF4C] text-[#3ECF4C] hover:bg-[#E8F9EE] font-medium text-sm rounded-md transition-colors whitespace-nowrap text-center cursor-pointer"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
