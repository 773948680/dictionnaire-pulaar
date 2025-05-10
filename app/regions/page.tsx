import Link from "next/link"
import { createServerClient } from "@/lib/supabase-server"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Globe } from "lucide-react"
import { RegionCard } from "@/components/region-card"

export default async function RegionsPage() {
  const supabase = createServerClient()

  // Get all unique regions
  const { data: regions } = await supabase.from("regional_meanings").select("region").order("region")

  // Remove duplicates
  const uniqueRegions = [...new Set(regions?.map((r) => r.region))]

  // Get count of words for each region
  const regionCounts = await Promise.all(
    uniqueRegions.map(async (region) => {
      const { count } = await supabase
        .from("regional_meanings")
        .select("*", { count: "exact", head: true })
        .eq("region", region)

      return { region, count: count || 0 }
    }),
  )

  return (
    <div className="container mx-auto py-10">
      <div className="mb-6">
        <Link href="/">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dictionary
          </Button>
        </Link>
      </div>

      <div className="flex items-center gap-3 mb-8">
        <Globe className="h-6 w-6 text-gray-700" />
        <h1 className="text-3xl font-bold">Regional Variations</h1>
      </div>

      <p className="text-gray-600 mb-8 max-w-3xl">
        Explore how Peul words have different meanings across various regions and countries where the language is
        spoken.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {regionCounts.map((item) => (
          <RegionCard key={item.region} region={item.region} count={item.count} />
        ))}
      </div>
    </div>
  )
}
