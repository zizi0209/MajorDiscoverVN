"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { MajorCard } from "./MajorCard";
import { toast } from "sonner";
import {
  KHOI_OPTIONS,
  getAdaptiveQuestions,
  getTopCategories,
  type QuizAnswers,
  type QuizQuestion,
} from "@/lib/quizData";

type Major = Doc<"majors">;
type Phase = "khoi" | "questions" | "loading" | "result";

export function Quiz({ onCancel }: { onCancel: () => void }) {
  const [phase, setPhase] = useState<Phase>("khoi");
  const [khoiThi, setKhoiThi] = useState("");
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [qIdx, setQIdx] = useState(0);
  const [recommendations, setRecommendations] = useState<Major[]>([]);
  const savedRef = useRef(false);

  const questions = useMemo(() => getAdaptiveQuestions(answers), [answers]);
  const totalQ = questions.length;
  const currentQ: QuizQuestion | undefined = questions[qIdx];

  const topCats = useMemo(
    () => (phase === "loading" || phase === "result" ? getTopCategories(answers, khoiThi) : []),
    [phase, answers, khoiThi]
  );

  // Prefetch ngay khi bắt đầu questions (không đợi loading)
  const allMajors = useQuery(api.majors.list, phase !== "khoi" ? {} : "skip");
  const saveResult = useMutation(api.quiz.save);

  // Khi phase=loading VÀ allMajors đã sẵn sàng → tính kết quả ngay
  useEffect(() => {
    if (phase !== "loading" || !allMajors) return;
    const cats = getTopCategories(answers, khoiThi);
    const matched = allMajors.filter(m => cats.includes(m.categorySlug));
    const withKhoi = matched.filter(m => m.subjects?.includes(khoiThi));
    const top = withKhoi.length >= 3 ? withKhoi.slice(0, 5) : matched.slice(0, 5);
    const result = top.length > 0 ? top : allMajors.slice(0, 3);

    setRecommendations(result);
    setPhase("result");
    savedRef.current = false; // cho phép save
  }, [phase, allMajors, answers, khoiThi]);

  // Save kết quả khi hiện result (tách riêng để không block UI)
  useEffect(() => {
    if (phase !== "result" || savedRef.current || recommendations.length === 0) return;
    savedRef.current = true;
    const cats = getTopCategories(answers, khoiThi);
    saveResult({
      khoiThi,
      soThich: JSON.stringify(answers),
      tinhCach: cats.join(","),
      recommendedSlugs: recommendations.map(r => r.slug),
    }).then(() => toast.success("Đã phân tích xong!"))
      .catch((err: unknown) => {
        const message = err instanceof Error ? err.message : "Lỗi không xác định";
        toast.error(message);
      });
  }, [phase, recommendations, answers, khoiThi, saveResult]);

  const progress = phase === "khoi" ? 5 : phase === "questions" ? 5 + ((qIdx / totalQ) * 90) : 100;

  const handleAnswer = (value: boolean) => {
    if (!currentQ) return;
    const newAnswers = { ...answers, [currentQ.id]: value };
    setAnswers(newAnswers);

    const nextIdx = qIdx + 1;
    const nextQuestions = getAdaptiveQuestions(newAnswers);

    if (nextIdx >= nextQuestions.length) {
      setPhase("loading"); // useEffect sẽ xử lý khi allMajors sẵn sàng
    } else {
      setQIdx(nextIdx);
    }
  };

  const reset = () => {
    setPhase("khoi");
    setKhoiThi("");
    setAnswers({});
    setQIdx(0);
    setRecommendations([]);
    savedRef.current = false;
  };

  const goBack = () => {
    if (qIdx > 0) setQIdx(qIdx - 1);
    else setPhase("khoi");
  };

  return (
    <div className="w-full max-w-2xl mx-auto py-12 px-0 md:px-4" id="quiz-section">
      <div className="border border-black bg-white">
        {phase !== "result" && (
          <div className="w-full bg-neutral-200 h-1">
            <div className="bg-black h-full transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        )}

        {/* PHASE: Chọn khối thi */}
        {phase === "khoi" && (
          <div>
            <div className="border-b border-neutral-200 pb-6 mb-6 p-6">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#C2410C] mb-2">Bước 1 — Khối thi</p>
              <h2 className="text-2xl font-serif font-bold italic">Khối thi dự kiến của bạn là gì?</h2>
              <p className="text-sm font-medium mt-1 text-neutral-600">Chọn khối thi bạn có ưu thế nhất. Điều này giúp thu hẹp nhóm ngành phù hợp.</p>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {KHOI_OPTIONS.map(opt => (
                  <label
                    key={opt.value}
                    className={`flex items-center gap-3 border p-3 cursor-pointer transition-colors ${
                      khoiThi === opt.value ? "border-black bg-neutral-50" : "border-neutral-200 hover:border-neutral-400"
                    }`}
                  >
                    <input type="radio" name="khoiThi" value={opt.value} checked={khoiThi === opt.value} onChange={() => setKhoiThi(opt.value)} className="accent-black" />
                    <span className="font-bold text-xs uppercase tracking-wider">{opt.label}</span>
                  </label>
                ))}
              </div>
              <div className="flex justify-between pt-6 border-t border-neutral-200">
                <button onClick={onCancel} className="uppercase tracking-widest text-[10px] font-bold px-4 py-2 hover:bg-neutral-100">Hủy</button>
                <button onClick={() => { setPhase("questions"); setQIdx(0); }} disabled={!khoiThi} className="bg-black text-white uppercase tracking-widest text-[10px] font-bold px-6 py-2 disabled:opacity-40">
                  Bắt đầu khảo sát
                </button>
              </div>
            </div>
          </div>
        )}

        {/* PHASE: Câu hỏi Đúng/Sai */}
        {phase === "questions" && currentQ && (
          <div>
            <div className="border-b border-neutral-200 pb-6 p-6">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#C2410C] mb-2">
                Câu {qIdx + 1} / {totalQ}
              </p>
              <h2 className="text-xl md:text-2xl font-serif font-bold italic leading-snug">{currentQ.text}</h2>
              <p className="text-xs font-medium mt-2 text-neutral-400 uppercase tracking-wider">
                {currentQ.dim === "thinking" && "Tư duy"}
                {currentQ.dim === "personality" && "Tính cách"}
                {currentQ.dim === "economics" && "Điều kiện"}
                {currentQ.dim === "talent" && "Năng khiếu"}
                {currentQ.dim === "interest" && "Sở thích"}
                {currentQ.dim === "values" && "Quan điểm sống"}
              </p>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleAnswer(true)}
                  className="border-2 border-black p-4 text-center font-bold text-sm uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
                >
                  ✓ Đúng
                </button>
                <button
                  onClick={() => handleAnswer(false)}
                  className="border-2 border-neutral-300 p-4 text-center font-bold text-sm uppercase tracking-widest hover:bg-neutral-100 transition-colors text-neutral-600"
                >
                  ✗ Không
                </button>
              </div>
              <div className="flex justify-between pt-4 border-t border-neutral-200">
                <button onClick={goBack} className="uppercase tracking-widest text-[10px] font-bold px-4 py-2 hover:bg-neutral-100">
                  ← Quay lại
                </button>
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest self-center">
                  Khối {khoiThi}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* PHASE: Loading */}
        {phase === "loading" && (
          <div className="py-24 flex flex-col items-center justify-center gap-6 px-4">
            <div className="w-16 h-16 border-4 border-black border-r-transparent rounded-full animate-spin" />
            <div className="text-center space-y-2">
              <h3 className="font-bold text-[10px] uppercase tracking-widest">Đang phân tích kết quả...</h3>
              <p className="text-sm font-medium text-neutral-600">Hệ thống đang đối chiếu profile của bạn với {totalQ} tiêu chí.</p>
            </div>
          </div>
        )}

        {/* PHASE: Kết quả */}
        {phase === "result" && (
          <div className="py-12 px-4 sm:px-8 bg-[#EFEDE8]">
            <div className="text-center mb-10 pb-6 border-b border-neutral-300">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] inline-block mb-3 border border-black px-3 py-1">Kết quả</span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold italic mb-4">Gợi ý dành riêng cho bạn</h2>
              <p className="text-neutral-700 text-sm font-medium">
                Dựa trên khối thi <strong>{khoiThi}</strong>, tư duy, tính cách và mong muốn của bạn.
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {topCats.map(cat => (
                  <span key={cat} className="text-[10px] font-bold uppercase tracking-widest bg-black text-white px-3 py-1">{cat}</span>
                ))}
              </div>
            </div>
            <div className="space-y-12">
              {recommendations.map(major => (
                <MajorCard key={major._id} major={major} />
              ))}
            </div>
            <div className="mt-16 text-center border-t border-neutral-300 pt-8">
              <button onClick={reset} className="border border-black text-black bg-transparent uppercase tracking-widest text-[10px] font-bold px-8 py-3 hover:bg-black hover:text-white transition-colors">
                Làm lại khảo sát
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
