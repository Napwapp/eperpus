"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { HeaderProps, getUserInitials } from "@/lib/types/user";

export default function Header({ user }: HeaderProps) {
  return (
    <div className="relative w-full h-60 rounded-lg overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Profile Picture */}
      <div className="absolute left-6 bottom-6 flex flex-row gap-2">
        <Avatar className="w-24 h-24 border-4 border-white">
          <AvatarFallback className="text-3xl font-bold bg-violet-600 text-white">
            {user?.name ? getUserInitials(user.name) : "U"}
          </AvatarFallback>
        </Avatar>

        {/* User Information */}
        <div className="absolute left-30 bottom-6 text-white">
          <h1 className="text-2xl font-bold mb-1">
            {user?.name || "User Name"}
          </h1>

          <p className="text-gray-200 text-sm">
            {user?.email || "user@example.com"}
          </p>
        </div>
      </div>
    </div>
  );
}
