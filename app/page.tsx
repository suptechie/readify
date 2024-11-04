import { Suspense } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { fetchArticles } from "@/lib/fetch/fetchWithToken";
import Loader from "@/components/skeleton/Loader";
import PaginatedList from "@/components/common/PaginatedList";
import { HomePageProps } from "@/types/props";

export default async function HomePage({ searchParams }: HomePageProps) {
  const page = Math.max(1, +((await searchParams).page || "1"));
  const limit = 6;
  const { articles, error, token, totalPages } = await fetchArticles(
    `/api?page=${page}&limit=${limit}`
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-center mb-4">Readify</h1>
        <p className="text-center text-muted-foreground mb-6">
          Discover, read, and manage your favorite articles
        </p>
      </header>

      {error ? (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      ) : (
        <Suspense fallback={<Loader />}>
          <PaginatedList
            articles={articles!}
            userId={token?.id!}
            page={page}
            totalPages={totalPages!}
          />
        </Suspense>
      )}

      <footer className="mt-12 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Readify. All rights reserved.</p>
      </footer>
    </div>
  );
};

