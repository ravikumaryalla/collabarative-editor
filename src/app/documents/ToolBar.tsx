"use client";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import { LucideIcon, Undo2 } from "lucide-react";

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
        icon: Undo2,
        onClick: () => editor?.chain().focus().undo().run(),
      },
    ],
  ];

  return (
    <div className="bg-[#F1F4F9]  min-h-[40px] px-2 py-1 flex items-center  overflow-x-auto ">
      {sections[0].map((item, index) => (
        <ToolBarButton key={index} {...item} />
      ))}
    </div>
  );
};

export default ToolBar;
