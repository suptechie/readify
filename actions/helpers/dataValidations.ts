import { z } from "zod";
import { IUser } from "@/types/entities";

const userSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email format"),
    age: z.string().min(1, "Age is required"),
    image: z.string().min(1, "Image is required"),
    preferences: z.array(z.string()).nonempty("At least one preference is required"),
    gender: z.string().min(1, "Gender is required"),
    username: z.string().min(1, "Username is required"),
    password: z.string().min(6, "Password must be at least 6 characters long"), 
});

export const validateUserData = (userData: IUser): boolean => {
    try {
        userSchema.parse(userData); 
        return true;
    } catch (error) {
        if (error instanceof z.ZodError) {
            throw new Error(error.errors.map(e => e.message).join(", ")); 
        }
        throw error;
    }
};
