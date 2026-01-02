import { useForm } from "@tanstack/react-form";
import { useMutation } from "convex/react";
import { api } from "@tanweihup.dev/backend/convex/_generated/api";
import { toast } from "sonner";
import type { Id } from "@tanweihup.dev/backend/convex/_generated/dataModel";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ProjectFormProps {
  editingProject?: {
    _id: Id<"projects">;
    name: string;
    role: string;
    description: string;
    url?: string;
    order: number;
  };
  onSuccess?: () => void;
}

export default function ProjectForm({ editingProject, onSuccess }: ProjectFormProps) {
  const createProject = useMutation(api.portfolio.createProject);
  const updateProject = useMutation(api.portfolio.updateProject);

  const form = useForm({
    defaultValues: {
      name: editingProject?.name ?? "",
      role: editingProject?.role ?? "",
      description: editingProject?.description ?? "",
      url: editingProject?.url ?? "",
    },
    onSubmit: async ({ value }) => {
      try {
        if (editingProject) {
          await updateProject({
            id: editingProject._id,
            name: value.name,
            role: value.role,
            description: value.description,
            url: value.url || undefined,
            order: editingProject.order,
          });
          toast.success("Project updated");
        } else {
          await createProject({
            name: value.name,
            role: value.role,
            description: value.description,
            url: value.url || undefined,
            order: Date.now(),
          });
          toast.success("Project added");
        }
        onSuccess?.();
      } catch (error) {
        toast.error("Failed to save project");
      }
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-4 p-4 bg-white rounded-lg border border-[#ddd]"
    >
      <h3 className="text-lg font-bold text-black">
        {editingProject ? "Edit Project" : "Add Project"}
      </h3>

      <div className="grid grid-cols-2 gap-4">
        <form.Field name="name">
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor={field.name} className="text-black">Project Name</Label>
              <Input
                id={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className="bg-white border-[#ccc] text-black"
              />

            </div>
          )}
        </form.Field>

        <form.Field name="role">
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor={field.name} className="text-black">Role</Label>
              <Input
                id={field.name}
                placeholder="e.g., creator, maintainer"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className="bg-white border-[#ccc] text-black"
              />

            </div>
          )}
        </form.Field>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <form.Field name="url">
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor={field.name} className="text-black">URL (optional)</Label>
              <Input
                id={field.name}
                placeholder="https://..."
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className="bg-white border-[#ccc] text-black"
              />
            </div>
          )}
        </form.Field>
      </div>

      <form.Field name="description">
        {(field) => (
          <div className="space-y-2">
            <Label htmlFor={field.name} className="text-black">Description</Label>
            <Textarea
              id={field.name}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              className="bg-white border-[#ccc] text-black min-h-[100px]"
            />

          </div>
        )}
      </form.Field>

      <form.Subscribe>
        {(state) => (
          <Button
            type="submit"
            className="bg-black text-white hover:bg-gray-800"
            disabled={!state.canSubmit || state.isSubmitting}
          >
            {state.isSubmitting ? "Saving..." : editingProject ? "Update" : "Add Project"}
          </Button>
        )}
      </form.Subscribe>
    </form>
  );
}
