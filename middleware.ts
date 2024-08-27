import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const protectedPaths = ["/dashboard/upload"];

  // Get the token to check if the user is authenticated
  const token = await getToken({
    req,
    secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
  });

  // Check if the requested path is in the list of protected paths
  const pathIsProtected = protectedPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path),
  );

  if (pathIsProtected && !token) {
    // If the path is protected and there is no token, redirect to sign-in page
    const signInUrl = new URL("/signin", req.url);
    return NextResponse.redirect(signInUrl);
  }

  // If the path is not protected or the user is authenticated, continue with the request
  return NextResponse.next();
}

// Define the matcher pattern to apply middleware to specific routes
export const config = {
  matcher: ["/dashboard/:path*"],
};
