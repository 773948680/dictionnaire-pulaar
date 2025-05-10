import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"

// Map of regions to their flag emojis or icons
const regionEmojis: Record<string, string> = {
  "Sénégal/Mauritanie": "🇸🇳",
  Guinée: "🇬🇳",
  Mali: "🇲🇱",
  Niger: "🇳🇪",
  Nigeria: "🇳🇬",
  Cameroun: "🇨🇲",
}

export function RegionCard({ region, count }: { region: string; count: number }) {
  const emoji = regionEmojis[region] || "🌍"

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{region}</CardTitle>
          <span className="text-3xl">{emoji}</span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">
          {count} {count === 1 ? "word" : "words"} with regional meanings
        </p>
      </CardContent>
      <CardFooter>
        <Link href={`/regions/${encodeURIComponent(region)}`} className="w-full">
          <Button variant="outline" className="w-full">
            <MapPin className="mr-2 h-4 w-4" />
            Explore Words
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
