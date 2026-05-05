import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: { category: v.optional(v.string()) },
  handler: async (ctx, { category }) => {
    if (category && category !== "All") {
      return ctx.db.query("majors").withIndex("by_category", q => q.eq("category", category)).collect();
    }
    return ctx.db.query("majors").collect();
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, { slug }) =>
    ctx.db.query("majors").withIndex("by_slug", q => q.eq("slug", slug)).unique(),
});

export const getBySlugList = query({
  args: { slugs: v.array(v.string()) },
  handler: async (ctx, { slugs }) => {
    const results = await Promise.all(
      slugs.map(slug => ctx.db.query("majors").withIndex("by_slug", q => q.eq("slug", slug)).unique())
    );
    return results.filter(Boolean);
  },
});

export const categories = query({
  args: {},
  handler: async (ctx) => {
    const all = await ctx.db.query("majors").collect();
    return [...new Set(all.map(m => m.category))];
  },
});

export const upsert = mutation({
  args: {
    slug: v.string(),
    name: v.string(),
    code: v.string(),
    description: v.string(),
    pros: v.array(v.string()),
    cons: v.array(v.string()),
    subjects: v.array(v.string()),
    category: v.string(),
    universities: v.array(
      v.object({
        name: v.string(),
        region: v.string(),
        lastYearScore: v.number(),
        predictedScore: v.number(),
        khoi: v.array(v.string()),
      })
    ),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db.query("majors").withIndex("by_slug", q => q.eq("slug", args.slug)).unique();
    if (existing) {
      await ctx.db.patch(existing._id, args);
    } else {
      await ctx.db.insert("majors", args);
    }
  },
});
