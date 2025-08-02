import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";

export default function BackButton({href, text}: {href: string, text:string}) {
    return (
      <div className="absolute top-4 left-4 z-10">
        <Link href={href}>
          <Button
            variant="outline"
            className="outline-violet-700 bg-white text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-violet-700" />
            <span className="hidden sm:inline ml-2">Kembali ke {text}</span>
            <span className="sm:hidden ml-2">Kembali</span>
          </Button>
        </Link>
      </div>
    );
  }