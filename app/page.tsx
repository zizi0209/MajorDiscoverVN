import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MajorDiscover VN – Khám phá ngành học & hướng nghiệp 2025",
  description: "Tìm kiếm ngành học phù hợp với tính cách và khối thi. Điểm chuẩn các trường đại học trên cả nước.",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FBF9F6] font-sans">
      <Header />
      <main className="container mx-auto px-4 max-w-6xl pb-24">
        <Hero />
      </main>
    </div>
  );
}
