"use client";
import Editor from "./Editor";
import ToolBar from "./ToolBar";
import NavBar from "./NavBar";
import { Room } from "./room";
const Document = ({ params }: { params: { document: string } }) => {
  if (!document) return <div>Loading...</div>;
  return (
    <div className="min-h-screen bg-[#FAFBFD]">
      <div className="flex flex-col ">
        <NavBar />
        <ToolBar />
      </div>
      <Room>
        <Editor />
      </Room>
    </div>
  );
};

export default Document;
