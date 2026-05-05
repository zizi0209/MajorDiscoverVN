// Bộ câu hỏi khảo sát adaptive - dạng Đúng/Sai
// Flow: Tổ hợp môn → Tư duy → Câu hỏi nhánh theo profile

// ---- Tổ hợp môn thi ----
export const KHOI_OPTIONS = [
  { value: "A00", label: "A00 — Toán, Lý, Hóa" },
  { value: "A01", label: "A01 — Toán, Lý, Anh" },
  { value: "B00", label: "B00 — Toán, Hóa, Sinh" },
  { value: "C00", label: "C00 — Văn, Sử, Địa" },
  { value: "D01", label: "D01 — Toán, Văn, Anh" },
  { value: "D07", label: "D07 — Toán, Hóa, Anh" },
  { value: "D14", label: "D14 — Văn, Sử, Anh" },
  { value: "H00", label: "H00 — Văn, Vẽ năng khiếu" },
  { value: "V00", label: "V00 — Toán, Lý, Vẽ" },
] as const;

// Map khối thi → nhóm ngành có tổ hợp đó (boost điểm)
export const KHOI_TO_CATS: Record<string, string[]> = {
  A00: ["cntt","ban-dan","kinh-te-quan-tri","ke-toan","tai-chinh-ngan-hang","o-to-co-khi","dien-tu-dong-hoa","xay-dung-kien-truc","hang-khong-hat-nhan","vat-lieu","toan-thong-ke","su-pham","luat","nhan-su","khoa-hoc-tu-nhien","cong-an-quan-doi","y-duoc","thu-y","hang-hai-thuy-loi","mo-dia-chat","sinh-hoa","thuc-pham","tai-nguyen-moi-truong","nong-lam-thuy-san"],
  A01: ["cntt","ban-dan","kinh-te-quan-tri","ke-toan","tai-chinh-ngan-hang","o-to-co-khi","dien-tu-dong-hoa","xay-dung-kien-truc","hang-khong-hat-nhan","su-pham","toan-thong-ke","luat","nhan-su","ngoai-thuong"],
  B00: ["y-duoc","thu-y","sinh-hoa","thuc-pham","tai-nguyen-moi-truong","nong-lam-thuy-san","hang-hai-thuy-loi","vat-lieu","mo-dia-chat","tam-ly","su-pham"],
  C00: ["van-hoa-xa-hoi","su-pham","bao-chi-marketing","tam-ly","luat","nhan-su","du-lich","ngoai-ngu","cong-an-quan-doi"],
  D01: ["ngoai-ngu","bao-chi-marketing","du-lich","kinh-te-quan-tri","ke-toan","tai-chinh-ngan-hang","cntt","su-pham","tam-ly","luat","nhan-su","ngoai-thuong","thiet-ke-do-hoa","in-giay","nong-lam-thuy-san","van-hoa-xa-hoi"],
  D07: ["tai-chinh-ngan-hang","kinh-te-quan-tri","ngoai-thuong","y-duoc","thuc-pham","sinh-hoa","tai-nguyen-moi-truong"],
  D14: ["ngoai-ngu","bao-chi-marketing","du-lich","tam-ly","van-hoa-xa-hoi"],
  H00: ["thiet-ke-do-hoa","my-thuat-am-nhac","thoi-trang"],
  V00: ["xay-dung-kien-truc","thiet-ke-do-hoa","my-thuat-am-nhac","thoi-trang"],
};

// ---- Câu hỏi Đúng/Sai ----
export type QuizQuestion = {
  id: string;
  text: string;
  // Nhóm ngành được cộng điểm khi trả lời "Đúng"
  boostCats: string[];
  // Nhóm ngành bị trừ điểm khi trả lời "Đúng" (optional)
  penaltyCats?: string[];
  // Chỉ hiện câu hỏi này nếu user thuộc nhánh này
  branch?: "logic" | "social" | "creative" | "care";
  // Dimension phục vụ phân loại
  dim: "thinking" | "personality" | "economics" | "talent" | "interest" | "values";
};

// Câu hỏi nền tảng (luôn hỏi, ~6 câu)
const BASE_QUESTIONS: QuizQuestion[] = [
  {
    id: "think_logic",
    text: "Bạn thích giải toán, xử lý bài toán có đáp án rõ ràng hơn là viết văn hay thảo luận?",
    boostCats: ["cntt","ban-dan","toan-thong-ke","dien-tu-dong-hoa","o-to-co-khi","xay-dung-kien-truc","hang-khong-hat-nhan","vat-lieu","khoa-hoc-tu-nhien"],
    penaltyCats: ["van-hoa-xa-hoi","bao-chi-marketing","my-thuat-am-nhac"],
    dim: "thinking",
  },
  {
    id: "think_social",
    text: "Bạn thích giao tiếp với nhiều người, làm việc nhóm và thuyết trình trước đám đông?",
    boostCats: ["bao-chi-marketing","du-lich","kinh-te-quan-tri","ngoai-thuong","nhan-su","luat","ngoai-ngu"],
    penaltyCats: ["toan-thong-ke","khoa-hoc-tu-nhien","ban-dan"],
    dim: "thinking",
  },
  {
    id: "econ_limit",
    text: "Gia đình bạn có điều kiện kinh tế hạn chế, bạn cần ngành học có học phí thấp hoặc được miễn phí?",
    boostCats: ["su-pham","cong-an-quan-doi","nong-lam-thuy-san"],
    penaltyCats: ["hang-khong-hat-nhan","y-duoc"],
    dim: "economics",
  },
  {
    id: "time_invest",
    text: "Bạn sẵn sàng học 5-6 năm (hoặc hơn) để có bằng cấp chuyên sâu?",
    boostCats: ["y-duoc","luat","kien-truc","hang-khong-hat-nhan"],
    penaltyCats: ["du-lich","thoi-trang","in-giay"],
    dim: "economics",
  },
  {
    id: "creative",
    text: "Bạn thích vẽ, thiết kế, tạo ra sản phẩm có tính thẩm mỹ cao?",
    boostCats: ["thiet-ke-do-hoa","my-thuat-am-nhac","thoi-trang","xay-dung-kien-truc"],
    penaltyCats: ["ke-toan","tai-chinh-ngan-hang","mo-dia-chat"],
    dim: "talent",
  },
  {
    id: "help_people",
    text: "Bạn có mong muốn mạnh mẽ được giúp đỡ, chữa trị hoặc chăm sóc người khác?",
    boostCats: ["y-duoc","tam-ly","su-pham","cong-tac-xa-hoi","thu-y"],
    penaltyCats: ["cntt","ban-dan","toan-thong-ke"],
    dim: "values",
  },
];

// Câu hỏi nhánh LOGIC (hiện khi user thiên logic)
const LOGIC_QUESTIONS: QuizQuestion[] = [
  {
    id: "logic_code",
    text: "Bạn có hứng thú với lập trình, máy tính, và việc tạo ra phần mềm/ứng dụng?",
    boostCats: ["cntt","ban-dan"],
    branch: "logic", dim: "interest",
  },
  {
    id: "logic_machine",
    text: "Bạn thích tìm hiểu cách máy móc, động cơ, hệ thống cơ khí hoạt động?",
    boostCats: ["o-to-co-khi","dien-tu-dong-hoa","hang-khong-hat-nhan","vat-lieu"],
    branch: "logic", dim: "interest",
  },
  {
    id: "logic_data",
    text: "Bạn thích phân tích số liệu, thống kê, tìm quy luật từ dữ liệu?",
    boostCats: ["toan-thong-ke","cntt","tai-chinh-ngan-hang","ke-toan"],
    branch: "logic", dim: "interest",
  },
  {
    id: "logic_build",
    text: "Bạn thích thiết kế và xây dựng các công trình, cầu đường, nhà cửa?",
    boostCats: ["xay-dung-kien-truc","hang-hai-thuy-loi"],
    branch: "logic", dim: "interest",
  },
  {
    id: "logic_lab",
    text: "Bạn có thích làm thí nghiệm trong phòng lab, nghiên cứu khoa học?",
    boostCats: ["sinh-hoa","vat-lieu","khoa-hoc-tu-nhien","thuc-pham","tai-nguyen-moi-truong"],
    branch: "logic", dim: "interest",
  },
];

// Câu hỏi nhánh XÃ HỘI (hiện khi user thiên xã hội)
const SOCIAL_QUESTIONS: QuizQuestion[] = [
  {
    id: "social_biz",
    text: "Bạn muốn tự kinh doanh, khởi nghiệp hoặc quản lý một công ty?",
    boostCats: ["kinh-te-quan-tri","ngoai-thuong","tai-chinh-ngan-hang"],
    branch: "social", dim: "interest",
  },
  {
    id: "social_lang",
    text: "Bạn có đam mê học ngoại ngữ và muốn làm việc trong môi trường quốc tế?",
    boostCats: ["ngoai-ngu","ngoai-thuong","du-lich"],
    branch: "social", dim: "interest",
  },
  {
    id: "social_media",
    text: "Bạn thích viết bài, làm video, sáng tạo nội dung trên mạng xã hội?",
    boostCats: ["bao-chi-marketing","thiet-ke-do-hoa"],
    branch: "social", dim: "interest",
  },
  {
    id: "social_law",
    text: "Bạn quan tâm đến pháp luật, công lý và muốn bảo vệ quyền lợi người khác?",
    boostCats: ["luat","cong-an-quan-doi"],
    branch: "social", dim: "interest",
  },
  {
    id: "social_teach",
    text: "Bạn thích giảng dạy, chia sẻ kiến thức và truyền cảm hứng cho người khác?",
    boostCats: ["su-pham"],
    branch: "social", dim: "interest",
  },
];

// Câu hỏi nhánh SÁNG TẠO
const CREATIVE_QUESTIONS: QuizQuestion[] = [
  {
    id: "cre_digital",
    text: "Bạn thích thiết kế đồ họa, UI/UX, hoặc tạo sản phẩm số trên máy tính?",
    boostCats: ["thiet-ke-do-hoa","cntt"],
    branch: "creative", dim: "interest",
  },
  {
    id: "cre_fashion",
    text: "Bạn đam mê thời trang, muốn thiết kế quần áo hoặc phụ kiện?",
    boostCats: ["thoi-trang"],
    branch: "creative", dim: "interest",
  },
  {
    id: "cre_art",
    text: "Bạn có năng khiếu âm nhạc, hội họa hoặc biểu diễn nghệ thuật?",
    boostCats: ["my-thuat-am-nhac"],
    branch: "creative", dim: "interest",
  },
  {
    id: "cre_arch",
    text: "Bạn thích kết hợp kỹ thuật với thẩm mỹ để tạo ra không gian sống đẹp?",
    boostCats: ["xay-dung-kien-truc","thiet-ke-do-hoa"],
    branch: "creative", dim: "interest",
  },
];

// Câu hỏi nhánh CHĂM SÓC
const CARE_QUESTIONS: QuizQuestion[] = [
  {
    id: "care_med",
    text: "Bạn muốn trở thành bác sĩ, dược sĩ hoặc làm việc trong bệnh viện?",
    boostCats: ["y-duoc"],
    branch: "care", dim: "interest",
  },
  {
    id: "care_psych",
    text: "Bạn quan tâm đến sức khỏe tinh thần, tâm lý và muốn tư vấn/trị liệu?",
    boostCats: ["tam-ly"],
    branch: "care", dim: "interest",
  },
  {
    id: "care_animal",
    text: "Bạn yêu động vật và muốn chăm sóc, chữa bệnh cho chúng?",
    boostCats: ["thu-y","nong-lam-thuy-san"],
    branch: "care", dim: "interest",
  },
  {
    id: "care_env",
    text: "Bạn quan tâm đến môi trường, biến đổi khí hậu và phát triển bền vững?",
    boostCats: ["tai-nguyen-moi-truong","nong-lam-thuy-san"],
    branch: "care", dim: "interest",
  },
];

// Câu hỏi bổ sung (hỏi cuối, refine thêm)
const REFINE_QUESTIONS: QuizQuestion[] = [
  {
    id: "ref_stable",
    text: "Bạn ưu tiên công việc ổn định, lương đều hơn là thu nhập cao nhưng rủi ro?",
    boostCats: ["su-pham","cong-an-quan-doi","ke-toan","nhan-su"],
    penaltyCats: ["kinh-te-quan-tri","bao-chi-marketing","my-thuat-am-nhac"],
    dim: "values",
  },
  {
    id: "ref_remote",
    text: "Bạn muốn làm việc ở thành phố lớn, không muốn đi xa hay xuống vùng nông thôn?",
    boostCats: ["cntt","kinh-te-quan-tri","tai-chinh-ngan-hang","bao-chi-marketing"],
    penaltyCats: ["nong-lam-thuy-san","mo-dia-chat","hang-hai-thuy-loi"],
    dim: "values",
  },
  {
    id: "ref_patience",
    text: "Bạn là người cẩn thận, tỉ mỉ, có thể ngồi làm việc tập trung nhiều giờ?",
    boostCats: ["ke-toan","cntt","ban-dan","y-duoc","toan-thong-ke"],
    dim: "personality",
  },
  {
    id: "ref_leader",
    text: "Bạn thường là người dẫn dắt, tổ chức trong nhóm bạn bè?",
    boostCats: ["kinh-te-quan-tri","nhan-su","luat","cong-an-quan-doi"],
    dim: "personality",
  },
];

// ---- Engine ----
export type QuizAnswers = Record<string, boolean>;

/** Xác định nhánh chính dựa trên câu trả lời base */
export function determineBranches(answers: QuizAnswers): ("logic" | "social" | "creative" | "care")[] {
  const branches: ("logic" | "social" | "creative" | "care")[] = [];
  if (answers["think_logic"]) branches.push("logic");
  if (answers["think_social"]) branches.push("social");
  if (answers["creative"]) branches.push("creative");
  if (answers["help_people"]) branches.push("care");
  // Fallback: nếu user không chọn gì đặc biệt, cho cả logic + social
  if (branches.length === 0) branches.push("logic", "social");
  return branches;
}

/** Lấy danh sách câu hỏi adaptive theo thứ tự */
export function getAdaptiveQuestions(answers: QuizAnswers): QuizQuestion[] {
  const branches = determineBranches(answers);
  const branchQs = [
    ...(branches.includes("logic") ? LOGIC_QUESTIONS : []),
    ...(branches.includes("social") ? SOCIAL_QUESTIONS : []),
    ...(branches.includes("creative") ? CREATIVE_QUESTIONS : []),
    ...(branches.includes("care") ? CARE_QUESTIONS : []),
  ];
  return [...BASE_QUESTIONS, ...branchQs, ...REFINE_QUESTIONS];
}

/** Tính điểm cho mỗi nhóm ngành */
export function scoreCategories(
  answers: QuizAnswers,
  khoiThi: string
): { slug: string; score: number }[] {
  const scores: Record<string, number> = {};
  const bump = (slug: string, pts: number) => {
    scores[slug] = (scores[slug] ?? 0) + pts;
  };

  // Boost từ khối thi (trọng số cao: 3 điểm)
  const khoiCats = KHOI_TO_CATS[khoiThi] ?? [];
  for (const cat of khoiCats) bump(cat, 3);

  // Tính điểm từ câu trả lời
  const allQs = getAdaptiveQuestions(answers);
  for (const q of allQs) {
    const answered = answers[q.id];
    if (answered === undefined) continue;
    if (answered) {
      for (const cat of q.boostCats) bump(cat, 2);
      if (q.penaltyCats) for (const cat of q.penaltyCats) bump(cat, -1);
    } else {
      // Trả lời "Sai" → nhẹ nhàng trừ điểm boost, cộng nhẹ penalty
      for (const cat of q.boostCats) bump(cat, -0.5);
      if (q.penaltyCats) for (const cat of q.penaltyCats) bump(cat, 0.5);
    }
  }

  return Object.entries(scores)
    .map(([slug, score]) => ({ slug, score }))
    .sort((a, b) => b.score - a.score);
}

/** Lấy top N category slugs */
export function getTopCategories(answers: QuizAnswers, khoiThi: string, n = 5): string[] {
  return scoreCategories(answers, khoiThi)
    .slice(0, n)
    .filter(x => x.score > 0)
    .map(x => x.slug);
}
