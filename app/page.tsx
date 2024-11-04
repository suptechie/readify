import { Suspense } from "react";
import { IExtendedArticle } from "@/types/entities";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { fetchArticles } from "@/lib/fetch/fetchWithToken";
import Loader from "@/components/skeleton/Loader";
import ArticleList from "@/components/common/ArticleList";
import getTokenData from "@/lib/utils/getTokenData";
import { TokenPayload } from "@/types";

export default async function HomePage() {
  let articles: IExtendedArticle[];
  let error: Error | null = null;
  const token = await getTokenData() as TokenPayload;

  try {
    articles = await fetchArticles('/api');
  } catch (e) {
    error = e instanceof Error ? e : new Error('An unexpected error occurred');
    articles = [];
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-center mb-4">Your Reading Hub</h1>
        <p className="text-center text-muted-foreground mb-6">Discover, read, and manage your favorite articles</p>
        {/* <div className="flex justify-center gap-4">
          <div className="relative w-full max-w-sm">
            <Input type="search" placeholder="Search articles..." className="pl-10" />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          </div>
          <Button variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" /> Refresh
          </Button>
        </div> */}
      </header>

      {error ? (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      ) : (
        <Suspense fallback={<Loader />}>
          <ArticleList articles={articles} isHome userId={token?.id} />
        </Suspense>
      )}

      <footer className="mt-12 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Your Reading Hub. All rights reserved.</p>
      </footer>
    </div>
  );
}