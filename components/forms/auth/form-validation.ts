import * as z from 'zod';

export const loginFormSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export const registerFormSchema = z.object({
    name: z.string({ message: "Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    age: z.string({ message: "Age is required" }),
    preference: z.array(z.string()).min(1, { message: "You must select at least one genre" }),
    gender: z.string().min(1, { message: "You must select your gender" }),
    username: z
        .string()
        .min(3, { message: "Username must be at least 3 characters" })
        .regex(/^[a-zA-Z0-9_]+$/, { message: "Username can only contain letters, numbers, and underscores" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string().min(6, { message: "Password must be at least 6 characters" }),
    image: z.string({ message: "You should select one avatar" }),
    bio: z.string(),
});

export const profileSchema = z.object({
    name: z.string({ message: "Name is required" }).min(3, { message: "Name must the more than 3 letters" }),
    age: z.string({ message: "Age is required" }),
    gender: z.string().min(1, { message: "You must select your gender" }),
    bio: z.string(),
});

export const addArticleFormSchema = z.object({
    title: z.string().min(1, "Title is required"),
    content: z.string().min(1, "Content is required"),
    genre: z.string().min(1, "Genre is required"),
    tags: z.string({ message: "At least one tag is required" }),
    image: z.string({ message: "Image is required" }),
});
