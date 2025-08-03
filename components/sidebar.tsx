"use client";

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { UserLinks, AdminLinks, baseLinks } from "./nav-links";
import Link from "next/link";
import clsx from "clsx";
import Image from "next/image";
import { ChevronDown, User, LogOut } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";

export default function AppSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const isMobile = useIsMobile();

  const role = session?.user?.role;

  const links = [
    ...(role === "admin" || "superadmin" ? AdminLinks : []),
    ...(role === "user" ? UserLinks : []),
    ...baseLinks,
  ];

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <Sidebar>
      {/* Header */}
      <SidebarHeader className="border-b border-border/5 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center gap-2 px-2 py-2">
          <Image
            src="/eperpus.svg"
            alt="Logo ePerpus"
            width={40}
            height={40}
            className="w-10 h-10 object-contain"
          />
          <div className="flex flex-col">
            <span className="text-sm font-semibold">ePerpus</span>
            <span className="text-xs text-muted-foreground">
              Perpustakaan digital
            </span>
          </div>
        </div>
      </SidebarHeader>

      {/* Sidebar Content */}
      <SidebarContent>
        {/* 1 */}
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {links.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={clsx(
                        "relative transition-all duration-200",
                        isActive && [
                          "bg-accent",
                          "text-accent-foreground",
                          "font-medium",
                          "before:absolute before:left-0 before:top-1/2 before:h-6 before:w-1 before:-translate-y-1/2 before:rounded-r-full before:bg-primary",
                          "hover:bg-accent/80",
                        ],
                        !isActive && [
                          "text-accent-foreground",
                          "hover:bg-accent",
                          "hover:text-accent-foreground",
                        ]
                      )}
                    >
                      <Link href={item.url}>
                        <item.icon className="w-4 h-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="border-t border-border/5 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <SidebarGroup>
          <SidebarGroupContent>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="w-full cursor-pointer hover:bg-accent py-7">
                  <div className="flex items-center gap-3 w-full">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src="" alt={session?.user?.name || "User"} />
                      <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                        {session?.user?.name?.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start flex-1 min-w-0">
                      <span className="text-sm font-medium truncate">
                        {session?.user?.name || "User"}
                      </span>
                      <span className="text-xs text-muted-foreground truncate">
                        {session?.user?.email || "user@example.com"}
                      </span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 mb-4"
                side={isMobile ? "top" : "right"}
                align="start"
                sideOffset={8}
                alignOffset={0}
                forceMount
              >
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {session?.user?.name || "User"}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {session?.user?.email || "user@example.com"}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/user/profile" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer text-destructive focus:text-destructive"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4 text-red-500" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}
