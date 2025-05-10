import Link from "next/link"
import { createServerClient } from "@/lib/supabase-server"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default async function StatisticsPage() {
  const supabase = createServerClient()

  // Get total word count
  const { count: wordCount } = await supabase.from("words").select("*", { count: "exact", head: true })

  // Get total synonym relationships count
  const { count: synonymCount } = await supabase.from("synonyms").select("*", { count: "exact", head: true })

  // Get total regional meanings count
  const { count: regionalCount } = await supabase.from("regional_meanings").select("*", { count: "exact", head: true })

  // Get count of unique regions
  const { data: regions } = await supabase.from("regional_meanings").select("region")
  const uniqueRegions = [...new Set(regions?.map((r) => r.region))]

  // Get words with most regional meanings
  const { data: regionalMeaningCounts } = await supabase
    .from("regional_meanings")
    .select("word_id, words:word_id(word)")
    .order("word_id")

  // Count occurrences of each word_id
  const wordIdCounts: Record<number, { count: number; word: string }> = {}

  regionalMeaningCounts?.forEach((item) => {
    const wordId = item.word_id
    const word = (item.words as any)?.word || "Unknown"

    if (!wordIdCounts[wordId]) {
      wordIdCounts[wordId] = { count: 0, word }
    }

    wordIdCounts[wordId].count++
  })

  // Convert to array and sort by count
  const topRegionalWords = Object.entries(wordIdCounts)
    .map(([id, { count, word }]) => ({ id: Number(id), count, word }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)

  // Get words with most synonyms
  const { data: wordsWithMostSynonyms } = await supabase
    .from("synonyms")
    .select("word_id, words!words_synonyms_word_id_fkey(word)")
    .order("word_id", { ascending: false })

  // Count occurrences of each word_id
  const synonymWordIdCounts: Record<number, { count: number; word: string }> = {}

  wordsWithMostSynonyms?.forEach((item) => {
    const wordId = item.word_id
    const word = (item.words as any)?.word || "Unknown"

    if (!synonymWordIdCounts[wordId]) {
      synonymWordIdCounts[wordId] = { count: 0, word }
    }

    synonymWordIdCounts[wordId].count++
  })

  // Convert to array and sort by count
  const topSynonymWords = Object.entries(synonymWordIdCounts)
    .map(([id, { count, word }]) => ({ id: Number(id), count, word }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)

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

      <h1 className="text-3xl font-bold mb-8">Dictionary Statistics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Words</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{wordCount || 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Synonym Pairs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{synonymCount || 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Regional Meanings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{regionalCount || 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Regions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{uniqueRegions.length}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Words with Most Regional Meanings</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {topRegionalWords.map((item) => (
                <li key={item.id} className="flex justify-between items-center">
                  <Link href={`/word/${item.id}`} className="hover:underline">
                    {item.word}
                  </Link>
                  <span className="bg-gray-100 px-2 py-1 rounded-full text-sm">{item.count} regions</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Words with Most Synonyms</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {topSynonymWords.map((item) => (
                <li key={item.id} className="flex justify-between items-center">
                  <Link href={`/word/${item.id}`} className="hover:underline">
                    {item.word}
                  </Link>
                  <span className="bg-gray-100 px-2 py-1 rounded-full text-sm">{item.count} synonyms</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
