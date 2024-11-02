import { ILike } from "@/types/entities";
import { Model, model, models, Schema, Types } from "mongoose";

const likeSchema = new Schema<ILike>({
    article: {
        type: Types.ObjectId,
        ref: "Article",
        required: true,
        index: true
    },
    user: {
        type: Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    }
}, {
    versionKey: false
});

likeSchema.index({ article: 1, user: 1 }, { unique: true });

const Like = (models.Like as Model<ILike>) || model<ILike>("Like", likeSchema);

export default Like;