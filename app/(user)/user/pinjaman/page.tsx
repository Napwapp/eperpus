import Header from "@/components/user-home/Header";
import PinjamanList from "@/components/user-pinjaman/PinjamanList";

export default function page() {
    return (
        <>
            <Header />
            <div className="container mx-auto px-4 py-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Daftar Pinjaman</h1>
                    <p className="text-gray-600">Kelola dan pantau status pinjaman buku Anda</p>
                </div>
                
                <PinjamanList />
            </div>
        </>
    )
};
