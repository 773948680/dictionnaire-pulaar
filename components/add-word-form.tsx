"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft } from "lucide-react"

export function AddWordForm() {
  const [word, setWord] = useState("")
  const [definition, setDefinition] = useState("")
  const [example, setExample] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const router = useRouter()
  const { toast } = useToast()
  const supabase = createClientComponentClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!word.trim()) {
      toast({
        title: "Error",
        description: "Word is required",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const { data, error } = await supabase.from("words").insert([{ word, definition, example }]).select()

      if (error) throw error

      toast({
        title: "Success",
        description: "Word added successfully",
      })

      router.push("/")
      router.refresh()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to add word",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link href="/">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dictionary
          </Button>
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg border border-gray-200">
        <div className="space-y-2">
          <label htmlFor="word" className="text-sm font-medium">
            Word <span className="text-red-500">*</span>
          </label>
          <Input
            id="word"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            placeholder="Enter the Peul word"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="definition" className="text-sm font-medium">
            Definition
          </label>
          <Textarea
            id="definition"
            value={definition}
            onChange={(e) => setDefinition(e.target.value)}
            placeholder="Enter the definition"
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="example" className="text-sm font-medium">
            Example
          </label>
          <Textarea
            id="example"
            value={example}
            onChange={(e) => setExample(e.target.value)}
            placeholder="Enter an example sentence"
            rows={2}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add Word"}
        </Button>
      </form>
    </div>
  )
}
