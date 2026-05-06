import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Rule #4: limit default 50, max 100
// Rule #7: ~270 majors × ~2KB/row → max 100KB/request. No pagination needed at this scale.
export const list = query({
  args: {
    categorySlug: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, { categorySlug, limit }) => {
    const cap = Math.min(limit ?? 50, 100);
    if (categorySlug && categorySlug !== "all") {
      return ctx.db
        .query("majors")
        .withIndex("by_category", q => q.eq("categorySlug", categorySlug))
        .take(cap);
    }
    return ctx.db.query("majors").take(cap);
  },
});

// Rule #3: by_slug index → O(log n)
export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, { slug }) =>
    ctx.db.query("majors").withIndex("by_slug", q => q.eq("slug", slug)).unique(),
});

// Rule #2 & #6: Batch load song song, dùng Map-style lookup qua index
// Rule #7: slugs.length thường ≤5 từ quiz result → 5 index lookups, negligible
export const getBySlugList = query({
  args: { slugs: v.array(v.string()) },
  handler: async (ctx, { slugs }) => {
    const results = await Promise.all(
      slugs.map(slug => ctx.db.query("majors").withIndex("by_slug", q => q.eq("slug", slug)).unique())
    );
    return results.filter(Boolean);
  },
});

export const upsert = mutation({
  args: {
    slug: v.string(),
    name: v.string(),
    code: v.string(),
    categorySlug: v.string(),
    description: v.optional(v.string()),
    pros: v.optional(v.array(v.string())),
    cons: v.optional(v.array(v.string())),
    subjects: v.optional(v.array(v.string())),
    universities: v.optional(v.array(
      v.object({
        name: v.string(),
        region: v.string(),
        lastYearScore: v.number(),
        predictedScore: v.number(),
        khoi: v.array(v.string()),
      })
    )),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("majors")
      .withIndex("by_slug", q => q.eq("slug", args.slug))
      .unique();
    if (existing) {
      await ctx.db.patch(existing._id, args);
    } else {
      await ctx.db.insert("majors", args);
    }
  },
});
