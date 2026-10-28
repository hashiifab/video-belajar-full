import { useState } from 'react';
import {
  Star,
  Globe,
  FileText,
  Video,
  File,
  Award,
  PenTool,
  ChevronDown,
  ChevronUp,
  PlayCircle
} from 'lucide-react';
import { singleCourseDetail, coursesData } from '../../data/coursesData';
import CourseCard from '../home/CourseCard';

export default function CourseDetailPage({ onNavigate, onSelectCourse }) {
  const course = singleCourseDetail;
  const [openModules, setOpenModules] = useState({
    'mod-1': true,
    'mod-2': false,
    'mod-3': false,
    'mod-4': false
  });

  const toggleModule = (id) => {
    setOpenModules((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const relatedCourses = coursesData.slice(0, 3);

  return (
    <div className="w-full py-5 md:py-8">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="mb-4 text-xs sm:text-sm text-[#7A7A7A]">
        <ol className="flex items-center gap-1.5 flex-wrap">
          <li>
            <button
              type="button"
              onClick={() => onNavigate?.('home')}
              className="hover:text-[#3ECF4C] transition-colors cursor-pointer"
            >
              Beranda
            </button>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <button
              type="button"
              onClick={() => onNavigate?.('kategori')}
              className="hover:text-[#3ECF4C] transition-colors cursor-pointer"
            >
              {course.category}
            </button>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-[#222325] font-medium truncate max-w-[220px] sm:max-w-md">
            {course.title}
          </li>
        </ol>
      </nav>

      {/* Hero Section */}
      <section className="relative rounded-2xl overflow-hidden shadow-sm mb-6 md:mb-10">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1600&auto=format&fit=crop&q=80')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/85 to-black/75 md:bg-black/75" />

        <div className="relative z-10 px-5 py-8 sm:px-8 sm:py-12 md:px-12 md:py-14 max-w-3xl">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-snug">
            {course.title}
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-gray-200">
            {course.subtitle}
          </p>

          <div className="flex items-center gap-2 mt-4 text-[#F8A435]">
            <div className="flex items-center" aria-hidden="true">
              <Star className="w-4 h-4 fill-[#F8A435] text-[#F8A435]" />
              <Star className="w-4 h-4 fill-[#F8A435] text-[#F8A435]" />
              <Star className="w-4 h-4 fill-[#F8A435] text-[#F8A435]" />
              <Star className="w-4 h-4 fill-[#F8A435] text-[#F8A435]" />
              <Star className="w-4 h-4 fill-[#F8A435] text-[#F8A435]" />
            </div>
            <span className="text-xs text-gray-300 font-medium">
              {course.rating} ({course.reviewsCount})
            </span>
          </div>
        </div>
      </section>

      {/* Main Grid: Left Details & Right Action Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
        {/* Left Column (Content) */}
        <div className="lg:col-span-2 space-y-6 md:space-y-8">
          {/* Mobile Pricing Card (Visible only on mobile/tablet) */}
          <div className="lg:hidden bg-white rounded-xl border border-[#F1F1F1] shadow-xs p-5">
            <h2 className="text-base font-bold text-[#222325] leading-snug">
              {course.title}
            </h2>
            <div className="flex items-center gap-2 mt-3">
              <span className="text-xl font-bold text-[#3ECF4C]">{course.price}</span>
              <span className="text-sm text-[#F04438] line-through">{course.originalPrice}</span>
              <span className="bg-[#FFF4E5] text-[#FF9800] text-xs font-semibold px-2 py-0.5 rounded">
                {course.discount}
              </span>
            </div>
            <p className="text-xs text-[#2B7FFF] font-medium mt-1">
              Penawaran spesial tersisa {course.specialOfferRemainingDays} hari lagi!
            </p>
            <button
              type="button"
              onClick={() => onNavigate?.('checkout-pay')}
              className="w-full mt-4 py-3 bg-[#3ECF4C] hover:bg-[#34BD41] active:bg-[#2DAA38] text-white font-semibold text-sm rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              Beli Sekarang
            </button>
          </div>

          {/* Deskripsi */}
          <section className="bg-white rounded-xl border border-[#F1F1F1] shadow-xs p-5 sm:p-6">
            <h2 className="text-base sm:text-lg font-bold text-[#222325]">Deskripsi</h2>
            <p className="mt-3 text-xs sm:text-sm text-[#4A4D54] leading-relaxed">
              {course.description}
            </p>
          </section>

          {/* Belajar bersama Tutor Profesional */}
          <section className="bg-white rounded-xl border border-[#F1F1F1] shadow-xs p-5 sm:p-6">
            <h2 className="text-base sm:text-lg font-bold text-[#222325]">
              Belajar bersama Tutor Profesional
            </h2>

            <div className="mt-4 space-y-4">
              {course.tutors.map((tutor) => (
                <div
                  key={tutor.id}
                  className="p-4 rounded-lg border border-[#F1F1F1] bg-[#FCFBF7]/50"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={tutor.avatar}
                      alt={tutor.name}
                      className="w-10 h-10 rounded-full object-cover border border-gray-200"
                    />
                    <div>
                      <h3 className="text-sm font-bold text-[#222325]">{tutor.name}</h3>
                      <p className="text-xs text-[#7A7A7A]">{tutor.role}</p>
                    </div>
                  </div>
                  <p className="mt-2.5 text-xs text-[#4A4D54] leading-relaxed">
                    {tutor.bio}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Kamu akan Mempelajari (Curriculum) */}
          <section className="bg-white rounded-xl border border-[#F1F1F1] shadow-xs p-5 sm:p-6">
            <h2 className="text-base sm:text-lg font-bold text-[#222325]">
              Kamu akan Mempelajari
            </h2>

            <div className="mt-4 space-y-3">
              {course.curriculum.map((module) => {
                const isOpen = openModules[module.id];
                return (
                  <div key={module.id} className="border border-[#F1F1F1] rounded-lg overflow-hidden">
                    <button
                      type="button"
                      onClick={() => toggleModule(module.id)}
                      className="w-full p-3.5 bg-white hover:bg-gray-50 flex items-center justify-between text-left transition-colors cursor-pointer"
                    >
                      <span className="text-xs sm:text-sm font-semibold text-[#3ECF4C] pr-2">
                        {module.title}
                      </span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-[#3ECF4C] shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-[#3ECF4C] shrink-0" />
                      )}
                    </button>

                    {isOpen && (
                      <div className="p-3 bg-[#FAF8F3]/40 border-t border-[#F1F1F1] space-y-2">
                        {module.lessons.map((lesson) => (
                          <div
                            key={lesson.id}
                            className="p-2.5 bg-white border border-[#F1F1F1] rounded-md flex items-center justify-between gap-3 text-xs text-[#222325]"
                          >
                            <div className="flex items-center gap-2">
                              <PlayCircle className="w-4 h-4 text-[#3ECF4C] shrink-0" />
                              <span className="font-medium">{lesson.title}</span>
                            </div>
                            <span className="text-[11px] text-[#7A7A7A] shrink-0 font-medium">
                              {lesson.duration}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Rating dan Review */}
          <section className="bg-white rounded-xl border border-[#F1F1F1] shadow-xs p-5 sm:p-6">
            <h2 className="text-base sm:text-lg font-bold text-[#222325]">
              Rating dan Review
            </h2>

            <div className="mt-4 space-y-4">
              {course.reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-4 rounded-lg border border-[#F1F1F1] bg-[#FCFBF7]/50"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={rev.avatar}
                      alt={rev.name}
                      className="w-9 h-9 rounded-full object-cover border border-gray-200"
                    />
                    <div>
                      <h3 className="text-sm font-bold text-[#222325]">{rev.name}</h3>
                      <p className="text-[11px] text-[#7A7A7A]">{rev.batch}</p>
                    </div>
                  </div>

                  <p className="mt-2 text-xs text-[#4A4D54] leading-relaxed">
                    {rev.comment}
                  </p>

                  <div className="flex items-center gap-1 mt-2 text-[#F8A435]">
                    <div className="flex items-center" aria-hidden="true">
                      <Star className="w-3.5 h-3.5 fill-[#F8A435] text-[#F8A435]" />
                      <Star className="w-3.5 h-3.5 fill-[#F8A435] text-[#F8A435]" />
                      <Star className="w-3.5 h-3.5 fill-[#F8A435] text-[#F8A435]" />
                      <Star className="w-3.5 h-3.5 text-gray-300" />
                      <Star className="w-3.5 h-3.5 text-gray-300" />
                    </div>
                    <span className="text-xs text-[#7A7A7A] ml-1">{rev.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Sticky Card (Desktop) */}
        <div className="hidden lg:block lg:col-span-1 sticky top-20">
          <div className="bg-white rounded-xl border border-[#F1F1F1] shadow-md p-6">
            <h2 className="text-base font-bold text-[#222325] leading-snug">
              {course.title}
            </h2>

            <div className="flex items-center gap-2 mt-3.5">
              <span className="text-2xl font-bold text-[#3ECF4C]">{course.price}</span>
              <span className="text-sm text-[#F04438] line-through">{course.originalPrice}</span>
              <span className="bg-[#FFF4E5] text-[#FF9800] text-xs font-semibold px-2 py-0.5 rounded">
                {course.discount}
              </span>
            </div>

            <p className="text-xs text-[#2B7FFF] font-medium mt-1">
              Penawaran spesial tersisa {course.specialOfferRemainingDays} hari lagi!
            </p>

            <button
              type="button"
              onClick={() => onNavigate?.('checkout-pay')}
              className="w-full mt-5 py-3 bg-[#3ECF4C] hover:bg-[#34BD41] active:bg-[#2DAA38] text-white font-semibold text-sm rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              Beli Sekarang
            </button>

            {/* Inclusions */}
            <div className="mt-6 pt-5 border-t border-gray-100">
              <p className="text-xs font-bold text-[#222325] mb-3">
                Kelas Ini Sudah Termasuk
              </p>
              <div className="grid grid-cols-2 gap-3 text-xs text-[#4A4D54]">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#7A7A7A]" />
                  <span>Ujian Akhir</span>
                </div>
                <div className="flex items-center gap-2">
                  <Video className="w-4 h-4 text-[#7A7A7A]" />
                  <span>49 Video</span>
                </div>
                <div className="flex items-center gap-2">
                  <File className="w-4 h-4 text-[#7A7A7A]" />
                  <span>7 Dokumen</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#7A7A7A]" />
                  <span>Sertifikat</span>
                </div>
                <div className="flex items-center gap-2 col-span-2">
                  <PenTool className="w-4 h-4 text-[#7A7A7A]" />
                  <span>Pretest</span>
                </div>
              </div>
            </div>

            {/* Language */}
            <div className="mt-5 pt-4 border-t border-gray-100">
              <p className="text-xs font-bold text-[#222325] mb-2">
                Bahasa Pengantar
              </p>
              <div className="flex items-center gap-2 text-xs text-[#4A4D54]">
                <Globe className="w-4 h-4 text-[#7A7A7A]" />
                <span>{course.language}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Pembelajaran Terkait Lainnya */}
      <section className="mt-12 md:mt-16 pt-8 border-t border-gray-100">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#222325]">
            Video Pembelajaran Terkait Lainnya
          </h2>
          <p className="text-xs sm:text-sm text-[#7A7A7A] mt-1">
            Ekspansi Pengetahuan Anda dengan Rekomendasi Spesial Kami!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6">
          {relatedCourses.map((c) => (
            <CourseCard
              key={c.id}
              course={c}
              onClick={() => onSelectCourse?.(c)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
