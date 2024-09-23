import authConfig from "./auth.config";
import NextAuth from "next-auth";
import {
  publicRoutes,
  authRoutes,
  apiAuthPrefix,
  DEFAUL_LOGIN_REDIRECT,
} from "./routes";
const { auth } = NextAuth(authConfig);


function isRoutePublic(pathname: string, publicRoutes: string[]): boolean {
  return publicRoutes.some(route => {
    const regex = new RegExp(`^${route.replace('*', '.*')}$`);
    return regex.test(pathname);
  });
}

export default auth((req) => {
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
  return undefined;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
