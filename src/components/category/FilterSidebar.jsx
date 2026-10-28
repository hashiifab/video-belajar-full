import { useState } from 'react';
import { BookOpen, Tag, Clock, ChevronUp, ChevronDown } from 'lucide-react';
import { filterOptions } from '../../data/coursesData';

export default function FilterSidebar({
  selectedFilters,
  onFilterChange,
  onReset
}) {
  const [openSections, setOpenSections] = useState({
    bidangStudi: true,
    harga: true,
    durasi: true
  });

  const toggleSection = (key) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const isChecked = (category, value) => {
    return selectedFilters[category]?.includes(value) || false;
  };

  const handleCheckbox = (category, value) => {
    const current = selectedFilters[category] || [];
    const updated = current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value];
    onFilterChange(category, updated);
  };

  return (
    <aside
      aria-label="Filter Kursus"
      className="w-full bg-white rounded-xl border border-[#F1F1F1] shadow-xs p-4 sm:p-5"
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-3">
        <h3 className="font-bold text-base text-[#222325]">Filter</h3>
        <button
          type="button"
          onClick={onReset}
          className="text-xs font-semibold text-[#FF4D00] hover:text-[#E04300] transition-colors cursor-pointer"
        >
          Reset
        </button>
      </div>

      <div className="space-y-4">
        {/* Accordion 1: Bidang Studi */}
        <div className="border-b border-gray-50 pb-3">
          <button
            type="button"
            onClick={() => toggleSection('bidangStudi')}
            className="w-full flex items-center justify-between py-1 text-left text-sm font-semibold text-[#3ECF4C] cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#3ECF4C]" />
              <span>Bidang Studi</span>
            </div>
            {openSections.bidangStudi ? (
              <ChevronUp className="w-4 h-4 text-[#3ECF4C]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#3ECF4C]" />
            )}
          </button>

          {openSections.bidangStudi && (
            <div className="mt-3 space-y-2.5 pl-6">
              {filterOptions.bidangStudi.map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-2.5 text-xs text-[#4A4D54] cursor-pointer hover:text-[#222325]"
                >
                  <input
                    type="checkbox"
                    checked={isChecked('bidangStudi', option)}
                    onChange={() => handleCheckbox('bidangStudi', option)}
                    className="w-4 h-4 rounded-xs border-gray-300 text-[#3ECF4C] focus:ring-[#3ECF4C] accent-[#3ECF4C] cursor-pointer"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Accordion 2: Harga */}
        <div className="border-b border-gray-50 pb-3">
          <button
            type="button"
            onClick={() => toggleSection('harga')}
            className="w-full flex items-center justify-between py-1 text-left text-sm font-semibold text-[#3ECF4C] cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-[#3ECF4C]" />
              <span>Harga</span>
            </div>
            {openSections.harga ? (
              <ChevronUp className="w-4 h-4 text-[#3ECF4C]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#3ECF4C]" />
            )}
          </button>

          {openSections.harga && (
            <div className="mt-3 space-y-2.5 pl-6">
              {filterOptions.harga.map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-2.5 text-xs text-[#4A4D54] cursor-pointer hover:text-[#222325]"
                >
                  <input
                    type="checkbox"
                    checked={isChecked('harga', option)}
                    onChange={() => handleCheckbox('harga', option)}
                    className="w-4 h-4 rounded-xs border-gray-300 text-[#3ECF4C] focus:ring-[#3ECF4C] accent-[#3ECF4C] cursor-pointer"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Accordion 3: Durasi */}
        <div className="pb-1">
          <button
            type="button"
            onClick={() => toggleSection('durasi')}
            className="w-full flex items-center justify-between py-1 text-left text-sm font-semibold text-[#3ECF4C] cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#3ECF4C]" />
              <span>Durasi</span>
            </div>
            {openSections.durasi ? (
              <ChevronUp className="w-4 h-4 text-[#3ECF4C]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#3ECF4C]" />
            )}
          </button>

          {openSections.durasi && (
            <div className="mt-3 space-y-2.5 pl-6">
              {filterOptions.durasi.map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-2.5 text-xs text-[#4A4D54] cursor-pointer hover:text-[#222325]"
                >
                  <input
                    type="checkbox"
                    checked={isChecked('durasi', option)}
                    onChange={() => handleCheckbox('durasi', option)}
                    className="w-4 h-4 rounded-full border-gray-300 text-[#3ECF4C] focus:ring-[#3ECF4C] accent-[#3ECF4C] cursor-pointer"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
