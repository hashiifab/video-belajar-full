export default function HeroBanner({ onCtaClick }) {
  return (
    <section className="w-full relative rounded-2xl md:rounded-3xl overflow-hidden shadow-sm my-6 md:my-10">
      {/* Background Image with Dark Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&auto=format&fit=crop&q=80')`
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/75 to-black/80 md:bg-black/70 backdrop-brightness-75" />

      {/* Content */}
      <div className="relative z-10 px-6 py-12 sm:px-10 sm:py-16 md:px-16 md:py-20 text-center max-w-4xl mx-auto flex flex-col items-center">
        <h1 className="text-2xl sm:text-3xl md:text-[38px] lg:text-[42px] font-bold text-white tracking-tight leading-tight md:leading-[1.25]">
          Revolusi Pembelajaran: Temukan Ilmu Baru melalui Platform Video Interaktif!
        </h1>

        <p className="mt-4 md:mt-5 text-xs sm:text-sm md:text-base text-gray-200 font-normal leading-relaxed max-w-2xl">
          Temukan ilmu baru yang menarik dan mendalam melalui koleksi video pembelajaran berkualitas tinggi. Tidak hanya itu, Anda juga dapat berpartisipasi dalam latihan interaktif yang akan meningkatkan pemahaman Anda.
        </p>

        <div className="mt-6 md:mt-8 w-full flex justify-center">
          <button
            type="button"
            onClick={onCtaClick}
            className="min-h-11 md:h-12 py-2.5 sm:py-0 px-4 sm:px-8 bg-[#3ECF4C] hover:bg-[#34BD41] active:bg-[#2DAA38] text-white font-semibold text-xs sm:text-sm md:text-base rounded-lg transition-all duration-150 shadow-md hover:shadow-lg cursor-pointer text-center max-w-full leading-snug"
          >
            Temukan Video Course untuk Dipelajari!
          </button>
        </div>
      </div>
    </section>
  );
}
