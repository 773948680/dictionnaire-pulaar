import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type RegionalMeaning = {
  id: number
  word_id: number
  region: string
  definition: string
  example: string | null
}

export function RegionalMeanings({ meanings }: { meanings: RegionalMeaning[] }) {
  // Group meanings by region
  const regions = [...new Set(meanings.map((m) => m.region))]

  return (
    <Tabs defaultValue={regions[0]} className="w-full">
      <TabsList className="mb-4">
        {regions.map((region) => (
          <TabsTrigger key={region} value={region}>
            {region}
          </TabsTrigger>
        ))}
      </TabsList>
      {regions.map((region) => {
        const regionMeanings = meanings.filter((m) => m.region === region)
        return (
          <TabsContent key={region} value={region} className="space-y-4">
            {regionMeanings.map((meaning) => (
              <div key={meaning.id} className="border-l-4 border-gray-200 pl-4">
                <p className="font-medium">{meaning.definition}</p>
                {meaning.example && <p className="text-gray-600 italic mt-1">"{meaning.example}"</p>}
              </div>
            ))}
          </TabsContent>
        )
      })}
    </Tabs>
  )
}
