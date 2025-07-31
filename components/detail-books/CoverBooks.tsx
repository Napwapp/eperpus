"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Eye } from "lucide-react";
import Image from "next/image"; 

interface CoverBooksProps {
  cover?: string | null;
  title: string;
}

export default function CoverBooks({ cover, title }: CoverBooksProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex-shrink-0">
      <Card 
        className="relative w-full max-w-sm mx-auto overflow-hidden group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="aspect-[3/4] relative">
          {cover ? (
            <Image
              src={cover}
              alt={`Cover buku ${title}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <div className="w-16 h-16 mx-auto mb-2 bg-gray-400 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">📚</span>
                </div>
                <p className="text-sm">Tidak ada cover</p>
              </div>
            </div>
          )}
          
          {/* Hover overlay */}
          {isHovered && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-300">
              <div className="text-white text-center">
                <Eye className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm font-medium">Lihat Detail</p>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
