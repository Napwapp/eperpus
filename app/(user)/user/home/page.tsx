"use client";

import {useEffect } from "react";
import { showAlert } from "@/components/ui/toast";
import { useSession } from "next-auth/react";
import Header from "@/components/user-home/Header";
import InformationCards from "@/components/user-home/InformationCards";
import BorrowedBooks from "@/components/user-home/BorrowedBooks";
import BooksRecomendations from "@/components/user-home/BooksRecomendations";

export default function HomePage() {
  const { data: session } = useSession();

  useEffect(() => {
    const successMessage = localStorage.getItem("successMessage");
    if (successMessage) {
      showAlert({ message: successMessage, type: "success" });
      localStorage.removeItem("successMessage");
    }
  }, []);

  return (
    <div className="bg-gray-50 w-full overflow-hidden">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <div className="space-y-4 sm:space-y-6 w-full">
        {/* Welcome */}
        <div className="bg-gradient-to-r from-violet-600 to-violet-800 text-white p-4 sm:p-6 rounded-lg">
          <h1 className="text-xl sm:text-2xl font-bold mb-2">Selamat datang, {session?.user?.name}! 👋</h1>
          <p className="text-violet-100 text-sm sm:text-base">Apa yang ingin Anda baca hari ini?</p>
        </div>

        {/* Information Cards */}
        <InformationCards />

        {/* Borrowed Books*/}
        <BorrowedBooks />

        {/* Books Recommendations */}
        <BooksRecomendations />
      </div>
    </div>
  );
}
