import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PinjamanTelatItem } from "./pinjaman-telat/item"

// Dummy data untuk pinjaman telat - tambahkan lebih banyak item
const pinjamanTelatData = [
  {
    id: 5,
    userName: "Andi Wijaya",
    bukuTitle: "Advanced JavaScript Concepts",
    status: "aktif" as const,
    tanggalPinjam: "2023-12-20",
    durasi: 14,
    hariTelat: 12,
  },
  {
    id: 6,
    userName: "Rina Kartika",
    bukuTitle: "Python for Data Science",
    status: "diperpanjang" as const,
    tanggalPinjam: "2023-12-25",
    durasi: 21,
    hariTelat: 8,
  },
  {
    id: 7,
    userName: "Dedi Kurniawan",
    bukuTitle: "Mobile App Development",
    status: "aktif" as const,
    tanggalPinjam: "2024-01-01",
    durasi: 14,
    hariTelat: 5,
  },
  {
    id: 8,
    userName: "Lina Marlina",
    bukuTitle: "DevOps Best Practices",
    status: "aktif" as const,
    tanggalPinjam: "2023-12-18",
    durasi: 14,
    hariTelat: 15,
  },
  {
    id: 9,
    userName: "Hendra Gunawan",
    bukuTitle: "Blockchain Technology",
    status: "diperpanjang" as const,
    tanggalPinjam: "2023-12-22",
    durasi: 21,
    hariTelat: 10,
  },
  {
    id: 10,
    userName: "Sari Indah",
    bukuTitle: "Digital Marketing Strategy",
    status: "aktif" as const,
    tanggalPinjam: "2023-12-28",
    durasi: 14,
    hariTelat: 6,
  },
]

export function PinjamanTelat() {
  return (
    <Card className="border-violet-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
          Pinjaman telat
          <span className="ml-2 text-sm bg-red-100 text-red-600 px-2 py-1 rounded-full">
            {pinjamanTelatData.length}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-red-200 scrollbar-track-gray-100">
        {pinjamanTelatData.map((pinjaman) => (
          <PinjamanTelatItem key={pinjaman.id} pinjaman={pinjaman} />
        ))}
      </CardContent>
    </Card>
  )
}
