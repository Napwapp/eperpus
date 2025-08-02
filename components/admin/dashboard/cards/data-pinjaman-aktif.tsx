import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Book } from "lucide-react"
import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"

export function DataPinjamanAktifCard() {
  const [jumlah, setJumlah] = useState<number>(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch("/api/pinjam-buku", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        // Filter status aktif
        const aktif = Array.isArray(data) ? data.filter((p) => p.status === "aktif") : []
        setJumlah(aktif.length)
        setLoading(false)
      })
      .catch(() => {
        setError("Gagal mengambil data pinjaman aktif")
        setLoading(false)
      })
  }, [])

  return (
    <Card className="border-violet-200 hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">Data Pinjaman Aktif</CardTitle>
        <Book className="h-5 w-5 text-violet-600" />
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin text-violet-600" />
            <span className="text-sm text-gray-500">Memuat data...</span>
          </div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <>
            <div className="text-2xl font-bold text-violet-600">{jumlah}</div>
          </>
        )}
        <p className="text-xs text-gray-500 mt-1">Pinjaman sedang berlangsung</p>
      </CardContent>
    </Card>
  )
}
