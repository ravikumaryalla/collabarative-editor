import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Doc, Id } from "../../../convex/_generated/dataModel";
import RemoveDialog from "./RemoveDialog";
import { ExternalLinkIcon, PencilIcon, TrashIcon } from "lucide-react";
import RenameDialog from "./RenameDialog";

interface Menuprops {
  children: React.ReactNode;
  document: Doc<"documents">;
}

const Menu = ({ children, document }: Menuprops) => {
  const handleOpenInNewTab = () => {
    window.open(`/documents/${document._id}`, "_blank");
  };

  const [menuOpen, setMenuOpen] = useState(false);
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
  const [renameDialogOpen, setRenameDialogOpen] = useState(false);

  const handleRename = () => {
    setRenameDialogOpen(true);
    setMenuOpen(false);
  };

  return (
    <>
      <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={handleOpenInNewTab}>
            <ExternalLinkIcon />
            Open in new tab
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => {
              setMenuOpen(false);
              setRemoveDialogOpen(true);
            }}
          >
            <TrashIcon />
            Delete
          </DropdownMenuItem>

          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            onClick={handleRename}
          >
            <PencilIcon />
            Rename
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <RemoveDialog
        documentId={document._id}
        open={removeDialogOpen}
        setOpen={setRemoveDialogOpen}
      ></RemoveDialog>

      <RenameDialog
        document={document}
        open={renameDialogOpen}
        setOpen={setRenameDialogOpen}
      ></RenameDialog>
    </>
  );
};

export default Menu;
