import { IUser } from "@/types/entities";
import { model, models, Schema } from "mongoose";

const topicSchema = new Schema<IUser>({
    email: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true, default: "User" },
    username: { type: String, required: true },
    age: { type: Number, required: true },
    phone: { type: String, required: true },
    image: { type: String, required: true },
    preferences: { type: [String], required: true, index: true },
    gender: { type: String, required: true },
    bio: String,
    password: { type: String, required: true }
});

const User = models.User || model<IUser>("User", topicSchema);

export default User;
