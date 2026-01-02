import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { authComponent } from "./auth";

// ============================================================================
// PUBLIC QUERIES (no auth required - for public portfolio page)
// ============================================================================

export const listWork = query({
  args: {},
  returns: v.array(
    v.object({
      _id: v.id("work"),
      _creationTime: v.number(),
      company: v.string(),
      role: v.string(),
      startDate: v.string(),
      endDate: v.optional(v.string()),
      description: v.string(),
      order: v.number(),
    })
  ),
  handler: async (ctx) => {
    return await ctx.db.query("work").withIndex("by_order").order("asc").collect();
  },
});

export const listProjects = query({
  args: {},
  returns: v.array(
    v.object({
      _id: v.id("projects"),
      _creationTime: v.number(),
      name: v.string(),
      role: v.string(),
      description: v.string(),
      url: v.optional(v.string()),
      order: v.number(),
    })
  ),
  handler: async (ctx) => {
    return await ctx.db.query("projects").withIndex("by_order").order("asc").collect();
  },
});

export const listLinks = query({
  args: {},
  returns: v.array(
    v.object({
      _id: v.id("links"),
      _creationTime: v.number(),
      label: v.string(),
      url: v.string(),
      order: v.number(),
    })
  ),
  handler: async (ctx) => {
    return await ctx.db.query("links").withIndex("by_order").order("asc").collect();
  },
});

// ============================================================================
// PROTECTED MUTATIONS (require auth)
// ============================================================================

// --- Work ---

export const createWork = mutation({
  args: {
    company: v.string(),
    role: v.string(),
    startDate: v.string(),
    endDate: v.optional(v.string()),
    description: v.string(),
    order: v.number(),
  },
  returns: v.id("work"),
  handler: async (ctx, args) => {
    const authUser = await authComponent.safeGetAuthUser(ctx);
    if (!authUser) {
      throw new Error("Unauthorized");
    }
    return await ctx.db.insert("work", args);
  },
});

export const updateWork = mutation({
  args: {
    id: v.id("work"),
    company: v.optional(v.string()),
    role: v.optional(v.string()),
    startDate: v.optional(v.string()),
    endDate: v.optional(v.string()),
    description: v.optional(v.string()),
    order: v.optional(v.number()),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const authUser = await authComponent.safeGetAuthUser(ctx);
    if (!authUser) {
      throw new Error("Unauthorized");
    }
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
    return null;
  },
});

export const deleteWork = mutation({
  args: { id: v.id("work") },
  returns: v.null(),
  handler: async (ctx, args) => {
    const authUser = await authComponent.safeGetAuthUser(ctx);
    if (!authUser) {
      throw new Error("Unauthorized");
    }
    await ctx.db.delete(args.id);
    return null;
  },
});

// --- Projects ---

export const createProject = mutation({
  args: {
    name: v.string(),
    role: v.string(),
    description: v.string(),
    url: v.optional(v.string()),
    order: v.number(),
  },
  returns: v.id("projects"),
  handler: async (ctx, args) => {
    const authUser = await authComponent.safeGetAuthUser(ctx);
    if (!authUser) {
      throw new Error("Unauthorized");
    }
    return await ctx.db.insert("projects", args);
  },
});

export const updateProject = mutation({
  args: {
    id: v.id("projects"),
    name: v.optional(v.string()),
    role: v.optional(v.string()),
    description: v.optional(v.string()),
    url: v.optional(v.string()),
    order: v.optional(v.number()),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const authUser = await authComponent.safeGetAuthUser(ctx);
    if (!authUser) {
      throw new Error("Unauthorized");
    }
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
    return null;
  },
});

export const deleteProject = mutation({
  args: { id: v.id("projects") },
  returns: v.null(),
  handler: async (ctx, args) => {
    const authUser = await authComponent.safeGetAuthUser(ctx);
    if (!authUser) {
      throw new Error("Unauthorized");
    }
    await ctx.db.delete(args.id);
    return null;
  },
});

// --- Links ---

export const createLink = mutation({
  args: {
    label: v.string(),
    url: v.string(),
    order: v.number(),
  },
  returns: v.id("links"),
  handler: async (ctx, args) => {
    const authUser = await authComponent.safeGetAuthUser(ctx);
    if (!authUser) {
      throw new Error("Unauthorized");
    }
    return await ctx.db.insert("links", args);
  },
});

export const updateLink = mutation({
  args: {
    id: v.id("links"),
    label: v.optional(v.string()),
    url: v.optional(v.string()),
    order: v.optional(v.number()),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const authUser = await authComponent.safeGetAuthUser(ctx);
    if (!authUser) {
      throw new Error("Unauthorized");
    }
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
    return null;
  },
});

export const deleteLink = mutation({
  args: { id: v.id("links") },
  returns: v.null(),
  handler: async (ctx, args) => {
    const authUser = await authComponent.safeGetAuthUser(ctx);
    if (!authUser) {
      throw new Error("Unauthorized");
    }
    await ctx.db.delete(args.id);
    return null;
  },
});
