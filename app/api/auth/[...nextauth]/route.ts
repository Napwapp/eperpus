import { PrismaClient, Role, Gender } from "@/lib/generated/prisma";
import { NextAuthOptions } from "next-auth";
import { loginUserSchema } from "@/validations/userSchema";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

// Extend NextAuth types
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: Role;      
      nomorHp: string
      alamat: string
      gender: Gender;      
      createdAt: Date;
      updatedAt: Date;
    };
  }

  interface User {
    id: string;
    email: string;
    name: string;
    role: Role;    
    nomorHp: string
    alamat: string
    gender: Gender;    
    createdAt: Date;
    updatedAt: Date;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    name: string;
    role: Role;    
    nomorHp: string
    alamat: string
    gender: Gender;    
    createdAt: Date;
    updatedAt: Date;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const { email, password } = loginUserSchema.parse(credentials);
          const user = await prisma.users.findUnique({ where: { email } });

          if (!user) throw new Error("Tidak dapat menemukan akun");
          if (!user.verified_at) throw new Error("Akun belum terverifikasi");
          if (!user.password) throw new Error("Password tidak ditemukan");
          const valid = await bcrypt.compare(password, user.password);
          if (!valid) throw new Error("Password tidak valid");

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role as Role,
            nomorHp: user.nomorHp || "",
            alamat: user.alamat || "",
            gender: user.gender as Gender,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
          };
          
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(error.message);
          }
          throw new Error("Terjadi kesalahan saat login");
        }
      },
    }),
  ],

  session: { strategy: "jwt" },
  pages: { 
    signIn: "/login",
    signOut: "/"
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role as Role;
        token.nomorHp = user.nomorHp || "";
        token.alamat = user.alamat || "";
        token.gender = user.gender as Gender;
        token.createdAt = user.createdAt;
        token.updatedAt = user.updatedAt;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.role = token.role as Role;
        session.user.nomorHp = token.nomorHp || "";
        session.user.alamat = token.alamat || "";
        session.user.gender = token.gender as Gender;
        session.user.createdAt = token.createdAt;
        session.user.updatedAt = token.updatedAt;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
