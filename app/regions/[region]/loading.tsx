import { Skeleton } from "@/components/ui/skeleton"

export default function RegionLoading() {
  return (
    <div className="container mx-auto py-10">
      <div className="mb-6">
        <Skeleton className="h-9 w-24" />
      </div>

      <div className="flex items-center gap-3 mb-8">
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="h-10 w-64" />
      </div>

      <Skeleton className="h-6 w-full max-w-2xl mb-8" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array(6)
          .fill(null)
          .map((_, i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
      </div>
    </div>
  )
}
