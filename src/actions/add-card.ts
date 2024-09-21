"use server"

import * as z from "zod"
import { db } from "@/lib/db"
import { CardSchema } from "@/schemas/index"
import { getUserByEmail, getUserById } from "@/data/user"



export const addCard = async (values: z.infer<typeof CardSchema>) => {
    const validatedFields = CardSchema.safeParse(values);
    if (!validatedFields.success) {
        return {
            error: "Validation failed",
        }
    }
    const { userId, title, description, image, github, linkedin, twitter, instagram, facebook, tiktok, youtube, twitch, discord, snapchat, whatsapp, telegram, reddit, pinterest } = validatedFields.data;
    const existingUser = await getUserById(userId);
    if (!existingUser) {
        return {
            error: "User not found",
        }
    }
    await db.card.create({
        data: {
            userId,
            title: validatedFields.data.title,
            description: validatedFields.data.description,
            image: validatedFields.data.image,
            github: validatedFields.data.github,
            linkedin: validatedFields.data.linkedin,
            twitter: validatedFields.data.twitter,
            instagram: validatedFields.data.instagram,
            facebook: validatedFields.data.facebook,
            tiktok: validatedFields.data.tiktok,
            youtube: validatedFields.data.youtube,
            twitch: validatedFields.data.twitch,
            discord: validatedFields.data.discord,
            snapchat: validatedFields.data.snapchat,
            whatsapp: validatedFields.data.whatsapp,
            telegram: validatedFields.data.telegram,
            reddit: validatedFields.data.reddit,
            pinterest: validatedFields.data.pinterest,
        }
    });
}