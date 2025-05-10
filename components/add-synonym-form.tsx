"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Plus, Search } from "lucide-react"

type Word = {
  id: number
  word: string
}

export function AddSynonymForm({ wordId, wordText }: { wordId: number; wordText: string }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<Word[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const router = useRouter()
  const { toast } = useToast()
  const supabase = createClientComponentClient()

  useEffect(() => {
    if (searchTerm.length >= 2) {
      searchWords()
    } else {
      setSearchResults([])
    }
  }, [searchTerm])

  const searchWords = async () => {
    setIsSearching(true)

    try {
      const { data, error } = await supabase
        .from("words")
        .select("id, word")
        .neq("id", wordId)
        .ilike("word", `%${searchTerm}%`)
        .order("word")
        .limit(10)

      if (error) throw error

      setSearchResults(data || [])
    } catch (error) {
      console.error("Error searching words:", error)
    } finally {
      setIsSearching(false)
    }
  }

  const addSynonym = async (synonymId: number) => {
    setIsSubmitting(true)

    try {
      // Add the synonym relationship in both directions for bidirectional synonyms
      const { error: error1 } = await supabase.from("synonyms").insert([{ word_id: wordId, synonym_id: synonymId }])

      if (error1) throw error1

      const { error: error2 } = await supabase.from("synonyms").insert([{ word_id: synonymId, synonym_id: wordId }])

      if (error2) throw error2

      toast({
        title: "Success",
        description: "Synonym added successfully",
      })

      router.push(`/word/${wordId}`)
      router.refresh()
    } catch (error: any) {
      // If it's a duplicate error, just show a friendly message
      if (error.code === "23505") {
        toast({
          title: "Already exists",
          description: "These words are already synonyms",
        })
      } else {
        toast({
          title: "Error",
          description: error.message || "Failed to add synonym",
          variant: "destructive",
        })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link href={`/word/${wordId}`}>
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to {wordText}
          </Button>
        </Link>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="mb-6">
          <label htmlFor="search" className="text-sm font-medium block mb-2">
            Search for a word to add as a synonym
          </label>
          <div className="relative">
            <Input
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Type to search..."
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
          {isSearching && <p className="text-sm text-gray-500 mt-2">Searching...</p>}
        </div>

        {searchResults.length > 0 ? (
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-500 mb-3">Search Results</h3>
            {searchResults.map((result) => (
              <div key={result.id} className="flex justify-between items-center p-3 border border-gray-200 rounded-md">
                <span>{result.word}</span>
                <Button size="sm" onClick={() => addSynonym(result.id)} disabled={isSubmitting}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>
            ))}
          </div>
        ) : searchTerm.length >= 2 && !isSearching ? (
          <div className="text-center py-6">
            <p className="text-gray-500 mb-4">No matching words found.</p>
            <Link href="/add-word">
              <Button>Add a new word</Button>
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  )
}
