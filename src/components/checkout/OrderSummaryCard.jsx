import { FileText, Video, File, Award, PenTool, Globe } from 'lucide-react';
import { singleCourseDetail } from '../../data/coursesData';

export default function OrderSummaryCard() {
  const course = singleCourseDetail;

  return (
    <div className="w-full bg-white rounded-xl border border-[#F1F1F1] shadow-xs p-5 sm:p-6">
      {/* Thumbnail */}
      <div className="w-full aspect-[16/10] rounded-lg overflow-hidden mb-4 bg-gray-100">
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80"
          alt={course.title}
          className="w-full h-full object-cover"
        />
      </div>

      <h2 className="text-sm sm:text-base font-bold text-[#222325] leading-snug">
        {course.title}
      </h2>

      <div className="flex items-center gap-2 mt-3">
        <span className="text-lg sm:text-xl font-bold text-[#3ECF4C]">{course.price}</span>
        <span className="text-xs sm:text-sm text-[#F04438] line-through">{course.originalPrice}</span>
        <span className="bg-[#FFF4E5] text-[#FF9800] text-xs font-semibold px-2 py-0.5 rounded">
          {course.discount}
        </span>
      </div>

      {/* Inclusions */}
      <div className="mt-5 pt-4 border-t border-gray-100">
        <p className="text-xs font-bold text-[#222325] mb-2.5">
          Kelas Ini Sudah Termasuk
        </p>
        <div className="grid grid-cols-2 gap-2.5 text-xs text-[#4A4D54]">
          <div className="flex items-center gap-2">
            <FileText className="w-3.5 h-3.5 text-[#7A7A7A]" />
            <span>Ujian Akhir</span>
          </div>
          <div className="flex items-center gap-2">
            <Video className="w-3.5 h-3.5 text-[#7A7A7A]" />
            <span>49 Video</span>
          </div>
          <div className="flex items-center gap-2">
            <File className="w-3.5 h-3.5 text-[#7A7A7A]" />
            <span>7 Dokumen</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-3.5 h-3.5 text-[#7A7A7A]" />
            <span>Sertifikat</span>
          </div>
          <div className="flex items-center gap-2 col-span-2">
            <PenTool className="w-3.5 h-3.5 text-[#7A7A7A]" />
            <span>Pretest</span>
          </div>
        </div>
      </div>

      {/* Language */}
      <div className="mt-4 pt-3.5 border-t border-gray-100">
        <p className="text-xs font-bold text-[#222325] mb-2">
          Bahasa Pengantar
        </p>
        <div className="flex items-center gap-2 text-xs text-[#4A4D54]">
          <Globe className="w-3.5 h-3.5 text-[#7A7A7A]" />
          <span>{course.language}</span>
        </div>
      </div>
    </div>
  );
}
