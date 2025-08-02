"use client"

import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { AlertTriangle } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

type PinjamanStatus = "request" | "aktif" | "diperpanjang" | "menunggu_pengembalian" | "done" | "refused"

interface PinjamanTelatItemProps {
  pinjaman: {
    id: number
    userName: string
    bukuTitle: string
    status: PinjamanStatus
    tanggalPinjam: string
    durasi: number
    hariTelat: number
  }
}

const statusConfig = {
  request: { label: "Request", variant: "secondary" as const },
  aktif: { label: "Aktif", variant: "default" as const },
  diperpanjang: { label: "Diperpanjang", variant: "outline" as const },
  menunggu_pengembalian: { label: "Menunggu Pengembalian", variant: "destructive" as const },
  done: { label: "Selesai", variant: "success" as const },
  refused: { label: "Ditolak", variant: "destructive" as const },
}

export function PinjamanTelatItem({ pinjaman }: PinjamanTelatItemProps) {
  const statusInfo = statusConfig[pinjaman.status]
  const isMobile = useIsMobile()

  if (isMobile) {
    return (
      <div className="flex flex-col space-y-2 p-3 rounded-lg border border-red-100 bg-red-50/30 hover:bg-red-50/50 transition-colors">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-red-100 text-red-600">
              {pinjaman.userName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{pinjaman.userName}</p>
            <div className="flex items-center space-x-2 mt-1">
              <p className="text-xs text-gray-400">
                {new Date(pinjaman.tanggalPinjam).toLocaleDateString("id-ID")} • {pinjaman.durasi} hari
              </p>
            </div>
          </div>
        </div>
        <div className="pl-13 space-y-2">
          <p className="text-sm text-gray-500 truncate">{pinjaman.bukuTitle}</p>
          <div className="flex items-center justify-between">
            <Badge variant={statusInfo.variant} className="w-fit">
              {statusInfo.label}
            </Badge>
            <div className="flex items-center space-x-1 text-red-600">
              <AlertTriangle className="h-3 w-3" />
              <span className="text-xs font-medium">Telat {pinjaman.hariTelat} hari</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-3 p-3 rounded-lg border border-red-100 bg-red-50/30 hover:bg-red-50/50 transition-colors">
      <Avatar className="h-10 w-10">
        <AvatarFallback className="bg-red-100 text-red-600">
          {pinjaman.userName
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-900 truncate">{pinjaman.userName}</p>
          <div className="flex items-center space-x-2">
            <Badge variant={statusInfo.variant} className="ml-2">
              {statusInfo.label}
            </Badge>
          </div>
        </div>
        <p className="text-sm text-gray-500 truncate">{pinjaman.bukuTitle}</p>
        <div className="flex items-center space-x-2 mt-1">
          <p className="text-xs text-gray-400">
            {new Date(pinjaman.tanggalPinjam).toLocaleDateString("id-ID")} • {pinjaman.durasi} hari
          </p>
          <div className="flex items-center space-x-1 text-red-600">
            <AlertTriangle className="h-3 w-3" />
            <span className="text-xs font-medium">Telat {pinjaman.hariTelat} hari</span>
          </div>
        </div>
      </div>
    </div>
  )
}
