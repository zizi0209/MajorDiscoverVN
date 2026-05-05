"use client";

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { MajorCard } from "./MajorCard";
import { toast } from "sonner";

type Major = Doc<"majors">;

const KHOI_OPTIONS = [
  { value: "A00", label: "A00 (Toán, Lý, Hóa)" },
  { value: "A01", label: "A01 (Toán, Lý, Anh)" },
  { value: "B00", label: "B00 (Toán, Hóa, Sinh)" },
  { value: "C00", label: "C00 (Văn, Sử, Địa)" },
  { value: "D01", label: "D01 (Toán, Văn, Anh)" },
  { value: "D07", label: "D07 (Toán, Hóa, Anh)" },
];

const TINH_CACH_OPTIONS = [
  { value: "HuongNoi_Logic", label: "Hướng nội, tư duy logic mạnh mẽ" },
  { value: "HuongNgoai_SoiDoi", label: "Hướng ngoại, sôi nổi, thích đám đông" },
  { value: "CanThan_TiMi", label: "Cẩn thận, tỉ mỉ, kiên nhẫn" },
  { value: "SangTao_TuDo", label: "Sáng tạo, không thích gò bó khuôn khổ" },
  { value: "ThauCam_LangNghe", label: "Thấu cảm, giỏi lắng nghe người khác" },
];

const SO_THICH_TAGS = [
  { label: "+ Công nghệ", text: " Thích công nghệ, lập trình." },
  { label: "+ Kinh doanh", text: " Thích kinh doanh, buôn bán." },
  { label: "+ Y tế", text: " Thích y khoa, chăm sóc sức khỏe." },
  { label: "+ Ngoại ngữ", text: " Thích ngôn ngữ, đi du lịch." },
  { label: "+ Kỹ thuật", text: " Thích cơ khí, máy móc, kỹ thuật." },
];

function stepLabel(step: number) {
  return `Bước ${step} trên 3`;
}

export function Quiz({ onCancel }: { onCancel: () => void }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [khoiThi, setKhoiThi] = useState("");
  const [soThich, setSoThich] = useState("");
  const [tinhCach, setTinhCach] = useState("");
  const [recommendations, setRecommendations] = useState<Major[]>([]);

  // Rule #1: Chỉ fetch khi user đã chọn khoiThi (bước 3+), không fetch ngay từ đầu
  // Convex không hỗ trợ index trên array field nên filter subjects[] vẫn ở JS (acceptable)
  // nhưng giảm waste bằng cách fetch lazy (skip khi chưa cần)
  const allMajors = useQuery(api.majors.list, step >= 3 ? {} : "skip");

  const saveResult = useMutation(api.quiz.save);

  const handleSubmit = async () => {
    if (!khoiThi || !soThich || !tinhCach) {
      toast.warning("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    setLoading(true);
    setStep(4);

    try {
      // Phân tích đơn giản dựa trên khối thi và từ khóa sở thích
      const majors = allMajors ?? [];
      const khoiMatched = majors.filter(m => m.subjects.includes(khoiThi));

      const keywords: Record<string, string[]> = {
        "cong-nghe-thong-tin": ["công nghệ", "lập trình", "máy tính", "phần mềm", "it", "code"],
        "quan-tri-kinh-doanh": ["kinh doanh", "buôn bán", "quản trị", "lãnh đạo", "marketing"],
        "ke-toan": ["kế toán", "tài chính", "số liệu", "ngân hàng"],
        "y-khoa": ["y tế", "y khoa", "bác sĩ", "chăm sóc sức khỏe", "bệnh viện"],
        "duoc-hoc": ["dược", "thuốc", "y tế", "chăm sóc sức khỏe"],
        "tam-ly-hoc": ["tâm lý", "con người", "cảm xúc", "tư vấn", "lắng nghe"],
        "ngon-ngu-anh": ["ngôn ngữ", "tiếng anh", "ngoại ngữ", "du lịch", "dịch thuật"],
        "ky-thuat-o-to": ["kỹ thuật", "cơ khí", "ô tô", "xe", "máy móc"],
      };

      const soThichLower = soThich.toLowerCase();
      const scored = khoiMatched.map(m => {
        const kws = keywords[m.slug] ?? [];
        const score = kws.filter(kw => soThichLower.includes(kw)).length;
        return { m, score };
      });

      scored.sort((a, b) => b.score - a.score);
      const top = scored.slice(0, 3).map(x => x.m);
      const result = top.length > 0 ? top : khoiMatched.slice(0, 2);

      setRecommendations(result.length > 0 ? result : majors.slice(0, 2));
      await saveResult({
        khoiThi,
        soThich,
        tinhCach,
        recommendedSlugs: result.map(r => r.slug),
      });
      setStep(5);
      toast.success("Đã tìm thấy ngành phù hợp với bạn!");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Lỗi không xác định";
      toast.error(message);
      setStep(3);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setRecommendations([]);
    setStep(1);
    setSoThich("");
    setTinhCach("");
    setKhoiThi("");
  };

  return (
    <div className="w-full max-w-2xl mx-auto py-12 px-0 md:px-4" id="quiz-section">
      <div className="border border-black bg-white">
        {/* Progress bar */}
        {step < 4 && (
          <div className="w-full bg-neutral-200 h-1">
            <div className="bg-black h-full transition-all duration-300" style={{ width: `${(step / 3) * 100}%` }} />
          </div>
        )}

        {/* Step 1: Khối thi */}
        {step === 1 && (
          <div>
            <div className="border-b border-neutral-200 pb-6 mb-6 p-6">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#C2410C] mb-2">{stepLabel(1)}</p>
              <h2 className="text-2xl font-serif font-bold italic">Khối thi dự kiến của bạn là gì?</h2>
              <p className="text-sm font-medium mt-1">Chọn một khối thi có ưu thế nhất.</p>
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
                    <input
                      type="radio"
                      name="khoiThi"
                      value={opt.value}
                      checked={khoiThi === opt.value}
                      onChange={() => setKhoiThi(opt.value)}
                      className="accent-black"
                    />
                    <span className="font-bold text-xs uppercase tracking-wider">{opt.label}</span>
                  </label>
                ))}
              </div>
              <div className="flex justify-between pt-6 border-t border-neutral-200">
                <button onClick={onCancel} className="uppercase tracking-widest text-[10px] font-bold px-4 py-2 hover:bg-neutral-100">Hủy</button>
                <button onClick={() => setStep(2)} disabled={!khoiThi} className="bg-black text-white uppercase tracking-widest text-[10px] font-bold px-6 py-2 disabled:opacity-40">Tiếp tục</button>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Sở thích */}
        {step === 2 && (
          <div>
            <div className="border-b border-neutral-200 pb-6 mb-6 p-6">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#C2410C] mb-2">{stepLabel(2)}</p>
              <h2 className="text-2xl font-serif font-bold italic">Sở thích nghề nghiệp &amp; đam mê</h2>
              <p className="text-sm font-medium mt-1">Bạn thích làm những công việc như thế nào?</p>
            </div>
            <div className="p-6 space-y-4">
              <textarea
                placeholder="VD: Mình rất thích máy tính, công nghệ mới, thiết lập mô hình..."
                value={soThich}
                onChange={e => setSoThich(e.target.value)}
                className="w-full min-h-[120px] resize-none border border-black p-3 text-sm font-medium focus:outline-none focus:border-black"
              />
              <div className="flex gap-2 flex-wrap pb-4">
                {SO_THICH_TAGS.map(tag => (
                  <button
                    key={tag.label}
                    onClick={() => setSoThich(prev => prev + tag.text)}
                    className="text-[10px] font-bold border border-black px-3 py-1 hover:bg-black hover:text-white transition-colors uppercase tracking-widest"
                  >
                    {tag.label}
                  </button>
                ))}
              </div>
              <div className="flex justify-between pt-6 border-t border-neutral-200">
                <button onClick={() => setStep(1)} className="uppercase tracking-widest text-[10px] font-bold px-4 py-2 hover:bg-neutral-100">Quay lại</button>
                <button onClick={() => setStep(3)} disabled={!soThich} className="bg-black text-white uppercase tracking-widest text-[10px] font-bold px-6 py-2 disabled:opacity-40">Tiếp tục</button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Tính cách */}
        {step === 3 && (
          <div>
            <div className="border-b border-neutral-200 pb-6 mb-6 p-6">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#C2410C] mb-2">{stepLabel(3)}</p>
              <h2 className="text-2xl font-serif font-bold italic">Loại tính cách của bạn là gì?</h2>
              <p className="text-sm font-medium mt-1">Bạn đánh giá cách mình phản ứng với các vấn đề như thế nào?</p>
            </div>
            <div className="p-6 space-y-3">
              {TINH_CACH_OPTIONS.map(opt => (
                <label
                  key={opt.value}
                  className={`flex items-center gap-3 border p-3 cursor-pointer transition-colors ${
                    tinhCach === opt.value ? "border-black bg-neutral-50" : "border-neutral-200 hover:border-neutral-400"
                  }`}
                >
                  <input
                    type="radio"
                    name="tinhCach"
                    value={opt.value}
                    checked={tinhCach === opt.value}
                    onChange={() => setTinhCach(opt.value)}
                    className="accent-black"
                  />
                  <span className="font-bold text-xs uppercase tracking-wider">{opt.label}</span>
                </label>
              ))}
              <div className="flex justify-between pt-6 border-t border-neutral-200">
                <button onClick={() => setStep(2)} className="uppercase tracking-widest text-[10px] font-bold px-4 py-2 hover:bg-neutral-100">Quay lại</button>
                <button onClick={handleSubmit} disabled={!tinhCach || loading} className="bg-black text-white uppercase tracking-widest text-[10px] font-bold px-6 py-2 disabled:opacity-40">
                  Bắt đầu phân tích
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Loading */}
        {step === 4 && (
          <div className="py-24 flex flex-col items-center justify-center gap-6 px-4">
            <div className="w-16 h-16 border-4 border-black border-r-transparent rounded-full animate-spin" />
            <div className="text-center space-y-2">
              <h3 className="font-bold text-[10px] uppercase tracking-widest">Đang phân tích dữ liệu...</h3>
              <p className="text-sm font-medium text-neutral-600">Thuật toán đang ghép nối thuộc tính của bạn.</p>
            </div>
          </div>
        )}

        {/* Step 5: Results */}
        {step === 5 && (
          <div className="py-12 px-4 sm:px-8 bg-[#EFEDE8]">
            <div className="text-center mb-10 pb-6 border-b border-neutral-300">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] inline-block mb-3 border border-black px-3 py-1">KẾT QUẢ</span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold italic mb-4">Gợi ý dành riêng cho bạn</h2>
              <p className="text-neutral-700 text-sm font-medium">
                Dựa trên tính cách và khối thi <strong>{khoiThi}</strong> của bạn.
              </p>
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
