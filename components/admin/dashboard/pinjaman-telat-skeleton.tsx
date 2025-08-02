import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function PinjamanTelatSkeleton() {
  return (
    <Card className="border-red-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
          Pinjaman telat
          <Skeleton className="ml-2 h-6 w-8 rounded-full" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-red-200 scrollbar-track-gray-100">
        {Array.from({ length: 3 }).map((_, index) => (
          <PinjamanTelatItemSkeleton key={index} />
        ))}
      </CardContent>
    </Card>
  )
}

function PinjamanTelatItemSkeleton() {
  return (
    <div className="flex items-center space-x-3 p-3 rounded-lg border border-red-100 bg-red-50/30">
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
        <Skeleton className="h-3 w-36 mb-1" />
        <div className="flex items-center space-x-2">
          {/* Date and duration skeleton */}
          <Skeleton className="h-3 w-28" />
          {/* Late indicator skeleton */}
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
    </div>
  )
}
