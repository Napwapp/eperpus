"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PinjamanTerakhirItem } from "./pinjaman-terakhir/item"
import { PinjamanMapped } from "@/lib/types/pinjaman"
import { PinjamanTerakhirSkeleton } from "./pinjaman-terakhir-skeleton"


export function PinjamanTerakhir() {
  const [pinjamanTerakhirData, setPinjamanTerakhirData] = useState<PinjamanMapped[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

    useEffect(() => {
    fetch("/api/pinjam-buku", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        // Ambil 10 data terbaru
        const latest = Array.isArray(data) ? data.slice(0, 10) : []
        // Map ke props yang dibutuhkan komponen item
        const mapped = latest.map((p) => ({
          id: p.id,
          userName: p.user?.name || "-",
          bukuTitle: p.buku?.title || "-",
          status: p.status,
          tanggalPinjam: new Date(p.tanggal_permintaan), // ← sudah Date
          durasi: p.durasi_pinjaman,
        }))
        setPinjamanTerakhirData(mapped)
        setLoading(false)
      })
      .catch(() => {
        setError("Gagal mengambil data pinjaman terakhir")
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <PinjamanTerakhirSkeleton />
  }

  return (
    <Card className="border-violet-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800">Pinjaman terakhir</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-violet-200 scrollbar-track-gray-100">
        {error ? (
          <div className="text-center text-red-500 py-8">{error}</div>
        ) : pinjamanTerakhirData.length === 0 ? (
          <div className="text-center text-gray-400 py-8">Tidak ada data pinjaman untuk saat ini</div>
        ) : (
          pinjamanTerakhirData.map((pinjaman) => <PinjamanTerakhirItem key={pinjaman.id} pinjaman={pinjaman} />)
        )}
      </CardContent>
    </Card>
  )
}
