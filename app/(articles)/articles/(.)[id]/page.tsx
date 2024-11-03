import { memo, Suspense } from "react";
import { IExtendedArticle } from "@/types/entities";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { fetchArticleDetails } from "@/lib/fetch/fetchWithToken";
import Loader from "@/components/skeleton/Loader";
import ArticleDetail from "@/components/common/ArticleDetails";
import getTokenData from "@/lib/utils/getTokenData";
import { TokenPayload } from "@/types";
import { ArticleDetailsProps } from "@/types/props";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { AlertDialogContent, AlertDialog, AlertDialogTitle } from "@/components/ui/alert-dialog";

const ArticlePage = async ({ params }: ArticleDetailsProps) => {
  let article: IExtendedArticle | null;
  let error: Error | null = null;
  const token = await getTokenData() as TokenPayload;

  const id = (await params).id;

  try {
    article = await fetchArticleDetails(id);
  } catch (e) {
    error = e instanceof Error ? e : new Error('An unexpected error occurred');
    article = null;
  }


  return (
    <AlertDialog open>
      <ScrollArea className=",d:w-[700px] max-w-[425px]">
        <AlertDialogContent className="h-5/6  w-full">
        <AlertDialogTitle />
          {error ? (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error.message}</AlertDescription>
            </Alert>
          ) : (
            <Suspense fallback={<Loader />}>
              <ArticleDetail article={article!} userId={token?.id} />
            </Suspense>
          )}
        </AlertDialogContent>
      </ScrollArea>
    </AlertDialog>
  );
};

export default memo(ArticlePage);