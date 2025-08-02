"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface AddBookButtonProps {
  userRole?: string;
}

export default function AddBookButton({ userRole }: AddBookButtonProps) {
  if (userRole !== "admin" && userRole !== "superadmin") {
    return null;
  }

  return (
    <Link href="/admin/data/buku">
      <Button className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700">
        <Plus className="w-6 h-6" />
        Tambah
      </Button>
    </Link>
  );
}
