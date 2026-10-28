import CourseCard from './CourseCard';
import { coursesData } from '../../data/coursesData';

export default function CourseGrid({
  activeCategory = 'Semua Kelas',
  onSelectCourse
}) {
  const filteredCourses =
    activeCategory === 'Semua Kelas'
      ? coursesData
      : coursesData.filter((c) => c.category === activeCategory);

  return (
    <section aria-label="Daftar Video Pembelajaran">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 md:gap-6">
        {filteredCourses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            onClick={() => onSelectCourse?.(course)}
          />
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
          <p className="text-sm text-[#7A7A7A]">
            Belum ada kursus untuk kategori ini.
          </p>
        </div>
      )}
    </section>
  );
}
