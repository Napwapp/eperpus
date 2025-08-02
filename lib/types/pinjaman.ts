export interface DataPinjaman {
  id: string;
  id_books: number;
  judul: string;
  sinopsis: string;
  cover: string;
  stok: number;
  tanggalPinjam: Date;
  durasiPinjam: number;
  statusPinjaman: "request" | "aktif" | "diperpanjang" | "menunggu_pengembalian" | "done" | "refused";
}

export interface Pinjaman {
  id: number;
  user_id: string;
  id_books: number;
  status: "request" | "aktif" | "diperpanjang" | "menunggu_pengembalian" | "done" | "refused";
  tanggal_permintaan: Date;
  tanggal_dipinjam?: Date;
  tanggal_dikembalikan?: Date;
  durasi_pinjaman: number;
  alasan: string | null;
  createdAt: Date;
  updatedAt: Date;
  user?: {
    id: string;
    name: string;
    email: string;
  };
  buku?: {
    id: number;
    title: string;
    author: string;
    cover?: string;
  };
}

export interface PinjamanMapped {
  id: number;
  userName: string;
  bukuTitle: string;
  status: Pinjaman["status"];
  tanggalPinjam: Date;
  durasi: number;
}
