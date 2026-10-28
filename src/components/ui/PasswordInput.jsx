import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function PasswordInput({
  id,
  label,
  required = false,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  className = '',
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);
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
        <input
          id={id}
          name={id}
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          required={required}
          aria-required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={`w-full h-11 md:h-12 pl-3.5 pr-11 bg-white border ${
            error
              ? 'border-[#FF4D4F] focus:border-[#FF4D4F] focus:ring-[#FF4D4F]/15'
              : 'border-[#E5E7EB] focus:border-[#3ECF4C] focus:ring-[#3ECF4C]/15'
          } rounded-md text-sm text-[#222325] placeholder:text-[#9CA3AF] transition-colors duration-150 focus:outline-none focus:ring-2 disabled:bg-gray-50 disabled:cursor-not-allowed ${className}`}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
          aria-pressed={showPassword}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#828282] hover:text-[#4F4F4F] focus:text-[#222325] focus:outline-none transition-colors"
        >
          {showPassword ? (
            <Eye className="w-5 h-5" aria-hidden="true" />
          ) : (
            <EyeOff className="w-5 h-5" aria-hidden="true" />
          )}
        </button>
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
