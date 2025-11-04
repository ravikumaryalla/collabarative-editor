"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import Heading from "@tiptap/extension-heading";
import { TableKit } from "@tiptap/extension-table";
import Image from "@tiptap/extension-image";
import ImageResize from "tiptap-extension-resize-image";
import { useEditorStore } from "@/store/use-editor-store";
import Underline from "@tiptap/extension-underline";
import FontFamily from "@tiptap/extension-font-family";
import { Color, TextStyle, LineHeight } from "@tiptap/extension-text-style";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import { BulletList } from "@tiptap/extension-list";
import { FontSizeExtension } from "@/extensions/font-size";
import { useParams } from "next/navigation";
import { useLiveblocksExtension } from "@liveblocks/react-tiptap";

import Ruler from "./Ruler";
import { Threads } from "./threads";
const Editor = () => {
  const liveblocks = useLiveblocksExtension();
  const { setEditor } = useEditorStore();

  const editor = useEditor({
    extensions: [
      liveblocks,
      StarterKit.configure({
        history: false,
      }),
      FontFamily,
      TextStyle,
      Highlight,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      LineHeight,
      Link.configure({
        openOnClick: false,
        defaultProtocol: "https",
        autolink: true,
      }),
      Color,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Heading,
      TableKit,
      Image,
      ImageResize,
      Underline,
      BulletList,
      FontSizeExtension,
    ],
    content: `<p style="font-family: Arial">Hi there</p>`,
    editorProps: {
      attributes: {
        style: "padding-left: 56px ;padding-right: 56px",
        class:
          "focus:outline-none bg-white border border-[#C7C7C7] flex flex-col min-h-[1054px] w-[816px] pt-10 pb-10 cursor-text",
      },
    },
    immediatelyRender: false,
    onCreate: () => setEditor(editor),
    onUpdate: () => setEditor(editor),
    onTransaction: () => setEditor(editor),
    onSelectionUpdate: () => setEditor(editor),
    onDestroy: () => setEditor(null),
  });

  const params = useParams();

  return (
    <div className="size-full overflow-x-auto px-4 bg-[#F9FBFD]  print:px-0 print:bg-white print:overflow-scroll ">
      <Ruler />
      <div className="min-w-max   flex justify-center mx-auto w-[816px] py-4 print:py-0 print:mx-auto print:w-full">
        <EditorContent editor={editor} />

        <Threads editor={editor} />
      </div>
    </div>
  );
};

export default Editor;
