"use client";

import { Badge } from "@/components/ui/badge";
import { Kategori } from "@/lib/types/buku";

interface CategoriesProps {
  categories: Kategori[] | string;
}

export default function Categories({ categories }: CategoriesProps) {
  // Split menjadi array
  const categoryList: Kategori[] = Array.isArray(categories) 
    ? categories 
    : typeof categories === 'string' 
      ? categories.split(',').map((cat: string) => ({ 
          id: Math.random(), 
          kategori: cat.trim(), 
          books_id: 0, 
          createdAt: '', 
          updatedAt: '' 
        }))
      : [];

  return (
    <div className="flex flex-wrap gap-2">
      {categoryList.map((category: Kategori, index: number) => (
        <Badge 
          key={category.id || index} 
          variant="secondary"
          className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors"
        >
          {category.kategori}
        </Badge>
      ))}
    </div>
  );
}
