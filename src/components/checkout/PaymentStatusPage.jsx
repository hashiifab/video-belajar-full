import { CheckCircle2, Clock, ArrowRight } from 'lucide-react';

function SuccessIllustration() {
  return (
    <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
      {/* Background soft bubble */}
      <div className="absolute inset-0 bg-[#E8F9EE] rounded-full scale-90 blur-xs" />

      {/* Main card illustration */}
      <svg className="w-40 h-40 relative z-10" viewBox="0 0 200 200" fill="none">
        {/* Phone Body */}
        <rect x="55" y="25" width="90" height="150" rx="16" fill="#F8F9FA" stroke="#222325" strokeWidth="4" />
        <rect x="65" y="38" width="70" height="120" rx="8" fill="#FFF9ED" stroke="#E5E7EB" strokeWidth="2" />
        <path d="M65 38h70v24H65z" fill="#F8A435" />
        <path d="M65 54l10 8 10-8 10 8 10-8 10 8 10-8 10 8v-8H65z" fill="#E69324" />

        {/* Success Circle on phone */}
        <circle cx="100" cy="100" r="22" fill="#3ECF4C" />
        <path d="M92 100l5 5 11-11" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />

        {/* Floating Credit Card */}
        <g transform="rotate(-18 35 125)">
          <rect x="15" y="105" width="60" height="38" rx="6" fill="#222325" />
          <rect x="15" y="115" width="60" height="8" fill="#F8A435" />
          <circle cx="25" cy="133" r="3" fill="#E5E7EB" />
        </g>

        {/* Happy Character / Badge Accent */}
        <circle cx="155" cy="70" r="14" fill="#3ECF4C" opacity="0.2" />
        <circle cx="155" cy="70" r="6" fill="#3ECF4C" />
        <circle cx="45" cy="50" r="4" fill="#F8A435" />
        <circle cx="160" cy="140" r="5" fill="#3ECF4C" />
      </svg>
    </div>
  );
}

function PendingIllustration() {
  return (
    <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
      {/* Background soft bubble */}
      <div className="absolute inset-0 bg-[#FFF8E6] rounded-full scale-90 blur-xs" />

      {/* Main card illustration */}
      <svg className="w-40 h-40 relative z-10" viewBox="0 0 200 200" fill="none">
        {/* Phone Body */}
        <rect x="55" y="25" width="90" height="150" rx="16" fill="#F8F9FA" stroke="#222325" strokeWidth="4" />
        <rect x="65" y="38" width="70" height="120" rx="8" fill="#FFF9ED" stroke="#E5E7EB" strokeWidth="2" />
        <path d="M65 38h70v24H65z" fill="#F8A435" />
        <path d="M65 54l10 8 10-8 10 8 10-8 10 8 10-8 10 8v-8H65z" fill="#E69324" />

        {/* Warning Circle on phone */}
        <circle cx="100" cy="100" r="22" fill="#F8A435" />
        <path d="M100 88v14M100 110h.01" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" />

        {/* Floating Credit Card */}
        <g transform="rotate(-18 35 125)">
          <rect x="15" y="105" width="60" height="38" rx="6" fill="#222325" />
          <rect x="15" y="115" width="60" height="8" fill="#F8A435" />
          <circle cx="25" cy="133" r="3" fill="#E5E7EB" />
        </g>

        {/* Accent dots */}
        <circle cx="155" cy="70" r="14" fill="#F8A435" opacity="0.2" />
        <circle cx="155" cy="70" r="6" fill="#F8A435" />
        <circle cx="45" cy="50" r="4" fill="#3ECF4C" />
        <circle cx="160" cy="140" r="5" fill="#F8A435" />
      </svg>
    </div>
  );
}

export default function PaymentStatusPage({
  status = 'success',
  onViewOrderDetails,
  onToggleStatus
}) {
  const isSuccess = status === 'success';

  return (
    <div className="w-full max-w-lg mx-auto py-8 md:py-16 px-4">
      <div className="w-full bg-white rounded-2xl border border-[#F1F1F1] shadow-xs p-6 sm:p-10 text-center">
        {/* Illustration */}
        <div className="mb-4">
          {isSuccess ? <SuccessIllustration /> : <PendingIllustration />}
        </div>

        {/* Title */}
        <h1 className="text-xl sm:text-2xl font-bold text-[#222325] tracking-tight">
          {isSuccess ? 'Pembayaran Berhasil!' : 'Pembayaran Tertunda!'}
        </h1>

        {/* Subtitle */}
        <p className="mt-2 text-xs sm:text-sm text-[#7A7A7A] max-w-sm mx-auto leading-relaxed">
          Silakan cek email kamu untuk informasi lebih lanjut. Hubungi kami jika ada kendala.
        </p>

        {/* CTA Button */}
        <div className="mt-6 flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={onViewOrderDetails}
            className="w-full sm:w-auto px-8 py-3 bg-[#3ECF4C] hover:bg-[#34BD41] active:bg-[#2DAA38] text-white font-semibold text-sm rounded-lg transition-colors shadow-xs cursor-pointer"
          >
            Lihat Detail Pesanan
          </button>

          {/* Helper toggle to test both success & pending states */}
          <button
            type="button"
            onClick={onToggleStatus}
            className="text-xs text-[#7A7A7A] hover:text-[#222325] underline cursor-pointer mt-2"
          >
            {isSuccess
              ? 'Lihat Simulasi Status Tertunda (2.5)'
              : 'Lihat Simulasi Status Berhasil (2.4)'}
          </button>
        </div>
      </div>
    </div>
  );
}
