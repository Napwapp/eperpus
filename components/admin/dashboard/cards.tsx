"use client";

import { useState, useEffect } from "react"
import { DataUserCard } from "./cards/data-user"
import { DataBukuCard } from "./cards/data-buku"
import { DataPinjamanAktifCard } from "./cards/data-pinjaman-aktif"
import { DataPinjamanTelatCard } from "./cards/data-pinjaman-telat"
import { CardsSkeleton } from "./cards-skeleton"

export function Cards() {
  const [initialLoading, setInitialLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false)
    })

    return () => clearTimeout(timer)
  }, [])

  if (initialLoading) {
    return <CardsSkeleton />
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <DataUserCard />
      <DataBukuCard />
      <DataPinjamanAktifCard />
      <DataPinjamanTelatCard />
    </div>
  )
}
