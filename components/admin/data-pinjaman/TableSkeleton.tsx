import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"

export function DataPinjamanTableSkeleton() {
  return (
    <Card className="border-violet-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800">Daftar Pinjaman Buku</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-violet-50">
                <TableHead className="w-16 text-center">ID</TableHead>
                <TableHead className="w-20 text-center">Cover</TableHead>
                <TableHead className="min-w-48">Buku / Judul Buku</TableHead>
                <TableHead className="min-w-32">Peminjam</TableHead>
                <TableHead className="w-24 text-center">Durasi</TableHead>
                <TableHead className="w-36 text-center">Status</TableHead>
                <TableHead className="w-32 text-center">Tgl Permintaan</TableHead>
                <TableHead className="w-32 text-center">Tgl Dipinjam</TableHead>
                <TableHead className="w-32 text-center">Tgl Dikembalikan</TableHead>
                <TableHead className="w-24 text-center">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 5 }).map((_, index) => (
                <DataPinjamanRowSkeleton key={index} />
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

function DataPinjamanRowSkeleton() {
  return (
    <TableRow className="hover:bg-violet-50/50">
      {/* ID */}
      <TableCell className="text-center">
        <Skeleton className="h-4 w-8 mx-auto" />
      </TableCell>

      {/* Cover */}
      <TableCell className="text-center">
        <div className="flex justify-center">
          <Skeleton className="h-[60px] w-[45px] rounded-md" />
        </div>
      </TableCell>

      {/* Buku / Judul Buku */}
      <TableCell>
        <Skeleton className="h-4 w-48" />
      </TableCell>

      {/* Peminjam */}
      <TableCell>
        <Skeleton className="h-4 w-32" />
      </TableCell>

      {/* Durasi */}
      <TableCell className="text-center">
        <Skeleton className="h-4 w-16 mx-auto" />
      </TableCell>

      {/* Status */}
      <TableCell className="text-center">
        <Skeleton className="h-5 w-20 mx-auto rounded-full" />
      </TableCell>

      {/* Tgl Permintaan */}
      <TableCell className="text-center">
        <Skeleton className="h-4 w-20 mx-auto" />
      </TableCell>

      {/* Tgl Dipinjam */}
      <TableCell className="text-center">
        <Skeleton className="h-4 w-20 mx-auto" />
      </TableCell>

      {/* Tgl Dikembalikan */}
      <TableCell className="text-center">
        <Skeleton className="h-4 w-20 mx-auto" />
      </TableCell>

      {/* Aksi */}
      <TableCell className="text-center">
        <div className="flex items-center justify-center space-x-1">
          <Skeleton className="h-8 w-8 rounded" />
          <Skeleton className="h-8 w-8 rounded" />
        </div>
      </TableCell>
    </TableRow>
  )
}
