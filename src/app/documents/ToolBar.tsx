"use client";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import { useState } from "react";
import {
  BoldIcon,
  ChevronUpIcon,
  ImageIcon,
  ItalicIcon,
  Link2Icon,
  ListTodoIcon,
  LucideIcon,
  MessageSquarePlusIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  SpellCheckIcon,
  UnderlineIcon,
  Undo2Icon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { SketchPicker } from "react-color";

interface ToolBarButtonProps {
  onClick?: () => void;
  isActive?: boolean;
  icon: LucideIcon;
}
const ToolBarButton = ({
  onClick,
  isActive,
  icon: Icon,
}: ToolBarButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center justify-center h-7 min-w-7 rounded-md text-sm  hover:bg-neutral-400/80",
        isActive && "bg-neutral-400/80"
      )}
    >
      <Icon />
    </button>
  );
};
const FontFamilyButton = () => {
  const { editor } = useEditorStore();
  console.log(editor?.getAttributes("textStyle").fontFamily, "fontFamily");
  console.log("editor in font familybutton", editor);
  const fonts = [
    {
      label: "Arial",
      onClick: () => editor?.chain().focus().setFontFamily("Arial").run(),
      isActive: editor?.isActive("textStyle", { fontFamily: "Arial" }),
    },
    {
      label: "Times New Roman",
      onClick: () =>
        editor?.chain().focus().setFontFamily("Times New Roman").run(),
      isActive: editor?.isActive("textStyle", {
        fontFamily: "Times New Roman",
      }),
    },
    {
      label: "Courier New",
      onClick: () => editor?.chain().focus().setFontFamily("Courier New").run(),
      isActive: editor?.isActive("textStyle", { fontFamily: "Courier New" }),
    },
    {
      label: "Georgia",
      onClick: () => editor?.chain().focus().setFontFamily("Georgia").run(),
      isActive: editor?.isActive("textStyle", { fontFamily: "Georgia" }),
    },
    {
      label: "Inter",
      onClick: () => editor?.chain().focus().setFontFamily("Inter").run(),
      isActive: editor?.isActive("textStyle", { fontFamily: "Inter" }),
    },
  ];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="group">
          <span
            className="flex justify-between w-[200px] text-lg hover:bg-neutral-400 rounded-sm p-1 "
            style={{
              fontFamily:
                editor?.getAttributes("textStyle").fontFamily || "Arial",
            }}
          >
            {editor?.getAttributes("textStyle").fontFamily || "Arial"}
            {/* <ChevronUpIcon className="transition group-data-[state=open]:rotate-180" /> */}
            <ChevronUpIcon className="transition-transform linear group-data-[state=open]:rotate-180" />
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-[100] bg-[#F1F4F9] w-[200px] rounded-sm ">
        {fonts.map((font, index) => (
          <DropdownMenuItem
            onClick={() =>
              editor?.chain().focus().setFontFamily(font.label).run()
            }
            className=" w-full text-lg hover:bg-neutral-400 p-1 "
            key={index}
            style={{
              fontFamily: font.label,
            }}
          >
            {font.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const HeadingLevelButton = () => {
  const { editor } = useEditorStore();

  const getCurrentHeadingLevel = () => {
    if (editor?.isActive("heading", { level: 1 })) {
      return "Heading 1";
    } else if (editor?.isActive("heading", { level: 2 })) {
      return "Heading 2";
    } else if (editor?.isActive("heading", { level: 3 })) {
      return "Heading 3";
    }
    return "Normal Text";
  };
  const levels = [
    {
      label: "Normal Text",
      onClick: () => editor?.chain().focus().setParagraph().run(),
      isActive: editor?.isActive("textStyle", { fontFamily: "Arial" }),
      fontSize: "1rem",
    },
    {
      label: "Heading 1",
      onClick: () => editor?.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: editor?.isActive("heading", { level: 1 }),
      fontSize: "1.4rem",
    },
    {
      label: "Heading 2",
      onClick: () => editor?.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: editor?.isActive("heading", { level: 2 }),
      fontSize: "1.2rem",
    },
    {
      label: "Heading 3",
      onClick: () => editor?.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: editor?.isActive("heading", { level: 3 }),
      fontSize: "1.1rem",
    },
  ];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="group">
          <span className="flex justify-between w-[200px] text-lg hover:bg-neutral-400 rounded-sm p-1 ">
            {getCurrentHeadingLevel()}
            <ChevronUpIcon className="transition-transform linear group-data-[state=open]:rotate-180" />
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-[100] bg-[#F1F4F9] w-[200px] rounded-sm ">
        {levels.map((heading, index) => (
          <DropdownMenuItem
            onClick={() => heading.onClick()}
            className=" w-full text-lg hover:bg-neutral-400 p-1 "
            key={index}
            style={{
              fontSize: heading.fontSize,
            }}
          >
            {heading.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const TextColorButton = () => {
  const { editor } = useEditorStore();
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [color, setColor] = useState(editor?.getAttributes("textStyle").color);

  const handleColorChange = (color: { hex: string }) => {
    setColor(color.hex);
    console.log(color, "color");
    console.log("need to implement this");
    console.log(editor);
    editor?.chain().focus().setColor(color.hex).run();
  };

  return (
    <div onClick={() => setShowColorPicker(!showColorPicker)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-baseline-icon lucide-baseline"
      >
        <path
          d="M4 20h16"
          color={editor?.getAttributes("textStyle").color || "#000000"}
          stroke-width="4"
        />
        <path d="m6 16 6-12 6 12" />
        <path d="M8 12h8" />
      </svg>
      {showColorPicker && (
        <div className="absolute z-50 -translate-x-1/2 ">
          <SketchPicker color={color} onChange={handleColorChange} />
        </div>
      )}
    </div>
  );
};

const ToolBar = () => {
  const { editor } = useEditorStore();
  const sections: {
    label: string;
    icon: LucideIcon;
    onClick?: () => void;
    isActive?: boolean;
  }[][] = [
    [
      {
        label: "Undo",
        icon: Undo2Icon,
        onClick: () => editor?.chain().focus().undo().run(),
      },
      {
        label: "Redo",
        icon: Redo2Icon,
        onClick: () => editor?.chain().focus().redo().run(),
      },
      {
        label: "Print",
        icon: PrinterIcon,
        onClick: () => window.print(),
      },
      {
        label: "Spell Check",
        icon: SpellCheckIcon,
        onClick: () => {
          const isEnabled = editor?.view.dom.getAttribute("spellcheck");
          editor?.view.dom.setAttribute(
            "spellcheck",
            isEnabled === "false" ? "true" : "false"
          );
        },
      },
    ],
    [
      {
        label: "Bold",
        icon: BoldIcon,
        onClick: () => editor?.chain().focus().toggleBold().run(),
        isActive: editor?.isActive("bold"),
      },
      {
        label: "Italic",
        icon: ItalicIcon,
        onClick: () => editor?.chain().focus().toggleItalic().run(),
        isActive: editor?.isActive("italic"),
      },
      {
        label: "Underline",
        icon: UnderlineIcon,
        onClick: () => editor?.chain().focus().toggleUnderline().run(),
        isActive: editor?.isActive("underline"),
      },
    ],
    [
      {
        label: "Insert Link",
        icon: Link2Icon,
        onClick: () => console.log("Insert Link"),
        isActive: editor?.isActive("bold"),
      },
      {
        label: "Add Comment",
        icon: MessageSquarePlusIcon,
        onClick: () => console.log("Add Comment"),
      },
      {
        label: "Insert Image",
        icon: ImageIcon,
        onClick: () => console.log("Insert Image"),
      },
    ],
    [
      {
        label: "To Do List",
        icon: ListTodoIcon,
        onClick: () => editor?.chain().focus().toggleTaskList().run(),
        isActive: editor?.isActive("taskList"),
      },
      {
        label: "Add Comment",
        icon: MessageSquarePlusIcon,
        onClick: () => console.log("Add Comment"),
      },
      {
        label: "Remove Formatting",
        icon: RemoveFormattingIcon,
        onClick: () => editor?.chain().focus().unsetAllMarks().run(),
      },
    ],
  ];

  return (
    <div className="bg-[#F1F4F9]  min-h-[40px] px-2 py-1 flex items-center  overflow-x-auto ">
      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            {section.map((Item, index) => (
              <ToolBarButton key={index} {...Item} />
            ))}
          </div>
          <Separator
            orientation="vertical"
            className="mx-2 h-6 w-0.5 bg-slate-500"
          />
        </div>
      ))}
      <FontFamilyButton />
      <HeadingLevelButton />
      <TextColorButton />
    </div>
  );
};

export default ToolBar;
