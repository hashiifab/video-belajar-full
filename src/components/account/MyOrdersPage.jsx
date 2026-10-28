import { useState, useMemo } from 'react';
import { Search, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import AccountLayout from './AccountLayout';
import { ordersData } from '../../data/accountData';

export default function MyOrdersPage({ onNavigate }) {
  const [activeStatusTab, setActiveStatusTab] = useState('Semua Pesanan');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSort, setSelectedSort] = useState('Urutkan');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const tabs = ['Semua Pesanan', 'Menunggu', 'Berhasil', 'Gagal'];

  const filteredOrders = useMemo(() => {
    let result = [...ordersData];

    if (activeStatusTab === 'Menunggu') {
      result = result.filter((o) => o.status === 'Belum Bayar');
    } else if (activeStatusTab === 'Berhasil') {
      result = result.filter((o) => o.status === 'Berhasil');
    } else if (activeStatusTab === 'Gagal') {
      result = result.filter((o) => o.status === 'Gagal');
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (o) =>
          o.title.toLowerCase().includes(q) ||
          o.invoice.toLowerCase().includes(q)
      );
    }

    return result;
  }, [activeStatusTab, searchQuery]);

  const getStatusBadge = (status) => {
    if (status === 'Berhasil') {
      return (
        <span className="bg-[#E8F9EE] text-[#3ECF4C] text-[11px] font-semibold px-2.5 py-0.5 rounded-sm">
          Berhasil
        </span>
      );
    }
    if (status === 'Gagal') {
      return (
        <span className="bg-[#FFF0ED] text-[#FF4D00] text-[11px] font-semibold px-2.5 py-0.5 rounded-sm">
          Gagal
        </span>
      );
    }
    return (
      <span className="bg-[#FFF9E6] text-[#F8A435] text-[11px] font-semibold px-2.5 py-0.5 rounded-sm">
        Belum Bayar
      </span>
    );
  };

  return (
    <AccountLayout
      activeTab="pesanan"
      onSelectTab={(tab) => {
        if (tab === 'profil') onNavigate('profil');
        if (tab === 'kelas') onNavigate('kelas');
      }}
      title="Daftar Pesanan"
      subtitle="Informasi terperinci mengenai pembelian"
    >
      {/* Top Filter and Search Bar */}
      <div className="bg-white rounded-xl border border-[#F1F1F1] shadow-xs p-4 sm:p-5 mb-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Tabs */}
          <div className="flex items-center gap-4 sm:gap-6 border-b border-gray-100 md:border-none pb-2 md:pb-0 overflow-x-auto no-scrollbar w-full max-w-full">
            {tabs.map((tab) => {
              const isActive = activeStatusTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => {
                    setActiveStatusTab(tab);
                    setCurrentPage(1);
                  }}
                  className={`relative pb-2 md:pb-1 text-xs sm:text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    isActive ? 'text-[#FF4D00]' : 'text-[#7A7A7A] hover:text-[#222325]'
                  }`}
                >
                  <span>{tab}</span>
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#FF4D00] rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex items-center gap-2.5">
            <div className="relative flex-1 sm:w-48">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari Kelas"
                className="w-full h-9 sm:h-10 pl-3 pr-8 bg-white border border-[#E5E7EB] rounded-lg text-xs text-[#222325] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#3ECF4C]"
              />
              <Search className="w-3.5 h-3.5 text-[#9CA3AF] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="h-9 sm:h-10 px-3 bg-white border border-[#E5E7EB] hover:border-gray-300 rounded-lg flex items-center gap-1.5 text-xs font-medium text-[#4A4D54] cursor-pointer"
              >
                <span>{selectedSort}</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#7A7A7A]" />
              </button>

              {isSortOpen && (
                <div
                  className="absolute right-0 mt-1 w-36 bg-white border border-[#E5E7EB] rounded-lg shadow-lg py-1 z-30"
                  onMouseLeave={() => setIsSortOpen(false)}
                >
                  {['Terbaru', 'Terlama', 'Nominal Tertinggi', 'Nominal Terendah'].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        setSelectedSort(opt);
                        setIsSortOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs text-[#4A4D54] hover:bg-gray-50 cursor-pointer"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-xl border border-[#F1F1F1] shadow-xs overflow-hidden"
          >
            {/* Order Header */}
            <div className="px-4 py-3 bg-[#FAFAFA]/60 border-b border-[#F1F1F1] flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[#7A7A7A]">No. Invoice:</span>
                <span className="text-[#005CA9] font-medium hover:underline cursor-pointer">
                  {order.invoice}
                </span>
                <span className="text-gray-300 hidden sm:inline">•</span>
                <span className="text-[#7A7A7A]">
                  Waktu Pembayaran: {order.date}
                </span>
              </div>
              <div>{getStatusBadge(order.status)}</div>
            </div>

            {/* Order Body */}
            <div className="p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={order.thumbnail}
                  alt={order.title}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg object-cover bg-gray-100 shrink-0"
                />
                <h3 className="text-xs sm:text-sm font-semibold text-[#222325] line-clamp-2">
                  {order.title}
                </h3>
              </div>

              <div className="text-right shrink-0">
                <p className="text-[11px] text-[#7A7A7A]">Harga</p>
                <p className="text-xs sm:text-sm font-bold text-[#222325]">
                  {order.price}
                </p>
              </div>
            </div>

            {/* Order Footer */}
            <div className="px-4 py-3 border-t border-[#F1F1F1] bg-[#FAFAFA]/20 flex items-center justify-between text-xs sm:text-sm">
              <span className="text-[#7A7A7A]">Total Pembayaran</span>
              <span className="font-bold text-[#3ECF4C] text-sm sm:text-base">
                {order.totalPrice}
              </span>
            </div>
          </div>
        ))}

        {filteredOrders.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
            <p className="text-sm text-[#7A7A7A]">
              Tidak ada pesanan pada kategori ini.
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <nav
        aria-label="Navigasi Halaman Pesanan"
        className="flex flex-wrap items-center justify-center gap-1 sm:gap-2 mt-8"
      >
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          className="w-8 h-8 rounded-md border border-[#E5E7EB] bg-white text-[#7A7A7A] hover:bg-gray-50 flex items-center justify-center transition-colors disabled:opacity-40 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {[1, 2, 3, 4, 5, 6].map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => setCurrentPage(page)}
            className={`w-8 h-8 rounded-md text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
              currentPage === page
                ? 'bg-[#F8A435] text-white'
                : 'bg-white border border-[#E5E7EB] text-[#7A7A7A] hover:bg-gray-50'
            }`}
          >
            {page}
          </button>
        ))}

        <button
          type="button"
          disabled={currentPage === 6}
          onClick={() => setCurrentPage((p) => Math.min(6, p + 1))}
          className="w-8 h-8 rounded-md border border-[#E5E7EB] bg-white text-[#7A7A7A] hover:bg-gray-50 flex items-center justify-center transition-colors disabled:opacity-40 cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </nav>
    </AccountLayout>
  );
}
