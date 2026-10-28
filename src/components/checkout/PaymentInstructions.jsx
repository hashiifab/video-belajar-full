import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function PaymentInstructions() {
  // Default: SEMUA TERTUTUP (empty state)
  const [openIndex, setOpenIndex] = useState(null);

  const instructions = [
    {
      title: 'ATM BCA',
      steps: [
        'Masukkan kartu ATM dan PIN BCA Anda',
        'Di menu utama, pilih "Transaksi Lainnya". Pilih "Transfer". Pilih "Ke BCA Virtual Account"',
        'Masukkan nomor Virtual Account',
        'Pastikan data Virtual Account Anda benar, kemudian masukkan angka yang perlu Anda bayarkan, kemudian pilih "Benar"',
        'Cek dan perhatikan konfirmasi pembayaran dari layar ATM, jika sudah benar pilih "Ya", atau pilih "Tidak" jika data di layar masih salah',
        'Transaksi Anda sudah selesai. Pilih "Tidak" untuk tidak melanjutkan transaksi lain'
      ]
    },
    {
      title: 'Mobile Banking BCA',
      steps: [
        'Buka Aplikasi BCA Mobile',
        'Pilih "m-BCA", kemudian pilih "m-Transfer"',
        'Pilih "BCA Virtual Account"',
        'Masukkan nomor Virtual Account, lalu pilih "OK"',
        'Klik tombol "Send" yang berada di sudut kanan atas aplikasi untuk melakukan transfer',
        'Klik "OK" untuk melanjutkan pembayaran',
        'Masukkan PIN Anda untuk meng-otorisasi transaksi',
        'Transaksi Anda telah selesai'
      ]
    },
    {
      title: 'Internet Banking BCA',
      steps: [
        'Login ke KlikBCA Individual',
        'Pilih "Transfer", kemudian pilih "Transfer ke BCA Virtual Account"',
        'Masukkan nomor Virtual Account',
        'Pilih "Lanjutkan" untuk melanjutkan pembayaran',
        'Masukkan "RESPON KEYBCA APPLI 1" yang muncul pada Token BCA Anda, lalu klik tombol "Kirim"',
        'Pembayaran telah selesai'
      ]
    }
  ];

  const handleToggle = (idx) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="w-full bg-white rounded-xl border border-[#F1F1F1] shadow-xs p-5 sm:p-6 mt-6">
      <h3 className="text-base font-bold text-[#222325] mb-4">
        Tata Cara Pembayaran
      </h3>

      <div className="space-y-3">
        {instructions.map((item, idx) => {
          const isOpen = openIndex === idx;

          return (
            <div
              key={item.title}
              className="border border-[#F1F1F1] rounded-lg overflow-hidden transition-colors"
            >
              <button
                type="button"
                onClick={() => handleToggle(idx)}
                aria-expanded={isOpen}
                className="w-full p-4 flex items-center justify-between text-left font-semibold text-xs sm:text-sm text-[#222325] hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <span>{item.title}</span>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4 text-[#7A7A7A] shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-[#7A7A7A] shrink-0" />
                )}
              </button>

              {isOpen && (
                <div className="p-4 pt-1 border-t border-gray-100 bg-[#FCFBF7]/50 text-xs text-[#4A4D54] leading-relaxed">
                  <ol className="list-decimal pl-4 space-y-2">
                    {item.steps.map((step, sIdx) => (
                      <li key={sIdx}>{step}</li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
