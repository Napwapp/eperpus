import Image from "next/image";
import { lusitana } from "@/app/ui/fonts";

export default function HeroSection() {
  return (
    <section id="beranda" className="bg-violet-50 min-h-[70vh] md:min-h-screen flex items-center py-8 md:py-0">
      <div className="container mx-auto flex flex-col mb-13 md:flex-row items-center justify-between gap-8 px-4 md:px-8">
        {/* Heading, Logo, Paragraph */}
        <div className="flex-1 w-full flex flex-col items-center md:items-start text-center md:text-left mt-6 md:mt-0 order-1 md:order-none">
          <div className="flex flex-row items-center md:items-center gap-2 md:gap-4 mb-4">
            <span className="inline-block">
              <Image src="/eperpus.svg" alt="Logo ePerpus" width={48} height={48} className="w-10 h-10 md:w-20 md:h-20 object-contain" priority />
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-violet-700 leading-tight">ePerpus</h1>
          </div>
          {/* Paragraph below illustration*/}
          <p className="hidden md:block text-base sm:text-lg md:text-2xl text-violet-900 mb-6 max-w-xl mx-auto md:mx-0">
            ePerpus adalah sistem informasi perpustakaan digital yang memudahkan pengelolaan koleksi, peminjaman, dan pengembalian buku secara efisien dan modern.
          </p>
        </div>
        {/* Illustration */}
        <div className="flex-1 flex justify-center items-center w-full order-2 md:order-none">
          <Image src="/book-lover.svg" alt="Ilustrasi membaca buku" width={350} height={350} className="w-[220px] h-auto sm:w-[300px] md:w-[400px] lg:w-[500px]" priority />
        </div>
        {/* Paragraph below illustration */}
        <div className={`${lusitana.className} block md:hidden w-full order-3 aliased`}>
          <p className="text-base sm:text-lg text-violet-900 mt-4 max-w-xl mx-auto">
            ePerpus adalah sistem informasi perpustakaan digital yang memudahkan pengelolaan koleksi, peminjaman, dan pengembalian buku secara efisien dan modern.
          </p>
        </div>
      </div>
    </section>
  );
} 