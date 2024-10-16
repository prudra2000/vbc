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
  .min(8, {message: "Password must be at least 6 characters"})
  .regex(new RegExp('.*[A-Z].*'), {message: "Must contain at least 1 uppercase letter"})
  .regex(new RegExp('.*[a-z].*'), {message: "Must contain at least 1 lowercase letter"})
  .regex(new RegExp('.*[0-9].*'), {message: "Must contain at least 1 number"})
  .regex(new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'), {message: "Must contain at least 1 special character"}),
  name: z.string().min(1, { message: "Name is required" }),
});

export const ResetSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
});

export const NewPasswordSchema = z.object({
  password: z
  .string()
  .min(8, {message: "Password must be at least 6 characters"})
  .regex(new RegExp('.*[A-Z].*'), {message: "Must contain at least 1 uppercase letter"})
  .regex(new RegExp('.*[a-z].*'), {message: "Must contain at least 1 lowercase letter"})
  .regex(new RegExp('.*[0-9].*'), {message: "Must contain at least 1 number"})
  .regex(new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'), {message: "Must contain at least 1 special character"}),
});
export const CardSchema = z.object({
  userId: z.string().min(1),
  title: z.string(),
  style: z.string().optional(),
  description: z.string().optional(),
  image: z.string().optional(),
  github: z.string().optional(),
  linkedin: z.string().optional(),
  twitter: z.string().optional(),
  instagram: z.string().optional(),
  facebook: z.string().optional(),
  tiktok: z.string().optional(),
  youtube: z.string().optional(),
  twitch: z.string().optional(),
  discord: z.string().optional(),
  snapchat: z.string().optional(),
  whatsapp: z.string().optional(),
  telegram: z.string().optional(),
  reddit: z.string().optional(),
  pinterest: z.string().optional(),
});

export const UpdateCardSchema = z.object({
  userId: z.string().min(1),
  cardTitle: z.string(),
  cardStyle: z.string().optional(), // Make this optional if it can be null
  isPublished: z.boolean().optional(),
  name: z.string().optional(),
  image: z.string().optional(),
  tagline: z.string().optional(),
  company: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  location: z.string().optional(),
  website: z.string().optional(),
  socialMedia: z.object({
      linkedin: z.string().optional(),
      twitter: z.string().optional(),
      github: z.string().optional(),
      instagram: z.string().optional(),
      facebook: z.string().optional(),
      tiktok: z.string().optional(),
      youtube: z.string().optional(),
      twitch: z.string().optional(),
      discord: z.string().optional(),
      snapchat: z.string().optional(),
      whatsapp: z.string().optional(),
      telegram: z.string().optional(),
      reddit: z.string().optional(),
      pinterest: z.string().optional(),
    })
    .optional(),
});

export const EditorSchema = z.object({
  userId: z.string().min(1),
  cardTitle: z.string(),
  cardStyle: z.string().optional(),
  isPublished: z.boolean().optional(),
  name: z.string().optional(),
  image: z.string().optional(),
  tagline: z.string().optional(),
  company: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  location: z.string().optional(),
  website: z.string().optional(),
  socialMedia: z.object({
      linkedin: z.string().optional(),
      github: z.string().optional(),
      twitter: z.string().optional(),
      instagram: z.string().optional(),
      facebook: z.string().optional(),
      tiktok: z.string().optional(),
      youtube: z.string().optional(),
      twitch: z.string().optional(),
      discord: z.string().optional(),
      snapchat: z.string().optional(),
      whatsapp: z.string().optional(),
      telegram: z.string().optional(),
      reddit: z.string().optional(),
      pinterest: z.string().optional(),
    })
    .optional(),
});

export const PersonalCardSchema = z.object({
  userId: z.string().min(1),
  cardTitle: z.string(),
  cardStyle: z.string().optional(), // Make this optional if it can be null
  isPublished: z.boolean().optional(),
  
  name: z.string().optional(),
  image: z.string().optional(),
  tagline: z.string().optional(),
  company: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  location: z.string().optional(),
  website: z.string().optional(),
  socialMedia: z.object({
      linkedin: z.string().optional(),
      github: z.string().optional(),
      twitter: z.string().optional(),
      instagram: z.string().optional(),
      facebook: z.string().optional(),
      tiktok: z.string().optional(),
      youtube: z.string().optional(),
      twitch: z.string().optional(),
      discord: z.string().optional(),
      snapchat: z.string().optional(),
      whatsapp: z.string().optional(),
      telegram: z.string().optional(),
      reddit: z.string().optional(),
      pinterest: z.string().optional(),
    })
    .optional(),
});


export const DigimedCardSchema = z.object({
  userId: z.string().min(1),
  cardTitle: z.string(),
  cardStyle: z.string().optional(),
  isPublished: z.boolean().optional(),
  cardData: z.object({
    name: z.string().optional(),
    image: z.string().optional(),
    tagline: z.string().optional(),
    company: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    location: z.string().optional(),
    website: z.string().optional(),
    socialMedia: z.object({
      linkedin: z.string().optional(),
      github: z.string().optional(),
      twitter: z.string().optional(),
      instagram: z.string().optional(),
      facebook: z.string().optional(),
      tiktok: z.string().optional(),
      youtube: z.string().optional(),
      twitch: z.string().optional(),
      discord: z.string().optional(),
    })
    .optional(),
  }),
});