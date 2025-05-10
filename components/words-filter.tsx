"use client"

import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"

export function WordsFilter({ selectedLetter }: { selectedLetter: string }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Peul alphabet letters (simplified for this example)
  const letters = [
    "a",
    "b",
    "ɓ",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "ŋ",
    "ny",
    "o",
    "p",
    "r",
    "s",
    "t",
    "u",
    "w",
    "y",
    "ƴ",
  ]

  const handleLetterClick = (letter: string) => {
    if (letter === "all") {
      router.push(pathname)
    } else {
      router.push(`${pathname}?letter=${letter}`)
    }
  }

  return (
    <div className="mb-6">
      <h2 className="text-sm font-medium text-gray-500 mb-3">Filter by letter:</h2>
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedLetter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => handleLetterClick("all")}
        >
          All
        </Button>
        {letters.map((letter) => (
          <Button
            key={letter}
            variant={selectedLetter === letter ? "default" : "outline"}
            size="sm"
            onClick={() => handleLetterClick(letter)}
          >
            {letter.toUpperCase()}
          </Button>
        ))}
      </div>
    </div>
  )
}
