import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PinjamanTerakhirItem } from "./pinjaman-terakhir/item"

// Dummy data
const pinjamanTerakhirData = [
  {
    id: 1,
    userName: "Ahmad Rizki",
    bukuTitle: "Pemrograman Web dengan React",
    status: "aktif" as const,
    tanggalPinjam: "2024-01-15",
    durasi: 14,
  },
  {
    id: 2,
    userName: "Siti Nurhaliza",
    bukuTitle: "Database Management System",
    status: "diperpanjang" as const,
    tanggalPinjam: "2024-01-10",
    durasi: 21,
  },
  {
    id: 3,
    userName: "Budi Santoso",
    bukuTitle: "Machine Learning Fundamentals",
    status: "menunggu_pengembalian" as const,
    tanggalPinjam: "2024-01-20",
    durasi: 7,
  },
  {
    id: 4,
    userName: "Maya Sari",
    bukuTitle: "UI/UX Design Principles",
    status: "request" as const,
    tanggalPinjam: "2024-01-22",
    durasi: 14,
  },
  {
    id: 5,
    userName: "Rudi Hermawan",
    bukuTitle: "Cloud Computing Essentials",
    status: "aktif" as const,
    tanggalPinjam: "2024-01-18",
    durasi: 10,
  },
  {
    id: 6,
    userName: "Dewi Lestari",
    bukuTitle: "Cybersecurity Fundamentals",
    status: "diperpanjang" as const,
    tanggalPinjam: "2024-01-12",
    durasi: 21,
  },
  {
    id: 7,
    userName: "Agus Setiawan",
    bukuTitle: "Artificial Intelligence Basics",
    status: "aktif" as const,
    tanggalPinjam: "2024-01-25",
    durasi: 14,
  },
]

export function PinjamanTerakhir() {
  return (
    <Card className="border-violet-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800">Pinjaman terakhir</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-violet-200 scrollbar-track-gray-100">
        {pinjamanTerakhirData.map((pinjaman) => (
          <PinjamanTerakhirItem key={pinjaman.id} pinjaman={pinjaman} />
        ))}
      </CardContent>
    </Card>
  )
}
