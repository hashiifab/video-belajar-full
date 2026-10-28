import { categories } from '../../data/coursesData';

export default function CategoryTabs({ activeCategory, onSelectCategory }) {
  return (
    <div className="w-full mt-8 md:mt-12 mb-6 md:mb-8">
      {/* Section Header */}
      <div>
        <h2 className="text-xl sm:text-2xl md:text-[28px] font-bold text-[#222325] tracking-tight">
          Koleksi Video Pembelajaran Unggulan
        </h2>
        <p className="text-xs sm:text-sm text-[#7A7A7A] mt-1">
          Jelajahi Dunia Pengetahuan Melalui Pilihan Kami!
        </p>
      </div>

      {/* Tabs Filter */}
      <div className="mt-5 md:mt-6 border-b border-gray-100 overflow-x-auto no-scrollbar w-full max-w-full">
        <div className="flex items-center gap-6 sm:gap-8 min-w-max pb-0.5">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => onSelectCategory(cat)}
                className={`relative pb-3 text-xs sm:text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  isActive ? 'text-[#FF4D00]' : 'text-[#7A7A7A] hover:text-[#222325]'
                }`}
              >
                <span>{cat}</span>
                {isActive && (
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#FF4D00] rounded-full"
                    layoutId="activeTabIndicator"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
