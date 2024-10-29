import { Genres, IArticle, IArticleInteraction, IBlockedArticle, IUser } from "@/types";

const user: IUser = {
  _id: "user-1",
  email: "john@example.com",
  age: 35,
  phone: "+1 (555) 123-4567",
  image:"/assets/me.jpg",
  preferences: [Genres.TECHNOLOGY, Genres.SCIENCE, Genres.BUSINESS],
  gender: "male",
  bio: "Passionate software engineer and tech enthusiast.",
  username: "johndoe",
  password: "securepassword",
  createdAt: new Date("2022-01-01"),
  updatedAt: new Date("2023-04-15")
};

const articles: IArticle[] = [
  {
    _id: "article-1",
    title: "The Future of Artificial Intelligence",
    content: "In this article, we explore the latest advancements in AI and their potential impact on society...",
    author: user._id,
    genre: Genres.TECHNOLOGY,
    image: "https://example.com/ai-article-image.jpg",
    tags: ["AI", "machine learning", "technology trends"],
    createdAt: new Date("2023-03-01"),
    updatedAt: new Date("2023-03-15")
  },
  {
    _id: "article-2",
    title: "The Science Behind Climate Change",
    content: "Climate change is one of the most pressing issues facing our planet. In this article, we dive into the scientific...",
    author: user._id,
    genre: Genres.SCIENCE,
    image: "https://example.com/climate-article-image.jpg",
    tags: ["climate change", "environment", "science"],
    createdAt: new Date("2023-05-01"),
    updatedAt: new Date("2023-05-10")
  },
  {
    _id: "article-3",
    title: "Startup Financing: Navigating the Funding Landscape",
    content: "Starting a business is an exciting journey, but securing funding can be a challenge. In this article, we explore...",
    author: user._id,
    genre: Genres.BUSINESS,
    image: "https://example.com/startup-article-image.jpg",
    tags: ["startup", "entrepreneurship", "finance"],
    createdAt: new Date("2023-07-01"),
    updatedAt: new Date("2023-07-20")
  }
];

// Interactions
const likes: IArticleInteraction[] = [
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

const dislikes: IArticleInteraction[] = [
  {
    _id: "dislike-1",
    article: articles[2]._id,
    user: user._id,
    type: "dislike",
    createdAt: new Date("2023-07-10"),
    updatedAt: new Date("2023-07-10")
  }
];

const blockedArticles: IBlockedArticle[] = [
  {
    _id: "block-1",
    article: articles[2]._id,
    user: user._id,
    createdAt: new Date("2023-07-15"),
    updatedAt: new Date("2023-07-15")
  }
];

export const GENRES = [
  { id: "technology", label: "Technology" },
  { id: "science", label: "Science" },
  { id: "health", label: "Health" },
  { id: "travel", label: "Travel" },
  { id: "finance", label: "Finance" },
  { id: "lifestyle", label: "Lifestyle" },
  { id: "education", label: "Education" },
  { id: "business", label: "Business" },
  { id: "entertainment", label: "Entertainment" },
  { id: "environment", label: "Environment" },
  { id: "sports", label: "Sports" },
  { id: "history", label: "History" },
  { id: "culture", label: "Culture" },
  { id: "politics", label: "Politics" },
  { id: "philosophy", label: "Philosophy" },
  { id: "psychology", label: "Psychology" },
  { id: "art", label: "Art" },
  { id: "literature", label: "Literature" },
  { id: "food", label: "Food" },
  { id: "fashion", label: "Fashion" }
];
