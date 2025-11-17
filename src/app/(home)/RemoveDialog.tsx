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
import { toast } from "sonner";

interface RemoveDialogProps {
  documentId: Id<"documents">;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const RemoveDialog = ({ documentId, open, setOpen }: RemoveDialogProps) => {
  const deleteDocument = useMutation(api.document.deleteById);

  const handleDelete = async () => {
    await deleteDocument({ id: documentId });
    toast.success("Document Deleted", {
      position: "top-right",
      style: { padding: "12px" },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="w-600px flex  flex-col gap-16 z-50"
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
