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

export const recent = query({
  args: {},
  handler: async (ctx) =>
    ctx.db.query("quizResults").order("desc").take(20),
});
