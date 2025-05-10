"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Search } from "lucide-react"

type Word = {
  id: number
  word: string
  definition: string | null
}

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [results, setResults] = useState<Word[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const supabase = createClientComponentClient()

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!searchTerm.trim()) return

    setIsSearching(true)
    setHasSearched(true)

    try {
      const { data, error } = await supabase
        .from("words")
        .select("id, word, definition")
        .ilike("word", `%${searchTerm}%`)
        .order("word")

      if (error) throw error

      setResults(data || [])
    } catch (error) {
      console.error("Error searching:", error)
    } finally {
      setIsSearching(false)
    }
  }

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

      <h1 className="text-3xl font-bold mb-8">Search Dictionary</h1>

      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSearch} className="flex gap-2 mb-8">
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for a word..."
            className="flex-1"
          />
          <Button type="submit" disabled={isSearching}>
            <Search className="mr-2 h-4 w-4" />
            {isSearching ? "Searching..." : "Search"}
          </Button>
        </form>

        {hasSearched && (
          <div>
            <h2 className="text-xl font-semibold mb-4">
              {results.length} {results.length === 1 ? "result" : "results"} found
            </h2>

            {results.length > 0 ? (
              <div className="space-y-4">
                {results.map((word) => (
                  <Link
                    key={word.id}
                    href={`/word/${word.id}`}
                    className="block p-4 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="text-lg font-semibold mb-1">{word.word}</h3>
                    {word.definition && <p className="text-gray-600 line-clamp-2">{word.definition}</p>}
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">No words found matching "{searchTerm}"</p>
                <Link href="/add-word">
                  <Button>Add this word to the dictionary</Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
