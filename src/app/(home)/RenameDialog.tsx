"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Id } from "../../../convex/_generated/dataModel";
import { api } from "../../../convex/_generated/api";
import { useMutation } from "convex/react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface RemoveDialogProps {
  children: React.ReactNode;
  documentId: Id<"documents">;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const RenameDialog = ({
  children,
  documentId,
  setMenuOpen,
}: RemoveDialogProps) => {
  const renameDocument = useMutation(api.document.renameById);
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);

  const handleRename = async () => {
    if (!inputValue) return;
    await renameDocument({ id: documentId, title: inputValue });
    setOpen(false);
    setMenuOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
    setMenuOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="w-600px flex  flex-col gap-16"
        onClick={(e) => e.stopPropagation()}
      >
        <DialogHeader>
          <DialogTitle>Rename Document</DialogTitle>
          <DialogDescription>
            Enter a new name for the document.
          </DialogDescription>
          <Input
            type="text"
            placeholder="Enter new name"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </DialogHeader>
        <DialogFooter>
          <Button onClick={handleRename} variant={"outline"}>
            Rename
          </Button>
          <Button variant={"destructive"} onClick={handleClose}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RenameDialog;
