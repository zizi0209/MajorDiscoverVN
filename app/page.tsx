"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Quiz } from "@/components/Quiz";
import { MajorCard } from "@/components/MajorCard";


export default function Home() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedSlug, setSelectedSlug] = useState("all");

  // Rule #4: limit 50 mặc định
  const queryArgs = selectedSlug !== "all" ? { categorySlug: selectedSlug } : {};
  const majors = useQuery(api.majors.list, queryArgs);

  // Rule #1: categories từ majorCategories table (36 records), không scan majors
  const categories = useQuery(api.categories.list, {});

  return (
    <div className="min-h-screen bg-[#FBF9F6] font-sans">
      <Header />

      <main className="container mx-auto px-4 max-w-6xl pb-24">
        {!showQuiz ? (
          <Hero onStart={() => setShowQuiz(true)} />
        ) : (
          <Quiz onCancel={() => setShowQuiz(false)} />
        )}

        {/* Majors Section */}
        <section id="majors-list" className="py-16 pt-24 border-t-2 border-black mt-12">
          <div className="text-left mb-12 flex flex-col md:flex-row md:items-end justify-between border-b border-black pb-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-serif font-bold leading-none mb-4 italic">
                Bách khoa toàn thư <br className="hidden md:block" /> Ngành Học
              </h2>
              <p className="text-neutral-700 text-sm font-medium leading-relaxed">
                Thông tin chi tiết về các ngành học hot nhất hiện nay, điểm chuẩn phân tích từ năm ngoái và dự đoán điểm năm nay của các trường đại học top đầu trên cả nước.
              </p>
            </div>
            <div className="mt-8 md:mt-0 text-right">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] inline-block mb-3 bg-black text-white px-3 py-1">
                2025 EDITION
              </span>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 mb-10 pb-6">
            <button
              onClick={() => setSelectedSlug("all")}
              className={`uppercase tracking-widest text-[10px] font-bold px-4 py-2 border transition-colors ${
                selectedSlug === "all"
                  ? "border-black bg-black text-white"
                  : "border-transparent text-neutral-500 hover:border-black hover:text-black"
              }`}
            >
              Tất cả khối ngành
            </button>
            {(categories ?? []).map(cat => (
              <button
                key={cat.slug}
                onClick={() => setSelectedSlug(cat.slug)}
                className={`uppercase tracking-widest text-[10px] font-bold px-4 py-2 border transition-colors ${
                  selectedSlug === cat.slug
                    ? "border-black bg-black text-white"
                    : "border-transparent text-neutral-500 hover:border-black hover:text-black"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Major Cards */}
          {majors === undefined ? (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-64 bg-neutral-100 animate-pulse border border-neutral-200" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
              {majors.map(major => (
                <MajorCard key={major._id} major={major} />
              ))}
              {majors.length === 0 && (
                <p className="text-neutral-500 text-sm col-span-2 text-center py-12">
                  Chưa có dữ liệu. Vui lòng chạy seed để thêm dữ liệu mẫu.
                </p>
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
