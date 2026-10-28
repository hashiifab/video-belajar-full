export default function Divider({ text = 'atau', className = '' }) {
  return (
    <div className={`relative my-5 flex items-center justify-center ${className}`}>
      <div className="w-full border-t border-[#EDEDED]" />
      <span className="absolute bg-white px-3 text-xs md:text-sm text-[#7A7A7A]">
        {text}
      </span>
    </div>
  );
}
