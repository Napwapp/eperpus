import { Badge } from "@/components/ui/badge";
import { Book, Calendar, Star } from "lucide-react";
import { Kategori } from "@/lib/types/buku";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/utils/dayjs";

interface BookCardProps {
  id: number;
  title: string;
  author: string;
  cover?: string | null;
  categories: Kategori[];
  release_date?: string | null;
}

export default function BookCard({
  id,
  title,
  author,
  cover,
  categories,
  release_date,
}: BookCardProps) {
  return (
    <Link 
      className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
      href={`/detail-book/${id}/${title}`}
    >
      {/* Top Section - Full Width Image */}
      <div className="w-full aspect-[3/4] relative overflow-hidden">
        <Image 
          src={cover || "/file.svg"} 
          alt={title} 
          fill
          className="object-cover transition-transform duration-200"
        />
      </div>
      
      {/* Bottom Section - Text Information */}
      <div className="p-4 bg-white">
        {/* Category Badges */}
        <div className="flex flex-wrap gap-1 mb-2">
          {categories.map((category, index) => (
            <Badge 
              key={category.id || index} 
              variant="secondary" 
              className="rounded text-xs border-2 border-violet-600 text-violet-700"
            >
              {category.kategori}
            </Badge>
          ))}
        </div>
        
        {/* Title */}
        <h4 className="font-semibold text-gray-900 mb-1 line-clamp-2 text-sm leading-tight">
          {title}
        </h4>
        
        {/* Author */}
        <p className="text-xs text-gray-600 mb-2">
          {author}
        </p>

        {/* Release Date */}
        {release_date && (
          <p className="text-xs text-gray-600 mb-2 flex flex-row items-center truncate">
            <Calendar className="w-4 h-4 mr-1" /> 
            <span className="truncate">
              {formatDate(release_date)}
            </span>
          </p>
        )}
              
        {/* Additional Info (Optional) */}
        <div className="flex flex-row items-center text-xs text-gray-500 min-w-0">
          <div className="flex items-center min-w-0 flex-1">
            <Book className="w-4 h-4 mr-1 flex-shrink-0" />
            <span className="truncate mr-4">Tersedia</span>
          </div>
          <div className="flex items-center min-w-0 flex-shrink-0">
            <Star className="w-4 h-4 mr-1 text-yellow-500 flex-shrink-0" />
            <span className="truncate">4.5</span>
          </div>
        </div>
      </div>
    </Link>
  );
} 