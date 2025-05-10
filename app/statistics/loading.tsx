import { Skeleton } from "@/components/ui/skeleton"

export default function StatisticsLoading() {
  return (
    <div className="container mx-auto py-10">
      <div className="mb-6">
        <Skeleton className="h-9 w-24" />
      </div>

      <Skeleton className="h-10 w-64 mb-8" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {Array(4)
          .fill(null)
          .map((_, i) => (
            <div key={i} className="rounded-lg border bg-card shadow-sm p-6">
              <Skeleton className="h-6 w-32 mb-4" />
              <Skeleton className="h-10 w-16" />
            </div>
          ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array(2)
          .fill(null)
          .map((_, i) => (
            <div key={i} className="rounded-lg border bg-card shadow-sm p-6">
              <Skeleton className="h-6 w-64 mb-6" />
              <div className="space-y-4">
                {Array(5)
                  .fill(null)
                  .map((_, j) => (
                    <div key={j} className="flex justify-between items-center">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-6 w-20 rounded-full" />
                    </div>
                  ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
