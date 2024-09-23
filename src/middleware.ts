import authConfig from "./auth.config";
import NextAuth from "next-auth";
import {
  publicRoutes,
  authRoutes,
  apiAuthPrefix,
  DEFAUL_LOGIN_REDIRECT,
} from "./routes";
import { auth } from "@/auth";
import {isCardOwner} from "./data/card"


function isRoutePublic(pathname: string, publicRoutes: string[]): boolean {
  return publicRoutes.some(route => {
    const regex = new RegExp(`^${route.replace('*', '.*')}$`);
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

    // Redirect to login if user is not authenticated
    if (!userId) {
      return Response.redirect(new URL("/auth/login", nextUrl));
    }

    // Check if the current user owns the card
    const isOwner = await isCardOwner(userId, cardId);
    
    // Redirect to the card view if the user is not the owner
    if (!isOwner) {
      return Response.redirect(new URL(`/card/${cardId}`, nextUrl));
    }

    // Ensure no redirect loop by checking if already on the correct page
    if (nextUrl.pathname !== `/editor/${cardId}`) {
      return Response.redirect(new URL(`/editor/${cardId}`, nextUrl));
    }
  }
  return undefined;
});



export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
