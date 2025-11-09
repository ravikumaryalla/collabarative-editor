"use client";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import React, { useState, useRef, useEffect } from "react";
import {
  BoldIcon,
  ChevronDownIcon,
  HighlighterIcon,
  ImageIcon,
  ItalicIcon,
  Link2Icon,
  ListCollapseIcon,
  ListIcon,
  ListOrderedIcon,
  ListTodoIcon,
  LucideIcon,
  MessageSquarePlusIcon,
  MinusIcon,
  PlusIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  SpellCheckIcon,
  TextAlignCenterIcon,
  TextAlignEndIcon,
  TextAlignStartIcon,
  UnderlineIcon,
  Undo2Icon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SketchPicker } from "react-color";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ToolBarButtonProps {
  onClick?: () => void;
  isActive?: boolean;
  icon: LucideIcon;
  label: string;
}

const ToolBarButton = ({
  onClick,
  isActive,
  icon: Icon,
  label,
}: ToolBarButtonProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={onClick}
          className={cn(
            "flex items-center justify-center h-8 w-8 rounded-md text-sm transition-all duration-200",
            "hover:bg-accent hover:text-accent-foreground",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1",
            isActive && "bg-accent text-accent-foreground shadow-sm"
          )}
          aria-label={label}
        >
          <Icon className="h-4 w-4" />
        </button>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="text-xs">
        {label}
      </TooltipContent>
    </Tooltip>
  );
};
const FontFamilyButton = () => {
  const { editor } = useEditorStore();
  const currentFont = editor?.getAttributes("textStyle").fontFamily || "Arial";
  const fonts = [
    { label: "Arial" },
    { label: "Times New Roman" },
    { label: "Courier New" },
    { label: "Georgia" },
    { label: "Inter" },
  ];

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <button
              className={cn(
                "flex items-center justify-between h-8 px-3 rounded-md text-sm min-w-[140px]",
                "hover:bg-accent hover:text-accent-foreground transition-colors",
                "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1"
              )}
            >
              <span
                className="text-sm font-medium truncate"
                style={{ fontFamily: currentFont }}
              >
                {currentFont}
              </span>
              <ChevronDownIcon className="h-4 w-4 ml-2 opacity-50" />
            </button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="text-xs">
          Font Family
        </TooltipContent>
      </Tooltip>
      <DropdownMenuContent className="w-[180px]">
        {fonts.map((font) => (
          <DropdownMenuItem
            key={font.label}
            onClick={() =>
              editor?.chain().focus().setFontFamily(font.label).run()
            }
            className={cn(
              "cursor-pointer",
              currentFont === font.label && "bg-accent"
            )}
            style={{ fontFamily: font.label }}
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
    if (editor?.isActive("heading", { level: 1 })) return "Heading 1";
    if (editor?.isActive("heading", { level: 2 })) return "Heading 2";
    if (editor?.isActive("heading", { level: 3 })) return "Heading 3";
    return "Normal Text";
  };

  const currentLevel = getCurrentHeadingLevel();
  const levels = [
    {
      label: "Normal Text",
      onClick: () => editor?.chain().focus().setParagraph().run(),
      fontSize: "0.875rem",
    },
    {
      label: "Heading 1",
      onClick: () => editor?.chain().focus().toggleHeading({ level: 1 }).run(),
      fontSize: "1.5rem",
      fontWeight: "bold",
    },
    {
      label: "Heading 2",
      onClick: () => editor?.chain().focus().toggleHeading({ level: 2 }).run(),
      fontSize: "1.25rem",
      fontWeight: "bold",
    },
    {
      label: "Heading 3",
      onClick: () => editor?.chain().focus().toggleHeading({ level: 3 }).run(),
      fontSize: "1.125rem",
      fontWeight: "bold",
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "flex items-center justify-between h-8 px-3 rounded-md text-sm min-w-[140px]",
            "hover:bg-accent hover:text-accent-foreground transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1"
          )}
          title="Text Style"
        >
          <span className="text-sm font-medium">{currentLevel}</span>
          <ChevronDownIcon className="h-4 w-4 ml-2 opacity-50" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[180px]">
        {levels.map((heading) => (
          <DropdownMenuItem
            key={heading.label}
            onClick={heading.onClick}
            className={cn(
              "cursor-pointer",
              currentLevel === heading.label && "bg-accent"
            )}
            style={{
              fontSize: heading.fontSize,
              fontWeight: heading.fontWeight,
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
  const [open, setOpen] = useState(false);
  const currentColor = editor?.getAttributes("textStyle").color || "#000000";

  const handleColorChange = (color: { hex: string }) => {
    editor?.chain().focus().setColor(color.hex).run();
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <PopoverTrigger asChild>
            <button
              className={cn(
                "flex items-center justify-center h-8 w-8 rounded-md transition-all duration-200",
                "hover:bg-accent hover:text-accent-foreground",
                "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1"
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 20h16" stroke={currentColor} strokeWidth="3" />
                <path d="m6 16 6-12 6 12" />
                <path d="M8 12h8" />
              </svg>
            </button>
          </PopoverTrigger>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="text-xs">
          Text Color
        </TooltipContent>
      </Tooltip>
      <PopoverContent className="w-auto p-0 border-0 shadow-lg" align="start">
        <SketchPicker
          color={currentColor}
          onChange={handleColorChange}
          disableAlpha
        />
      </PopoverContent>
    </Popover>
  );
};

const InsertLinkButton = () => {
  const { editor } = useEditorStore();
  const [link, setLink] = useState("");
  const [open, setOpen] = useState(false);
  const isActive = editor?.isActive("link");

  const onInsertLink = () => {
    if (!link.trim()) {
      editor?.chain().focus().unsetLink().run();
    } else {
      editor?.chain().focus().setLink({ href: link }).run();
    }
    setOpen(false);
    setLink("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onInsertLink();
    }
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <button
              className={cn(
                "flex items-center justify-center h-8 w-8 rounded-md transition-all duration-200",
                "hover:bg-accent hover:text-accent-foreground",
                "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1",
                isActive && "bg-accent text-accent-foreground shadow-sm"
              )}
            >
              <Link2Icon className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="text-xs">
          Insert Link
        </TooltipContent>
      </Tooltip>
      <DropdownMenuContent className="w-[320px] p-3" align="start">
        <div className="flex gap-2">
          <Input
            placeholder="Enter URL..."
            value={link}
            onChange={(e) => setLink(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
            autoFocus
          />
          <Button onClick={onInsertLink} size="sm">
            Insert
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const AlignMentButton = () => {
  const { editor } = useEditorStore();
  const [open, setOpen] = useState(false);
  const alignment =
    (editor?.getAttributes("textAlign") as string | undefined) || "left";

  const handleAlignmentChange = (align: string) => {
    editor?.chain().focus().setTextAlign(align).run();
    setOpen(false);
  };

  const getIcon = () => {
    if (alignment === "center") return TextAlignCenterIcon;
    if (alignment === "right") return TextAlignEndIcon;
    return TextAlignStartIcon;
  };

  const Icon = getIcon();
  const isActive = editor?.isActive({ textAlign: alignment });

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <button
              className={cn(
                "flex items-center justify-center h-8 w-8 rounded-md transition-all duration-200",
                "hover:bg-accent hover:text-accent-foreground",
                "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1",
                isActive && "bg-accent text-accent-foreground shadow-sm"
              )}
            >
              <Icon className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="text-xs">
          Text Alignment
        </TooltipContent>
      </Tooltip>
      <DropdownMenuContent className="p-2" align="start">
        <div className="flex gap-2">
          <button
            className={cn(
              "flex items-center justify-center h-8 w-8 rounded-md transition-colors",
              "hover:bg-accent",
              editor?.isActive({ textAlign: "left" }) && "bg-accent"
            )}
            onClick={() => handleAlignmentChange("left")}
          >
            <TextAlignStartIcon className="h-4 w-4" />
          </button>
          <button
            className={cn(
              "flex items-center justify-center h-8 w-8 rounded-md transition-colors",
              "hover:bg-accent",
              editor?.isActive({ textAlign: "center" }) && "bg-accent"
            )}
            onClick={() => handleAlignmentChange("center")}
          >
            <TextAlignCenterIcon className="h-4 w-4" />
          </button>
          <button
            className={cn(
              "flex items-center justify-center h-8 w-8 rounded-md transition-colors",
              "hover:bg-accent",
              editor?.isActive({ textAlign: "right" }) && "bg-accent"
            )}
            onClick={() => handleAlignmentChange("right")}
          >
            <TextAlignEndIcon className="h-4 w-4" />
          </button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const FontSizeButton = () => {
  const { editor } = useEditorStore();

  const getCurrentFontSize = () => {
    return (
      editor?.getAttributes("textStyle")?.fontSize?.replace("px", "") || "16"
    );
  };

  const [fontSize, setFontSize] = useState(getCurrentFontSize());

  useEffect(() => {
    setFontSize(getCurrentFontSize());
  }, [editor?.getAttributes("textStyle")?.fontSize]);

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const font = e.target.value;
    if (!font) return;
    const parsed = parseInt(font);
    if (isNaN(parsed) || parsed < 1) return;
    setFontSize(font);
    editor?.chain().focus().setFontSize(`${font}px`).run();
  };

  const handleIncrementFontSize = () => {
    const currentFontSize = parseInt(fontSize) || 16;
    const newFontSize = Math.min(currentFontSize + 1, 200);
    setFontSize(newFontSize.toString());
    editor?.chain().focus().setFontSize(`${newFontSize}px`).run();
  };

  const handleDecrementFontSize = () => {
    const currentFontSize = parseInt(fontSize) || 16;
    if (currentFontSize <= 1) return;
    const newFontSize = currentFontSize - 1;
    setFontSize(newFontSize.toString());
    editor?.chain().focus().setFontSize(`${newFontSize}px`).run();
  };

  return (
    <div className="flex items-center gap-1 border rounded-md px-1">
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className={cn(
              "flex items-center justify-center h-7 w-7 rounded-md text-sm transition-colors",
              "hover:bg-accent hover:text-accent-foreground",
              "focus:outline-none"
            )}
            onClick={handleDecrementFontSize}
          >
            <MinusIcon className="h-3.5 w-3.5" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="text-xs">
          Decrease Size
        </TooltipContent>
      </Tooltip>
      <input
        type="number"
        min="1"
        max="200"
        className="h-7 w-10 text-center text-sm bg-transparent outline-none border-0 focus:ring-0"
        value={fontSize}
        onChange={handleFontSizeChange}
        onBlur={() => {
          if (!fontSize || parseInt(fontSize) < 1) {
            setFontSize("16");
            editor?.chain().focus().setFontSize("16px").run();
          }
        }}
      />
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className={cn(
              "flex items-center justify-center h-7 w-7 rounded-md text-sm transition-colors",
              "hover:bg-accent hover:text-accent-foreground",
              "focus:outline-none"
            )}
            onClick={handleIncrementFontSize}
          >
            <PlusIcon className="h-3.5 w-3.5" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="text-xs">
          Increase Size
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

const LineHeightButton = () => {
  const { editor } = useEditorStore();
  const lineHeights = ["1.2", "1.4", "1.6", "1.8", "2.0"];

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <button
              className={cn(
                "flex items-center justify-center h-8 w-8 rounded-md transition-all duration-200",
                "hover:bg-accent hover:text-accent-foreground",
                "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1"
              )}
            >
              <ListCollapseIcon className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="text-xs">
          Line Height
        </TooltipContent>
      </Tooltip>
      <DropdownMenuContent className="w-[80px]">
        {lineHeights.map((lineHeight) => (
          <DropdownMenuItem
            key={lineHeight}
            onClick={() =>
              editor?.chain().focus().toggleTextStyle({ lineHeight }).run()
            }
            className="cursor-pointer text-center justify-center"
          >
            {lineHeight}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
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
      {
        label: "Highlight",
        icon: HighlighterIcon,
        onClick: () => editor?.chain().focus().toggleHighlight().run(),
        isActive: editor?.isActive("highlight"),
      },
    ],
    [
      {
        label: "Insert Image",
        icon: ImageIcon,
        onClick: () => console.log("Insert Image"),
      },
      {
        label: "Add Comment",
        icon: MessageSquarePlusIcon,
        onClick: () => editor?.chain().focus().addPendingComment().run(),
        // onClick: () => console.log("Add Comment"),
        isActive: editor?.isActive("liveblocksCommentmark"),
      },
      {
        label: "Bullet List",
        icon: ListIcon,
        onClick: () => editor?.chain().focus().toggleBulletList().run(),
        isActive: editor?.isActive("bulletList"),
      },
      {
        label: "Bullet List",
        icon: ListOrderedIcon,
        onClick: () => editor?.chain().focus().toggleOrderedList().run(),
        isActive: editor?.isActive("orderedList"),
      },
      {
        label: "To Do List",
        icon: ListTodoIcon,
        onClick: () => editor?.chain().focus().toggleTaskList().run(),
        isActive: editor?.isActive("taskList"),
      },
      {
        label: "Remove Formatting",
        icon: RemoveFormattingIcon,
        onClick: () => editor?.chain().focus().unsetAllMarks().run(),
      },
    ],
  ];

  return (
    <TooltipProvider delayDuration={300}>
      <div className="bg-background border rounded-md min-h-[48px] px-3 py-2 flex items-center overflow-x-auto gap-1.5 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
        {/* Section 1: History & Actions */}
        <div className="flex items-center gap-1">
          {sections[0].map((Item, index) => (
            <ToolBarButton key={index} {...Item} />
          ))}
        </div>

        <Separator
          orientation="vertical"
          className="h-6 mx-1 bg-slate-500 w-[1px] rounded-xl"
        />

        {/* Section 2: Typography */}
        <div className="flex items-center gap-1.5">
          <FontFamilyButton />
          <HeadingLevelButton />
          <FontSizeButton />
        </div>

        <Separator
          orientation="vertical"
          className="h-6 mx-1 bg-slate-500 w-[1px] rounded-xl"
        />

        {/* Section 3: Text Formatting */}
        <div className="flex items-center gap-1">
          {sections[1].map((Item, index) => (
            <ToolBarButton key={index} {...Item} />
          ))}
          <TextColorButton />
        </div>

        <Separator
          orientation="vertical"
          className="h-6 mx-1 bg-slate-500 w-[1px] rounded-xl"
        />

        {/* Section 4: Insert & Lists */}
        <div className="flex items-center gap-1">
          <InsertLinkButton />
          {sections[2].map((Item, index) => (
            <ToolBarButton key={index} {...Item} />
          ))}
        </div>

        <Separator
          orientation="vertical"
          className="h-6 mx-1 bg-slate-500 w-[1px] rounded-xl"
        />

        {/* Section 5: Layout */}
        <div className="flex items-center gap-1">
          <LineHeightButton />
          <AlignMentButton />
        </div>
      </div>
    </TooltipProvider>
  );
};

export default ToolBar;
