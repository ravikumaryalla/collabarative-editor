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
import { TextStyle } from "@tiptap/extension-text-style";
import FontFamily from "@tiptap/extension-font-family";

const Editor = () => {
  const { setEditor } = useEditorStore();

  const editor = useEditor({
    extensions: [
      StarterKit,
      FontFamily,
      TextStyle,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Heading,
      TableKit,
      Image,
      ImageResize,
      Underline,
    ],
    content: `<p style="font-family: Arial">Hi there</p>`,
    editorProps: {
      attributes: {
        style: "padding-left: 56px ;padding-right: 56px",
        class:
          "focus:outline-none bg-white border border-[#C7C7C7] flex flex-col min-h-[1054px] w-[816px] pt-10 pb-10 cursor-text",
      },
    },
    onCreate: () => setEditor(editor),
    onUpdate: () => setEditor(editor),
    onTransaction: () => setEditor(editor),
    onSelectionUpdate: () => setEditor(editor),
    onDestroy: () => setEditor(null),
  });

  return (
    <div className="size-full overflow-x-auto px-4 bg-[#F9FBFD]  print:px-0 print:bg-white print:overflow-scroll ">
      <div className="min-w-max   flex justify-center mx-auto w-[816px] py-4 print:py-0 print:mx-auto print:w-full">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default Editor;
