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

interface ProjectTableProps {
  onEdit: (project: {
    _id: Id<"projects">;
    name: string;
    role: string;
    description: string;
    url?: string;
    order: number;
  }) => void;
}

type ProjectItem = {
  _id: Id<"projects">;
  _creationTime: number;
  name: string;
  role: string;
  description: string;
  url?: string;
  order: number;
};

const columnHelper = createColumnHelper<ProjectItem>();

export default function ProjectTable({ onEdit }: ProjectTableProps) {
  const projects = useQuery(api.portfolio.listProjects);
  const deleteProject = useMutation(api.portfolio.deleteProject);

  const handleDelete = async (id: Id<"projects">) => {
    if (confirm("Are you sure you want to delete this project?")) {
      try {
        await deleteProject({ id });
        toast.success("Project deleted");
      } catch (error) {
        toast.error("Failed to delete project");
      }
    }
  };

  const columns = [
    columnHelper.accessor("order", {
      header: "#",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("name", {
      header: "Name",
      cell: (info) => <span className="font-medium">{info.getValue()}</span>,
    }),
    columnHelper.accessor("role", {
      header: "Role",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("url", {
      header: "URL",
      cell: (info) => {
        const url = info.getValue();
        return url ? (
          <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            Link
          </a>
        ) : "-";
      },
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
    data: projects ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (projects === undefined) {
    return <p className="text-[#666] text-sm p-4">Loading...</p>;
  }

  if (projects.length === 0) {
    return <p className="text-[#666] text-sm p-4">No projects added yet.</p>;
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
