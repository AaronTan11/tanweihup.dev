import { useMutation, useQuery } from "convex/react";
import { api } from "@tanweihup.dev/backend/convex/_generated/api";
import { toast } from "sonner";
import type { Id } from "@tanweihup.dev/backend/convex/_generated/dataModel";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface LinkTableProps {
  onEdit: (link: {
    _id: Id<"links">;
    label: string;
    url: string;
    order: number;
  }) => void;
}

type LinkItem = {
  _id: Id<"links">;
  _creationTime: number;
  label: string;
  url: string;
  order: number;
};

const columnHelper = createColumnHelper<LinkItem>();

export default function LinkTable({ onEdit }: LinkTableProps) {
  const links = useQuery(api.portfolio.listLinksAsc);
  const deleteLink = useMutation(api.portfolio.deleteLink);

  const handleDelete = async (id: Id<"links">) => {
    if (confirm("Are you sure you want to delete this link?")) {
      try {
        await deleteLink({ id });
        toast.success("Link deleted");
      } catch (error) {
        toast.error("Failed to delete link");
      }
    }
  };

  const columns = [
    columnHelper.display({
      id: "index",
      header: "#",
      cell: ({ row }) => row.index + 1,
    }),
    columnHelper.accessor("label", {
      header: "Label",
      cell: (info) => <span className="font-medium">{info.getValue()}</span>,
    }),
    columnHelper.accessor("url", {
      header: "URL",
      cell: (info) => (
        <a href={info.getValue()} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
          {info.getValue()}
        </a>
      ),
    }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(row.original)}
            className="text-xs"
          >
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDelete(row.original._id)}
            className="text-xs text-red-600 hover:text-red-800"
          >
            Delete
          </Button>
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    data: links ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (links === undefined) {
    return <p className="text-[#666] text-sm p-4">Loading...</p>;
  }

  if (links.length === 0) {
    return <p className="text-[#666] text-sm p-4">No links added yet.</p>;
  }

  return (
    <div className="rounded-lg border border-[#ddd] overflow-hidden">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="bg-[#f5f5f5]">
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="text-black font-bold">
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id} className="bg-white hover:bg-[#fafafa]">
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className="text-[#333]">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
