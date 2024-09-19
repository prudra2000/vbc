"use server"
import * as z from "zod"
import { db } from "@/lib/db"
import bcrypt from "bcryptjs";
import { NewPasswordSchema } from "@/schemas"
import { getPasswordResetByToken } from "@/data/password-reset-token"
import { getUserByEmail } from "@/data/user"

export const newPassword = async (values: z.infer<typeof NewPasswordSchema>, token: string | null) => {
    if (!token) {
        return { error: "Missing token" }
    }
    const validatedFields = NewPasswordSchema.safeParse(values)
    if (!validatedFields.success) {
        return { error: validatedFields.error.errors[0].message }
    }
    const { password } = validatedFields.data
    const existingToken = await getPasswordResetByToken(token)
    if (!existingToken) {
        return { error: "Invalid token" }
    }

    const hasExpired = new Date(existingToken.expires) < new Date();
    if (hasExpired) {
        return { error: "Token expired" }
    }

    const existingUser = await getUserByEmail(existingToken.email)
    if (!existingUser) {
        return { error: "User not found" }
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    await db.user.update({
        where: {
            id: existingUser.id
        },
        data: {
            password: hashedPassword
        }
    })
    await db.passwordResetToken.delete({
        where: {
            id: existingToken.id
        }
    })
    return { success: "Password updated" }
}