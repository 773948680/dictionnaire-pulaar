import Link from "next/link"
import { createServerClient } from "@/lib/supabase-server"
import { Button } from "@/components/ui/button"
import { PlusCircle, Search } from "lucide-react"
import { WordsFilter } from "@/components/words-filter"

export default async function Home({
  searchParams,
}: {
  searchParams: { letter?: string }
}) {
  const supabase = createServerClient()
  const selectedLetter = searchParams.letter || "all"

  // Fetch all words from the database with optional letter filter
  let query = supabase.from("words").select("id, word, definition").order("word")

  if (selectedLetter !== "all") {
    query = query.ilike("word", `${selectedLetter}%`)
  }

  const { data: words, error } = await query

  if (error) {
    console.error("Error fetching words:", error)
  }

  // Get count of total words
  const { count } = await supabase.from("words").select("*", { count: "exact", head: true })

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Peul Synonym Dictionary</h1>
          <p className="text-gray-500 mt-2">Explore {count || 0} Peul words and their meanings</p>
        </div>
        <div className="flex gap-4">
          <Link href="/search">
            <Button variant="outline">
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </Link>
          <Link href="/add-word">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Word
            </Button>
          </Link>
        </div>
      </div>

      <WordsFilter selectedLetter={selectedLetter} />

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {words &&
          words.map((word) => (
            <Link
              key={word.id}
              href={`/word/${word.id}`}
              className="block p-6 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <h2 className="text-xl font-semibold mb-2">{word.word}</h2>
              <p className="text-gray-600 line-clamp-2">{word.definition}</p>
            </Link>
          ))}
      </div>

      {(!words || words.length === 0) && (
        <div className="text-center py-10">
          <p className="text-gray-500 mb-4">No words found in the dictionary.</p>
          <Link href="/add-word">
            <Button>Add your first word</Button>
          </Link>
        </div>
      )}
    </div>
  )
}
