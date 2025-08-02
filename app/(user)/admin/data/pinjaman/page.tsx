import { DataPinjamanTable } from "@/components/admin/data-pinjaman/Table"

export default function DataPinjamanPage() {
  return (
    <div className="p-6 space-y-6 bg-white min-h-screen">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Data Pinjaman</h1>
        <p className="text-gray-600">Kelola semua data pinjaman buku perpustakaan</p>
      </div>

      <DataPinjamanTable />
    </div>
  )
}