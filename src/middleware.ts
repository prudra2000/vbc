import authConfig from "./auth.config";
import NextAuth from "next-auth";
import {
  publicRoutes,
  authRoutes,
  apiAuthPrefix,
  DEFAUL_LOGIN_REDIRECT,
} from "./routes";
import { auth } from "@/auth";
import { getCardByUserID, isCardOwner } from "./data/card";

function isRoutePublic(pathname: string, publicRoutes: string[]): boolean {
  return publicRoutes.some((route) => {
    const regex = new RegExp(`^${route.replace("*", ".*")}$`);
    return regex.test(pathname);
  });
}

export default auth(async (req) => {
  const { nextUrl } = req;
  const isLogin = !!req.auth;
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = isRoutePublic(nextUrl.pathname, publicRoutes);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return undefined;
  }
  if (isAuthRoute) {
    if (isLogin) {
      return Response.redirect(new URL(DEFAUL_LOGIN_REDIRECT, nextUrl));
    }
    return undefined;
  }
  if (!isLogin && !isPublicRoute) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }
  const session = await auth();
  const userId = session?.user?.id;

  const editorMatch = nextUrl.pathname.match(/^\/editor\/(\w+)$/);

  if (editorMatch) {
    const cardId = editorMatch[1];

    if (!userId) {
      return Response.redirect(new URL("/auth/login", nextUrl));
    }
    try {
      const userId = session?.user?.id;
      if (!userId) {
        throw new Error("User ID is undefined");
      }
      const owner = isCardOwner(userId, cardId);

      if (!owner) {
        return Response.redirect(new URL(`/card/${cardId}`, nextUrl));
      }

      if (nextUrl.pathname !== `/editor/${cardId}`) {
        return Response.redirect(new URL(`/editor/${cardId}`, nextUrl));
      }
    } catch (error) {
      console.error("Error checking card ownership:", error);
      return Response.redirect(new URL(`/card/${cardId}`, nextUrl));
    }
  }
  return undefined;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
