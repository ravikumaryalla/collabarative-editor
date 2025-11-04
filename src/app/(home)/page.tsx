"use client";
import { api } from "../../../convex/_generated/api";
import DocumentTable from "./DocumentTable";
import NavBar from "./NavBar";
import TemplateGallery from "./TemplateGallery";
import { usePaginatedQuery } from "convex/react";

export default function Home() {
  const results = usePaginatedQuery(
    api.document.getDocuments,
    { search: "" },
    { initialNumItems: 5 }
  );
  console.log(results, "res");

  return (
    <div className="flex h-screen w-screen flex-col gap-4">
      <NavBar />
      <div className="mt-14 w-screen  bg-[#F1F3F4]">
        <TemplateGallery />
      </div>
      <DocumentTable
        documents={results.results}
        loadMore={results.loadMore}
        status={results.status}
        isLoading={results.isLoading}
      />
    </div>
  );
}
