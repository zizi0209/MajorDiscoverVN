import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const save = mutation({
  args: {
    khoiThi: v.string(),
    soThich: v.string(),
    tinhCach: v.string(),
    recommendedSlugs: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    return ctx.db.insert("quizResults", { ...args, createdAt: Date.now() });
  },
});

// Rule #3: withIndex("by_createdAt") → dùng index cho sort, tránh full scan
// Rule #7: quizResults tăng dần theo user, take(20) giữ response nhỏ. Ước lượng ~1KB/row → ~20KB/request
export const recent = query({
  args: {},
  handler: async (ctx) =>
    ctx.db.query("quizResults").withIndex("by_createdAt").order("desc").take(20),
});
