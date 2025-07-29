"use client";

import { Badge } from "@/components/ui/badge";
import { Book, Calendar, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface BookCardProps {
  title: string;
  author: string;
  cover: string;
  category: string;
  release_date: string;
}

export default function BookCard({
  title,
  author,
  cover,
  category,
  release_date,
}: BookCardProps) {
  return (
    <Link 
      className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
      href={"/"}
    >
      {/* Top Section - Full Width Image */}
      <div className="w-full aspect-[3/4] relative overflow-hidden">
        <Image 
          src={cover} 
          alt={title} 
          fill
          className="object-cover transition-transform duration-200"
        />
      </div>
      
      {/* Bottom Section - Text Information */}
      <div className="p-4 bg-white">
        {/* Category Badge */}
        <Badge variant="secondary" className="rounded mb-2 text-xs border-2 border-violet-600 text-violet-700">
          {category}
        </Badge>
        
        {/* Title */}
        <h4 className="font-semibold text-gray-900 mb-1 line-clamp-2 text-sm leading-tight">
          {title}
        </h4>
        
        {/* Author */}
        <p className="text-xs text-gray-600 mb-2">
          {author}
        </p>

        <p className="text-xs text-gray-600 mb-2 flex flex-row items-center">
          <Calendar className="w-4 h-4 mr-1" /> <span>{release_date}</span>
        </p>
              
        {/* Additional Info (Optional) */}
        <div className="flex flex-row items-center text-xs text-gray-500">
          <Book className="w-4 h-4 mr-1" /> <span className="mr-4">Tersedia</span>
          <Star className="w-4 h-4 mr-1 text-yellow-500" /> <span>4.5</span>
        </div>
      </div>
    </Link>
  );
} 