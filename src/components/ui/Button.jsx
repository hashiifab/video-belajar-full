export default function Button({
  children,
  type = 'button',
  variant = 'primary',
  onClick,
  disabled = false,
  className = '',
  ...props
}) {
  const baseStyles =
    'w-full h-11 md:h-12 px-3 sm:px-4 rounded-md font-medium text-sm md:text-base flex items-center justify-center whitespace-nowrap transition-all duration-150 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#3ECF4C]/40';

  const variants = {
    primary:
      'bg-[#3ECF4C] hover:bg-[#34BD41] active:bg-[#2DAA38] text-white shadow-xs',
    secondary:
      'bg-[#E8F9EE] hover:bg-[#DCF5E3] active:bg-[#D0EFD8] text-[#38CB48]',
    outline:
      'bg-white border border-[#E5E7EB] hover:bg-gray-50 active:bg-gray-100 text-[#333333]'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${className}`}
      {...props}
    >
      <span className="whitespace-nowrap">{children}</span>
    </button>
  );
}
