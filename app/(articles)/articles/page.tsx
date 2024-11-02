import { memo, Suspense } from "react";
import AddArticleButton from "@/components/button/AddArticleButton";
import { IExtendedArticle } from "@/types/entities";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { fetchArticles } from "@/lib/fetch/fetchWithToken";
import Loader from "@/components/skeleton/Loader";
import ArticleList from "@/components/common/ArticleList";
import getTokenData from "@/lib/utils/getTokenData";
import { TokenPayload } from "@/types";


const ArticlePage = async () => {
  let articles: IExtendedArticle[];
  let error: Error | null = null;
  const token = await getTokenData() as TokenPayload

  try {
    articles = await fetchArticles();
  } catch (e) {
    error = e instanceof Error ? e : new Error('An unexpected error occurred');
    articles = [];
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Articles</h1>
        <AddArticleButton />
      </div>

      {error ? (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      ) : (
        <Suspense fallback={<Loader />}>
          <ArticleList articles={articles} token={token?.id} />
        </Suspense>
      )}
    </div>
  );
};

export default memo(ArticlePage);