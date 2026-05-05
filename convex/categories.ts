import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Rule #3: by_order index → list theo thứ tự display
export const list = query({
  args: {},
  handler: async (ctx) =>
    ctx.db.query("majorCategories").withIndex("by_order").order("asc").collect(),
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, { slug }) =>
    ctx.db.query("majorCategories").withIndex("by_slug", q => q.eq("slug", slug)).unique(),
});

export const upsert = mutation({
  args: {
    slug: v.string(),
    name: v.string(),
    majorCount: v.number(),
    order: v.number(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("majorCategories")
      .withIndex("by_slug", q => q.eq("slug", args.slug))
      .unique();
    if (existing) {
      await ctx.db.patch(existing._id, args);
    } else {
      await ctx.db.insert("majorCategories", args);
    }
  },
});

// 36 nhóm ngành từ diemthi.tuyensinh247.com/nganh-dao-tao.html
const CATEGORIES = [
  { slug: "ke-toan", name: "Kế toán - Kiểm toán", majorCount: 3 },
  { slug: "tai-chinh-ngan-hang", name: "Tài chính - Ngân hàng - Bảo hiểm", majorCount: 9 },
  { slug: "kinh-te-quan-tri", name: "Kinh tế - Quản trị kinh doanh - Thương Mại", majorCount: 23 },
  { slug: "cntt", name: "Công nghệ thông tin - Tin học", majorCount: 26 },
  { slug: "ban-dan", name: "Công nghiệp bán dẫn", majorCount: 38 },
  { slug: "bao-chi-marketing", name: "Báo chí - Marketing - Quảng cáo - PR", majorCount: 15 },
  { slug: "su-pham", name: "Sư phạm - Giáo dục", majorCount: 35 },
  { slug: "y-duoc", name: "Y - Dược", majorCount: 22 },
  { slug: "thu-y", name: "Bác sĩ thú y", majorCount: 3 },
  { slug: "cong-an-quan-doi", name: "Công an - Quân đội", majorCount: 28 },
  { slug: "thiet-ke-do-hoa", name: "Thiết kế đồ họa - Game - Đa phương tiện", majorCount: 6 },
  { slug: "xay-dung-kien-truc", name: "Xây dựng - Kiến trúc - Giao thông", majorCount: 24 },
  { slug: "ngoai-ngu", name: "Ngoại giao - Ngoại ngữ", majorCount: 26 },
  { slug: "ngoai-thuong", name: "Ngoại thương - Xuất nhập khẩu - Kinh Tế quốc tế", majorCount: 9 },
  { slug: "du-lich", name: "Du lịch - Khách sạn", majorCount: 13 },
  { slug: "o-to-co-khi", name: "Ô tô - Cơ khí - Chế tạo", majorCount: 17 },
  { slug: "dien-tu-dong-hoa", name: "Điện lạnh - Điện tử - Điện - Tự động hóa", majorCount: 21 },
  { slug: "hang-hai-thuy-loi", name: "Hàng hải - Thủy lợi - Thời tiết", majorCount: 17 },
  { slug: "hang-khong-hat-nhan", name: "Hàng không - Vũ trụ - Hạt nhân", majorCount: 6 },
  { slug: "vat-lieu", name: "Công nghệ vật liệu", majorCount: 8 },
  { slug: "thuc-pham", name: "Công nghệ chế biến thực phẩm", majorCount: 5 },
  { slug: "in-giay", name: "Công nghệ In - Giấy", majorCount: 2 },
  { slug: "sinh-hoa", name: "Công nghệ sinh - Hóa", majorCount: 9 },
  { slug: "luat", name: "Luật - Tòa án", majorCount: 12 },
  { slug: "mo-dia-chat", name: "Mỏ - Địa chất", majorCount: 8 },
  { slug: "my-thuat-am-nhac", name: "Mỹ thuật - Âm nhạc - Nghệ thuật", majorCount: 22 },
  { slug: "tai-nguyen-moi-truong", name: "Tài nguyên - Môi trường", majorCount: 15 },
  { slug: "tam-ly", name: "Tâm lý", majorCount: 2 },
  { slug: "the-thao", name: "Thể dục - Thể thao", majorCount: 3 },
  { slug: "thoi-trang", name: "Thời trang - May mặc", majorCount: 5 },
  { slug: "nong-lam-thuy-san", name: "Thủy sản - Lâm Nghiệp - Nông nghiệp", majorCount: 21 },
  { slug: "toan-thong-ke", name: "Toán học và thống kê", majorCount: 7 },
  { slug: "nhan-su", name: "Nhân sự - Hành chính", majorCount: 5 },
  { slug: "van-hoa-xa-hoi", name: "Văn hóa - Chính trị - Khoa học Xã hội", majorCount: 31 },
  { slug: "khoa-hoc-tu-nhien", name: "Khoa học tự nhiên khác", majorCount: 2 },
];

export const seedCategories = mutation({
  args: {},
  handler: async (ctx) => {
    let inserted = 0;
    for (const [i, cat] of CATEGORIES.entries()) {
      const existing = await ctx.db
        .query("majorCategories")
        .withIndex("by_slug", q => q.eq("slug", cat.slug))
        .unique();
      if (!existing) {
        await ctx.db.insert("majorCategories", { ...cat, order: i });
        inserted++;
      }
    }
    return { inserted, total: CATEGORIES.length };
  },
});
