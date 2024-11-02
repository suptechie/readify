import ArticleCard from "@/components/common/ArticleCard";
import { IArticle } from "@/types/entities";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { memo } from "react";


const ArticleList = ({ articles }: { articles: IArticle[]; }) => {
    if (articles.length === 0) {
        return (
            <Alert>
                <AlertTitle>No Articles</AlertTitle>
                <AlertDescription>
                    You haven&apos;t created any articles yet. Click the &quot;Add Article&quot; button to get started!
                </AlertDescription>
            </Alert>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
                <ArticleCard key={article._id} article={article} />
            ))}
        </div>
    );
};


export default memo(ArticleList);