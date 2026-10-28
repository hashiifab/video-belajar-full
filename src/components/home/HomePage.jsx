import { useState } from 'react';
import HeroBanner from './HeroBanner';
import CategoryTabs from './CategoryTabs';
import CourseGrid from './CourseGrid';
import NewsletterBanner from './NewsletterBanner';

export default function HomePage({ onExploreClick, onSelectCourse }) {
  const [activeCategory, setActiveCategory] = useState('Semua Kelas');

  const scrollToCourses = () => {
    const el = document.getElementById('courses-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full">
      <HeroBanner onCtaClick={onExploreClick || scrollToCourses} />

      <div id="courses-section">
        <CategoryTabs
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />
        <CourseGrid
          activeCategory={activeCategory}
          onSelectCourse={onSelectCourse}
        />
      </div>

      <NewsletterBanner />
    </div>
  );
}
