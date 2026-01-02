import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  work: defineTable({
    company: v.string(),
    role: v.string(),
    startDate: v.string(),
    endDate: v.optional(v.string()), // null/undefined = "present"
    description: v.string(),
    order: v.number(), // for sorting
  }).index("by_order", ["order"]),

  projects: defineTable({
    name: v.string(),
    role: v.string(), // "creator", "maintainer", etc.
    description: v.string(),
    url: v.optional(v.string()),
    order: v.number(),
  }).index("by_order", ["order"]),

  links: defineTable({
    label: v.string(), // "email", "github", "linkedin", etc.
    url: v.string(),
    order: v.number(),
  }).index("by_order", ["order"]),
});
