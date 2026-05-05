"use client";

import { useState } from "react";
import { Doc } from "@/convex/_generated/dataModel";
import { ChevronDown, ChevronUp } from "lucide-react";

type Major = Doc<"majors">;

const REGION_LABEL: Record<string, string> = { North: "Miền Bắc", Central: "Miền Trung", South: "Miền Nam" };

export function MajorCard({ major }: { major: Major }) {
  const [open, setOpen] = useState(false);
  const hasDetail = !!(major.description || major.pros?.length || major.cons?.length);
  const hasUni = !!major.universities?.length;

  return (
    <div className="w-full border border-neutral-300 bg-white">
      {/* Header */}
      <div className="border-b border-neutral-200 p-6">
        <div className="flex justify-between items-start mb-4">
          <span className="text-[10px] px-3 py-1 bg-black text-white font-bold tracking-widest">
            MÃ: {major.code}
          </span>
          {major.subjects?.length ? (
            <div className="flex gap-1 flex-wrap justify-end">
              {major.subjects.map(s => (
                <span key={s} className="text-[10px] font-bold border border-black px-2 py-0.5">{s}</span>
              ))}
            </div>
          ) : null}
        </div>
        <h3 className="text-4xl md:text-5xl font-serif font-bold leading-[0.9] text-black">
          {major.name}
        </h3>
        {major.description && (
          <p className="text-sm leading-relaxed text-neutral-700 mt-4 font-medium">{major.description}</p>
        )}
        {!hasDetail && (
          <p className="text-xs text-neutral-400 mt-4 italic">Thông tin chi tiết đang được cập nhật...</p>
        )}
      </div>

      {/* Pros & Cons */}
      {hasDetail && (
        <div className="p-6 grid md:grid-cols-2 gap-6">
          {major.pros?.length ? (
            <div className="border-t border-black pt-3">
              <p className="text-[10px] font-bold uppercase mb-2 italic">Ưu điểm</p>
              <ul className="space-y-1.5 text-xs leading-relaxed">
                {major.pros.map((pro, i) => <li key={i} className="flex gap-2"><span className="font-bold">-</span>{pro}</li>)}
              </ul>
            </div>
          ) : null}
          {major.cons?.length ? (
            <div className="border-t border-black pt-3">
              <p className="text-[10px] font-bold uppercase mb-2 italic">Hạn chế</p>
              <ul className="space-y-1.5 text-xs leading-relaxed">
                {major.cons.map((con, i) => <li key={i} className="flex gap-2"><span className="font-bold">-</span>{con}</li>)}
              </ul>
            </div>
          ) : null}
        </div>
      )}

      {/* Universities Accordion */}
      {hasUni && (
        <div className="px-6 pb-6">
          <button
            onClick={() => setOpen(o => !o)}
            className="w-full flex items-center justify-between bg-neutral-100 p-3 border border-neutral-200 text-xs font-bold uppercase hover:bg-neutral-200 transition-colors"
          >
            <span>Phân tích điểm chuẩn các trường trọng điểm</span>
            {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
          {open && (
            <div className="border-x border-b border-neutral-200 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-neutral-50 text-[10px] uppercase font-bold">
                  <tr>
                    <th className="p-3 border-b border-neutral-200">Cơ sở đào tạo</th>
                    <th className="p-3 border-b border-neutral-200 text-center">2024</th>
                    <th className="p-3 border-b border-neutral-200 text-center text-[#C2410C]">Dự kiến 2025</th>
                  </tr>
                </thead>
                <tbody>
                  {major.universities!.map((uni, idx) => (
                    <tr key={idx} className="border-b border-neutral-200 last:border-0 hover:bg-neutral-50/50">
                      <td className="p-3">
                        <p className="font-semibold text-xs">{uni.name}</p>
                        <p className="text-[9px] text-neutral-500 uppercase mt-1 tracking-widest">
                          {REGION_LABEL[uni.region] ?? uni.region} • {uni.khoi.join(", ")}
                        </p>
                      </td>
                      <td className="p-3 text-center text-xs">{uni.lastYearScore}</td>
                      <td className="p-3 text-center font-bold text-xs text-[#C2410C]">
                        {uni.predictedScore}{" "}
                        {uni.predictedScore > uni.lastYearScore ? "↑" : uni.predictedScore < uni.lastYearScore ? "↓" : ""}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

