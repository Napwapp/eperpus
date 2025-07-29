"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import Image from "next/image";

interface BorrowedBookProps {
  id: number;
  title: string;
  author: string;
  cover: string;
  borrowedDate: string;
  dueDate: string;
  daysLeft: number;
  onExtend?: (id: number) => void;
  onReturn?: (id: number) => void;
}

export default function BorrowedBook({
  id,
  title,
  author,
  cover,
  borrowedDate,
  dueDate,
  daysLeft,
  onExtend,
  onReturn
}: BorrowedBookProps) {
  return (
    <div className="flex flex-col lg:flex-row items-start gap-4 p-4 border rounded-lg bg-white hover:shadow-md transition-shadow w-full">
      <Image 
        src={cover} 
        alt={title} 
        width={60} 
        height={80} 
        className="rounded object-cover flex-shrink-0"
      />
      <div className="flex-1 min-w-0 w-full">
        <h3 className="font-semibold text-violet-700 truncate">{title}</h3>
        <p className="text-sm text-gray-600 truncate">{author}</p>
        <div className="flex flex-col gap-2 mt-2">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <Badge variant={daysLeft <= 7 ? "destructive" : "secondary"} className="w-fit">
              <Clock className="h-3 w-3 mr-1" />
              {daysLeft} hari lagi
            </Badge>
            <span className="text-xs text-gray-500">
              Dikembalikan: {new Date(dueDate).toLocaleDateString('id-ID')}
            </span>
          </div>
          {/* Tombol diposisikan di bawah elemen kiri untuk tablet dan mobile */}
          <div className="lg:hidden flex gap-2 w-full sm:w-auto">
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => onExtend?.(id)}
              className="flex-1 sm:flex-none"
            >
              Perpanjang
            </Button>
            <Button 
              size="sm"
              onClick={() => onReturn?.(id)}
              className="flex-1 sm:flex-none"
            >
              Kembalikan
            </Button>
          </div>
        </div>
      </div>
      {/* Tombol untuk desktop (lg ke atas) */}
      <div className="hidden lg:flex gap-2 flex-shrink-0">
        <Button 
          size="sm" 
          variant="outline"
          onClick={() => onExtend?.(id)}
        >
          Perpanjang
        </Button>
        <Button 
          size="sm"
          onClick={() => onReturn?.(id)}
        >
          Kembalikan
        </Button>
      </div>
    </div>
  );
} 