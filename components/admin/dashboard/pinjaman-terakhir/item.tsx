"use client"

import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useIsMobile } from "@/hooks/use-mobile"

type PinjamanStatus = "request" | "aktif" | "diperpanjang" | "menunggu_pengembalian" | "done" | "refused"

interface PinjamanTerakhirItemProps {
  pinjaman: {
    id: number
    userName: string
    bukuTitle: string
    status: PinjamanStatus
    tanggalPinjam: Date
    durasi: number
  }
}

const statusConfig = {
  request: { label: "Request", variant: "warning" as const },
  aktif: { label: "Aktif", variant: "success" as const },
  diperpanjang: { label: "Diperpanjang", variant: "warning" as const },
  menunggu_pengembalian: { label: "Menunggu Pengembalian", variant: "destructive" as const },
  done: { label: "Selesai", variant: "success" as const },
  refused: { label: "Ditolak", variant: "destructive" as const },
}

export function PinjamanTerakhirItem({ pinjaman }: PinjamanTerakhirItemProps) {
  const statusInfo = statusConfig[pinjaman.status]
  const isMobile = useIsMobile()

  if (isMobile) {
    return (
      <div className="flex flex-col space-y-2 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-violet-100 text-violet-600">
              {pinjaman.userName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{pinjaman.userName}</p>
            <p className="text-xs text-gray-400">
              {new Date(pinjaman.tanggalPinjam).toLocaleDateString("id-ID")} • {pinjaman.durasi} hari
            </p>
          </div>
        </div>
        <div className="pl-13">
          <p className="text-sm text-gray-500 truncate mb-2">{pinjaman.bukuTitle}</p>
          <Badge variant={statusInfo.variant} className="w-fit">
            {statusInfo.label}
          </Badge>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
      <Avatar className="h-10 w-10">
        <AvatarFallback className="bg-violet-100 text-violet-600">
          {pinjaman.userName
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-900 truncate">{pinjaman.userName}</p>
          <Badge variant={statusInfo.variant} className="ml-2">
            {statusInfo.label}
          </Badge>
        </div>
        <p className="text-sm text-gray-500 truncate">{pinjaman.bukuTitle}</p>
        <p className="text-xs text-gray-400">
          {new Date(pinjaman.tanggalPinjam).toLocaleDateString("id-ID")} • {pinjaman.durasi} hari
        </p>
      </div>
    </div>
  )
}
