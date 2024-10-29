import * as z from 'zod';

export const loginFormSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

export const registerFormSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    age: z.number({ message: "Age is required" }).min(18, { message: "You must be at least 18 years old" }),
    phone: z.string().min(10, { message: "Phone number must be at least 10 characters" }),
    preference: z.array(z.string()).min(1, { message: "You must select at least one genre" }),
    gender: z.string().min(1, { message: "You must select your gender" }),
    bio: z.string().min(10, { message: "Bio must be at least 10 characters" }),
    username: z.string().min(3, { message: "Username must be at least 3 characters" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string().min(8, { message: "Password must be at least 8 characters" }),
});