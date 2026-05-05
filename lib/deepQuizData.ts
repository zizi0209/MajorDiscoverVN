// Khảo sát chuyên sâu theo nhóm ngành - đo 17 trait, tính % phù hợp

export const TRAITS = [
  "logic","creativity","communication","patience","empathy","tech",
  "language","research","pressure","financial","outdoor","teamwork",
  "leadership","art","manual","math","science",
] as const;
export type Trait = (typeof TRAITS)[number];

export const TRAIT_INFO: Record<Trait, [string, string]> = {
  logic:         ["Tư duy logic & phân tích", "phân tích vấn đề, suy luận từng bước"],
  creativity:    ["Sáng tạo", "nghĩ ra ý tưởng mới, khác biệt"],
  communication: ["Giao tiếp & thuyết trình", "nói trước đám đông, thuyết phục người khác"],
  patience:      ["Kiên nhẫn & tỉ mỉ", "tập trung lâu, làm việc cẩn thận"],
  empathy:       ["Đồng cảm & thấu hiểu", "cảm nhận cảm xúc người khác"],
  tech:          ["Am hiểu công nghệ", "sử dụng và tìm hiểu công nghệ mới"],
  language:      ["Ngoại ngữ", "giao tiếp bằng ngoại ngữ"],
  research:      ["Nghiên cứu & học thuật", "đọc nhiều, tìm hiểu sâu"],
  pressure:      ["Chịu áp lực", "giữ bình tĩnh khi deadline, áp lực"],
  financial:     ["Đầu tư tài chính dài hạn", "học phí cao hoặc thời gian dài"],
  outdoor:       ["Hoạt động ngoài trời", "di chuyển, làm việc thực địa"],
  teamwork:      ["Làm việc nhóm", "phối hợp, trao đổi với nhiều người"],
  leadership:    ["Lãnh đạo & tổ chức", "dẫn dắt, phân công, quản lý"],
  art:           ["Nghệ thuật & thẩm mỹ", "hội họa, âm nhạc, thẩm mỹ"],
  manual:        ["Thực hành & chế tạo", "lắp ráp, thí nghiệm, làm tay"],
  math:          ["Toán học", "tính toán, giải toán, mô hình"],
  science:       ["Khoa học tự nhiên", "Lý, Hóa, Sinh, hiện tượng tự nhiên"],
};

// 20 câu hỏi Đúng/Sai, mỗi câu đo 1 trait
export type DeepQ = { id: string; text: string; trait: Trait };
export const DEEP_QUESTIONS: DeepQ[] = [
  { id: "d_log1", text: "Bạn thích giải quyết vấn đề bằng cách phân tích từng bước một?", trait: "logic" },
  { id: "d_log2", text: "Bạn thấy thoải mái khi làm việc với công thức, thuật toán?", trait: "logic" },
  { id: "d_cre1", text: "Bạn thường có ý tưởng mới lạ mà người khác chưa nghĩ tới?", trait: "creativity" },
  { id: "d_com1", text: "Bạn tự tin khi thuyết trình trước lớp hoặc nói chuyện với người lạ?", trait: "communication" },
  { id: "d_com2", text: "Bạn dễ dàng thuyết phục người khác đồng ý với ý kiến của mình?", trait: "communication" },
  { id: "d_pat1", text: "Bạn có thể ngồi tập trung làm một việc tỉ mỉ trong nhiều giờ liền?", trait: "patience" },
  { id: "d_emp1", text: "Bạn dễ nhận ra khi ai đó đang buồn, dù họ không nói ra?", trait: "empathy" },
  { id: "d_tec1", text: "Bạn hay tự tìm hiểu phần mềm, ứng dụng hoặc thiết bị công nghệ mới?", trait: "tech" },
  { id: "d_tec2", text: "Bạn cảm thấy hào hứng khi được học cách dùng công cụ số mới?", trait: "tech" },
  { id: "d_lan1", text: "Bạn có thể giao tiếp cơ bản bằng ít nhất một ngoại ngữ?", trait: "language" },
  { id: "d_res1", text: "Bạn thích đọc sách, nghiên cứu sâu về một chủ đề cụ thể?", trait: "research" },
  { id: "d_pre1", text: "Bạn giữ được bình tĩnh và hiệu quả khi bị áp lực thời gian?", trait: "pressure" },
  { id: "d_fin1", text: "Gia đình bạn có thể hỗ trợ tài chính cho việc học dài hạn (5-6 năm)?", trait: "financial" },
  { id: "d_out1", text: "Bạn thích hoạt động ngoài trời, di chuyển nhiều hơn ngồi một chỗ?", trait: "outdoor" },
  { id: "d_tea1", text: "Bạn thích làm việc nhóm, trao đổi với nhiều người hơn tự làm một mình?", trait: "teamwork" },
  { id: "d_lea1", text: "Bạn thường đứng ra tổ chức, phân công công việc cho nhóm?", trait: "leadership" },
  { id: "d_art1", text: "Bạn có năng khiếu hoặc đam mê hội họa, âm nhạc, hoặc biểu diễn?", trait: "art" },
  { id: "d_man1", text: "Bạn thích thao tác bằng tay: lắp ráp, thí nghiệm, chế tạo?", trait: "manual" },
  { id: "d_mat1", text: "Toán là một trong những môn bạn học tốt nhất ở trường?", trait: "math" },
  { id: "d_sci1", text: "Bạn giỏi và thích các môn khoa học tự nhiên (Lý, Hóa, Sinh)?", trait: "science" },
];

// Profile nhóm ngành: trait → mức độ quan trọng (1-10)
// Chỉ liệt kê trait thật sự cần, còn lại mặc định = 0
type P = Partial<Record<Trait, number>>;
export const CAT_PROFILES: Record<string, P> = {
  "ke-toan":              { patience: 9, math: 8, pressure: 7, logic: 6 },
  "tai-chinh-ngan-hang":  { math: 8, pressure: 9, logic: 7, communication: 6, leadership: 5 },
  "kinh-te-quan-tri":     { leadership: 8, communication: 8, teamwork: 7, pressure: 7, logic: 5 },
  "cntt":                 { tech: 10, logic: 9, math: 8, patience: 7, research: 5 },
  "ban-dan":              { math: 9, logic: 9, patience: 9, science: 8, research: 7, manual: 5 },
  "bao-chi-marketing":    { creativity: 9, communication: 9, teamwork: 6, language: 5 },
  "su-pham":              { communication: 8, empathy: 8, patience: 8, teamwork: 6, research: 5 },
  "y-duoc":               { science: 9, patience: 9, empathy: 8, pressure: 9, financial: 7, research: 7 },
  "thu-y":                { science: 8, empathy: 7, manual: 7, outdoor: 6, patience: 7 },
  "cong-an-quan-doi":     { pressure: 9, outdoor: 7, leadership: 7, teamwork: 8, patience: 6 },
  "thiet-ke-do-hoa":      { art: 9, creativity: 9, tech: 7, patience: 6 },
  "xay-dung-kien-truc":   { math: 8, logic: 7, creativity: 6, manual: 6, outdoor: 6, patience: 7 },
  "ngoai-ngu":            { language: 10, communication: 7, research: 5, patience: 6 },
  "ngoai-thuong":         { language: 8, communication: 8, leadership: 6, pressure: 7, math: 5 },
  "du-lich":              { communication: 9, language: 7, outdoor: 7, teamwork: 6, empathy: 5 },
  "o-to-co-khi":          { manual: 8, math: 7, logic: 7, patience: 7, science: 6 },
  "dien-tu-dong-hoa":     { math: 8, logic: 8, tech: 7, manual: 6, science: 7 },
  "hang-hai-thuy-loi":    { outdoor: 8, pressure: 8, math: 6, manual: 6, patience: 7 },
  "hang-khong-hat-nhan":  { math: 9, science: 9, pressure: 9, logic: 8, financial: 7 },
  "vat-lieu":             { science: 9, research: 8, patience: 8, math: 7, manual: 6 },
  "thuc-pham":            { science: 7, patience: 7, manual: 6, research: 5 },
  "in-giay":              { tech: 6, manual: 6, creativity: 5, patience: 6 },
  "sinh-hoa":             { science: 9, research: 8, patience: 8, math: 6, manual: 7 },
  "luat":                 { logic: 8, communication: 7, research: 8, pressure: 7, patience: 7 },
  "mo-dia-chat":          { outdoor: 9, science: 7, pressure: 7, manual: 6, math: 6 },
  "my-thuat-am-nhac":     { art: 10, creativity: 9, patience: 6 },
  "tai-nguyen-moi-truong":{ science: 7, outdoor: 7, research: 6, patience: 6 },
  "tam-ly":               { empathy: 10, communication: 7, patience: 8, research: 6 },
  "the-thao":             { outdoor: 9, pressure: 7, teamwork: 6, leadership: 5 },
  "thoi-trang":           { art: 8, creativity: 9, manual: 6, communication: 5 },
  "nong-lam-thuy-san":    { outdoor: 9, science: 6, patience: 7, manual: 7 },
  "toan-thong-ke":        { math: 10, logic: 9, patience: 8, research: 7 },
  "nhan-su":              { communication: 8, empathy: 7, leadership: 7, teamwork: 7, patience: 5 },
  "van-hoa-xa-hoi":       { research: 8, communication: 6, empathy: 6, language: 5 },
  "khoa-hoc-tu-nhien":    { math: 8, science: 9, research: 9, logic: 7, patience: 7 },
};

// ---- Engine ----
export type DeepAnswers = Record<string, boolean>;

/** Tính điểm từng trait (0-100) từ câu trả lời */
export function calcTraitScores(answers: DeepAnswers): Record<Trait, number> {
  const scores = {} as Record<Trait, number>;
  for (const trait of TRAITS) {
    const qs = DEEP_QUESTIONS.filter(q => q.trait === trait);
    if (qs.length === 0) { scores[trait] = 50; continue; }
    const yes = qs.filter(q => answers[q.id] === true).length;
    scores[trait] = Math.round((yes / qs.length) * 100);
  }
  return scores;
}

type MatchItem = { trait: Trait; label: string; importance: string; score: number };

export function analyzeMatch(answers: DeepAnswers, catSlug: string) {
  const traitScores = calcTraitScores(answers);
  const profile = CAT_PROFILES[catSlug] ?? {};

  let totalWeight = 0, totalScore = 0;
  const strengths: MatchItem[] = [];
  const weaknesses: MatchItem[] = [];

  for (const [t, importance] of Object.entries(profile) as [Trait, number][]) {
    totalWeight += importance;
    const s = traitScores[t];
    totalScore += (s / 100) * importance;
    const imp = importance >= 8 ? "Rất quan trọng" : importance >= 5 ? "Quan trọng" : "Hữu ích";
    const item: MatchItem = { trait: t, label: TRAIT_INFO[t][0], importance: imp, score: s };
    if (s >= 50) strengths.push(item);
    else weaknesses.push(item);
  }

  // Sort: quan trọng nhất lên trước
  strengths.sort((a, b) => (b.score - a.score));
  weaknesses.sort((a, b) => (a.score - b.score));

  const matchPercent = totalWeight > 0 ? Math.min(99, Math.max(5, Math.round((totalScore / totalWeight) * 100))) : 50;
  return { matchPercent, strengths, weaknesses, traitScores };
}
