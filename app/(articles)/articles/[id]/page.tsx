import { memo, Suspense } from "react";
import { IExtendedArticle } from "@/types/entities";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { fetchArticleDetails } from "@/lib/fetch/fetchWithToken";
import Loader from "@/components/skeleton/Loader";
import ArticleDetail from "@/components/common/ArticleDetails";

type Props = {
  params: Promise<{
    id: string;
  }>;
};
const ArticlePage = async ({ params }: Props) => {
  let article: IExtendedArticle | null;
  let error: Error | null = null;

  const id = (await params).id  
  
  try {
    article = await fetchArticleDetails(id);
  } catch (e) {
    error = e instanceof Error ? e : new Error('An unexpected error occurred');
    article = null;
  }

  
  return (
    <div className="container mx-auto px-4">
      {error ? (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      ) : (
        <Suspense fallback={<Loader />}>
          <ArticleDetail article={article!} />
        </Suspense>
      )}
    </div>
  );
};

export default memo(ArticlePage);