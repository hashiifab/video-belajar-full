import { ChevronDown } from 'lucide-react';

export default function Select({
  id,
  label,
  required = false,
  value,
  onChange,
  onBlur,
  options = [],
  placeholder = 'Pilih salah satu',
  error,
  className = '',
  ...props
}) {
  const errorId = `${id}-error`;

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
      <div className="relative">
        <select
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          required={required}
          aria-required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={`w-full h-11 md:h-12 pl-3.5 pr-10 bg-white border ${
            error
              ? 'border-[#FF4D4F] focus:border-[#FF4D4F] focus:ring-[#FF4D4F]/15'
              : 'border-[#E5E7EB] focus:border-[#3ECF4C] focus:ring-[#3ECF4C]/15'
          } rounded-md text-sm text-[#222325] appearance-none transition-colors duration-150 focus:outline-none focus:ring-2 disabled:bg-gray-50 cursor-pointer ${className}`}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#7A7A7A]">
          <ChevronDown className="w-5 h-5" aria-hidden="true" />
        </div>
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
