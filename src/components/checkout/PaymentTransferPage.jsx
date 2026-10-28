import { useState } from 'react';
import CountdownTimer from './CountdownTimer';
import OrderSummaryCard from './OrderSummaryCard';
import PaymentInstructions from './PaymentInstructions';
import { Copy, Check } from 'lucide-react';

function BcaLogo() {
  return (
    <div className="flex items-center gap-1.5 font-bold text-blue-800 text-xl tracking-wider select-none">
      <div className="w-7 h-7 rounded-full bg-blue-700 flex items-center justify-center text-white text-xs font-black">
        BCA
      </div>
      <span className="italic font-extrabold text-[#005CA9] text-2xl tracking-tighter">BCA</span>
    </div>
  );
}

export default function PaymentTransferPage({
  onChangePaymentMethod,
  onConfirmPayment
}) {
  const [copied, setCopied] = useState(false);
  const vaNumber = '11739 081234567890';

  const handleCopy = () => {
    navigator.clipboard.writeText(vaNumber.replace(/\s/g, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full">
      {/* Countdown Timer */}
      <CountdownTimer />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-6 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
          {/* Left Column */}
          <div className="lg:col-span-2">
            {/* Mobile Summary Card */}
            <div className="lg:hidden mb-6">
              <OrderSummaryCard />
            </div>

            {/* Metode Pembayaran Card */}
            <div className="bg-white rounded-xl border border-[#F1F1F1] shadow-xs p-5 sm:p-7">
              <h2 className="text-base font-bold text-[#222325] mb-5">
                Metode Pembayaran
              </h2>

              <div className="border border-[#E5E7EB] rounded-xl p-6 text-center flex flex-col items-center bg-[#FAFAFA]/40">
                <BcaLogo />

                <p className="text-xs sm:text-sm font-semibold text-[#222325] mt-3">
                  Bayar Melalui Virtual Account BCA
                </p>

                <div className="flex items-center gap-2 mt-2">
                  <span className="font-mono text-sm sm:text-base font-bold text-[#222325]">
                    {vaNumber}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="text-xs font-bold text-[#FF4D00] hover:text-[#D93D00] transition-colors flex items-center gap-1 cursor-pointer ml-1"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#3ECF4C]" />
                        <span className="text-[#3ECF4C]">Tersalin</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Salin</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Ringkasan Pesanan Card */}
            <div className="bg-white rounded-xl border border-[#F1F1F1] shadow-xs p-5 sm:p-7 mt-6">
              <h2 className="text-base font-bold text-[#222325] mb-4">
                Ringkasan Pesanan
              </h2>

              <div className="space-y-3 text-xs sm:text-sm text-[#4A4D54]">
                <div className="flex justify-between items-start gap-4">
                  <span>
                    Video Learning: Gapai Karier Impianmu sebagai Seorang UI/UX Designer & Product Manager.
                  </span>
                  <span className="font-medium text-[#222325] whitespace-nowrap">
                    Rp 767.500
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Biaya Admin</span>
                  <span className="font-medium text-[#222325]">Rp 7.000</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                <span className="text-sm font-bold text-[#222325]">Total Pembayaran</span>
                <span className="text-base sm:text-lg font-bold text-[#3ECF4C]">
                  Rp 774.500
                </span>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                <button
                  type="button"
                  onClick={onChangePaymentMethod}
                  className="w-full py-3 px-4 bg-white hover:bg-[#E8F9EE] border border-[#3ECF4C] text-[#3ECF4C] font-semibold text-xs sm:text-sm rounded-lg transition-colors cursor-pointer text-center"
                >
                  Ganti Metode Pembayaran
                </button>
                <button
                  type="button"
                  onClick={onConfirmPayment}
                  className="w-full py-3 px-4 bg-[#3ECF4C] hover:bg-[#34BD41] active:bg-[#2DAA38] text-white font-semibold text-xs sm:text-sm rounded-lg transition-colors shadow-xs cursor-pointer text-center"
                >
                  Bayar Sekarang
                </button>
              </div>
            </div>

            {/* Tata Cara Pembayaran (Default All Closed) */}
            <PaymentInstructions />
          </div>

          {/* Right Column (Desktop) */}
          <div className="hidden lg:block lg:col-span-1 sticky top-20">
            <OrderSummaryCard />
          </div>
        </div>
      </div>
    </div>
  );
}
