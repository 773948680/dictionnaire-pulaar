import { Skeleton } from "@/components/ui/skeleton"

export default function RegionsLoading() {
  return (
    <div className="container mx-auto py-10">
      <div className="mb-6">
        <Skeleton className="h-9 w-24" />
      </div>

      <div className="flex items-center gap-3 mb-8">
        <Skeleton className="h-6 w-6" />
        <Skeleton className="h-10 w-64" />
      </div>

      <Skeleton className="h-6 w-full max-w-3xl mb-8" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array(6)
          .fill(null)
          .map((_, i) => (
            <Skeleton key={i} className="h-48 w-full rounded-lg" />
          ))}
      </div>
    </div>
  )
}
