"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Search } from "lucide-react";
import { Buku } from "@/lib/types/buku";
import { formatDate } from "@/lib/utils/dayjs";
import Image from "next/image";

interface DataBukuTableProps {
  books?: Buku[];
}

export default function DataBukuTable({ books = [] }: DataBukuTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBooks, setFilteredBooks] = useState<Buku[]>(books);
  const itemsPerPage = 10;

  // Filter books based on search term
  useEffect(() => {
    const filtered = books.filter(book =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.publisher?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.lokasi.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBooks(filtered);
    setCurrentPage(1); // Reset to first page when searching
  }, [books, searchTerm]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBooks = filteredBooks.slice(startIndex, endIndex);

  const handleEdit = (bookId: number) => {
    // TODO: Implement edit functionality
    console.log("Edit book:", bookId);
  };

  const handleDelete = (bookId: number) => {
    // TODO: Implement delete functionality
    console.log("Delete book:", bookId);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Daftar Buku</CardTitle>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Cari buku..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">ID</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Cover</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Judul</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Penulis</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Penerbit</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Tanggal Rilis</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Lokasi</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Stok</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Kategori</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {currentBooks.length === 0 ? (
                <tr>
                  <td colSpan={10} className="text-center py-8 text-gray-500">
                    {searchTerm ? "Tidak ada buku yang ditemukan" : "Tidak ada data buku"}
                  </td>
                </tr>
              ) : (
                currentBooks.map((book) => (
                  <tr key={book.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-600">#{book.id}</td>
                    <td className="py-3 px-4">
                      {book.cover ? (
                        <Image
                          src={book.cover}
                          alt={book.title}
                          width={40}
                          height={40}
                          className="w-12 h-16 object-cover rounded border"
                        />
                      ) : (
                        <div className="w-12 h-16 bg-gray-200 rounded border flex items-center justify-center">
                          <span className="text-xs text-gray-500">No Cover</span>
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="max-w-xs">
                        <div className="font-medium text-gray-900 truncate">{book.title}</div>
                        <div className="text-xs text-gray-500 line-clamp-2">{book.sinopsis}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-700">{book.author}</td>
                    <td className="py-3 px-4 text-gray-600">{book.publisher || "-"}</td>
                    <td className="py-3 px-4 text-gray-600">
                      {book.release_date ? formatDate(book.release_date) : "-"}
                    </td>
                    <td className="py-3 px-4 text-gray-600">{book.lokasi}</td>
                    <td className="py-3 px-4">
                      <Badge variant={book.stok > 0 ? "default" : "destructive"}>
                        {book.stok}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        {book.categories.slice(0, 2).map((category, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {category.kategori}
                          </Badge>
                        ))}
                        {book.categories.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{book.categories.length - 2}
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(book.id)}
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(book.id)}
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-600">
              Menampilkan {startIndex + 1}-{Math.min(endIndex, filteredBooks.length)} dari {filteredBooks.length} buku
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Sebelumnya
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className="w-8 h-8 p-0"
                  >
                    {page}
                  </Button>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Selanjutnya
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 