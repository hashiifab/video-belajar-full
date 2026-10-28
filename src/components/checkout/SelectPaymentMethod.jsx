import { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';
import OrderSummaryCard from './OrderSummaryCard';

export default function SelectPaymentMethod({ onProceedToPay }) {
  const [selectedMethod, setSelectedMethod] = useState('bca-va');
  const [openCategory, setOpenCategory] = useState('bank');

  const paymentCategories = [
    {
      id: 'bank',
      title: 'Transfer Bank',
      options: [
        { id: 'bca-va', name: 'BCA Virtual Account', icon: 'BCA' },
        { id: 'mandiri-va', name: 'Mandiri Virtual Account', icon: 'Mandiri' },
        { id: 'bni-va', name: 'BNI Virtual Account', icon: 'BNI' },
        { id: 'bri-va', name: 'BRI Virtual Account', icon: 'BRI' }
      ]
    },
    {
      id: 'ewallet',
      title: 'E-Wallet',
      options: [
        { id: 'gopay', name: 'GoPay', icon: 'GoPay' },
        { id: 'ovo', name: 'OVO', icon: 'OVO' },
        { id: 'dana', name: 'DANA', icon: 'DANA' }
      ]
    },
    {
      id: 'cc',
      title: 'Kartu Kredit/Debit',
      options: [
        { id: 'credit-card', name: 'Visa / Mastercard / JCB', icon: 'Card' }
      ]
    }
  ];

  return (
    <div className="w-full py-6 md:py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Mobile Order Summary (top on mobile) */}
          <div className="lg:hidden">
            <OrderSummaryCard />
          </div>

          {/* Ringkasan Belanja */}
          <div className="bg-white rounded-xl border border-[#F1F1F1] shadow-xs p-5 sm:p-6">
            <h2 className="text-base font-bold text-[#222325] mb-4">
              Ringkasan Belanja
            </h2>

            <div className="space-y-3 text-xs sm:text-sm text-[#4A4D54]">
              <div className="flex justify-between">
                <span>Total Harga (3 barang)</span>
                <span className="font-medium text-[#222325]">Rp 767.500</span>
              </div>
              <div className="flex justify-between">
                <span>Ongkos Kirim</span>
                <span className="font-medium text-[#222325]">Rp 7.000</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
              <span className="text-sm font-bold text-[#222325]">Total Pembayaran</span>
              <span className="text-base sm:text-lg font-bold text-[#3ECF4C]">
                Rp 774.500
              </span>
            </div>
          </div>

          {/* Ubah Metode Pembayaran */}
          <div className="bg-white rounded-xl border border-[#F1F1F1] shadow-xs p-5 sm:p-6">
            <h2 className="text-base font-bold text-[#222325] mb-4">
              Ubah Metode Pembayaran
            </h2>

            <div className="space-y-3">
              {paymentCategories.map((cat) => {
                const isOpen = openCategory === cat.id;
                return (
                  <div
                    key={cat.id}
                    className="border border-[#F1F1F1] rounded-lg overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenCategory(isOpen ? null : cat.id)}
                      className="w-full p-4 flex items-center justify-between text-left font-semibold text-xs sm:text-sm text-[#222325] hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <span>{cat.title}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-[#7A7A7A]" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-[#7A7A7A]" />
                      )}
                    </button>

                    {isOpen && (
                      <div className="p-3 border-t border-gray-100 space-y-2 bg-[#FCFBF7]/30">
                        {cat.options.map((opt) => {
                          const isSelected = selectedMethod === opt.id;
                          return (
                            <label
                              key={opt.id}
                              className={`p-3 rounded-md border flex items-center justify-between cursor-pointer transition-colors ${
                                isSelected
                                  ? 'border-[#3ECF4C] bg-[#E8F9EE]/50 text-[#222325]'
                                  : 'border-[#E5E7EB] bg-white hover:bg-gray-50 text-[#4A4D54]'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <input
                                  type="radio"
                                  name="payment-method"
                                  checked={isSelected}
                                  onChange={() => setSelectedMethod(opt.id)}
                                  className="w-4 h-4 text-[#3ECF4C] accent-[#3ECF4C]"
                                />
                                <span className="text-xs sm:text-sm font-medium">
                                  {opt.name}
                                </span>
                              </div>
                              {isSelected && (
                                <CheckCircle className="w-4 h-4 text-[#3ECF4C]" />
                              )}
                            </label>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              onClick={onProceedToPay}
              className="w-full mt-6 py-3.5 bg-[#3ECF4C] hover:bg-[#34BD41] active:bg-[#2DAA38] text-white font-semibold text-sm rounded-lg transition-colors shadow-xs cursor-pointer"
            >
              Bayar Sekarang
            </button>
          </div>
        </div>

        {/* Right Column (Desktop) */}
        <div className="hidden lg:block lg:col-span-1 sticky top-20">
          <OrderSummaryCard />
        </div>
      </div>
    </div>
  );
}
