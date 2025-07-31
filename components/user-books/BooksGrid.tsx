import { Suspense } from "react";
import BooksGridAsync from "./BooksGridAsync";
import BooksGridSkeleton from "../skeletons/BooksGridSkeleton";

export default function BooksGrid() {
  return (
    <Suspense fallback={<BooksGridSkeleton />}>
      <BooksGridAsync />
    </Suspense>
  );
}
