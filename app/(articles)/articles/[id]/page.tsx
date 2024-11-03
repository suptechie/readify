import { memo } from "react";
import { fetchArticleDetails } from "@/lib/fetch/fetchWithToken";
import ArticleDetail from "@/components/common/ArticleDetails";
import { articles } from "@/constants/data";

type ArticlePageProps = Promise<{
  id: string;
}>;

const ArticlePage = async ({ params }: { params: ArticlePageProps; }) => {
  const id = (await params).id;

  const article = await fetchArticleDetails(`${id}`);
  

  return (
    <div className="container mx-auto px-4">
      <ArticleDetail article={articles[0]!} />
    </div>
  );
};

export default memo(ArticlePage);
