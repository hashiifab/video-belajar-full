import { User, BookOpen, ShoppingBag } from 'lucide-react';

export default function AccountSidebar({
  activeTab = 'pesanan',
  onSelectTab,
  title,
  subtitle
}) {
  const menuItems = [
    { id: 'profil', label: 'Profil Saya', icon: User },
    { id: 'kelas', label: 'Kelas Saya', icon: BookOpen },
    { id: 'pesanan', label: 'Pesanan Saya', icon: ShoppingBag }
  ];

  return (
    <aside aria-label="Menu Akun Pengguna" className="w-full">
      {/* Title & Subtitle */}
      <div className="mb-4">
        <h1 className="text-xl sm:text-2xl font-bold text-[#222325] tracking-tight">
          {title}
        </h1>
        <p className="text-xs sm:text-sm text-[#7A7A7A] mt-1 leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* Menu Card */}
      <div className="bg-white rounded-xl border border-[#F1F1F1] shadow-xs p-3 sm:p-4 space-y-1.5">
        {menuItems.map(({ id, label, icon: Icon }) => {
          const isActive = activeTab === id;

          return (
            <button
              key={id}
              type="button"
              onClick={() => onSelectTab(id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-xs sm:text-sm font-medium transition-all duration-150 cursor-pointer text-left ${
                isActive
                  ? 'bg-[#FFF9ED] border border-[#F8A435] text-[#F8A435] font-semibold shadow-xs'
                  : 'text-[#7A7A7A] hover:bg-gray-50 hover:text-[#222325]'
              }`}
            >
              <Icon
                className={`w-4 h-4 shrink-0 ${
                  isActive ? 'text-[#F8A435]' : 'text-[#7A7A7A]'
                }`}
              />
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
