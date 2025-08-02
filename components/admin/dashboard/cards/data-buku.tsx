import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Loader2 } from "lucide-react"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { fetchBooks } from "@/lib/features/booksSlice"

export function DataBukuCard() {
  const dispatch = useAppDispatch()
  const { countBooks, loading, error } = useAppSelector((state) => state.books)

  useEffect(() => {
    dispatch(fetchBooks())
  }, [dispatch])

  return (
    <Card className="border-violet-200 hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">Data Buku</CardTitle>
        <BookOpen className="h-5 w-5 text-violet-600" />
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin text-violet-600" />
            <span className="text-sm text-gray-500">Memuat data...</span>
          </div>
        ) : error ? (
          <div className="text-sm text-red-500">Error: {error}</div>
        ) : (
          <>
            <div className="text-2xl font-bold text-violet-600">{countBooks.toLocaleString()}</div>
          </>
        )}
        <p className="text-xs text-gray-500 mt-1">Total buku tersedia</p>
      </CardContent>
    </Card>
  )
}
