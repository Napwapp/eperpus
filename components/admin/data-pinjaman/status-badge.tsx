import { Badge } from "@/components/ui/badge"
import { Clock, AlertTriangle, X } from "lucide-react"

type PinjamanStatus = "request" | "aktif" | "diperpanjang" | "menunggu_pengembalian" | "done" | "refused"

interface StatusBadgeProps {
  status: PinjamanStatus
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const statusConfig = {
    request: {
      variant: "warning" as const,
      text: "Permintaan",
      icon: null,
    },
    aktif: {
      variant: "success" as const,
      text: "Aktif",
      icon: null,
    },
    diperpanjang: {
      variant: "warning" as const,
      text: "Diperpanjang",
      icon: <Clock className="h-3 w-3 mr-1" />,
    },
    menunggu_pengembalian: {
      variant: "destructive" as const,
      text: "Telat",
      icon: <AlertTriangle className="h-3 w-3 mr-1" />,
    },
    done: {
      variant: "success" as const,
      text: "Selesai",
      icon: null,
    },
    refused: {
      variant: "destructive" as const,
      text: "Ditolak",
      icon: <X className="h-3 w-3 mr-1" />,
    },
  }

  const config = statusConfig[status]

  return (
    <Badge variant={config.variant} className="inline-flex items-center">
      {config.icon}
      {config.text}
    </Badge>
  )
}
