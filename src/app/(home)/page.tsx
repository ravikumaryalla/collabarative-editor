"use client";
import { api } from "../../../convex/_generated/api";
import DocumentTable from "./DocumentTable";
import NavBar from "./NavBar";
import TemplateGallery from "./TemplateGallery";
import { usePaginatedQuery } from "convex/react";

export default function Home() {
  const results = usePaginatedQuery(
    api.document.getDocuments,
    { paginationOpts: {} }, // required argument, even if empty
    { initialNumItems: 5 }
  );

  return (
    <div className="flex h-screen w-screen flex-col gap-4">
      <NavBar />
      <div className="mt-14 w-screen  bg-[#F1F3F4]">
        <TemplateGallery />
      </div>
      <DocumentTable documents={results.results} loadMore={results.loadMore} />
    </div>
  );
}
