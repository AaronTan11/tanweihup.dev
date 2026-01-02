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

interface WorkTableProps {
  onEdit: (work: {
    _id: Id<"work">;
    company: string;
    role: string;
    startDate: string;
    endDate?: string;
    description: string;
    order: number;
  }) => void;
}

type WorkItem = {
  _id: Id<"work">;
  _creationTime: number;
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  description: string;
  order: number;
};

const columnHelper = createColumnHelper<WorkItem>();

export default function WorkTable({ onEdit }: WorkTableProps) {
  const work = useQuery(api.portfolio.listWorkAsc);
  const deleteWork = useMutation(api.portfolio.deleteWork);

  const handleDelete = async (id: Id<"work">) => {
    if (confirm("Are you sure you want to delete this work experience?")) {
      try {
        await deleteWork({ id });
        toast.success("Work experience deleted");
      } catch (error) {
        toast.error("Failed to delete work experience");
      }
    }
  };

  const columns = [
    columnHelper.display({
      id: "index",
      header: "#",
      cell: ({ row }) => row.index + 1,
    }),
    columnHelper.accessor("company", {
      header: "Company",
      cell: (info) => <span className="font-medium">{info.getValue()}</span>,
    }),
    columnHelper.accessor("role", {
      header: "Role",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("startDate", {
      header: "Start",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("endDate", {
      header: "End",
      cell: (info) => info.getValue() || "present",
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
    data: work ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (work === undefined) {
    return <p className="text-[#666] text-sm p-4">Loading...</p>;
  }

  if (work.length === 0) {
    return <p className="text-[#666] text-sm p-4">No work experience added yet.</p>;
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
