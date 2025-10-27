import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Id } from "../../../convex/_generated/dataModel";
import RemoveDialog from "./RemoveDialog";
import { ExternalLinkIcon, PencilIcon, TrashIcon } from "lucide-react";
import RenameDialog from "./RenameDialog";

interface Menuprops {
  children: React.ReactNode;
  documentId: Id<"documents">;
}

const Menu = ({ children, documentId }: Menuprops) => {
  const handleOpenInNewTab = () => {
    window.open(`/documents/${documentId}`, "_blank");
  };

  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={handleOpenInNewTab}>
          <ExternalLinkIcon />
          Open in new tab
        </DropdownMenuItem>

        <RemoveDialog documentId={documentId}>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <TrashIcon />
            Delete
          </DropdownMenuItem>
        </RemoveDialog>

        <RenameDialog documentId={documentId} setMenuOpen={setMenuOpen}>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <PencilIcon />
            Rename
          </DropdownMenuItem>
        </RenameDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Menu;
