import ArticleDetail from '@/components/common/ArticleDetails';
import { articles } from '@/constants/data';

export default function ArticlePage() {
  return <ArticleDetail article={articles[0]} />
}