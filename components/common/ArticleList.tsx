import ArticleCard from "@/components/common/ArticleCard";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { memo } from "react";
import { ArticleListProps } from "@/types/props";

const ArticleList = ({ articles, userId, isHome }: ArticleListProps) => {
    if (articles.length === 0) {
        return (
            <Alert>
                <AlertTitle>No Articles</AlertTitle>
                <AlertDescription>
                    {isHome?(
                        "There is no Articles Available. Start by creating your own! Or Change your preferences."
                    ):(
                        `You haven't created any articles yet. Click the "Add Article" button to get started!`
                    )}
                    
                </AlertDescription>
            </Alert>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
                <ArticleCard key={article._id} article={article} userId={userId!} />
            ))}
        </div>
    );
};


export default memo(ArticleList);