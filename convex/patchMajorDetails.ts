import { mutation } from "./_generated/server";
import { CAT_TPL } from "./categoryTemplates";
import { DESC_1, SUBJ_OVERRIDE } from "./majorDescriptions1";
import { DESC_2, SUBJ_OVERRIDE_2 } from "./majorDescriptions2";

const ALL_DESC = { ...DESC_1, ...DESC_2 };
const ALL_SUBJ = { ...SUBJ_OVERRIDE, ...SUBJ_OVERRIDE_2 };

export const patchDetails = mutation({
  args: {},
  handler: async (ctx) => {
    const allMajors = await ctx.db.query("majors").collect();
    let patched = 0;

    for (const major of allMajors) {
      const desc = ALL_DESC[major.slug];
      const tpl = CAT_TPL[major.categorySlug];
      if (!desc && !tpl) continue;

      // Chỉ patch nếu chưa có description (tránh ghi đè data chi tiết đã có)
      if (major.description) continue;

      const subjects = ALL_SUBJ[major.slug] ?? tpl?.s;
      const patch: Record<string, unknown> = {};

      if (desc) patch.description = desc;
      if (subjects) patch.subjects = subjects;
      if (tpl) {
        patch.pros = tpl.p;
        patch.cons = tpl.c;
      }

      if (Object.keys(patch).length > 0) {
        await ctx.db.patch(major._id, patch);
        patched++;
      }
    }
    return { patched, total: allMajors.length };
  },
});
