export interface DataPinjaman {
  id: string;
  judul: string;
  sinopsis: string;
  cover: string;
  stok: number;
  tanggalPinjam: Date;
  durasiPinjam: number;
  statusPinjaman: "aktif" | "diperpanjang" | "menunggu_pengembalian" | "done";
}
