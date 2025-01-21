import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const userCookie = req.cookies.get("m_user_data");
  const { pathname } = req.nextUrl;

  // Define routes that require authentication
  const protectedRoutes = [
    "/dashboard",
    "/profile",
    "/settings",
    "/EmailBuilder",
    "/preview",
    "/testing",
    "/Template",
  ];

  // Check if the current route is protected and the user is not authenticated
  if (
    protectedRoutes.some((route) => pathname.startsWith(route)) &&
    !userCookie
  ) {
    console.log(`Unauthorized access attempt to ${pathname}`);
    return NextResponse.redirect(new URL("/login", req.url)); // Redirect to login
  }

  return NextResponse.next(); // Allow the request to proceed
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/EmailBuilder/:path*",
    "/createCampaign/:path*",
    "/preview/:path*",
    "/testing/:path*",
    "/Template/:path*",
  ],
};
