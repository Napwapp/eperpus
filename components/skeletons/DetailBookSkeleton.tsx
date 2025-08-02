export default function DetailBookSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Section - Cover skeleton */}
        <div className="lg:col-span-1">
          <div className="bg-gray-200 h-96 rounded-lg"></div>
        </div>
        
        {/* Middle Section - Books Data skeleton */}
        <div className="lg:col-span-1 space-y-6">
          {/* Title skeleton */}
          <div className="space-y-2">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
          
          {/* Categories skeleton */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-20"></div>
            <div className="flex gap-2">
              <div className="h-6 w-16 bg-gray-200 rounded"></div>
              <div className="h-6 w-20 bg-gray-200 rounded"></div>
              <div className="h-6 w-24 bg-gray-200 rounded"></div>
            </div>
          </div>
          
          {/* Author skeleton */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-16"></div>
            <div className="h-5 bg-gray-200 rounded w-1/2"></div>
          </div>
          
          {/* Publisher skeleton */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-20"></div>
            <div className="h-5 bg-gray-200 rounded w-1/3"></div>
          </div>
          
          {/* Rating skeleton */}
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-gray-200 rounded"></div>
            <div className="h-5 bg-gray-200 rounded w-8"></div>
            <div className="h-4 bg-gray-200 rounded w-24"></div>
          </div>
          
          {/* Info skeleton */}
          <div className="flex gap-4">
            <div className="space-y-1">
              <div className="h-4 bg-gray-200 rounded w-12"></div>
              <div className="h-5 bg-gray-200 rounded w-16"></div>
            </div>
            <div className="space-y-1">
              <div className="h-4 bg-gray-200 rounded w-16"></div>
              <div className="h-5 bg-gray-200 rounded w-20"></div>
            </div>
          </div>
          
          {/* Sinopsis skeleton */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-20"></div>
            <div className="space-y-1">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        </div>
        
        {/* Right Section - Card skeleton */}
        <div className="lg:col-span-1">
          <div className="bg-gray-200 h-64 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
} 