import { useState, useMemo } from 'react';
import { Search, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import FilterSidebar from './FilterSidebar';
import CourseCard from '../home/CourseCard';
import { coursesData, sortOptions } from '../../data/coursesData';

export default function CategoryPage({ onSelectCourse }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSort, setSelectedSort] = useState('Urutkan');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilters, setSelectedFilters] = useState({
    bidangStudi: [],
    harga: [],
    durasi: []
  });

  const handleFilterChange = (category, values) => {
    setSelectedFilters((prev) => ({ ...prev, [category]: values }));
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSelectedFilters({
      bidangStudi: [],
      harga: [],
      durasi: []
    });
    setSearchQuery('');
    setSelectedSort('Urutkan');
    setCurrentPage(1);
  };

  const filteredAndSortedCourses = useMemo(() => {
    let result = [...coursesData];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.instructor.name.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q)
      );
    }

    if (selectedFilters.bidangStudi.length > 0) {
      result = result.filter((c) =>
        selectedFilters.bidangStudi.includes(c.category)
      );
    }

    if (selectedSort === 'A to Z') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (selectedSort === 'Z to A') {
      result.sort((a, b) => b.title.localeCompare(a.title));
    } else if (selectedSort === 'Rating Tertinggi') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (selectedSort === 'Rating Terendah') {
      result.sort((a, b) => a.rating - b.rating);
    }

    return result;
  }, [searchQuery, selectedFilters, selectedSort]);

  const itemsPerPage = 6;
  const totalPages = 6; // Matching Figma 6 pages pagination
  const displayedCourses = filteredAndSortedCourses.slice(0, itemsPerPage);

  return (
    <div className="w-full py-6 md:py-10">
      {/* Page Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-xl sm:text-2xl md:text-[28px] font-bold text-[#222325] tracking-tight">
          Koleksi Video Pembelajaran Unggulan
        </h1>
        <p className="text-xs sm:text-sm text-[#7A7A7A] mt-1">
          Jelajahi Dunia Pengetahuan Melalui Pilihan Kami!
        </p>
      </div>

      {/* Main Content Layout */}
      <div className="flex flex-col md:flex-row gap-6 lg:gap-8 items-start">
        {/* Left Filter Sidebar */}
        <div className="w-full md:w-64 lg:w-72 shrink-0">
          <FilterSidebar
            selectedFilters={selectedFilters}
            onFilterChange={handleFilterChange}
            onReset={handleResetFilters}
          />
        </div>

        {/* Right Content Area */}
        <div className="flex-1 min-w-0 w-full">
          {/* Top Controls: Sort & Search */}
          <div className="flex flex-row items-center justify-between gap-3 mb-6">
            {/* Sort Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="h-10 sm:h-11 px-3.5 sm:px-4 bg-white border border-[#E5E7EB] hover:border-gray-300 rounded-lg flex items-center gap-2 text-xs sm:text-sm font-medium text-[#4A4D54] transition-colors cursor-pointer"
              >
                <span>{selectedSort}</span>
                <ChevronDown className="w-4 h-4 text-[#7A7A7A]" />
              </button>

              {isSortOpen && (
                <div
                  className="absolute left-0 mt-1 w-44 bg-white border border-[#E5E7EB] rounded-lg shadow-lg py-1.5 z-30"
                  onMouseLeave={() => setIsSortOpen(false)}
                >
                  {sortOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        setSelectedSort(opt);
                        setIsSortOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs sm:text-sm transition-colors cursor-pointer ${
                        selectedSort === opt
                          ? 'bg-[#E8F9EE] text-[#38CB48] font-medium'
                          : 'text-[#4A4D54] hover:bg-gray-50'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Search Input */}
            <div className="relative flex-1 max-w-xs">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari Kelas"
                className="w-full h-10 sm:h-11 pl-3.5 pr-9 bg-white border border-[#E5E7EB] rounded-lg text-xs sm:text-sm text-[#222325] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#3ECF4C] focus:ring-2 focus:ring-[#3ECF4C]/15"
              />
              <Search className="w-4 h-4 text-[#9CA3AF] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Courses Grid: 2 Columns on Desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {displayedCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onClick={() => onSelectCourse?.(course)}
              />
            ))}
          </div>

          {displayedCourses.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
              <p className="text-sm text-[#7A7A7A]">
                Tidak ada kursus yang cocok dengan filter atau kata kunci pencarian.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="mt-3 text-xs font-semibold text-[#3ECF4C] hover:underline"
              >
                Reset Semua Filter
              </button>
            </div>
          )}

          {/* Pagination */}
          <nav
            aria-label="Navigasi Halaman"
            className="flex flex-wrap items-center justify-center gap-1 sm:gap-2 mt-8 md:mt-12"
          >
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              aria-label="Halaman sebelumnya"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-md border border-[#E5E7EB] bg-white text-[#7A7A7A] hover:bg-gray-50 flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {[1, 2, 3, 4, 5, 6].map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                aria-current={currentPage === page ? 'page' : undefined}
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-md text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                  currentPage === page
                    ? 'bg-[#F8A435] text-white shadow-xs'
                    : 'bg-white border border-[#E5E7EB] text-[#7A7A7A] hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              aria-label="Halaman selanjutnya"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-md border border-[#E5E7EB] bg-white text-[#7A7A7A] hover:bg-gray-50 flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
