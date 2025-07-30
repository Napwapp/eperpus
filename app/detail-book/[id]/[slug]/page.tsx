"use client";
import { useParams } from "next/navigation";

export default function DetailBookPage() {
  const { id, slug } = useParams();

  return (
    <div>
      <h1>Detail Buku {id} {slug}</h1>
    </div>
  );
}