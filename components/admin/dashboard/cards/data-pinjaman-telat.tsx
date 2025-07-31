import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Book, AlertTriangle } from "lucide-react"

export function DataPinjamanTelatCard() {
  return (
    <Card className="border-violet-200 hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-red-600">Data Pinjaman Telat</CardTitle>
        <div className="flex items-center space-x-1">
          <Book className="h-5 w-5 text-red-600" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row items-center gap-2">
          <div className="text-2xl font-bold text-red-600">23</div>
          <AlertTriangle className="h-5 w-5 text-red-500" />
        </div>        
        <p className="text-xs text-gray-500 mt-1">Pinjaman melewati batas waktu</p>
      </CardContent>
    </Card>
  )
}
