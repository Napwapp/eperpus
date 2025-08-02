import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen } from "lucide-react";

export function BorrowedBooksSkeleton() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Buku yang Sedang Dipinjam
        </CardTitle>
        <CardDescription>Kelola buku yang sedang Anda pinjam</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <BorrowedBookItemSkeleton key={index} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function BorrowedBookItemSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row items-start gap-4 p-4 border rounded-lg bg-white">
      <Skeleton className="rounded flex-shrink-0 w-[60px] h-[80px]" />

      <div className="flex-1 min-w-0 w-full space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />        
        <div className="flex flex-col gap-2 mt-2">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </div>
    </div>
  );
}
