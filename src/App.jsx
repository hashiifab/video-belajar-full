import { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './components/home/HomePage';
import CategoryPage from './components/category/CategoryPage';
import CourseDetailPage from './components/course/CourseDetailPage';
import SelectPaymentMethod from './components/checkout/SelectPaymentMethod';
import PaymentTransferPage from './components/checkout/PaymentTransferPage';
import PaymentStatusPage from './components/checkout/PaymentStatusPage';
import MyOrdersPage from './components/account/MyOrdersPage';
import MyClassesPage from './components/account/MyClassesPage';
import ProfilePage from './components/account/ProfilePage';
import CheckoutStepper from './components/checkout/CheckoutStepper';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';


const VALID_VIEWS = [
  'home',
  'kategori',
  'course-detail',
  'checkout-method',
  'checkout-pay',
  'checkout-success',
  'checkout-pending',
  'pesanan',
  'kelas',
  'profil',
  'login',
  'register'
];

export default function App() {
  const [view, setView] = useState(() => {
    const hash = window.location.hash.replace('#', '');
    return VALID_VIEWS.includes(hash) ? hash : 'home';
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (VALID_VIEWS.includes(hash)) {
        setView(hash);
      } else if (!hash) {
        setView('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (newView) => {
    setView(newView);
    window.location.hash = newView;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isCheckoutView = [
    'checkout-method',
    'checkout-pay',
    'checkout-success',
    'checkout-pending'
  ].includes(view);

  const getCheckoutStep = () => {
    if (view === 'checkout-method') return 1;
    if (view === 'checkout-pay') return 2;
    if (view === 'checkout-success' || view === 'checkout-pending') return 3;
    return 1;
  };

  const isContentPage = [
    'home',
    'kategori',
    'course-detail',
    'checkout-method',
    'checkout-pay',
    'pesanan',
    'kelas',
    'profil'
  ].includes(view);

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#FFFDF3] flex flex-col font-poppins text-[#222325]">
      {/* Navbar with Checkout Stepper support */}
      <Navbar
        currentView={view}
        isLoggedIn={isLoggedIn}
        isCheckout={isCheckoutView}
        checkoutStep={getCheckoutStep()}
        onNavigate={navigateTo}
        onLoginClick={() => navigateTo('login')}
        onRegisterClick={() => navigateTo('register')}
        onLogoutClick={() => setIsLoggedIn(false)}
        onLogoClick={() => navigateTo('home')}
      />

      {/* Mobile Stepper row on checkout pages */}
      {isCheckoutView && (
        <div className="md:hidden py-3 px-4 bg-white border-b border-gray-100 flex justify-center w-full max-w-full overflow-hidden">
          <CheckoutStepper currentStep={getCheckoutStep()} />
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-full overflow-x-hidden">
        {view === 'home' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <HomePage
              onExploreClick={() => navigateTo('kategori')}
              onSelectCourse={() => navigateTo('course-detail')}
            />
          </div>
        )}

        {view === 'kategori' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <CategoryPage onSelectCourse={() => navigateTo('course-detail')} />
          </div>
        )}

        {view === 'course-detail' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <CourseDetailPage
              onNavigate={navigateTo}
              onSelectCourse={() => navigateTo('course-detail')}
            />
          </div>
        )}

        {/* Step 1 Checkout: Pilih Metode Pembayaran */}
        {view === 'checkout-method' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <SelectPaymentMethod onProceedToPay={() => navigateTo('checkout-pay')} />
          </div>
        )}

        {/* Step 2 Checkout: Bayar Melalui BCA VA */}
        {view === 'checkout-pay' && (
          <PaymentTransferPage
            onChangePaymentMethod={() => navigateTo('checkout-method')}
            onConfirmPayment={() => navigateTo('checkout-success')}
          />
        )}

        {/* Step 3 Checkout: 2.4 Selesai (Pembayaran Berhasil) */}
        {view === 'checkout-success' && (
          <PaymentStatusPage
            status="success"
            onViewOrderDetails={() => navigateTo('pesanan')}
            onToggleStatus={() => navigateTo('checkout-pending')}
          />
        )}

        {/* Step 3 Checkout: 2.5 Tertunda (Pembayaran Tertunda) */}
        {view === 'checkout-pending' && (
          <PaymentStatusPage
            status="pending"
            onViewOrderDetails={() => navigateTo('pesanan')}
            onToggleStatus={() => navigateTo('checkout-success')}
          />
        )}

        {/* Account: Daftar Pesanan (Pesanan Saya) */}
        {view === 'pesanan' && (
          <MyOrdersPage onNavigate={navigateTo} />
        )}

        {/* Account: Daftar Kelas (Kelas Saya) */}
        {view === 'kelas' && (
          <MyClassesPage onNavigate={navigateTo} />
        )}

        {/* Account: Ubah Profil (Profil Saya) */}
        {view === 'profil' && (
          <ProfilePage onNavigate={navigateTo} />
        )}

        {/* Auth Pages */}
        {view === 'login' && (
          <div className="flex items-center justify-center px-4 py-8 sm:px-6 sm:py-12 md:py-16 min-h-[calc(100vh-80px)]">
            <div className="w-full max-w-[540px]">
              <LoginForm
                onSwitchToRegister={() => navigateTo('register')}
                onLoginSuccess={() => {
                  setIsLoggedIn(true);
                  navigateTo('home');
                }}
              />
            </div>
          </div>
        )}

        {view === 'register' && (
          <div className="flex items-center justify-center px-4 py-8 sm:px-6 sm:py-12 md:py-16 min-h-[calc(100vh-80px)]">
            <div className="w-full max-w-[540px]">
              <RegisterForm
                onSwitchToLogin={() => navigateTo('login')}
                onRegisterSuccess={() => {
                  setIsLoggedIn(true);
                  navigateTo('home');
                }}
              />
            </div>
          </div>
        )}
      </main>

      {/* Footer rendered on content pages */}
      {isContentPage && <Footer />}
    </div>
  );
}

