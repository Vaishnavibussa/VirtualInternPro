
"use client";

import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, FolderKanban, MessageSquare, Ticket, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, Suspense } from "react";
import { search, type SearchOutput } from "@/ai/flows/search-flow";
import { Skeleton } from "@/components/ui/skeleton";

const iconMap: Record<string, LucideIcon> = {
  Document: FileText,
  Project: FolderKanban,
  Chat: MessageSquare,
  Ticket: Ticket,
};

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [results, setResults] = useState<SearchOutput['results']>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (query) {
      setIsLoading(true);
      search({ query })
        .then(response => {
          setResults(response.results);
        })
        .catch(error => {
          console.error("Search failed:", error);
          setResults([]);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <div className="flex flex-col gap-4">
      <div className="mb-4">
        <h1 className="text-3xl font-bold font-headline tracking-tight">
          Search Results
        </h1>
        {query ? (
          <p className="text-muted-foreground">
            Showing results for: <span className="font-semibold text-foreground">&quot;{query}&quot;</span>
          </p>
        ) : (
          <p className="text-muted-foreground">
            Please enter a search term in the top navigation bar.
          </p>
        )}
      </div>

      {query && (
        <Card>
          <CardHeader>
            <CardTitle>{isLoading ? 'Searching...' : `${results.length} results found`}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="p-4 border rounded-lg flex items-center gap-4">
                    <Skeleton className="h-6 w-6 rounded-md" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-48" />
                        <Skeleton className="h-3 w-32" />
                    </div>
                </div>
              ))
            ) : results.length > 0 ? (
              results.map((result) => {
                const Icon = iconMap[result.type] || FileText;
                return (
                    <Link href={result.path} key={result.id}>
                        <div className="p-4 border rounded-lg hover:bg-muted transition-colors">
                            <div className="flex items-center gap-4">
                                <Icon className="h-6 w-6 text-muted-foreground" />
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-semibold">{result.title}</h3>
                                        <Badge variant="secondary">{result.type}</Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{result.path}</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                )
              })
            ) : (
              <p className="text-muted-foreground text-center py-8">
                No results found for your query.
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SearchResults />
        </Suspense>
    )
}
