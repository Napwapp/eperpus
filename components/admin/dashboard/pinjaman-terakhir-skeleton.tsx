import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function PinjamanTerakhirSkeleton() {
  return (
    <Card className="border-violet-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800">Pinjaman terakhir</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-violet-200 scrollbar-track-gray-100">
        {Array.from({ length: 3 }).map((_, index) => (
          <PinjamanTerakhirItemSkeleton key={index} />
        ))}
      </CardContent>
    </Card>
  )
}

function PinjamanTerakhirItemSkeleton() {
  return (
    <div className="flex items-center space-x-3 p-3 rounded-lg border border-gray-100">
      {/* Avatar skeleton */}
      <Skeleton className="h-10 w-10 rounded-full" />

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-2">
          {/* User name skeleton */}
          <Skeleton className="h-4 w-24" />
          {/* Badge skeleton */}
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
        {/* Book title skeleton */}
        <Skeleton className="h-3 w-40 mb-1" />
        {/* Date and duration skeleton */}
        <Skeleton className="h-3 w-28" />
      </div>
    </div>
  )
}
