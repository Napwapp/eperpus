import { PrismaClient, Role, Gender } from "@/lib/generated/prisma";
import { NextAuthOptions } from "next-auth";
import { loginUserSchema } from "@/validations/userSchema";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
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
      createdAt: string;
      updatedAt: string;
    };
  }

  export interface User {
    id: string;
    email: string;
    name: string;
    role: Role;    
    nomorHp: string
    alamat: string
    gender: Gender;    
    createdAt: string;
    updatedAt: string;
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
    createdAt: string;
    updatedAt: string;
  }
}

export const authOptions: NextAuthOptions = {
providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "select_account",
        },
      },
    }),
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

          const userData = {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            nomorHp: user.nomorHp || "",
            alamat: user.alamat || "",
            gender: user.gender,
            createdAt: user.createdAt.toISOString(),
            updatedAt: user.updatedAt.toISOString(),
          };
          
          console.log("Authorize returning:", userData);
          return userData;
          
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
    // Login Google
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        if (!user.email) throw new Error("No email from Google account");

        const existingUser = await prisma.users.findUnique({ where: { email: user.email } });

        if (!existingUser) {
          const newUser = await prisma.users.create({
            data: {
              name: user.name || "User",
              email: user.email,
              verified_at: new Date(),
              nomorHp: "",
              alamat: "",
              password: "",
              role: "user" as Role,
              gender: "tidak_memilih" as Gender,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          });
          
          // Update user object with proper data types
          user.id = newUser.id;
          user.createdAt = newUser.createdAt.toISOString();
          user.updatedAt = newUser.updatedAt.toISOString();
          user.role = newUser.role;
          user.nomorHp = newUser.nomorHp || "";
          user.alamat = newUser.alamat || "";
          user.gender = newUser.gender;
        } else if (!existingUser.verified_at) {
          await prisma.users.update({
            where: { email: user.email },
            data: { verified_at: new Date() },
          });
          
          // Update user object with existing user data
          user.id = existingUser.id;
          user.createdAt = existingUser.createdAt.toISOString();
          user.updatedAt = existingUser.updatedAt.toISOString();
          user.role = existingUser.role;
          user.nomorHp = existingUser.nomorHp || "";
          user.alamat = existingUser.alamat || "";
          user.gender = existingUser.gender;
        } else {
          // User already exists and is verified
          user.id = existingUser.id;
          user.createdAt = existingUser.createdAt.toISOString();
          user.updatedAt = existingUser.updatedAt.toISOString();
          user.role = existingUser.role;
          user.nomorHp = existingUser.nomorHp || "";
          user.alamat = existingUser.alamat || "";
          user.gender = existingUser.gender;
        }
      }
      return true;
    },

    // Login 
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
        token.nomorHp = user.nomorHp || "";
        token.alamat = user.alamat || "";
        token.gender = user.gender;
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
        session.user.role = token.role;
        session.user.nomorHp = token.nomorHp || "";
        session.user.alamat = token.alamat || "";
        session.user.gender = token.gender;
        session.user.createdAt = token.createdAt;
        session.user.updatedAt = token.updatedAt;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
