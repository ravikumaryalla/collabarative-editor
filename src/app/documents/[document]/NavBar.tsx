"use client";

import Image from "next/image";
import Link from "next/link";
import Documentinput from "./Documentinput";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  BoldIcon,
  FileIcon,
  FileJsonIcon,
  FilePenIcon,
  FilePlusIcon,
  FileTextIcon,
  GlobeIcon,
  ItalicIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  StrikethroughIcon,
  TextIcon,
  TrashIcon,
  UnderlineIcon,
  Undo2Icon,
} from "lucide-react";
import { BsFilePdf } from "react-icons/bs";
import { useEditorStore } from "@/store/use-editor-store";
import { Avatars } from "./avatar";
import { UserButton, OrganizationSwitcher } from "@clerk/nextjs";

const NavBar = () => {
  const { editor } = useEditorStore();

  const insertTable = (rows: number, columns: number) =>
    editor?.commands.insertTable({
      rows,
      cols: columns,
      withHeaderRow: false,
    });

  const onDownload = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
  };

  const handleJsonDownload = () => {
    if (!editor) return;

    const blob = new Blob([JSON.stringify(editor?.getJSON())], {
      type: "application/json",
    });
    onDownload(blob, "document.json");
  };

  const handleHtmlDownload = () => {
    if (!editor) return;
    const blob = new Blob([editor?.getHTML() || ""], { type: "text/html" });
    onDownload(blob, "document.html");
  };

  const handleTextDownload = () => {
    if (!editor) return;
    const blob = new Blob([editor?.getHTML() || ""], { type: "text/plain" });
    onDownload(blob, "document.txt");
  };

  return (
    <div className="flex justify-between">
      <div className="flex gap-2 p-2 items-center ">
        <Link href="/">
          <Image src="/logo.svg" width={36} height={36} alt="logo" />
        </Link>
        <div className="flex flex-col">
          <Documentinput />
          <div className="flex gap-3">
            <Menubar className="bg-transparent h-auto border-none shadow-none p-0 print:hidden">
              <MenubarMenu>
                <MenubarTrigger className="p-0">File</MenubarTrigger>
                <MenubarContent className="text-base print:hidden">
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <FileIcon className=" size-4 mr-2" /> Save
                    </MenubarSubTrigger>

                    <MenubarSubContent onClick={() => handleJsonDownload()}>
                      <MenubarItem>
                        <FileJsonIcon className=" size-4 mr-2" /> JSON
                      </MenubarItem>

                      <MenubarItem onClick={() => handleHtmlDownload()}>
                        <GlobeIcon className=" size-4 mr-2" /> HTML
                      </MenubarItem>

                      <MenubarItem onClick={() => window.print()}>
                        <BsFilePdf className=" size-4 mr-2" /> PDF
                      </MenubarItem>

                      <MenubarItem onClick={() => handleTextDownload()}>
                        <FileTextIcon className=" size-4 mr-2" /> TEXT
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarItem>
                    <FilePlusIcon className=" size-4 mr-2" /> New Document
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>
                    <FilePenIcon className=" size-4 mr-2" /> Rename
                  </MenubarItem>

                  <MenubarItem>
                    <TrashIcon className=" size-4 mr-2" /> Remove
                  </MenubarItem>

                  <MenubarSeparator />

                  <MenubarItem onClick={() => window.print()}>
                    <PrinterIcon className=" size-4 mr-2" /> Print
                    <MenubarShortcut>⌘P</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>

            <Menubar className="bg-transparent h-auto border-none shadow-none p-0 print:hidden">
              <MenubarMenu>
                <MenubarTrigger className="p-0">Edit</MenubarTrigger>
                <MenubarContent className="text-base print:hidden">
                  <MenubarItem
                    onClick={() => editor?.chain().focus().undo().run()}
                  >
                    <Undo2Icon className=" size-4 mr-2" /> Undo
                    <MenubarShortcut>⌘Z</MenubarShortcut>
                  </MenubarItem>

                  <MenubarItem
                    onClick={() => editor?.chain().focus().redo().run()}
                  >
                    <Redo2Icon className=" size-4 mr-2" /> Redo
                    <MenubarShortcut>⌘Y</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>

            <Menubar className="bg-transparent h-auto border-none shadow-none p-0 print:hidden">
              <MenubarMenu>
                <MenubarTrigger className="p-0">Insert</MenubarTrigger>
                <MenubarContent className="text-base print:hidden">
                  <MenubarSub>
                    <MenubarSubTrigger>Table</MenubarSubTrigger>

                    <MenubarSubContent>
                      <MenubarItem onClick={() => insertTable(1, 1)}>
                        1 X 1
                      </MenubarItem>
                      <MenubarItem onClick={() => insertTable(2, 2)}>
                        2 X 2
                      </MenubarItem>
                      <MenubarItem onClick={() => insertTable(3, 3)}>
                        3 X 3
                      </MenubarItem>
                      <MenubarItem onClick={() => insertTable(4, 4)}>
                        4 X 4
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>

            <Menubar className="bg-transparent h-auto border-none shadow-none p-0 print:hidden">
              <MenubarMenu>
                <MenubarTrigger className="p-0">Format</MenubarTrigger>
                <MenubarContent className="text-base print:hidden">
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <TextIcon className=" size-4 mr-2" /> Text
                    </MenubarSubTrigger>

                    <MenubarSubContent>
                      <MenubarItem
                        className="flex gap-2"
                        onClick={() =>
                          editor?.chain().focus().toggleBold().run()
                        }
                      >
                        <BoldIcon className=" size-4 mr-2" /> Bold
                        <MenubarShortcut>⌘B</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem
                        className="flex gap-2"
                        onClick={() =>
                          editor?.chain().focus().toggleItalic().run()
                        }
                      >
                        <ItalicIcon className=" size-4 mr-2" /> Italic
                        <MenubarShortcut>⌘I</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem
                        className="flex gap-2"
                        onClick={() =>
                          editor?.chain().focus().toggleUnderline().run()
                        }
                      >
                        <UnderlineIcon className=" size-4 mr-2" /> Underline
                        <MenubarShortcut>⌘U</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem
                        className="flex gap-2"
                        onClick={() =>
                          editor?.chain().focus().toggleStrike().run()
                        }
                      >
                        <StrikethroughIcon className=" size-4 mr-2" />
                        StrikeThrough
                        <MenubarShortcut>⌘S</MenubarShortcut>
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarItem
                    onClick={() =>
                      editor?.chain().focus().unsetAllMarks().run()
                    }
                  >
                    <RemoveFormattingIcon className=" size-4 mr-2" />
                    Clear Formatting
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </div>
      </div>
      <div
        className="flex gap-2 p-2 items-center"
        style={{
          border: "black 2px red",
        }}
      >
        <Avatars />

        <OrganizationSwitcher
          afterCreateOrganizationUrl={"/"}
          afterLeaveOrganizationUrl="/"
          afterSelectOrganizationUrl={"/"}
          afterSelectPersonalUrl={"/"}
        />
        <UserButton />
      </div>
    </div>
  );
};

export default NavBar;
