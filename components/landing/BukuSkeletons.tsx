import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function BukuSectionSkeleton() {
  return (
    <section id="buku" className="py-12 md:py-16 bg-violet-50">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-xl md:text-2xl font-bold text-gray-700 mb-6">Koleksi Buku Populer</h2>

        <div className="flex gap-4 md:gap-6 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-violet-200">
          {Array.from({ length: 2 }).map((_, index) => (
            <BukuCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function BukuCardSkeleton() {
  return (
    <Card className="min-w-[160px] max-w-[160px] sm:min-w-[200px] sm:max-w-[200px] md:min-w-[220px] md:max-w-[220px] bg-white shadow-md flex-shrink-0">
      <CardContent className="flex flex-col items-center p-3 sm:p-4">
        {/* Book cover skeleton */}
        <Skeleton className="mb-2 sm:mb-3 rounded w-[60px] h-[80px] sm:w-[80px] sm:h-[110px]" />

        {/* Book title skeleton */}
        <div className="w-full mb-1 space-y-1">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4 mx-auto" />
        </div>

        {/* Author skeleton */}
        <Skeleton className="h-3 w-2/3 mb-2" />
      </CardContent>
    </Card>
  )
}
