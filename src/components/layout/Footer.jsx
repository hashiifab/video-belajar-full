import { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';

function LinkedInIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c-.95 0-1.72-.77-1.72-1.72s.77-1.72 1.72-1.72 1.73.77 1.73 1.72-.78 1.72-1.73 1.72m1.39 9.74v-8.37H5.07v8.37h2.78z" />
    </svg>
  );
}

function FacebookIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02z" />
    </svg>
  );
}

function InstagramIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function TwitterIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.936 9.936 0 0024 4.59z" />
    </svg>
  );
}

export default function Footer() {
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (name) => {
    setOpenSections((prev) => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const footerLinks = {
    Kategori: [
      'Digital & Teknologi',
      'Pemasaran',
      'Manajemen Bisnis',
      'Pengembangan Diri',
      'Desain'
    ],
    Perusahaan: [
      'Tentang Kami',
      'FAQ',
      'Kebijakan Privasi',
      'Ketentuan Layanan',
      'Bantuan'
    ],
    Komunitas: ['Tips Sukses', 'Blog']
  };

  const socialLinks = [
    { component: LinkedInIcon, label: 'LinkedIn', href: '#linkedin' },
    { component: FacebookIcon, label: 'Facebook', href: '#facebook' },
    { component: InstagramIcon, label: 'Instagram', href: '#instagram' },
    { component: TwitterIcon, label: 'Twitter', href: '#twitter' }
  ];

  return (
    <footer className="w-full bg-white border-t border-[#F1F1F1] pt-10 md:pt-14 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="md:col-span-2">
            <div className="font-extrabold text-[22px] md:text-[26px] tracking-tight leading-none select-none">
              <span className="text-[#F8A435]">video</span>
              <span className="text-[#F8A435]">b</span>
              <span className="text-[#FF4D00]">ela</span>
              <span className="text-[#F8A435]">jar</span>
            </div>

            <p className="mt-3.5 text-xs sm:text-sm font-semibold text-[#222325] leading-relaxed max-w-sm">
              Gali Potensi Anda Melalui Pembelajaran Video di hariesok.id!
            </p>

            <address className="mt-2.5 not-italic text-xs text-[#7A7A7A] leading-relaxed">
              <p>Jl. Usman Effendi No. 50 Lowokwaru, Malang</p>
              <p className="mt-1">+62-877-7123-1234</p>
            </address>
          </div>

          {/* Desktop Navigation Columns */}
          <div className="hidden md:contents">
            <div>
              <h3 className="text-sm font-bold text-[#222325]">Kategori</h3>
              <ul className="mt-3 space-y-2 text-xs text-[#7A7A7A]">
                {footerLinks.Kategori.map((item) => (
                  <li key={item}>
                    <a href="#category" className="hover:text-[#3ECF4C] transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-bold text-[#222325]">Perusahaan</h3>
              <ul className="mt-3 space-y-2 text-xs text-[#7A7A7A]">
                {footerLinks.Perusahaan.map((item) => (
                  <li key={item}>
                    <a href="#about" className="hover:text-[#3ECF4C] transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-bold text-[#222325]">Komunitas</h3>
              <ul className="mt-3 space-y-2 text-xs text-[#7A7A7A]">
                {footerLinks.Komunitas.map((item) => (
                  <li key={item}>
                    <a href="#community" className="hover:text-[#3ECF4C] transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Mobile Accordion Navigation */}
          <div className="md:hidden space-y-2 border-t border-gray-100 pt-4">
            {Object.entries(footerLinks).map(([title, links]) => {
              const isOpen = openSections[title];
              return (
                <div key={title} className="border-b border-gray-100 pb-2">
                  <button
                    type="button"
                    onClick={() => toggleSection(title)}
                    className="w-full flex items-center justify-between py-2 text-left text-sm font-bold text-[#222325]"
                  >
                    <span>{title}</span>
                    {isOpen ? (
                      <ChevronDown className="w-4 h-4 text-[#7A7A7A]" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-[#7A7A7A]" />
                    )}
                  </button>
                  {isOpen && (
                    <ul className="pt-1 pb-2 pl-2 space-y-2 text-xs text-[#7A7A7A]">
                      {links.map((link) => (
                        <li key={link}>
                          <a href={`#${link}`} className="hover:text-[#3ECF4C]">
                            {link}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 md:mt-12 pt-6 border-t border-[#EDEDED] flex flex-col sm:flex-row sm:items-center sm:justify-between items-start gap-4">
          <p className="text-xs text-[#7A7A7A] text-left order-2 sm:order-1 max-w-[220px] sm:max-w-none leading-relaxed">
            @2023 Gerobak Sayur All Rights Reserved.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-2.5 order-1 sm:order-2">
            {socialLinks.map(({ component: IconComponent, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-9 h-9 rounded-full border border-[#D1D5DB] flex items-center justify-center text-[#7A7A7A] hover:text-[#3ECF4C] hover:border-[#3ECF4C] transition-colors"
              >
                <IconComponent className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

