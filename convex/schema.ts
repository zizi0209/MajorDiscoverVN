import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  majorCategories: defineTable({
    slug: v.string(),      // "cntt", "kinh-te-quan-tri"
    name: v.string(),      // "Công nghệ thông tin - Tin học"
    majorCount: v.number(),
    order: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_order", ["order"]),

  majors: defineTable({
    slug: v.string(),
    name: v.string(),
    code: v.string(),
    categorySlug: v.string(), // ref majorCategories.slug
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
  })
    .index("by_slug", ["slug"])
    .index("by_category", ["categorySlug"]),

  quizResults: defineTable({
    khoiThi: v.string(),
    soThich: v.string(),
    tinhCach: v.string(),
    recommendedSlugs: v.array(v.string()),
    createdAt: v.number(),
  }).index("by_createdAt", ["createdAt"]),
});
