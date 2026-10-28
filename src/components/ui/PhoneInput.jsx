import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { countryCodes } from '../../data/countryCodes';

function IndonesiaFlag() {
  return (
    <div
      className="w-6 h-4 rounded-xs overflow-hidden border border-[#D1D5DB] flex flex-col shrink-0"
      aria-hidden="true"
    >
      <div className="h-1/2 bg-[#E11931]" />
      <div className="h-1/2 bg-white" />
    </div>
  );
}

export default function PhoneInput({
  id = 'phone',
  label = 'No. Hp',
  required = false,
  value,
  onChange,
  onBlur,
  selectedCountry = countryCodes[0],
  onCountryChange,
  placeholder = '',
  error,
  className = '',
  ...props
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const dropdownRef = useRef(null);
  const errorId = `${id}-error`;

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDownCountry = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
      } else {
        setHighlightedIndex((prev) =>
          prev < countryCodes.length - 1 ? prev + 1 : 0
        );
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
      } else {
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : countryCodes.length - 1
        );
      }
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (isOpen) {
        if (onCountryChange) onCountryChange(countryCodes[highlightedIndex]);
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
    }
  };

  const handlePhoneKeyDown = (e) => {
    const allowedKeys = [
      'Backspace',
      'Delete',
      'Tab',
      'Escape',
      'Enter',
      'ArrowLeft',
      'ArrowRight',
      'ArrowUp',
      'ArrowDown',
      'Home',
      'End'
    ];

    if (
      allowedKeys.includes(e.key) ||
      (e.ctrlKey === true || e.metaKey === true)
    ) {
      return;
    }

    if (!/^[0-9]$/.test(e.key)) {
      e.preventDefault();
    }
  };

  const handlePhoneChange = (e) => {
    let cleanDigits = e.target.value.replace(/\D/g, '');

    if (selectedCountry.dialCode === '+62' && cleanDigits.startsWith('0')) {
      cleanDigits = cleanDigits.substring(1);
    }

    if (cleanDigits.length <= 14) {
      onChange(cleanDigits);
    }
  };

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-normal text-[#333333] mb-1.5"
        >
          {label}
          {required && <span className="text-[#FF4D4F] ml-0.5" aria-hidden="true">*</span>}
        </label>
      )}
      <div className="flex gap-2.5 items-center">
        <div className="relative shrink-0" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            onKeyDown={handleKeyDownCountry}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            aria-label={`Pilih kode negara, saat ini ${selectedCountry.name} (${selectedCountry.dialCode})`}
            className="h-11 md:h-12 px-2.5 sm:px-3 bg-white border border-[#E5E7EB] hover:border-[#D1D5DB] rounded-md flex items-center gap-1.5 sm:gap-2 text-sm text-[#222325] whitespace-nowrap transition-colors focus:outline-none focus:border-[#3ECF4C] focus:ring-2 focus:ring-[#3ECF4C]/15"
          >
            <IndonesiaFlag />
            <span className="font-medium text-xs sm:text-sm">{selectedCountry.dialCode}</span>
            <ChevronDown
              className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#7A7A7A] transition-transform duration-200 ${
                isOpen ? 'rotate-180' : ''
              }`}
              aria-hidden="true"
            />
          </button>

          {isOpen && (
            <div
              role="listbox"
              tabIndex={-1}
              aria-label="Daftar kode negara"
              className="absolute left-0 top-full mt-1 w-48 bg-white border border-[#E5E7EB] rounded-md shadow-lg z-20 py-1 max-h-48 overflow-y-auto"
            >
              {countryCodes.map((country, idx) => (
                <button
                  key={country.code}
                  type="button"
                  role="option"
                  aria-selected={selectedCountry.code === country.code}
                  onClick={() => {
                    if (onCountryChange) onCountryChange(country);
                    setIsOpen(false);
                  }}
                  onMouseEnter={() => setHighlightedIndex(idx)}
                  className={`w-full px-3 py-2 text-left text-sm flex items-center justify-between transition-colors ${
                    highlightedIndex === idx
                      ? 'bg-gray-100 text-[#222325]'
                      : selectedCountry.code === country.code
                      ? 'bg-[#E8F9EE] text-[#38CB48] font-medium'
                      : 'text-[#222325]'
                  }`}
                >
                  <span className="truncate">{country.name}</span>
                  <span className="font-medium text-xs text-[#7A7A7A]">
                    {country.dialCode}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        <input
          id={id}
          name={id}
          type="tel"
          inputMode="numeric"
          pattern="[0-9]*"
          autoComplete="tel-national"
          value={value}
          onChange={handlePhoneChange}
          onKeyDown={handlePhoneKeyDown}
          onBlur={onBlur}
          placeholder={placeholder}
          required={required}
          aria-required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={`flex-1 h-11 md:h-12 px-3.5 bg-white border ${
            error
              ? 'border-[#FF4D4F] focus:border-[#FF4D4F] focus:ring-[#FF4D4F]/15'
              : 'border-[#E5E7EB] focus:border-[#3ECF4C] focus:ring-[#3ECF4C]/15'
          } rounded-md text-sm text-[#222325] placeholder:text-[#9CA3AF] transition-colors duration-150 focus:outline-none focus:ring-2 disabled:bg-gray-50 disabled:cursor-not-allowed ${className}`}
          {...props}
        />
      </div>
      {error && (
        <p
          id={errorId}
          className="mt-1.5 text-xs text-[#FF4D4F] flex items-center gap-1 font-medium"
          role="alert"
          aria-live="polite"
        >
          {error}
        </p>
      )}
    </div>
  );
}
