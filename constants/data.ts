import { Genres, IArticle, IArticleInteraction, IBlockedArticle, IUser } from "@/types/entities";

export const user: IUser = {
  _id: "user-1",
  email: "john@example.com",
  age: '35',
  image:"/assets/me.jpg",
  preferences: [Genres.TECHNOLOGY, Genres.SCIENCE, Genres.BUSINESS],
  gender: "male",
  bio: "Passionate software engineer and tech enthusiast.",
  username: "johndoe",
  password: "securepassword",
  createdAt: new Date("2022-01-01"),
  updatedAt: new Date("2023-04-15")
};

export const articles: IArticle[] = [
  {
    _id: "article-1",
    title: "The Future of Artificial Intelligence",
    content: "In this article, we explore the latest advancements in AI and their potential impact on society...",
    author: user._id,
    genre: Genres.TECHNOLOGY,
    tags: ["AI", "machine learning", "technology trends"],
    createdAt: new Date("2023-03-01"),
    updatedAt: new Date("2023-03-15"),
    image:"/assets/laptop.jpg"
  },
  {
    _id: "article-2",
    title: "The Science Behind Climate Change",
    content: "Climate change is one of the most pressing issues facing our planet. In this article, we dive into the scientific...",
    author: user._id,
    genre: Genres.SCIENCE,
    tags: ["climate change", "environment", "science"],
    createdAt: new Date("2023-05-01"),
    updatedAt: new Date("2023-05-10"),
    image:"/assets/laptop.jpg"
  },
  {
    _id: "article-3",
    title: "Startup Financing: Navigating the Funding Landscape",
    content: "Starting a business is an exciting journey, but securing funding can be a challenge. In this article, we explore...",
    author: user._id,
    genre: Genres.BUSINESS,
    tags: ["startup", "entrepreneurship", "finance"],
    createdAt: new Date("2023-07-01"),
    updatedAt: new Date("2023-07-20"),
    image:"/assets/laptop.jpg"
  }
];

export const likes: IArticleInteraction[] = [
  {
    _id: "like-1",
    article: articles[0]._id,
    user: user._id,
    type: "like",
    createdAt: new Date("2023-03-05"),
    updatedAt: new Date("2023-03-05")
  },
  {
    _id: "like-2",
    article: articles[1]._id,
    user: user._id,
    type: "like",
    createdAt: new Date("2023-05-05"),
    updatedAt: new Date("2023-05-05")
  }
];

export const dislikes: IArticleInteraction[] = [
  {
    _id: "dislike-1",
    article: articles[2]._id,
    user: user._id,
    type: "dislike",
    createdAt: new Date("2023-07-10"),
    updatedAt: new Date("2023-07-10")
  }
];

export const blockedArticles: IBlockedArticle[] = [
  {
    _id: "block-1",
    article: articles[2]._id,
    user: user._id,
    createdAt: new Date("2023-07-15"),
    updatedAt: new Date("2023-07-15")
  }
];