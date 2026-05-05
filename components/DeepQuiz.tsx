"use client";

import { useState, useMemo, useEffect } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { MajorCard } from "./MajorCard";
import { DEEP_QUESTIONS, analyzeMatch, TRAIT_INFO, type DeepAnswers } from "@/lib/deepQuizData";

type Phase = "pick" | "questions" | "result";

export function DeepQuiz() {
  const [phase, setPhase] = useState<Phase>("pick");
  const [catSlug, setCatSlug] = useState("");
  const [answers, setAnswers] = useState<DeepAnswers>({});
  const [qIdx, setQIdx] = useState(0);

  const categories = useQuery(api.categories.list, {});
  const majors = useQuery(api.majors.list, catSlug ? { categorySlug: catSlug } : "skip");
  const selectedCat = categories?.find(c => c.slug === catSlug);
  const totalQ = DEEP_QUESTIONS.length;
  const currentQ = DEEP_QUESTIONS[qIdx];

  const analysis = useMemo(
    () => phase === "result" ? analyzeMatch(answers, catSlug) : null,
    [phase, answers, catSlug]
  );

  const handleAnswer = (value: boolean) => {
    if (!currentQ) return;
    setAnswers(prev => ({ ...prev, [currentQ.id]: value }));
    if (qIdx + 1 >= totalQ) setPhase("result");
    else setQIdx(qIdx + 1);
  };

  const reset = () => { setPhase("pick"); setCatSlug(""); setAnswers({}); setQIdx(0); };
  const goBack = () => { if (qIdx > 0) setQIdx(qIdx - 1); else setPhase("pick"); };
  const progress = phase === "pick" ? 0 : phase === "questions" ? ((qIdx / totalQ) * 100) : 100;

  // Scroll to top on phase change
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [phase]);

  return (
    <div className="w-full max-w-3xl mx-auto py-8 px-4">
      {/* Progress */}
      {phase !== "pick" && (
        <div className="w-full bg-neutral-200 h-1 mb-8">
          <div className="bg-black h-full transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      )}

      {/* PICK CATEGORY */}
      {phase === "pick" && (
        <div>
          <div className="mb-10">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#C2410C] mb-2">Khảo sát chuyên sâu</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold italic mb-3">Chọn nhóm ngành bạn quan tâm</h2>
            <p className="text-sm text-neutral-600 font-medium">Hệ thống sẽ đánh giá mức độ phù hợp của bạn với nhóm ngành đó qua 20 câu hỏi.</p>
          </div>
          {!categories ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[1,2,3,4,5,6].map(i => <div key={i} className="h-12 bg-neutral-100 animate-pulse border" />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {categories.map(cat => (
                <button
                  key={cat.slug}
                  onClick={() => { setCatSlug(cat.slug); setPhase("questions"); setQIdx(0); setAnswers({}); }}
                  className="text-left border border-neutral-200 p-4 hover:border-black hover:bg-neutral-50 transition-colors group"
                >
                  <span className="font-bold text-sm group-hover:underline">{cat.name}</span>
                  <span className="text-[10px] text-neutral-400 ml-2 uppercase tracking-wider">{cat.majorCount} ngành</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* QUESTIONS */}
      {phase === "questions" && currentQ && (
        <div className="border border-black bg-white">
          <div className="border-b border-neutral-200 pb-6 p-6">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#C2410C] mb-1">
              Câu {qIdx + 1} / {totalQ} — {selectedCat?.name}
            </p>
            <h2 className="text-xl md:text-2xl font-serif font-bold italic leading-snug mt-2">{currentQ.text}</h2>
            <p className="text-xs text-neutral-400 uppercase tracking-wider mt-2">
              Đo lường: {TRAIT_INFO[currentQ.trait][0]}
            </p>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => handleAnswer(true)} className="border-2 border-black p-4 font-bold text-sm uppercase tracking-widest hover:bg-black hover:text-white transition-colors">✓ Đúng</button>
              <button onClick={() => handleAnswer(false)} className="border-2 border-neutral-300 p-4 font-bold text-sm uppercase tracking-widest hover:bg-neutral-100 transition-colors text-neutral-600">✗ Không</button>
            </div>
            <div className="flex justify-between pt-4 border-t border-neutral-200">
              <button onClick={goBack} className="uppercase tracking-widest text-[10px] font-bold px-4 py-2 hover:bg-neutral-100">← Quay lại</button>
            </div>
          </div>
        </div>
      )}

      {/* RESULT */}
      {phase === "result" && analysis && (
        <div className="space-y-8">
          {/* Match Score */}
          <div className="border border-black bg-white p-8 text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C2410C] mb-4">Kết quả phân tích</p>
            <h2 className="text-2xl font-serif font-bold italic mb-2">{selectedCat?.name}</h2>
            <div className="my-6">
              <span className={`text-7xl font-bold font-serif ${
                analysis.matchPercent >= 70 ? "text-green-700" : analysis.matchPercent >= 40 ? "text-amber-600" : "text-red-600"
              }`}>{analysis.matchPercent}%</span>
              <p className="text-sm font-medium text-neutral-600 mt-2">
                {analysis.matchPercent >= 70 ? "Bạn rất phù hợp với nhóm ngành này!" :
                 analysis.matchPercent >= 40 ? "Bạn có tiềm năng nhưng cần bổ sung một số kỹ năng." :
                 "Nhóm ngành này có thể không phải lựa chọn tốt nhất cho bạn."}
              </p>
            </div>
            {/* Bar */}
            <div className="w-full bg-neutral-200 h-3 mx-auto max-w-md">
              <div className={`h-full transition-all duration-700 ${
                analysis.matchPercent >= 70 ? "bg-green-600" : analysis.matchPercent >= 40 ? "bg-amber-500" : "bg-red-500"
              }`} style={{ width: `${analysis.matchPercent}%` }} />
            </div>
          </div>

          {/* Strengths & Weaknesses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Strengths */}
            <div className="border border-green-300 bg-green-50 p-6">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-green-800 mb-4">✓ Điều bạn đáp ứng tốt</h3>
              {analysis.strengths.length === 0 ? (
                <p className="text-sm text-neutral-500 italic">Chưa có khía cạnh nào nổi bật.</p>
              ) : analysis.strengths.map(s => (
                <div key={s.trait} className="mb-3 last:mb-0">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-sm text-green-900">{s.label}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-green-600">{s.importance}</span>
                  </div>
                  <p className="text-xs text-green-700 mt-0.5">Bạn có khả năng {TRAIT_INFO[s.trait][1]}</p>
                </div>
              ))}
            </div>
            {/* Weaknesses */}
            <div className="border border-red-300 bg-red-50 p-6">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-red-800 mb-4">⚠ Bất lợi cần lưu ý</h3>
              {analysis.weaknesses.length === 0 ? (
                <p className="text-sm text-green-600 italic">Tuyệt vời! Bạn đáp ứng tất cả yêu cầu.</p>
              ) : analysis.weaknesses.map(w => (
                <div key={w.trait} className="mb-3 last:mb-0">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-sm text-red-900">{w.label}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-red-500">{w.importance}</span>
                  </div>
                  <p className="text-xs text-red-700 mt-0.5">Nhóm ngành đòi hỏi khả năng {TRAIT_INFO[w.trait][1]} — bạn cần cải thiện</p>
                </div>
              ))}
            </div>
          </div>

          {/* Specific Majors */}
          <div className="border-t-2 border-black pt-8">
            <h3 className="text-2xl font-serif font-bold italic mb-2">Ngành cụ thể trong nhóm</h3>
            <p className="text-sm text-neutral-600 font-medium mb-6">
              Các ngành thuộc nhóm <strong>{selectedCat?.name}</strong> mà bạn có thể khám phá.
            </p>
            {!majors ? (
              <div className="space-y-4">{[1,2].map(i => <div key={i} className="h-40 bg-neutral-100 animate-pulse border" />)}</div>
            ) : majors.length === 0 ? (
              <p className="text-neutral-400 text-sm italic">Chưa có dữ liệu ngành cho nhóm này.</p>
            ) : (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {majors.map(m => <MajorCard key={m._id} major={m} />)}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 border-t border-neutral-200">
            <button onClick={reset} className="border border-black uppercase tracking-widest text-[10px] font-bold px-8 py-3 hover:bg-black hover:text-white transition-colors">
              Chọn nhóm ngành khác
            </button>
            <button onClick={() => { setPhase("questions"); setQIdx(0); setAnswers({}); }} className="bg-black text-white uppercase tracking-widest text-[10px] font-bold px-8 py-3 hover:bg-neutral-800 transition-colors">
              Làm lại khảo sát
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
