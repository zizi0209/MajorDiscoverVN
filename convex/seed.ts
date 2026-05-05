import { mutation } from "./_generated/server";

// Map từ category cũ sang categorySlug mới
// cong-nghe-thong-tin → cntt
// quan-tri-kinh-doanh → kinh-te-quan-tri
// y-khoa → y-duoc
// tam-ly-hoc → tam-ly
// ngon-ngu-anh → ngoai-ngu
// ky-thuat-o-to → o-to-co-khi
// ke-toan → ke-toan
// duoc-hoc → y-duoc

const SEED_DATA = [
  {
    slug: "cong-nghe-thong-tin",
    name: "Công nghệ thông tin",
    code: "7480201",
    description: "Ngành học về máy tính, phần mềm, mạng và các hệ thống phân phối dữ liệu. Học viên sẽ được trang bị kiến thức nền tảng và chuyên sâu về khoa học máy tính và kỹ thuật phần mềm.",
    pros: [
      "Cơ hội việc làm rộng mở, thu nhập cao.",
      "Môi trường làm việc năng động, linh hoạt (có thể remote).",
      "Nhu cầu nhân lực luôn tăng trưởng.",
    ],
    cons: [
      "Cạnh tranh cao, đòi hỏi phải liên tục tự học và cập nhật công nghệ mới.",
      "Áp lực công việc lớn, thường xuyên ngồi máy tính ảnh hưởng sức khỏe.",
      "Tuổi nghề lập trình viên bị nhiều định kiến.",
    ],
    subjects: ["A00", "A01", "D01", "D07"],
    categorySlug: "cntt",
    universities: [
      { name: "Đại học Bách khoa Hà Nội (HUST)", region: "North", lastYearScore: 28.5, predictedScore: 28.3, khoi: ["A00", "A01"] },
      { name: "Đại học Công nghệ - ĐHQGHN (UET)", region: "North", lastYearScore: 27.8, predictedScore: 27.5, khoi: ["A00", "A01"] },
      { name: "Đại học Bách khoa - ĐHQG-HCM (HCMUT)", region: "South", lastYearScore: 28.0, predictedScore: 27.8, khoi: ["A00", "A01"] },
      { name: "Đại học Khoa học Tự nhiên - ĐHQG-HCM", region: "South", lastYearScore: 27.5, predictedScore: 27.2, khoi: ["A00", "A01", "D01"] },
      { name: "Đại học Bách khoa - ĐH Đà Nẵng", region: "Central", lastYearScore: 26.5, predictedScore: 26.2, khoi: ["A00", "A01"] },
    ],
  },
  {
    slug: "quan-tri-kinh-doanh",
    name: "Quản trị Kinh doanh",
    code: "7340101",
    description: "Cung cấp kiến thức căn bản và chuyên sâu về quản trị doanh nghiệp, bao gồm quản trị nhân sự, tài chính, marketing, và chuỗi cung ứng.",
    pros: [
      "Kiến thức rộng, có thể làm đa dạng các vị trí trong doanh nghiệp.",
      "Rèn luyện kỹ năng mềm, tư duy logic và lãnh đạo.",
      "Phù hợp với người hướng ngoại, thích giao tiếp.",
    ],
    cons: [
      "Kiến thức chung chung, thiếu chuyên môn hẹp khi mới ra trường.",
      "Cạnh tranh xin việc gắt gao do số lượng cử nhân lớn.",
      "Yêu cầu kỹ năng mềm cao từ nhà tuyển dụng.",
    ],
    subjects: ["A00", "A01", "D01", "D07"],
    categorySlug: "kinh-te-quan-tri",
    universities: [
      { name: "Đại học Ngoại thương (FTU)", region: "North", lastYearScore: 28.2, predictedScore: 28.0, khoi: ["A00", "A01", "D01", "D07"] },
      { name: "Đại học Kinh tế Quốc dân (NEU)", region: "North", lastYearScore: 27.7, predictedScore: 27.5, khoi: ["A00", "A01", "D01"] },
      { name: "Đại học Kinh tế TP.HCM (UEH)", region: "South", lastYearScore: 27.2, predictedScore: 27.0, khoi: ["A00", "A01", "D01", "D07"] },
      { name: "Đại học Kinh tế - ĐH Đà Nẵng", region: "Central", lastYearScore: 25.5, predictedScore: 25.0, khoi: ["A00", "A01", "D01"] },
    ],
  },
  {
    slug: "y-khoa",
    name: "Y khoa (Y đa khoa)",
    code: "7720101",
    description: "Ngành đào tạo Bác sĩ y khoa để chăm sóc, phòng ngừa, chẩn đoán và điều trị bệnh cho con người. Yêu cầu sinh viên có nền tảng Toán, Hóa, Sinh xuất sắc.",
    pros: [
      "Nghề nghiệp danh giá, được xã hội tôn trọng.",
      "Thu nhập ổn định và tăng dần theo kinh nghiệm.",
      "Cơ hội phát triển phòng khám tư.",
    ],
    cons: [
      "Thời gian đào tạo dài (6 năm + nội trú/chuyên khoa).",
      "Áp lực công việc vô cùng lớn, ảnh hưởng đến thời gian cá nhân.",
      "Điểm chuẩn đầu vào cực kỳ cao.",
    ],
    subjects: ["B00", "A00"],
    categorySlug: "y-duoc",
    universities: [
      { name: "Đại học Y Hà Nội (HMU)", region: "North", lastYearScore: 28.9, predictedScore: 28.5, khoi: ["B00"] },
      { name: "Đại học Y Dược TP.HCM (UMP)", region: "South", lastYearScore: 28.5, predictedScore: 28.4, khoi: ["B00", "A00"] },
      { name: "Đại học Y khoa Phạm Ngọc Thạch", region: "South", lastYearScore: 27.9, predictedScore: 27.6, khoi: ["B00"] },
      { name: "Đại học Y Dược - ĐH Huế", region: "Central", lastYearScore: 27.5, predictedScore: 27.3, khoi: ["B00"] },
    ],
  },
  {
    slug: "tam-ly-hoc",
    name: "Tâm lý học",
    code: "7310401",
    description: "Nghiên cứu về các hiện tượng tâm lý, hành vi và tinh thần của con người. Có thể chia thành Tâm lý học lâm sàng, Tâm lý học tham vấn, Tâm lý học nhân sự.",
    pros: [
      "Ngành ngày càng được quan tâm và có nhu cầu cao tại Việt Nam.",
      "Đa dạng lĩnh vực: nhân sự (HR), marketing, tham vấn học đường, trị liệu tâm lý.",
      "Thấu hiểu bản thân và người khác tốt hơn.",
    ],
    cons: [
      "Nghề trị liệu tâm lý ở VN còn mới, thu nhập người mới ra trường chưa cao.",
      "Học nhiều lý thuyết trừu tượng, đòi hỏi sự kiên nhẫn và đồng cảm lớn.",
      "Ảnh hưởng tâm lý cá nhân nếu không biết cách cân bằng.",
    ],
    subjects: ["C00", "D01", "D14", "B00"],
    categorySlug: "tam-ly",
    universities: [
      { name: "ĐH Khoa học Xã hội và Nhân văn - ĐHQGHN", region: "North", lastYearScore: 28.0, predictedScore: 27.8, khoi: ["C00"] },
      { name: "ĐH Khoa học Xã hội và Nhân văn - ĐHQG-HCM", region: "South", lastYearScore: 27.8, predictedScore: 27.5, khoi: ["C00", "D01"] },
      { name: "Đại học Sư phạm TP.HCM", region: "South", lastYearScore: 27.0, predictedScore: 26.8, khoi: ["C00", "D01"] },
    ],
  },
  {
    slug: "ngon-ngu-anh",
    name: "Ngôn ngữ Anh",
    code: "7220201",
    description: "Đào tạo cử nhân sử dụng thành thạo tiếng Anh. Người học được trang bị kiến thức về văn hóa, kinh tế, xã hội của các quốc gia nói tiếng Anh, kèm các kỹ năng biên - phiên dịch, sư phạm.",
    pros: [
      "Dễ xin việc với chứng chỉ tiếng Anh (Sư phạm, Phiên dịch, Trợ lý, Du lịch...).",
      "Làm bàn đạp tốt để học lên/làm việc các ngành kinh tế, truyền thông.",
      "Kỹ năng mềm và sự tự tin cao.",
    ],
    cons: [
      "Tiếng Anh đã trở thành kỹ năng phổ biến, sinh viên cần học thêm kỹ năng phụ.",
      "Nguy cơ bị thay thế bởi AI trong các tác vụ biên dịch đơn giản.",
      "Cạnh tranh với các sinh viên ngành khác có tiếng Anh tốt.",
    ],
    subjects: ["D01", "A01", "D14", "D15"],
    categorySlug: "ngoai-ngu",
    universities: [
      { name: "Đại học Ngoại thương (FTU)", region: "North", lastYearScore: 28.0, predictedScore: 27.8, khoi: ["D01"] },
      { name: "Đại học Hà Nội (HANU)", region: "North", lastYearScore: 35.5, predictedScore: 35.0, khoi: ["D01"] },
      { name: "ĐH Khoa học Xã hội và Nhân văn - ĐHQG-HCM", region: "South", lastYearScore: 27.2, predictedScore: 27.0, khoi: ["D01"] },
      { name: "Đại học Ngoại ngữ - ĐH Đà Nẵng", region: "Central", lastYearScore: 26.0, predictedScore: 25.8, khoi: ["D01"] },
    ],
  },
  {
    slug: "ky-thuat-o-to",
    name: "Kỹ thuật Ô tô",
    code: "7520130",
    description: "Tích hợp kiến thức của nhiều lĩnh vực: cơ khí, tự động hóa, điện - điện tử và công nghệ phần mềm để chế tạo và sáng tạo các hệ thống ô tô.",
    pros: [
      "Thị trường ô tô Việt Nam đang trên đà bứt phá (VinFast, Thaco...).",
      "Tiếp cận với công nghệ hiện đại (xe điện, xe tự lái).",
      "Nhu cầu Kỹ sư phần mềm ô tô (Automotive Software) bùng nổ.",
    ],
    cons: [
      "Môi trường học tập và làm việc nhiều nam giới, máy móc bụi bặm.",
      "Đòi hỏi sức khỏe tốt và tính cẩn thận, chính xác cao.",
      "Yêu cầu ngoại ngữ khắt khe nếu muốn vào các tập đoàn lớn.",
    ],
    subjects: ["A00", "A01", "C01", "D01"],
    categorySlug: "o-to-co-khi",
    universities: [
      { name: "Đại học Bách khoa Hà Nội (HUST)", region: "North", lastYearScore: 27.6, predictedScore: 27.4, khoi: ["A00", "A01"] },
      { name: "Đại học Sư phạm Kỹ thuật TP.HCM (HCMUTE)", region: "South", lastYearScore: 26.8, predictedScore: 26.5, khoi: ["A00", "A01"] },
      { name: "Đại học Bách khoa - ĐHQG-HCM", region: "South", lastYearScore: 27.2, predictedScore: 27.0, khoi: ["A00", "A01"] },
      { name: "Đại học Bách khoa - ĐH Đà Nẵng", region: "Central", lastYearScore: 25.5, predictedScore: 25.2, khoi: ["A00", "A01"] },
    ],
  },
  {
    slug: "ke-toan",
    name: "Kế toán",
    code: "7340301",
    description: "Đào tạo chuyên gia kế toán, kiểm toán với kiến thức về tài chính, thuế, kiểm soát nội bộ. Có thể làm việc tại mọi loại hình doanh nghiệp từ SME đến tập đoàn đa quốc gia.",
    pros: [
      "Nhu cầu tuyển dụng ổn định tại mọi doanh nghiệp.",
      "Có thể thi các chứng chỉ quốc tế: CPA, ACCA, CFA để nâng lương.",
      "Công việc rõ ràng, có quy trình chuẩn.",
    ],
    cons: [
      "Công việc lặp đi lặp lại, đòi hỏi tính kiên nhẫn cực cao.",
      "Áp lực cuối kỳ kế toán, kiểm toán (nếu làm Big4).",
      "Nguy cơ tự động hóa một phần bởi phần mềm và AI.",
    ],
    subjects: ["A00", "A01", "D01", "D07"],
    categorySlug: "ke-toan",
    universities: [
      { name: "Học viện Tài chính", region: "North", lastYearScore: 26.5, predictedScore: 26.3, khoi: ["A00", "A01", "D01"] },
      { name: "Đại học Kinh tế Quốc dân (NEU)", region: "North", lastYearScore: 27.0, predictedScore: 26.8, khoi: ["A00", "A01", "D01"] },
      { name: "Đại học Kinh tế TP.HCM (UEH)", region: "South", lastYearScore: 26.8, predictedScore: 26.5, khoi: ["A00", "A01", "D01"] },
      { name: "Đại học Tài chính - Marketing (UFM)", region: "South", lastYearScore: 24.5, predictedScore: 24.3, khoi: ["A00", "A01", "D01"] },
    ],
  },
  {
    slug: "duoc-hoc",
    name: "Dược học",
    code: "7720201",
    description: "Đào tạo Dược sĩ có kiến thức về thuốc, dược phẩm, hóa học dược và dược lý. Làm việc tại nhà thuốc, bệnh viện, công ty dược phẩm trong và ngoài nước.",
    pros: [
      "Điểm đầu vào thấp hơn Y khoa nhưng thu nhập không kém.",
      "Có thể mở nhà thuốc kinh doanh tư.",
      "Nhiều cơ hội làm việc tại công ty dược phẩm đa quốc gia.",
    ],
    cons: [
      "Thời gian học lâu (5 năm) và yêu cầu thực tập nghiêm ngặt.",
      "Nhiều môn học khó như Hóa hữu cơ, Dược lý.",
      "Đòi hỏi tính cẩn thận tuyệt đối để tránh sai sót y khoa.",
    ],
    subjects: ["B00", "A00", "D07"],
    categorySlug: "y-duoc",
    universities: [
      { name: "Đại học Dược Hà Nội (HUP)", region: "North", lastYearScore: 27.5, predictedScore: 27.3, khoi: ["B00"] },
      { name: "Đại học Y Dược TP.HCM - Khoa Dược", region: "South", lastYearScore: 27.0, predictedScore: 26.8, khoi: ["B00", "A00"] },
      { name: "Đại học Y Dược Cần Thơ", region: "South", lastYearScore: 25.5, predictedScore: 25.3, khoi: ["B00"] },
    ],
  },
];

export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    let seeded = 0;
    for (const major of SEED_DATA) {
      const existing = await ctx.db
        .query("majors")
        .withIndex("by_slug", q => q.eq("slug", major.slug))
        .unique();
      if (!existing) {
        await ctx.db.insert("majors", major);
        seeded++;
      }
    }
    return { seeded };
  },
});
