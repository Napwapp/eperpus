import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";
import { roleProtectionMiddleware } from "./middlewares/role-access";

// Middleware untuk melindungi halaman user
export default withAuth(
  async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    if (pathname.startsWith("/admin")) {
      return roleProtectionMiddleware(req, ["admin", "superadmin"]);
    }

    if (pathname.startsWith("/user")) {
      return roleProtectionMiddleware(req, ["user", "admin", "superadmin"]);
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: [
    "/user/:path*",
    "/admin/:path*",
  ],
};
