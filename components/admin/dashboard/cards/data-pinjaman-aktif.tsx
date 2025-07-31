import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Book } from "lucide-react"

export function DataPinjamanAktifCard() {
  return (
    <Card className="border-violet-200 hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">Data Pinjaman Aktif</CardTitle>
        <Book className="h-5 w-5 text-violet-600" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-violet-600">142</div>
        <p className="text-xs text-gray-500 mt-1">Pinjaman sedang berlangsung</p>
      </CardContent>
    </Card>
  )
}
