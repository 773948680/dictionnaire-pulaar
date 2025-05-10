import { Skeleton } from "@/components/ui/skeleton"

export default function WordLoading() {
  return (
    <div className="container mx-auto py-10">
      <div className="mb-6">
        <Skeleton className="h-9 w-24" />
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <div className="flex justify-between items-start mb-6">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-9 w-20" />
        </div>

        <div className="mb-8">
          <Skeleton className="h-6 w-32 mb-2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4 mt-2" />
        </div>

        <div className="mb-8">
          <Skeleton className="h-6 w-32 mb-2" />
          <Skeleton className="h-4 w-full" />
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Skeleton className="h-5 w-5" />
            <Skeleton className="h-6 w-48" />
          </div>
          <Skeleton className="h-10 w-full mb-4" />
          <Skeleton className="h-24 w-full" />
        </div>

        <div>
          <Skeleton className="h-6 w-32 mb-2" />
          <div className="flex flex-wrap gap-2 mb-4">
            {Array(4)
              .fill(null)
              .map((_, i) => (
                <Skeleton key={i} className="h-8 w-20 rounded-full" />
              ))}
          </div>
          <Skeleton className="h-9 w-32 mt-4" />
        </div>
      </div>
    </div>
  )
}
