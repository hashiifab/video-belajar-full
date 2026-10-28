export default function Input({
  id,
  label,
  required = false,
  type = 'text',
  value,
  onChange,
  onBlur,
  placeholder,
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
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        required={required}
        aria-required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={`w-full h-11 md:h-12 px-3.5 bg-white border ${
          error
            ? 'border-[#FF4D4F] focus:border-[#FF4D4F] focus:ring-[#FF4D4F]/15'
            : 'border-[#E5E7EB] focus:border-[#3ECF4C] focus:ring-[#3ECF4C]/15'
        } rounded-md text-sm text-[#222325] placeholder:text-[#9CA3AF] transition-colors duration-150 focus:outline-none focus:ring-2 disabled:bg-gray-50 disabled:cursor-not-allowed ${className}`}
        {...props}
      />
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
