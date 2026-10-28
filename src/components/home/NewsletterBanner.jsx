import { useState } from 'react';

export default function NewsletterBanner() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      alert('Silakan masukkan format email yang valid');
      return;
    }
    setIsSubscribed(true);
    alert(`Terima kasih telah berlangganan newsletter dengan email ${email}!`);
    setEmail('');
  };

  return (
    <section className="w-full relative rounded-2xl md:rounded-3xl overflow-hidden shadow-sm my-10 md:my-16">
      {/* Background Image with Dark Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1600&auto=format&fit=crop&q=80')`
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/80 to-black/85" />

      {/* Content */}
      <div className="relative z-10 px-5 py-10 sm:px-10 sm:py-14 md:px-16 md:py-16 text-center max-w-3xl mx-auto flex flex-col items-center">
        <p className="text-[11px] sm:text-xs font-semibold text-gray-300 tracking-widest uppercase">
          NEWSLETTER
        </p>

        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight mt-1.5">
          Mau Belajar Lebih Banyak?
        </h2>

        <p className="mt-2 text-xs sm:text-sm text-gray-200 font-normal leading-relaxed max-w-lg">
          Daftarkan dirimu untuk mendapatkan informasi terbaru dan penawaran spesial dari program-program terbaik hariesok.id
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-6 flex flex-col sm:flex-row gap-3 w-full max-w-md mx-auto"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Masukkan Emailmu"
            required
            aria-label="Alamat email untuk newsletter"
            className="w-full h-11 md:h-12 px-4 bg-white text-sm text-[#222325] placeholder:text-[#9CA3AF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F8A435]"
          />
          <button
            type="submit"
            className="w-full sm:w-auto h-11 md:h-12 px-6 sm:px-8 bg-[#F8A435] hover:bg-[#E69324] active:bg-[#D58417] text-white font-semibold text-sm rounded-lg transition-colors whitespace-nowrap cursor-pointer shadow-sm shrink-0"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
