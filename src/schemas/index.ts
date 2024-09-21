import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  name: z.string().min(1, { message: "Name is required" }),
});

export const ResetSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
});

export const NewPasswordSchema = z.object({
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const CardSchema = z.object({
  userId: z.string().min(1, { message: "User ID is required" }),
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  image: z.string().min(1, { message: "Image is required" }),
  github: z.string().min(1, { message: "Github is required" }),
  linkedin: z.string().min(1, { message: "Linkedin is required" }),
  twitter: z.string().min(1, { message: "Twitter is required" }),
  instagram: z.string().min(1, { message: "Instagram is required" }),
  facebook: z.string().min(1, { message: "Facebook is required" }),
  tiktok: z.string().min(1, { message: "Tiktok is required" }),
  youtube: z.string().min(1, { message: "Youtube is required" }),
  twitch: z.string().min(1, { message: "Twitch is required" }),
  discord: z.string().min(1, { message: "Discord is required" }),
  snapchat: z.string().min(1, { message: "Snapchat is required" }),
  whatsapp: z.string().min(1, { message: "Whatsapp is required" }),
  telegram: z.string().min(1, { message: "Telegram is required" }),
  reddit: z.string().min(1, { message: "Reddit is required" }),
  pinterest: z.string().min(1, { message: "Pinterest is required" }),
});
