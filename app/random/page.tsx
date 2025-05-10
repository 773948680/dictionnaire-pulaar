import { redirect } from "next/navigation"
import { createServerClient } from "@/lib/supabase-server"

export default async function RandomWordPage() {
  const supabase = createServerClient()

  // Get a random word from the database
  const { data: words } = await supabase.from("words").select("id").order("id", { ascending: false })

  if (!words || words.length === 0) {
    redirect("/")
  }

  // Generate a random index
  const randomIndex = Math.floor(Math.random() * words.length)
  const randomWordId = words[randomIndex].id

  // Redirect to the random word's page
  redirect(`/word/${randomWordId}`)
}
