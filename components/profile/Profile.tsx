"use client";

import Header from "./Header";
import ProfileContent from "./ProfileContent";
import { ProfileProps } from "@/lib/types/user";

export default function Profile({ user }: ProfileProps) {
  return (
    <div className="space-y-6">
      {/* Header Component */}
      <Header user={user} />
      
      {/* Main Content */}
      <div className="mt-16">
        <ProfileContent user={user} />
      </div>
    </div>
  );
} 