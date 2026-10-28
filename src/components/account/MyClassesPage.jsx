import { useState, useMemo } from 'react';
import { Search, BookOpen, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import AccountLayout from './AccountLayout';
import { myClassesData } from '../../data/accountData';

export default function MyClassesPage({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('Semua Kelas');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const tabs = ['Semua Kelas', 'Sedang Berjalan', 'Selesai'];

  const filteredClasses = useMemo(() => {
    let result = [...myClassesData];

    if (activeTab === 'Sedang Berjalan') {
      result = result.filter((c) => c.status === 'Sedang Berjalan');
    } else if (activeTab === 'Selesai') {
      result = result.filter((c) => c.status === 'Selesai');
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((c) => c.title.toLowerCase().includes(q));
    }

    return result;
  }, [activeTab, searchQuery]);

  return (
    <AccountLayout
      activeTab="kelas"
      onSelectTab={(tab) => {
        if (tab === 'profil') onNavigate('profil');
        if (tab === 'pesanan') onNavigate('pesanan');
      }}
      title="Daftar Kelas"
      subtitle="Akses Materi Belajar dan Mulailah Meningkatkan Pengetahuan Anda!"
    >
      {/* Top Filter and Search Bar */}
      <div className="bg-white rounded-xl border border-[#F1F1F1] shadow-xs p-4 sm:p-5 mb-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Tabs */}
          <div className="flex items-center gap-6 border-b border-gray-100 sm:border-none pb-2 sm:pb-0 overflow-x-auto no-scrollbar">
            {tabs.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab);
                    setCurrentPage(1);
                  }}
                  className={`relative pb-2 sm:pb-1 text-xs sm:text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
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

          {/* Search */}
          <div className="relative w-full sm:w-56">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari Kelas"
              className="w-full h-9 sm:h-10 pl-3 pr-8 bg-white border border-[#E5E7EB] rounded-lg text-xs text-[#222325] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#3ECF4C]"
            />
            <Search className="w-3.5 h-3.5 text-[#9CA3AF] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Classes List */}
      <div className="space-y-4">
        {filteredClasses.map((item) => {
          const isDone = item.status === 'Selesai';

          return (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-[#F1F1F1] shadow-xs overflow-hidden"
            >
              {/* Card Header */}
              <div className="px-4 py-2.5 bg-[#FAFAFA]/50 border-b border-[#F1F1F1] flex items-center justify-between text-xs">
                <span className="text-[#7A7A7A]">
                  {item.modulesCompleted} / {item.totalModules} Modul Terselesaikan
                </span>
                <span
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded-sm ${
                    isDone
                      ? 'bg-[#E8F9EE] text-[#3ECF4C]'
                      : 'bg-[#FFF9E6] text-[#F8A435]'
                  }`}
                >
                  {item.status}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-5 flex flex-col sm:flex-row gap-4 items-start">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full sm:w-28 h-36 sm:h-28 rounded-lg object-cover bg-gray-100 shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <h3 className="text-sm sm:text-base font-bold text-[#222325] leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#7A7A7A] line-clamp-2 mt-1 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="flex items-center gap-2 mt-2.5 text-xs text-[#4A4D54]">
                    <div className="w-5 h-5 rounded-full overflow-hidden bg-gray-200">
                      <img
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
                        alt={item.instructor.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="font-medium text-[#222325]">
                      {item.instructor.name}
                    </span>
                    <span className="text-gray-300">•</span>
                    <span className="text-[#7A7A7A] truncate">
                      {item.instructor.role}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 mt-2 text-xs text-[#7A7A7A]">
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{item.totalModules} Modul</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{item.durationMinutes} Menit</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer with Progress & Action */}
              <div className="px-4 py-3 border-t border-[#F1F1F1] bg-[#FAFAFA]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                {/* Progress bar */}
                <div className="w-full sm:w-auto">
                  <div className="flex items-center justify-between gap-2 mb-1 text-xs">
                    <span className="text-[#7A7A7A]">Progres Kelas:</span>
                    <span className="font-bold text-[#222325]">
                      {item.progressPercentage}%
                    </span>
                  </div>
                  <div className="w-full sm:w-44 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#FF4D00] rounded-full transition-all duration-300"
                      style={{ width: `${item.progressPercentage}%` }}
                    />
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  {isDone ? (
                    <>
                      <button
                        type="button"
                        onClick={() => alert('Mengunduh sertifikat...')}
                        className="px-3.5 py-2 border border-[#3ECF4C] text-[#3ECF4C] hover:bg-[#E8F9EE] text-xs font-semibold rounded-md transition-colors cursor-pointer"
                      >
                        Unduh Sertifikat
                      </button>
                      <button
                        type="button"
                        onClick={() => onNavigate('course-detail')}
                        className="px-3.5 py-2 bg-[#3ECF4C] hover:bg-[#34BD41] text-white text-xs font-semibold rounded-md transition-colors cursor-pointer"
                      >
                        Lihat Detail Kelas
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onNavigate('course-detail')}
                      className="w-full sm:w-auto px-4 py-2 bg-[#3ECF4C] hover:bg-[#34BD41] text-white text-xs font-semibold rounded-md transition-colors cursor-pointer"
                    >
                      Lanjutkan Pembelajaran
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {filteredClasses.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
            <p className="text-sm text-[#7A7A7A]">
              Tidak ada kelas pada kategori ini.
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <nav
        aria-label="Navigasi Halaman Kelas"
        className="flex items-center justify-center gap-1.5 sm:gap-2 mt-8"
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
