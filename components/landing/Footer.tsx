import Image from "next/image";
import dayjs from "dayjs";
import {
  Instagram,
  Github,
  Linkedin,
  Phone,
} from "lucide-react";

const LinksMedsos = [
  { name: "Instagram", icon: Instagram, href: "#" },
  { name: "GitHub", icon: Github, href: "#" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
  { name: "Phone", icon: Phone, href: "#" },
];

const pages = [
  { name: "Beranda", href: "#beranda" },
  { name: "Tentang Kami", href: "#tentang" },
  { name: "Buku", href: "#buku" },
  { name: "Layanan", href: "#layanan" },
];

const resources = [
  { name: "Blog", href: "#" },
  { name: "FAQ", href: "#" },
  { name: "Panduan", href: "#" },
];

const legal = [
  { name: "Privacy Policy", href: "#" },
  { name: "Terms of Service", href: "#" },
  { name: "License", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-200 pt-12 pb-6">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pb-8 border-b border-gray-400 lg:flex lg:justify-between lg:items-start">
          {/* Logo */}
          <div className="flex-1 min-w-[200px] mb-8 lg:mb-0 lg:mr-12">
            <div className="flex items-center gap-2 mb-3">
              <Image src="/eperpus.svg" alt="ePerpus Logo" width={40} height={40} className="w-10 h-10" />
              <span className="font-bold text-xl text-violet-100">ePerpus</span>
            </div>
            <p className="text-gray-400 text-sm mb-4 max-w-xs">
              Platform perpustakaan digital untuk kemudahan akses, peminjaman, dan pengelolaan buku di sekolah.
            </p>
            <div className="flex gap-3 mt-2">
              {LinksMedsos.map(({ name, icon: Icon, href }) => (
                <a key={name} href={href} target="_blank" rel="noopener noreferrer" aria-label={name} className="hover:text-violet-400 transition-colors">
                  <Icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>
          
          <div className="flex-1 w-full flex flex-col gap-8 lg:flex-row lg:gap-12 lg:justify-end">
            {/* Pages */}
            <div className="min-w-[150px] mb-8 lg:mb-0">
              <h4 className="font-semibold text-md mb-3 text-gray-100">Pages</h4>
              <ul className="space-y-2">
                {pages.map((page) => (
                  <li key={page.name}>
                    <a href={page.href} className="text-gray-400 hover:text-violet-400 transition-colors text-sm">
                      {page.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            {/* Resource */}
            <div className="min-w-[150px] mb-8 lg:mb-0">
              <h4 className="font-semibold text-md mb-3 text-gray-100">Resource</h4>
              <ul className="space-y-2">
                {resources.map((item) => (
                  <li key={item.name}>
                    <a href={item.href} className="text-gray-400 hover:text-violet-400 transition-colors text-sm">
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            {/* Legal */}
            <div className="min-w-[150px]">
              <h4 className="font-semibold text-md mb-3 text-gray-100">Legal</h4>
              <ul className="space-y-2">
                {legal.map((item) => (
                  <li key={item.name}>
                    <a href={item.href} className="text-gray-400 hover:text-violet-400 transition-colors text-sm">
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-2 pt-6 text-xs text-gray-400">
          <div>
            &copy; {dayjs().year()} ePerpus. All rights reserved.
          </div>
          <div className="flex gap-4">
            <a href="#" className="text-gray-400 hover:text-violet-400">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-violet-400">Legal Notice</a>
            <a href="#" className="text-gray-400 hover:text-violet-400">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
} 