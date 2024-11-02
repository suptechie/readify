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

export interface IUser {
    _id?: string;
    name?: string;
    email?: string;
    age?: string;
    image?: string;
    preferences?: Genres[];
    gender?: string;
    bio?: string;
    username?: string;
    password?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface IArticle {
    _id?: string;
    title?: string;
    content?: string;
    author?: IUser["_id"];
    genre?: Genres;
    image?: string;
    tags?: string[];
    createdAt?: string;
    updatedAt?: string;
}

export interface ILike {
    _id?:string
    article?:IArticle['_id'],
    user?:IUser['_id']
}

export interface IExtendedArticle extends IArticle {
    likeCount:number;
    userIds:string[];
};