import { Check } from 'lucide-react';

export default function CheckoutStepper({ currentStep = 2, status = 'success' }) {
  const steps = [
    { number: 1, label: 'Pilih Metode' },
    { number: 2, label: 'Bayar' },
    { number: 3, label: 'Selesai' }
  ];

  return (
    <nav aria-label="Tahapan Pembayaran" className="flex items-center gap-1 sm:gap-4 select-none max-w-full overflow-hidden">
      {steps.map((step, idx) => {
        const isCompleted = currentStep > step.number;
        const isActive = currentStep === step.number;

        return (
          <div key={step.number} className="flex items-center min-w-0">
            <div className="flex items-center gap-1 sm:gap-2 min-w-0">
              {isCompleted ? (
                <div
                  className="w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-[#3ECF4C] text-white flex items-center justify-center shrink-0"
                  aria-hidden="true"
                >
                  <Check className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 stroke-[3]" />
                </div>
              ) : isActive ? (
                <div
                  className="w-4 h-4 sm:w-6 sm:h-6 rounded-full border-2 border-[#3ECF4C] p-0.5 flex items-center justify-center shrink-0"
                  aria-hidden="true"
                >
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#3ECF4C]" />
                </div>
              ) : (
                <div
                  className="w-4 h-4 sm:w-6 sm:h-6 rounded-full border-2 border-gray-300 shrink-0"
                  aria-hidden="true"
                />
              )}

              <span
                className={`text-[10px] sm:text-xs font-semibold whitespace-nowrap ${
                  isActive || isCompleted ? 'text-[#222325]' : 'text-gray-400'
                }`}
              >
                {step.label}
              </span>
            </div>

            {idx < steps.length - 1 && (
              <div
                className={`w-3 sm:w-10 h-[2px] mx-1 sm:mx-3 shrink ${
                  currentStep > step.number ? 'bg-[#3ECF4C]' : 'bg-gray-200'
                }`}
                aria-hidden="true"
              />
            )}
          </div>
        );
      })}
    </nav>
  );
}
