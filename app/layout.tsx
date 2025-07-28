import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { inter } from "./ui/fonts";
import NextAuthSession from "./NextAuthSession";
import "./globals.css";

export const metadata: Metadata = {
  icons: {
    icon: "/eperpus.svg",
  },
  title: "ePerpus",
  description: "ePerpus ini adalah aplikasi perpustakaan yang memudahkan pengguna untuk mengelola data perpustakaan, peminjaman buku,pengembalian, dll.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <NextAuthSession>
          {children}
          <Toaster position="top-right" reverseOrder={false} />
        </NextAuthSession>
      </body>
    </html>
  );
}
