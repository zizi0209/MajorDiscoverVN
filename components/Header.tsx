import Link from "next/link";

export function Header() {
  return (
    <header className="flex flex-col md:flex-row md:justify-between items-start md:items-end border-b-2 border-black pb-4 mb-6 pt-8 w-full max-w-6xl mx-auto px-4">
      <div>
        <p className="text-[10px] uppercase tracking-[0.3em] font-bold mb-1">
          Hướng nghiệp &amp; Tuyển sinh 2025
        </p>
        <Link href="/" className="group">
          <h1 className="text-4xl md:text-5xl font-serif italic leading-none group-hover:opacity-80 transition-opacity">
            MajorDiscover VN
          </h1>
        </Link>
      </div>
      <nav className="mt-6 md:mt-0 flex gap-6 md:gap-8 text-[11px] uppercase tracking-widest font-semibold pb-1 w-full md:w-auto overflow-x-auto">
        <Link href="/" className="border-b border-black whitespace-nowrap">Trang chủ</Link>
        <Link href="/#majors-list" className="opacity-40 hover:opacity-100 whitespace-nowrap transition-opacity">Ngành học</Link>
        <Link href="/#quiz-section" className="opacity-40 hover:opacity-100 whitespace-nowrap transition-opacity">Đánh giá năng lực</Link>
        <Link href="/deep-quiz" className="opacity-40 hover:opacity-100 whitespace-nowrap transition-opacity">Khảo sát chuyên sâu</Link>
      </nav>
    </header>
  );
}
