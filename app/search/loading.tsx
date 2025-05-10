import { Skeleton } from "@/components/ui/skeleton"

export default function SearchLoading() {
  return (
    <div className="container mx-auto py-10">
      <div className="mb-6">
        <Skeleton className="h-9 w-24" />
      </div>

      <Skeleton className="h-10 w-64 mb-8" />

      <div className="max-w-2xl mx-auto">
        <div className="flex gap-2 mb-8">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-24" />
        </div>

        <Skeleton className="h-8 w-48 mb-4" />

        <div className="space-y-4">
          {Array(5)
            .fill(null)
            .map((_, i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
        </div>
      </div>
    </div>
  )
}
