"use client";

import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { inter } from "@/app/ui/fonts";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex flex-wrap items-center justify-between py-4 px-2 md:py-3 md:px-4 gap-y-2">
        <div className="flex items-center gap-2 md:gap-3">
          <span className="flex w-9 h-9 md:w-10 md:h-10 items-center justify-center">
            <Image src="/eperpus.svg" alt="Logo ePerpus" width={80} height={80} className="w-10 h-10 md:w-20 md:h-20 object-contain" priority />
          </span>
          <span className="font-bold text-lg md:text-xl text-violet-700">ePerpus</span>
        </div>
        {/* Desktop Nav */}
        <div className={`${inter.className} hidden md:block antialiased`}>
          <NavigationMenu>
            <NavigationMenuList className="flex-nowrap gap-1">
              <NavigationMenuItem>
                <NavigationMenuLink href="#beranda" className="text-violet-700 font-medium px-3 py-4 text-base">Beranda</NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#tentang" className="text-violet-700 font-medium px-3 py-4 text-base">Tentang Kami</NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#buku" className="text-violet-700 font-medium px-3 py-4 text-base">Buku</NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#layanan" className="text-violet-700 font-medium px-3 py-4 text-base">Layanan</NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/login" className="box-border border-2 border-violet-600 text-violet-700 hover:bg-gray-100 rounded-sm font-medium px-3 py-2 text-base mx-2">Masuk</Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/register" className="border-2 border-violet-600 bg-violet-600 hover:bg-violet-700 rounded-sm text-white font-medium px-3 py-2 text-base">Daftar</Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button aria-label="Buka menu" className="p-2 rounded-md text-violet-700 hover:bg-violet-100 focus:outline-none focus:ring-2 focus:ring-violet-400">
                <Bars3Icon className="w-7 h-7" />
              </button>
            </SheetTrigger>
            <SheetContent side="top" className="p-0 w-full max-w-full rounded-b-xl shadow-xl border-b bg-white" style={{ maxHeight: '90vh' }}>
              <nav className="flex flex-col gap-2 p-6">
                <a href="#beranda" className="text-violet-700 font-medium py-2 text-base" onClick={() => setOpen(false)}>Beranda</a>
                <a href="#tentang" className="text-violet-700 font-medium py-2 text-base" onClick={() => setOpen(false)}>Tentang Kami</a>
                <a href="#buku" className="text-violet-700 font-medium py-2 text-base" onClick={() => setOpen(false)}>Buku</a>
                <a href="#layanan" className="text-violet-700 font-medium py-2 text-base" onClick={() => setOpen(false)}>Layanan</a>
                <Button variant="outline" className="border-2 border-violet-600 text-violet-700 font-semibold px-4 py-2 mt-4" onClick={() => setOpen(false)}>Masuk</Button>
                <Button className="bg-violet-600 hover:bg-violet-700 text-white font-semibold px-4 py-2 mt-2" onClick={() => setOpen(false)}>Daftar</Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
} 