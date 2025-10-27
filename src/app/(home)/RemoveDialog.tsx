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

interface RemoveDialogProps {
  children: React.ReactNode;
  documentId: Id<"documents">;
}

const RemoveDialog = ({ children, documentId }: RemoveDialogProps) => {
  const deleteDocument = useMutation(api.document.deleteById);

  const handleDelete = async () => {
    await deleteDocument({ id: documentId });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="w-600px flex  flex-col gap-16"
        onClick={(e) => e.stopPropagation()}
      >
        <DialogHeader>
          <DialogTitle>Do You Want To Delete This Document</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            document and removes the document from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={handleDelete} variant={"outline"}>
            OK
          </Button>
          <DialogClose asChild>
            <Button variant={"destructive"}>Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RemoveDialog;
