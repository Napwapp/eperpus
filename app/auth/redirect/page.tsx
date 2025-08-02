"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Loading from "../../loading";

const AuthRedirectPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    // Timeout untuk handle case dimana session tidak terload
    const timeoutId = setTimeout(() => {
      if (status === "unauthenticated") {
        router.push("/login?error=session_timeout");
      }
    }, 10000); // 10 detik timeout

    if (status === "authenticated" && session?.user?.role) {
      const roleRedirectMap = {
        user: "/user/home",
        admin: "/admin/dashboard",
        superadmin: "/admin/dashboard",
      } as const;

      const redirectPath = roleRedirectMap[session.user.role] || "/user/home";
      
      // Pastikan tidak redirect ke halaman yang sama
      if (!window.location.pathname.startsWith(redirectPath)) {
        router.push(redirectPath);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [session, status, router]);

  return <Loading />;
};

export default AuthRedirectPage;
