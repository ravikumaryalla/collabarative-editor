"use client";

import { Preloaded, usePreloadedQuery } from "convex/react";
import Editor from "./Editor";
import NavBar from "./NavBar";
import { Room } from "./room";
import ToolBar from "./ToolBar";
import { api } from "../../../../convex/_generated/api";

interface DocumentProps {
  preloadedDocument: Preloaded<typeof api.document.getById>;
}
export const Document = ({ preloadedDocument }: DocumentProps) => {
  const document = usePreloadedQuery(preloadedDocument);
  return (
    <Room>
      <div className="min-h-screen bg-[#FAFBFD]">
        <NavBar data={document} />
        <div className="flex flex-col">
          <div className="px-4">
            <ToolBar />
          </div>
        </div>
        <Editor />
      </div>
    </Room>
  );
};
