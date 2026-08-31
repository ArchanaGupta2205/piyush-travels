export default function VehicleSkeleton() {
  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl overflow-hidden backdrop-blur-sm">
      {/* Image Skeleton */}
      <div className="w-full h-64 bg-zinc-800 animate-pulse" />
      
      {/* Content Skeleton */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="space-y-2">
            <div className="h-6 w-32 bg-zinc-800 rounded-full animate-pulse" />
            <div className="h-4 w-24 bg-zinc-800 rounded-full animate-pulse" />
          </div>
          <div className="h-8 w-16 bg-zinc-800 rounded-full animate-pulse" />
        </div>
        
        {/* Features Grid Skeleton */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="h-5 w-5 bg-zinc-800 rounded-md animate-pulse" />
              <div className="h-4 w-16 bg-zinc-800 rounded-md animate-pulse" />
            </div>
          ))}
        </div>
        
        {/* Actions Skeleton */}
        <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
          <div className="flex gap-2">
            <div className="h-10 w-10 bg-zinc-800 rounded-full animate-pulse" />
            <div className="h-10 w-10 bg-zinc-800 rounded-full animate-pulse" />
          </div>
          <div className="h-10 w-28 bg-zinc-800 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
}
