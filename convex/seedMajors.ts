import { mutation } from "./_generated/server";
import { D1 } from "./seedMajorsData1";
import { D2 } from "./seedMajorsData2";
import { D3 } from "./seedMajorsData3";

const ALL = [...D1, ...D2, ...D3];

export const seedMajors = mutation({
  args: {},
  handler: async (ctx) => {
    let seeded = 0;
    for (const [slug, name, code, categorySlug] of ALL) {
      const exists = await ctx.db
        .query("majors")
        .withIndex("by_slug", (q) => q.eq("slug", slug))
        .unique();
      if (!exists) {
        await ctx.db.insert("majors", { slug, name, code, categorySlug });
        seeded++;
      }
    }
    return { seeded, total: ALL.length };
  },
});
