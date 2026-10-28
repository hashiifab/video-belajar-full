import { Star } from 'lucide-react';

export default function CourseCard({ course, onClick }) {
  return (
    <article
      tabIndex={0}
      role="button"
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
      aria-label={`Lihat detail kursus ${course.title}`}
      className="w-full bg-white rounded-xl border border-[#F1F1F1] shadow-[0_1px_4px_rgba(0,0,0,0.03)] hover:shadow-md transition-all duration-200 p-3 sm:p-4 flex flex-row md:flex-col gap-3 sm:gap-3.5 md:gap-3 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-[#3ECF4C]/40"
    >
      {/* Thumbnail */}
      <div className="w-[88px] h-[88px] sm:w-[100px] sm:h-[100px] md:w-full md:h-auto md:aspect-[16/10] shrink-0 overflow-hidden rounded-lg bg-gray-100">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          <h3 className="text-xs sm:text-sm md:text-base font-bold text-[#222325] line-clamp-2 leading-snug group-hover:text-[#3ECF4C] transition-colors">
            {course.title}
          </h3>

          {/* Description visible on desktop */}
          <p className="hidden md:block text-xs text-[#7A7A7A] line-clamp-2 mt-1.5 leading-relaxed">
            {course.description}
          </p>

          {/* Instructor Row */}
          <div className="flex items-center gap-2 mt-2 md:mt-3">
            <div className="w-6 h-6 md:w-7 md:h-7 rounded-full overflow-hidden shrink-0 border border-gray-200">
              <img
                src={course.instructor.avatar}
                alt={course.instructor.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] md:text-xs font-semibold text-[#222325] truncate">
                {course.instructor.name}
              </p>
              <p className="text-[10px] md:text-[11px] text-[#7A7A7A] truncate">
                {course.instructor.role}
              </p>
            </div>
          </div>
        </div>

        {/* Rating and Price Row */}
        <div className="flex items-center justify-between mt-2 md:mt-4 pt-1">
          {/* Star rating */}
          <div className="flex items-center gap-1">
            <div className="flex items-center text-[#F8A435]" aria-hidden="true">
              <Star className="w-3.5 h-3.5 fill-[#F8A435] text-[#F8A435]" />
              <Star className="w-3.5 h-3.5 fill-[#F8A435] text-[#F8A435]" />
              <Star className="w-3.5 h-3.5 fill-[#F8A435] text-[#F8A435]" />
              <Star className="w-3.5 h-3.5 text-gray-300" />
              <Star className="w-3.5 h-3.5 text-gray-300" />
            </div>
            <span className="text-[11px] md:text-xs text-[#7A7A7A]">
              {course.rating} ({course.reviewsCount})
            </span>
          </div>

          {/* Price with Original Price if discounted */}
          <div className="flex items-center gap-1.5 whitespace-nowrap">
            {course.originalPrice && (
              <span className="text-[11px] md:text-xs text-[#F04438] line-through">
                {course.originalPrice}
              </span>
            )}
            <p className="text-xs sm:text-sm md:text-base font-bold text-[#3ECF4C]">
              {course.price}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
