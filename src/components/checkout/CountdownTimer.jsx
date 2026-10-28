import { useState, useEffect } from 'react';

export default function CountdownTimer({ initialMinutes = 50, initialSeconds = 55 }) {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60 + initialSeconds);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const format = (num) => String(num).padStart(2, '0');

  return (
    <div
      role="timer"
      aria-live="polite"
      className="w-full bg-[#FFEBD9] py-2.5 px-4 text-center text-xs sm:text-sm text-[#4A4D54] flex items-center justify-center gap-2 font-medium"
    >
      <span>Selesaikan pemesanan dalam</span>
      <div className="flex items-center gap-1 font-bold text-white">
        <span className="bg-[#E53E3E] px-1.5 py-0.5 rounded-sm min-w-[24px] text-center">
          {format(hours)}
        </span>
        <span className="text-[#E53E3E] font-extrabold">:</span>
        <span className="bg-[#E53E3E] px-1.5 py-0.5 rounded-sm min-w-[24px] text-center">
          {format(minutes)}
        </span>
        <span className="text-[#E53E3E] font-extrabold">:</span>
        <span className="bg-[#E53E3E] px-1.5 py-0.5 rounded-sm min-w-[24px] text-center">
          {format(seconds)}
        </span>
      </div>
    </div>
  );
}
