import NextAuth from "next-auth";
import {PrismaAdapter} from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import {db} from "@/lib/db";
import { getUserById } from "@/data/user";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-conformation";

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount(user) {
      await db.user.update({
        where: {
          id: user.user.id,
        },
        data: {
          emailVerified: new Date(),
        },
      })
    }
  },
  callbacks: {
    async signIn({user, account}) {
      if(account?.provider !== "credentials") {
        return true
      }
      if (!user.id) {
        return false;
      }
      const existingUser = await getUserById(user.id)
      if(!existingUser?.emailVerified) {
        return false
      }
      if(existingUser?.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)
        if(!twoFactorConfirmation) {
          return false
        }
        await db.twoFactorConfirmation.delete({
          where: {
            id: twoFactorConfirmation.id,
          },
        });
      }
      return true
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }
      return session;
    },
    async jwt({ token }) {
      return token;
    },
  },
  
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
