export default function BooksGridSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
      {Array.from({ length: 2 }).map((_, index) => (
        <div key={index} className="animate-pulse">
          {/* Image skeleton */}
          <div className="aspect-[3/4] bg-gray-200 rounded-lg mb-4"></div>
          
          {/* Content skeleton */}
          <div className="space-y-2">
            {/* Category badges skeleton */}
            <div className="flex gap-1 mb-2">
              <div className="h-5 w-16 bg-gray-200 rounded"></div>
              <div className="h-5 w-20 bg-gray-200 rounded"></div>
            </div>
            
            {/* Title skeleton */}
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            
            {/* Author skeleton */}
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            
            {/* Date skeleton */}
            <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            
            {/* Bottom info skeleton */}
            <div className="flex justify-between">
              <div className="h-3 bg-gray-200 rounded w-16"></div>
              <div className="h-3 bg-gray-200 rounded w-8"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 