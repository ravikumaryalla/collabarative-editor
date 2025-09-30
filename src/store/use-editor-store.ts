import { create } from "zustand";
import { type Editor } from "@tiptap/react";

interface useEditorProps {
  editor: Editor | null;
  setEditor: (editor: Editor | null) => void;
}

export const useEditorStore = create<useEditorProps>((set) => ({
  editor: null,
  setEditor: (editorinstance: Editor | null) => set({ editor: editorinstance }),
}));
