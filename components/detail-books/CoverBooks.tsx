import { Card } from "@/components/ui/card";
import Image from "next/image"; 

interface CoverBooksProps {
  cover?: string | null;
  title: string;
}

export default function CoverBooks({ cover, title }: CoverBooksProps) {
  return (
    <div className="flex-shrink-0">
      <Card 
        className="relative w-full max-w-sm mx-auto overflow-hidden group cursor-pointer"
      >
        <div className="aspect-[3/4] relative">
          {cover ? (
            <Image
              src={cover}
              alt={`Cover buku ${title}`}
              fill
              className="object-cover transition-transform duration-300"
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
        </div>
      </Card>
    </div>
  );
}
