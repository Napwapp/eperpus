import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

const handler = NextAuth(authOptions);

// Ekspor handler untuk digunakan di route.ts
export { handler as GET, handler as POST };