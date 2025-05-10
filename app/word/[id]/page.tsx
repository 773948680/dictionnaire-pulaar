import Link from "next/link"
import { notFound } from "next/navigation"
import { createServerClient } from "@/lib/supabase-server"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Edit, Globe } from "lucide-react"
import { RegionalMeanings } from "@/components/regional-meanings"

export default async function WordPage({ params }: { params: { id: string } }) {
  const supabase = createServerClient()

  // Fetch the word with the given ID
  const { data: word, error: wordError } = await supabase.from("words").select("*").eq("id", params.id).single()

  if (wordError || !word) {
    return notFound()
  }

  // Fetch regional meanings for this word
  const { data: regionalMeanings, error: regionalError } = await supabase
    .from("regional_meanings")
    .select("*")
    .eq("word_id", word.id)
    .order("region")

  // Fetch synonyms for this word
  const { data: synonyms, error: synonymsError } = await supabase
    .from("synonyms")
    .select("synonym_id")
    .eq("word_id", word.id)

  let synonymWords = []

  if (synonyms && synonyms.length > 0) {
    const synonymIds = synonyms.map((s) => s.synonym_id)

    const { data: synonymData } = await supabase.from("words").select("id, word").in("id", synonymIds)

    synonymWords = synonymData || []
  }

  const hasRegionalMeanings = regionalMeanings && regionalMeanings.length > 0

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

      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-4xl font-bold">{word.word}</h1>
          <Link href={`/edit-word/${word.id}`}>
            <Button variant="outline" size="sm">
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </Link>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-2">Definition</h2>
          <p className="text-gray-700">{word.definition || "No definition available"}</p>
        </div>

        {word.example && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-2">Example</h2>
            <p className="text-gray-700 italic">"{word.example}"</p>
          </div>
        )}

        {hasRegionalMeanings && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Globe className="h-5 w-5 text-gray-500" />
              <h2 className="text-lg font-semibold">Regional Meanings</h2>
            </div>
            <RegionalMeanings meanings={regionalMeanings} />
          </div>
        )}

        <div>
          <h2 className="text-lg font-semibold mb-2">Synonyms</h2>
          {synonymWords.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {synonymWords.map((synonym) => (
                <Link key={synonym.id} href={`/word/${synonym.id}`}>
                  <span className="inline-block px-3 py-1 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                    {synonym.word}
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No synonyms available</p>
          )}

          <div className="mt-4">
            <Link href={`/add-synonym/${word.id}`}>
              <Button variant="outline" size="sm">
                Add Synonym
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
