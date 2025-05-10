import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Search, BarChart2, Globe } from "lucide-react"

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-10 bg-white border-b border-gray-200">
      <div className="container mx-auto flex justify-between items-center h-16 px-4">
        <Link href="/" className="font-bold text-xl">
          Peul Dictionary
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/search">
            <Button variant="ghost" size="sm">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </Link>
          <Link href="/regions">
            <Button variant="ghost" size="sm">
              <Globe className="h-4 w-4 mr-2" />
              Regions
            </Button>
          </Link>
          <Link href="/statistics">
            <Button variant="ghost" size="sm">
              <BarChart2 className="h-4 w-4 mr-2" />
              Statistics
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
