import { memo, Suspense } from "react";
import AddArticleButton from "@/components/button/AddArticleButton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { fetchArticles } from "@/lib/fetch/fetchWithToken";
import Loader from "@/components/skeleton/Loader";
import ArticleList from "@/components/common/ArticleList";


const ArticlePage = async () => {
  const { articles, error, token } = await fetchArticles();

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
          <ArticleList articles={articles} userId={token?.id} />
        </Suspense>
      )}
    </div>
  );
};

export default memo(ArticlePage);