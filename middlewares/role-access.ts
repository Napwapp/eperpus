import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const roleRedirectMap: Record<string, string> = {
  user: "/user/home",
  admin: "/admin/dashboard",
  superadmin: "/admin/dashboard",
};

export async function roleProtectionMiddleware(req: NextRequest, allowedRoles: string[]) {
  const token = await getToken({ req });

  if (!token || !token.role) {
    return NextResponse.redirect(new URL("/login"));
  }

  const userRole = token.role as string;

  if (!allowedRoles.includes(userRole)) {
    const redirectPath = roleRedirectMap[userRole] || "/";
    const redirectUrl = new URL(redirectPath, req.url);
    redirectUrl.searchParams.set("unauthorized", "true");
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}
