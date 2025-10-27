"use client";
import { Doc } from "../../../convex/_generated/dataModel";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "../../components/ui/table";
import { SiGoogledocs } from "react-icons/si";
import { format } from "date-fns";
import {
  Building2Icon,
  CircleUserIcon,
  MoreVerticalIcon,
  PencilIcon,
} from "lucide-react";
import Menu from "./Menu";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface DocumentTableProps {
  documents: Doc<"documents">[] | undefined;
  loadMore: (numItems: number) => void;
}
const DocumentTable = ({ documents, loadMore }: DocumentTableProps) => {
  const router = useRouter();
  const handleDoubleClickRow = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };
  return (
    <div className="max-w-screen-lg  mx-auto w-3/4">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableCell className="w-[50px]">Title</TableCell>
            <TableCell>&nbsp;</TableCell>
            <TableCell>Shared</TableCell>
            <TableCell>Created At</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents?.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={5}
                className="h-24 text-center test-sm text-muted-foreground"
              >
                No documents.
              </TableCell>
            </TableRow>
          )}
          {documents?.map((document) => {
            return (
              <TableRow
                className="cursor-pointer"
                key={document._id}
                onDoubleClick={() => handleDoubleClickRow(document?._id)}
              >
                <TableCell>
                  <SiGoogledocs className="fill-blue-500 size-4" />
                </TableCell>
                <TableCell className="text-sm ">{document.title}</TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  <span className="flex gap-2">
                    {document?.organizationId ? (
                      <Building2Icon className="size-4" />
                    ) : (
                      <CircleUserIcon className="size-4" />
                    )}
                    {document?.organizationId ? "Organization" : "Personal"}
                  </span>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground ">
                  {format(new Date(document._creationTime), "MMM dd, yyyy h")}
                </TableCell>
                <TableCell>
                  <Menu documentId={document._id}>
                    <Button variant={"ghost"} className="rounded-lg">
                      <MoreVerticalIcon className="size-4 cursor-pointer" />
                    </Button>
                  </Menu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default DocumentTable;
