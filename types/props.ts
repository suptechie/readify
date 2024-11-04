import { IExtendedArticle } from "./entities";

export type RootLayoutProps = Readonly<{
    children: React.ReactNode;
}>;

export interface ImageUploadProps {
    onChange: (value: string) => void;
    value: string;
    folder: string;
}

export type ArticleDetailsProps = {
    params: Promise<{ id: string; }>;
};

export type ArticleListProps = {
    articles: IExtendedArticle[];
    userId?: string;
    isHome?: boolean;
};

export type ArticleCardProps = {
    article: IExtendedArticle;
    userId: string;
};

export type LikeButtonProps = {
    id: string;
    likesCount: number;
    userIds: string[];
    userId: string;
};

export type HomePageProps = {
    searchParams: Promise<{ page?: string; }>;
};

export type PaginatedListProps = {
    articles: IExtendedArticle[];
    userId: string;
    page: number;
    totalPages: number;
};