import { query } from "./_generated/server";
import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { paginationOptsValidator } from "convex/server";
export const getDocuments = query({
  args: { paginationOpts: paginationOptsValidator },
  handler: async (ctx, args) => {
    return await ctx.db.query("documents").paginate(args.paginationOpts);
  },
});

export const createDocument = mutation({
  args: {
    title: v.string(),
    initialContent: v.optional(v.string()),
    ownerId: v.string(),
    roomId: v.optional(v.string()),
    organizationId: v.optional(v.string()),
  },
  handler: async (ctx, { title, initialContent }) => {
    const authInfo = await ctx.auth.getUserIdentity();
    if (!authInfo) throw new Error("Unauthorized");
    return await ctx.db.insert("documents", {
      title,
      initialContent,
      ownerId: authInfo.subject,
    });
  },
});

export const deleteById = mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) throw new Error("Unauthorized");

    const document = await ctx.db.get(args.id);
    if (!document) throw new Error("Document not found");
    if (document.ownerId !== user.subject) throw new Error("Unauthorized");

    return await ctx.db.delete(args.id);
  },
});

export const renameById = mutation({
  args: { id: v.id("documents"), title: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) throw new Error("Unauthorized");

    const document = await ctx.db.get(args.id);
    if (!document) throw new Error("Document not found");
    if (document.ownerId !== user.subject) throw new Error("Unauthorized");

    return await ctx.db.patch(args.id, { title: args.title });
  },
});
