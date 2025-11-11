import { preloadQuery } from "convex/nextjs";
import { Id } from "../../../../convex/_generated/dataModel";
import { Document } from "./document";
import { api } from "../../../../convex/_generated/api";
import { auth } from "@clerk/nextjs";

interface DocumentPageProps {
  params: Promise<{ document: Id<"documents"> }>;
}
const DocumentPage = async ({ params }: DocumentPageProps) => {
  const { document } = await params;
  const { getToken } = await auth();
  const token = await getToken({ template: "convex" });

  if (!token) throw new Error("Unauthorized");

  const preloadedDocument = await preloadQuery(
    api.document.getById,
    { id: document },
    { token }
  );
  return <Document preloadedDocument={preloadedDocument} />;
};

export default DocumentPage;
