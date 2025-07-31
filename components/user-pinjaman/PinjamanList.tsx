import PinjamanCard from "./PinjamanCard";
import { DataPinjaman } from "@/lib/types/pinjaman";

// Data dummy untuk pinjaman
const dummyPinjamanData: DataPinjaman[] = [
  {
    id: "1",
    judul: "Laskar Pelangi",
    sinopsis: "Novel karya Andrea Hirata yang menceritakan perjuangan anak-anak di Belitung untuk mendapatkan pendidikan. Cerita ini mengisahkan tentang sepuluh anak yang bersekolah di SD Muhammadiyah yang sangat sederhana dengan kondisi yang memprihatinkan. Meskipun dalam keterbatasan, mereka tetap semangat mengejar mimpi dan cita-cita mereka. Novel ini mengajarkan tentang pentingnya pendidikan, persahabatan, dan semangat pantang menyerah dalam menghadapi berbagai rintangan hidup.",
    cover: "/cover/laskar-pelangi.jpg",
    stok: 5,
    tanggalPinjam: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 hari yang lalu
    durasiPinjam: 7, // 7 hari
    statusPinjaman: "aktif",
  },
  {
    id: "2",
    judul: "Bumi Manusia",
    sinopsis: "Novel pertama dari tetralogi Buru karya Pramoedya Ananta Toer yang berlatar di era kolonial Belanda. Mengisahkan tentang Minke, seorang pribumi yang berjuang melawan ketidakadilan sistem kolonial. Novel ini menggambarkan perjuangan identitas, cinta, dan keadilan dalam konteks sejarah Indonesia. Cerita ini penuh dengan detail historis yang akurat dan menggambarkan kehidupan masyarakat Indonesia pada masa penjajahan dengan sangat mendalam.",
    cover: "/cover/bumi-manusia.jpg",
    stok: 3,
    tanggalPinjam: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 hari yang lalu
    durasiPinjam: 14, // 14 hari
    statusPinjaman: "diperpanjang",
  },
  {
    id: "3",
    judul: "Perahu Kertas",
    sinopsis: "Novel karya Dewi Lestari yang menceritakan kisah cinta antara Keenan dan Kugy. Cerita ini mengisahkan tentang perjalanan hidup dua orang yang berbeda karakter namun saling melengkapi. Novel ini menggambarkan tentang arti persahabatan, cinta, dan perjuangan dalam mencapai mimpi. Dengan gaya penulisan yang puitis dan mendalam, novel ini berhasil menggambarkan kompleksitas hubungan manusia dan berbagai emosi yang menyertainya.",
    cover: "/cover/perahu-kertas.jpg",
    stok: 8,
    tanggalPinjam: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 hari yang lalu
    durasiPinjam: 7, // 7 hari
    statusPinjaman: "menunggu_pengembalian",
  },
  {
    id: "4",
    judul: "Ayat-Ayat Cinta",
    sinopsis: "Novel karya Habiburrahman El Shirazy yang menceritakan tentang Fahri, seorang mahasiswa Indonesia yang belajar di Al-Azhar, Mesir. Novel ini mengisahkan tentang perjuangan Fahri dalam menghadapi berbagai tantangan hidup, termasuk masalah cinta dan keluarga. Cerita ini menggambarkan tentang nilai-nilai Islam, cinta, dan perjuangan dalam mencapai cita-cita. Novel ini berhasil menggabungkan unsur religius dengan cerita yang mengharukan dan inspiratif.",
    cover: "/cover/ayat-ayat-cinta.jpg",
    stok: 12,
    tanggalPinjam: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 hari yang lalu
    durasiPinjam: 14, // 14 hari
    statusPinjaman: "done",
  },
  {
    id: "5",
    judul: "Negeri 5 Menara",
    sinopsis: "Novel karya Ahmad Fuadi yang menceritakan tentang perjalanan Alif dari kampung halamannya di Maninjau, Sumatera Barat, hingga menjadi mahasiswa di Pondok Modern Gontor. Novel ini mengisahkan tentang perjuangan Alif dalam mengejar pendidikan dan cita-citanya. Cerita ini menggambarkan tentang pentingnya pendidikan, persahabatan, dan semangat pantang menyerah. Novel ini penuh dengan inspirasi dan motivasi untuk terus berjuang mencapai mimpi.",
    cover: "/cover/negeri-5-menara.jpg",
    stok: 6,
    tanggalPinjam: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 hari yang lalu
    durasiPinjam: 10, // 10 hari
    statusPinjaman: "aktif",
  },
];

export default function PinjamanList() {
  return (
    <div className="space-y-4">
      {dummyPinjamanData.map((pinjaman) => (
        <PinjamanCard key={pinjaman.id} data={pinjaman} />
      ))}
    </div>
  );
} 