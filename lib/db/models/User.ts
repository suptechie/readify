import { IUser } from "@/types/entities";
import { Model, model, models, Schema } from "mongoose";

const topicSchema = new Schema<IUser>({
    email: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    age: { type: String, required: true },
    image: { type: String, required: true },
    preferences: { type: [String], required: true, index: true },
    gender: { type: String, required: true },
    bio: String,
    password: { type: String, required: true }
});

const User = (models.User as Model<IUser>) || model<IUser>("User", topicSchema);

export default User;