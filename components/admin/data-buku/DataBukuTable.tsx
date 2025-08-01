"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Edit, Trash2, Search } from "lucide-react";
import { Buku } from "@/lib/types/buku";
import { formatDate } from "@/lib/utils/dayjs";
import BookCoverImage from "./BookCoverImage";
import SheetEditBuku from "./SheetEditBuku";
import { showAlert } from "@/components/ui/toast";

interface DataBukuTableProps {
  books?: Buku[];
  onBooksUpdate?: (updatedBooks: Buku[]) => void;
}

export default function DataBukuTable({ books = [], onBooksUpdate }: DataBukuTableProps) {  
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBooks, setFilteredBooks] = useState<Buku[]>(books);
  const [editSheetOpen, setEditSheetOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Buku | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<Buku | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
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

  // Handle Edit
  const handleEdit = (book: Buku) => {
    setSelectedBook(book);
    setEditSheetOpen(true);
  };

  // Handle Delete
  const handleDelete = (book: Buku) => {
    setBookToDelete(book);
    setDeleteDialogOpen(true);
  };

  // Handle Edit ketika success
  const handleEditSuccess = (updatedBook: Buku) => {
    // Update books array dengan data yang baru
    const updatedBooks = books.map(book => 
      book.id === updatedBook.id ? updatedBook : book
    );
    onBooksUpdate?.(updatedBooks);
    showAlert({ message: "Buku berhasil diupdate!", type: "success" });
  };

  // Handle Delete Confirm
  const handleDeleteConfirm = async () => {
    if (!bookToDelete) return;
    
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/books/${bookToDelete.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Gagal menghapus buku");
      }

      // Update books array dengan menghapus buku yang dihapus
      const updatedBooks = books.filter(book => book.id !== bookToDelete.id);
      onBooksUpdate?.(updatedBooks);
      showAlert({ message: "Buku berhasil dihapus!", type: "success" });
      setDeleteDialogOpen(false);
      setBookToDelete(null);
    } catch (error: unknown) {
      if (error instanceof Error) {
        showAlert({ message: error.message, type: "error" });
      } else {
        showAlert({ message: "Gagal menghapus buku", type: "error" });
      }
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
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
                        <BookCoverImage 
                          src={book.cover} 
                          alt={book.title}
                          className="w-12 h-16"
                        />
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
                            onClick={() => handleEdit(book)}
                            className="h-8 w-8 p-0"
                          >
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(book)}
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

      {/* Sheet Edit Buku */}
      {selectedBook && (
        <SheetEditBuku
          open={editSheetOpen}
          onOpenChange={setEditSheetOpen}
          buku={selectedBook}
          onSuccess={handleEditSuccess}
        />
      )}

      {/* Alert Dialog Hapus Buku */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Buku</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus buku &quot;{bookToDelete?.title}&quot;? 
              Tindakan ini tidak dapat dibatalkan dan akan menghapus semua data buku termasuk cover gambar.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? "Menghapus..." : "Hapus"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
} 