"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import BorrowedBook from "./BorrowedBook";

// Dummy data untuk buku yang dipinjam
const borrowedBooksData = [
  {
    id: 1,
    title: "Atomic Habits",
    author: "James Clear",
    cover: "/file.svg",
    borrowedDate: "2024-01-15",
    dueDate: "2024-02-15",
    daysLeft: 5
  },
  {
    id: 2,
    title: "Laskar Pelangi",
    author: "Andrea Hirata",
    cover: "/file.svg",
    borrowedDate: "2024-01-20",
    dueDate: "2024-02-20",
    daysLeft: 10
  },
  {
    id: 3,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    cover: "/file.svg",
    borrowedDate: "2024-01-25",
    dueDate: "2024-02-25",
    daysLeft: 15
  },
  {
    id: 4,
    title: "Filosofi Teras",
    author: "Henry Manampiring",
    cover: "/file.svg",
    borrowedDate: "2024-01-30",
    dueDate: "2024-03-01",
    daysLeft: 20
  },
  {
    id: 5,
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    cover: "/file.svg",
    borrowedDate: "2024-02-01",
    dueDate: "2024-03-03",
    daysLeft: 22
  }
];

export default function BorrowedBooks() {
  const handleExtend = (id: number) => {
    // TODO: Implement extend functionality
    console.log(`Extend book with id: ${id}`);
  };

  const handleReturn = (id: number) => {
    // TODO: Implement return functionality
    console.log(`Return book with id: ${id}`);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Buku yang Sedang Dipinjam
        </CardTitle>
        <CardDescription>
          Kelola buku yang sedang Anda pinjam
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {borrowedBooksData.length > 0 ? (
          <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
            {borrowedBooksData.map((book) => (
              <BorrowedBook
                key={book.id}
                {...book}
                onExtend={handleExtend}
                onReturn={handleReturn}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>Belum ada buku yang dipinjam</p>
            <Button className="mt-4">Pinjam Buku Pertama</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}