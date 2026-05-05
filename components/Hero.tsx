interface HeroProps {
  onStart: () => void;
}

export function Hero({ onStart }: HeroProps) {
  return (
    <section className="py-12 md:py-24 px-0 flex flex-col items-start justify-center max-w-4xl">
      <div className="inline-flex items-center border border-black bg-[#EAE6DF] px-3 py-1 text-[10px] font-bold uppercase tracking-widest mb-6">
        XU HƯỚNG TƯƠNG LAI 2025
      </div>
      <h2 className="text-6xl md:text-[5.5rem] font-serif font-bold italic leading-none mb-8">
        Chọn Đúng Ngành <br />Vững Bước Tương Lai
      </h2>
      <p className="text-sm md:text-base border-l-4 border-black pl-4 text-left max-w-2xl mb-8 leading-relaxed font-medium">
        Tìm kiếm khối thi phù hợp dựa trên tính cách và sở thích cá nhân. Khám phá ngành học với
        dữ liệu chuẩn xác về điểm chuẩn và cơ hội việc làm từ Bắc vào Nam.
      </p>
      <div className="flex flex-wrap gap-4">
        <button
          id="btn-start-quiz"
          onClick={onStart}
          className="bg-black text-white text-[10px] font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors px-8 py-4"
        >
          Bắt đầu khảo sát
        </button>
        <button
          onClick={() => document.getElementById("majors-list")?.scrollIntoView({ behavior: "smooth" })}
          className="border border-black text-black text-[10px] font-bold uppercase tracking-widest hover:bg-neutral-100 transition-colors px-8 py-4"
        >
          Xem tất cả ngành học
        </button>
      </div>
    </section>
  );
}
