export interface IUser {
    _id?: string;
    email: string;
    age?: number;
    phone?: string;
    preferences: Genres[];
    gender?: string;
    bio?: string;
    username: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IArticle {
    _id?: string;
    title: string;
    content: string;
    author: IUser["_id"];
    genre: Genres;
    image?: string;
    tags?: string[];
    createdAt: Date;
    updatedAt: Date;
}

export interface IArticleInteraction {
    _id?: string;
    article: IArticle["_id"];
    user: IUser["_id"];
    type: "like" | "dislike";
    createdAt: Date;
    updatedAt: Date;
}

export interface IBlockedArticle {
    _id?: string;
    article: IArticle["_id"];
    user: IUser["_id"];
    createdAt: Date;
    updatedAt: Date;
}

export enum Genres {
    TECHNOLOGY = "technology",
    SCIENCE = "science",
    HEALTH = "health",
    TRAVEL = "travel",
    FINANCE = "finance",
    LIFESTYLE = "lifestyle",
    EDUCATION = "education",
    BUSINESS = "business",
    ENTERTAINMENT = "entertainment",
    ENVIRONMENT = "environment",
    SPORTS = "sports",
    HISTORY = "history",
    CULTURE = "culture",
    POLITICS = "politics",
    PHILOSOPHY = "philosophy",
    PSYCHOLOGY = "psychology",
    ART = "art",
    LITERATURE = "literature",
    FOOD = "food",
    FASHION = "fashion"
}