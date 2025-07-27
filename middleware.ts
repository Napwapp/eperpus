import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// Middleware untuk melindungi halaman user
export default withAuth(
  function middleware(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/login?unauthorized=true",
      signOut: "/",
    },
  }
);

export const config = {
  matcher: [
    "/user/:path*",
  ]
};
