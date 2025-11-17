"use client";

import Image from "next/image";
import Link from "next/link";
import Documentinput from "./Documentinput";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { Inbox } from "./inbox";
import { Doc } from "../../../../convex/_generated/dataModel";
import RenameDialog from "../../(home)/RenameDialog";
import { useState } from "react";

interface Navbarprops {
  data: Doc<"documents">;
}

const NavBar = ({ data }: Navbarprops) => {
  const { editor } = useEditorStore();
  const [fileMenuOpen, setFileMenuOpen] = useState(false);
  const [renameDialogOpen, setRenameDialogOpen] = useState(false);

  const handleRename = () => {
    setRenameDialogOpen(true);
    setFileMenuOpen(false);
  };

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
    onDownload(blob, `${data.title}.json`);
  };

  const handleHtmlDownload = () => {
    if (!editor) return;
    const blob = new Blob([editor?.getHTML() || ""], { type: "text/html" });
    onDownload(blob, `${data.title}.html`);
  };

  const handleTextDownload = () => {
    if (!editor) return;
    const blob = new Blob([editor?.getHTML() || ""], { type: "text/plain" });
    onDownload(blob, `${data.title}.txt`);
  };

  return (
    <div className="flex justify-between print:hidden">
      <div className="flex gap-2 p-2 items-center ">
        <Link href="/">
          <Image src="/logo.svg" width={36} height={36} alt="logo" />
        </Link>
        <div className="flex flex-col">
          <Documentinput title={data.title} id={data._id} />
          <div className="flex gap-3">
            <DropdownMenu open={fileMenuOpen} onOpenChange={setFileMenuOpen}>
              <DropdownMenuTrigger className="p-0 bg-transparent border-none shadow-none h-auto text-base outline-none focus:outline-none data-[state=open]:bg-transparent hover:bg-transparent cursor-pointer">
                File
              </DropdownMenuTrigger>
              <DropdownMenuContent className="text-base print:hidden">
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <FileIcon className=" size-4 mr-2" /> Save
                  </DropdownMenuSubTrigger>

                  <DropdownMenuSubContent>
                    <DropdownMenuItem onClick={() => handleJsonDownload()}>
                      <FileJsonIcon className=" size-4 mr-2" /> JSON
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => handleHtmlDownload()}>
                      <GlobeIcon className=" size-4 mr-2" /> HTML
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => window.print()}>
                      <BsFilePdf className=" size-4 mr-2" /> PDF
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => handleTextDownload()}>
                      <FileTextIcon className=" size-4 mr-2" /> TEXT
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuItem>
                  <FilePlusIcon className=" size-4 mr-2" /> New Document
                </DropdownMenuItem>
                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onSelect={(e) => e.preventDefault()}
                  onClick={handleRename}
                >
                  <FilePenIcon className=" size-4 mr-2" /> Rename
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <TrashIcon className=" size-4 mr-2" /> Remove
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={() => window.print()}>
                  <PrinterIcon className=" size-4 mr-2" /> Print
                  <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

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
          {renameDialogOpen && (
            <RenameDialog
              document={data}
              open={renameDialogOpen}
              setOpen={setRenameDialogOpen}
            />
          )}
        </div>
      </div>
      <div className="flex gap-2 p-2 items-center">
        <Inbox />
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
