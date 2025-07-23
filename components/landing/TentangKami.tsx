"use client";

import Image from "next/image";
import { useRef } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

export default function TentangKami() {
  const descRef = useRef<HTMLDivElement>(null);

  return (
    <section id="tentang" className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Image */}
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="rounded-xl overflow-hidden shadow-md w-full max-w-md aspect-square bg-violet-100">
              <Image
                src="/images/reading.webp"
                alt="Mengenai ePerpus"
                width={500}
                height={500}
                className="object-cover w-full h-full"
                priority
              />
            </div>
          </div>
          {/* Right Content */}
          <div className="w-full md:w-1/2">
            <span className="text-violet-700 font-semibold mb-2 block">
              Mengenai ePerpus
            </span>
            <Card className="bg-white border-0 shadow-none p-0">
              <CardContent className="p-0">
                <CardTitle className="text-gray-900 text-2xl md:text-3xl font-bold mb-4 leading-tight">
                  sebuah platform perpustakaan berbasis web
                </CardTitle>
                {/* Description with scroll if overflow, scrollbar only on hover */}
                <div className="group">
                  <div
                    ref={descRef}
                    className="text-gray-700 text-base max-h-48 md:max-h-65 pr-2 overflow-y-auto transition-all duration-200"
                    style={{ WebkitOverflowScrolling: "touch" }}
                  >
                    ePerpus adalah sebuah platform perpustakaan digital berbasis
                    web yang dirancang khusus untuk mempermudah proses
                    peminjaman dan pengelolaan buku di lingkungan sekolah.
                    Sistem ini dikembangkan sebagai solusi modern terhadap
                    tantangan perpustakaan konvensional, dengan menghadirkan
                    fitur-fitur seperti pencarian buku, peminjaman online,
                    manajemen data buku oleh admin, dan kontrol penuh oleh
                    superadmin terhadap pengguna dan aktivitas sistem. ePerpus
                    bertujuan meningkatkan efisiensi, transparansi, dan
                    kemudahan akses informasi bagi siswa, guru, maupun pengelola
                    perpustakaan. Kami percaya bahwa literasi adalah fondasi
                    penting dalam pendidikan, dan melalui ePerpus, kami ingin
                    berkontribusi dalam mendukung budaya baca dan kemajuan
                    teknologi di dunia pendidikan.
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
