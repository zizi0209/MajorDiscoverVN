import { Header } from "@/components/Header";
import { DeepQuiz } from "@/components/DeepQuiz";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Khảo sát chuyên sâu — MajorDiscover VN",
  description: "Đánh giá mức độ phù hợp của bạn với từng nhóm ngành cụ thể qua 20 câu hỏi chuyên sâu.",
};

export default function DeepQuizPage() {
  return (
    <div className="min-h-screen bg-[#FBF9F6] font-sans">
      <Header />
      <main className="container mx-auto max-w-6xl pb-24">
        <DeepQuiz />
      </main>
    </div>
  );
}
