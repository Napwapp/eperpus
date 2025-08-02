import {
  BookOpenIcon,
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const layananList = [
  {
    nama: "Pengelolaan Buku",
    deskripsi:
      "Kamu dapat mencari, melihat buku, mengelola buku, dan mengelola data pinjaman kamu dengan mudah dan terpusat.",
    icon: BookOpenIcon,
  },
  {
    nama: "Peminjaman Buku",
    deskripsi:
      "Kamu dapat melakukan permintaan untuk meminjam buku yang kamu minati secara online dengan proses yang mudah.",
    icon: ArrowDownTrayIcon,
  },
  {
    nama: "Pengembalian Buku",
    deskripsi:
      "Selain peminjaman, kamu juga wajib mengembalikan buku yang dipinjam selama periode tertentu sesuai aturan yang berlaku.",
    icon: ArrowUpTrayIcon,
  },
  {
    nama: "Manajemen Akun",
    deskripsi:
      "Setiap pengguna dapat mengelola akun pribadi untuk melihat riwayat peminjaman, mengatur data diri, dan status verifikasi.",
    icon: UserCircleIcon,
  },
];

export default function LayananSection() {
  return (
    <section id="layanan" className="py-16 bg-violet-50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl block text-gray-700 font-semibold mb-2">
            Layanan Terbaik Kami
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Jelajahi fitur-fitur utama yang kami sediakan untuk memudahkan
            pengelolaan dan pemanfaatan perpustakaan digital.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {layananList.map((layanan, idx) => {
            const Icon = layanan.icon;
            return (
              <Card
                key={idx}
                className="flex justify-center items-center text-center bg-white border-violet-100 hover:shadow-lg transition-shadow"
              >
                <CardHeader className="flex flex-col items-center justify-center pb-0">
                  <Icon className="w-12 h-12 text-violet-600 mb-4" />
                  <CardTitle className="text-lg text-gray-900">
                    {layanan.nama}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-600 text-sm mt-2">
                  {layanan.deskripsi}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
