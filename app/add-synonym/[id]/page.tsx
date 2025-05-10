import { AddSynonymForm } from "@/components/add-synonym-form"
import { createServerClient } from "@/lib/supabase-server"
import { notFound } from "next/navigation"

export default async function AddSynonymPage({ params }: { params: { id: string } }) {
  const supabase = createServerClient()

  // Fetch the word with the given ID
  const { data: word, error } = await supabase.from("words").select("id, word").eq("id", params.id).single()

  if (error || !word) {
    return notFound()
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Add Synonym for "{word.word}"</h1>
      <AddSynonymForm wordId={word.id} wordText={word.word} />
    </div>
  )
}
