"use client";
import Editor from "./Editor";
import ToolBar from "./ToolBar";
import NavBar from "./NavBar";
import { Room } from "./room";
import { getUsersList } from "@/app/api/live-blocks-auth/action";
import { useEffect } from "react";

const Document = ({ params }: { params: { document: string } }) => {
  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getUsersList();
    };
    fetchUsers();
  }, []);

  if (!document) return <div>Loading...</div>;

  return (
    <Room>
      <div className="min-h-screen bg-[#FAFBFD]">
        <NavBar />
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

export default Document;
