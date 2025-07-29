"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, History, User, Settings } from "lucide-react";

export default function FastAction() {
  const handleAction = (action: string) => {
    // TODO: Implement navigation to respective pages
    console.log(`Navigate to ${action}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Aksi Cepat</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button 
          className="w-full justify-start" 
          variant="outline"
          onClick={() => handleAction("search")}
        >
          <Search className="h-4 w-4 mr-2" />
          Cari Buku
        </Button>
        <Button 
          className="w-full justify-start" 
          variant="outline"
          onClick={() => handleAction("history")}
        >
          <History className="h-4 w-4 mr-2" />
          Riwayat Peminjaman
        </Button>
        <Button 
          className="w-full justify-start" 
          variant="outline"
          onClick={() => handleAction("profile")}
        >
          <User className="h-4 w-4 mr-2" />
          Profil Saya
        </Button>
        <Button 
          className="w-full justify-start" 
          variant="outline"
          onClick={() => handleAction("settings")}
        >
          <Settings className="h-4 w-4 mr-2" />
          Pengaturan
        </Button>
      </CardContent>
    </Card>
  );
}