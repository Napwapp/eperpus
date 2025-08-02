import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export default function Faq() {
  return (
    <section id="faq" className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-xl md:text-2xl font-bold text-gray-700 mb-6">FAQ</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className="border-gray-400">
            <AccordionTrigger className=" font-bold px-3 py-4 text-md text-violet-800">Apa itu ePerpus?</AccordionTrigger>
            <AccordionContent className="px-3 text-gray-700">ePerpus adalah sistem informasi perpustakaan digital yang memudahkan pengelolaan, peminjaman, dan pengembalian buku secara efisien dan modern.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="border-gray-400">
            <AccordionTrigger className=" font-bold px-3 py-4 text-md text-violet-800">Bagaimana cara meminjam buku?</AccordionTrigger>
            <AccordionContent className="px-3 text-gray-700">Untuk meminjam buku, Anda perlu melakukan registrasi terlebih dahulu. Setelah registrasi berhasil dan anda sudah memiliki akun, anda dapat meminjam buku pilihan kamu yang tersedia sesuai aturan dan ketentuan yang ada pada sistem kami.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3" className="border-gray-400">
            <AccordionTrigger className=" font-bold px-3 py-4 text-md text-violet-800">Bagaimana cara mengembalikan buku?</AccordionTrigger>
            <AccordionContent className="px-3 text-gray-700">Anda dapat mengembalikan buku kapan saja walaupun masa pinjam buku belum habis, Jika anda melewati batas masa tenggang bebrapa hari, anda akan dikenakan peringatan.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4" className="border-gray-400">
            <AccordionTrigger className=" font-bold px-3 py-4 text-md text-violet-800">Berapa maksimal jangka waktu untuk meminjam buku?</AccordionTrigger>
            <AccordionContent className="px-3 text-gray-700">Kamu dapat mengatur masa pinjam buku sesuai kebutuhan kamu. Namun maksimal jangka waktu untuk meminjam bukunya adalah 14 hari. Setelah itu, Anda diharuskan untuk mengembalikan buku tersebut ke perpustakaan.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}