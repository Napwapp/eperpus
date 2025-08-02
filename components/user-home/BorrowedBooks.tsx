"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import BorrowedBook from "./BorrowedBook";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { useEffect, useMemo } from "react";
import { fetchPinjamanUser } from "@/lib/features/pinjamanSlice";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { BorrowedBooksSkeleton } from "./BorrowedBooksSkeleton";

export default function BorrowedBooks() {
  const { data: session } = useSession()
  const dispatch = useAppDispatch()
  const { pinjaman, loading, error } = useAppSelector((state) => state.pinjaman)

  useEffect(() => {
    if (session) dispatch(fetchPinjamanUser())
  }, [dispatch, session])

  // Filter pinjaman aktif
  const borrowedBooksData = useMemo(
    () =>
      pinjaman
        .filter((p) => p.status === "aktif" && p.buku)
        .map((p) => ({
          id: p.id,
          title: p.buku?.title ?? "",
          author: p.buku?.author ?? "",
          cover: p.buku?.cover ?? "/file.svg",
          borrowedDate: p.tanggal_dipinjam ? new Date(p.tanggal_dipinjam).toISOString().slice(0, 10) : "",
          dueDate: p.tanggal_dikembalikan ? new Date(p.tanggal_dikembalikan).toISOString().slice(0, 10) : "",
          daysLeft:
            p.tanggal_dikembalikan && p.tanggal_dipinjam
              ? Math.max(
                  0,
                  Math.ceil(
                    (new Date(p.tanggal_dikembalikan).getTime() - new Date(p.tanggal_dipinjam).getTime()) /
                      (1000 * 60 * 60 * 24),
                  ),
                )
              : 0,
        })),
    [pinjaman],
  )

  // Loading Skeleton
  if (loading) {
    return <BorrowedBooksSkeleton />
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Pinjaman Aktif
        </CardTitle>
        <CardDescription>Kelola buku yang sedang Anda pinjam</CardDescription>
      </CardHeader>
      <CardContent>
        {error ? (
          <div className="text-center text-red-500 py-8">{error}</div>
        ) : borrowedBooksData.length > 0 ? (
          <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
            {borrowedBooksData.map((book) => (
              <BorrowedBook key={book.id} {...book} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>Belum ada pinjaman yang aktif</p>
            <Link href="/user/books">
              <Button className="mt-4">Pinjam Buku</Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
