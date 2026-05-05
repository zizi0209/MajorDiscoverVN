/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as categories from "../categories.js";
import type * as majors from "../majors.js";
import type * as quiz from "../quiz.js";
import type * as seed from "../seed.js";
import type * as seedMajors from "../seedMajors.js";
import type * as seedMajorsData1 from "../seedMajorsData1.js";
import type * as seedMajorsData2 from "../seedMajorsData2.js";
import type * as seedMajorsData3 from "../seedMajorsData3.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  categories: typeof categories;
  majors: typeof majors;
  quiz: typeof quiz;
  seed: typeof seed;
  seedMajors: typeof seedMajors;
  seedMajorsData1: typeof seedMajorsData1;
  seedMajorsData2: typeof seedMajorsData2;
  seedMajorsData3: typeof seedMajorsData3;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
