import { IArticle } from "@/types/entities";
import { Model, model, models, Schema, Types } from "mongoose";

const articleSchema = new Schema<IArticle>({
    title: { type: String, required: true },
    author: { type: Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    image: { type: String, required: true },
    genre: { type: String, required: true, index: true },
    likes: { type: Number, default: 0 },
    tags: { type: [String], },
}, {
    minimize: false, versionKey: false, timestamps: true
});

const Article = (models.Article as Model<IArticle>) || model<IArticle>("Article", articleSchema);

export default Article;