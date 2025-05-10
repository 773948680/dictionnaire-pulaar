import Link from "next/link"
import { notFound } from "next/navigation"
import { createServerClient } from "@/lib/supabase-server"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

// Map of regions to their flag emojis or icons
const regionEmojis: Record<string, string> = {
  "Sénégal/Mauritanie": "🇸🇳",
  Guinée: "🇬🇳",
  Mali: "🇲🇱",
  Niger: "🇳🇪",
  Nigeria: "🇳🇬",
  Cameroun: "🇨🇲",
}

export default async function RegionPage({ params }: { params: { region: string } }) {
  const region = decodeURIComponent(params.region)
  const supabase = createServerClient()

  // Get all words with meanings in this region
  const { data: regionalWords, error } = await supabase
    .from("regional_meanings")
    .select("id, definition, example, words:word_id(id, word)")
    .eq("region", region)
    .order("definition")

  if (error || !regionalWords || regionalWords.length === 0) {
    return notFound()
  }

  const emoji = regionEmojis[region] || "🌍"

  return (
    <div className="container mx-auto py-10">
      <div className="mb-6">
        <Link href="/regions">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Regions
          </Button>
        </Link>
      </div>

      <div className="flex items-center gap-3 mb-8">
        <span className="text-3xl">{emoji}</span>
        <h1 className="text-3xl font-bold">Peul Words in {region}</h1>
      </div>

      <p className="text-gray-600 mb-8">Explore Peul words with specific meanings in the {region} region.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {regionalWords.map((item) => {
          const word = item.words as any
          return (
            <Link
              key={item.id}
              href={`/word/${word.id}`}
              className="block p-6 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <h2 className="text-xl font-semibold mb-2">{word.word}</h2>
              <p className="text-gray-700 mb-2">{item.definition}</p>
              {item.example && <p className="text-gray-500 italic">"{item.example}"</p>}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
