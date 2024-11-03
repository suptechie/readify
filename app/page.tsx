import { memo, Suspense } from "react";
import { IExtendedArticle } from "@/types/entities";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { fetchArticles } from "@/lib/fetch/fetchWithToken";
import Loader from "@/components/skeleton/Loader";
import ArticleList from "@/components/common/ArticleList";
import getTokenData from "@/lib/utils/getTokenData";
import { TokenPayload } from "@/types";


const HomePage = async () => {
  let articles: IExtendedArticle[];
  let error: Error | null = null;
  const token = await getTokenData() as TokenPayload

  try {
    articles = await fetchArticles('/api');
  } catch (e) {
    error = e instanceof Error ? e : new Error('An unexpected error occurred');
    articles = [];
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-center items-center mb-8">
        <h1 className="text-3xl font-bold">Welcome Home</h1>
      </div>

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
    </div>
  );
};

export default memo(HomePage);