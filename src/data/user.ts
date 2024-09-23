import { db } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });
    console.log("User found:", user); // Add this line

    return user;
  } catch {
    console.error("Error fetching user by ID"); // Add error logging

    return null;
  }
};
