import { useForm } from "@tanstack/react-form";
import { useMutation } from "convex/react";
import { api } from "@tanweihup.dev/backend/convex/_generated/api";
import { toast } from "sonner";
import type { Id } from "@tanweihup.dev/backend/convex/_generated/dataModel";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface WorkFormProps {
  editingWork?: {
    _id: Id<"work">;
    company: string;
    role: string;
    startDate: string;
    endDate?: string;
    description: string;
    order: number;
  };
  onSuccess?: () => void;
}

export default function WorkForm({ editingWork, onSuccess }: WorkFormProps) {
  const createWork = useMutation(api.portfolio.createWork);
  const updateWork = useMutation(api.portfolio.updateWork);

  const form = useForm({
    defaultValues: {
      company: editingWork?.company ?? "",
      role: editingWork?.role ?? "",
      startDate: editingWork?.startDate ?? "",
      endDate: editingWork?.endDate ?? "",
      description: editingWork?.description ?? "",
    },
    onSubmit: async ({ value }) => {
      try {
        if (editingWork) {
          await updateWork({
            id: editingWork._id,
            company: value.company,
            role: value.role,
            startDate: value.startDate,
            endDate: value.endDate || undefined,
            description: value.description,
            order: editingWork.order,
          });
          toast.success("Work experience updated");
        } else {
          await createWork({
            company: value.company,
            role: value.role,
            startDate: value.startDate,
            endDate: value.endDate || undefined,
            description: value.description,
            order: Date.now(),
          });
          toast.success("Work experience added");
        }
        onSuccess?.();
      } catch (error) {
        toast.error("Failed to save work experience");
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
        {editingWork ? "Edit Work Experience" : "Add Work Experience"}
      </h3>

      <div className="grid grid-cols-2 gap-4">
        <form.Field name="company">
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor={field.name} className="text-black">Company</Label>
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
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className="bg-white border-[#ccc] text-black"
              />

            </div>
          )}
        </form.Field>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <form.Field name="startDate">
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor={field.name} className="text-black">Start Date</Label>
              <Input
                id={field.name}
                placeholder="e.g., nov 2025"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className="bg-white border-[#ccc] text-black"
              />

            </div>
          )}
        </form.Field>

        <form.Field name="endDate">
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor={field.name} className="text-black">End Date</Label>
              <Input
                id={field.name}
                placeholder="leave empty for 'present'"
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
            {state.isSubmitting ? "Saving..." : editingWork ? "Update" : "Add Work"}
          </Button>
        )}
      </form.Subscribe>
    </form>
  );
}
