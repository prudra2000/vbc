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

    return user;
  } catch {
    console.error("Error fetching user by ID"); // Add error logging

    return null;
  }
};


export const getUserByIdO = async (userId: string, options = {}) => {
  return await db.user.findUnique({
    where: { id: userId },
    ...options,
  });
};
