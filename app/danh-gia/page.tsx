"use client";

import { Header } from "@/components/Header";
import { Quiz } from "@/components/Quiz";

export default function AssessmentPage() {
  return (
    <div className="min-h-screen bg-[#FBF9F6] font-sans">
      <Header />
      <main className="container mx-auto px-4 max-w-6xl pb-24">
        <section className="py-12 md:py-16">
          <div className="max-w-2xl mb-10">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#C2410C] mb-3">Đánh giá năng lực</p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold leading-none mb-4 italic">
              Tìm ngành học <br className="hidden md:block" />phù hợp với bạn
            </h1>
            <p className="text-neutral-700 text-sm font-medium leading-relaxed border-l-4 border-black pl-4">
              Trả lời một số câu hỏi về tính cách, sở thích và khối thi để hệ thống gợi ý ngành học phù hợp nhất.
            </p>
          </div>
          <Quiz onCancel={() => window.history.back()} />
        </section>
      </main>
    </div>
  );
}
