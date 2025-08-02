"use client";

import { useState } from "react";
import { Buku } from "@/lib/types/buku";
import DataBukuTable from "./DataBukuTable";
import DataBukuForm from "./DataBukuForm";

interface DataBukuTableWrapperProps {
  initialBooks: Buku[];
}

export default function DataBukuTableWrapper({ initialBooks }: DataBukuTableWrapperProps) {
  const [books, setBooks] = useState<Buku[]>(initialBooks);

  const handleBooksUpdate = (updatedBooks: Buku[]) => {
    setBooks(updatedBooks);
  };

  const handleBookAdded = (newBook: Buku) => {
    setBooks(prevBooks => [newBook, ...prevBooks]);
  };

  return (
    <>
      <DataBukuForm onBookAdded={handleBookAdded} />
      <DataBukuTable 
        books={books} 
        onBooksUpdate={handleBooksUpdate}
      />
    </>
  );
} 