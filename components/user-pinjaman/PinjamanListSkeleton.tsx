import { Skeleton } from "@/components/ui/skeleton"

export function PinjamanListSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <PinjamanCardSkeleton key={index} />
      ))}
    </div>
  )
}

function PinjamanCardSkeleton() {
  return (
    <div className="w-full p-4 border border-gray-200 rounded-xl shadow-sm my-4">
      <div className="flex gap-4">
        {/* Cover Buku Skeleton */}
        <div className="flex-shrink-0 relative w-20 h-24">
          <Skeleton className="w-full h-full rounded-sm" />
        </div>

        {/* Content Skeleton */}
        <div className="flex-1 flex flex-col gap-2">
          {/* Title Skeleton */}
          <Skeleton className="h-6 w-3/4" />
          {/* Synopsis Skeleton */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />
            <Skeleton className="h-4 w-10/12" />
          </div>
          {/* Info tambahan Skeleton */}
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>

        {/* Status Pinjaman Skeleton */}
        <div className="flex-shrink-0">
          <Skeleton className="h-6 w-28 rounded-full" />
        </div>
      </div>
    </div>
  )
}
