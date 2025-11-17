import { query } from "./_generated/server";
import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { paginationOptsValidator } from "convex/server";

export const getByIds = query({
  args: { ids: v.array(v.id("documents")) },
  handler: async (ctx, { ids }) => {
    const documents = [];

    for (const id of ids) {
      const document = await ctx.db.get(id);
      if (document) documents.push({ id: document._id, title: document.title });
      else documents.push({ id: id, title: "[Removed]" });
    }
    return documents;
  },
});

export const getDocuments = query({
  args: {
    paginationOpts: paginationOptsValidator,
    search: v.optional(v.string()),
  },
  handler: async (ctx, { search, paginationOpts }) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) throw new Error("Unauthorized");

    if (user?.org_id && search) {
      const results = await ctx.db
        .query("documents")
        .withSearchIndex("search_title", (q) =>
          q.search("title", search).eq("organizationId", user.org_id as string)
        )
        .paginate(paginationOpts);

      console.log(results, "ravi");
      return results;
    }

    if (user?.org_id) {
      return await ctx.db
        .query("documents")
        .withIndex("by_organization", (q) =>
          q.eq("organizationId", user.org_id as string)
        )
        .paginate(paginationOpts);
    }

    if (search) {
      return await ctx.db
        .query("documents")
        .withSearchIndex("search_title", (q) =>
          q.search("title", search).eq("ownerId", user.subject)
        )
        .paginate(paginationOpts);
    }
    return await ctx.db.query("documents").paginate(paginationOpts);
  },
});

export const createDocument = mutation({
  args: {
    title: v.string(),
    initialContent: v.optional(v.string()),
  },
  handler: async (ctx, { title, initialContent }) => {
    console.log("init in convex ----", initialContent);
    const authInfo = await ctx.auth.getUserIdentity();
    if (!authInfo) throw new Error("Unauthorized");
    type Document = {
      title: string;
      initialContent: string | undefined;
      ownerId: string;
      organizationId?: string;
    };

    const documentData: Document = {
      title,
      initialContent,
      ownerId: authInfo.subject,
    };

    if (authInfo.org_id) {
      documentData.organizationId = authInfo.org_id.toString();
    }

    return await ctx.db.insert("documents", documentData);
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
    console.log(user, "user");
    if (!user) throw new Error("Unauthorized");

    const document = await ctx.db.get(args.id);
    if (!document) throw new Error("Document not found");
    // if (document.ownerId !== user.subject) throw new Error("Unauthorized");

    return await ctx.db.patch(args.id, { title: args.title });
  },
});

export const getById = query({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const document = await ctx.db.get(args.id);
    if (!document) throw new Error("Document not found");
    return document;
  },
});
