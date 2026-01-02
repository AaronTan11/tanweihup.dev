import { useForm } from "@tanstack/react-form";
import { useMutation } from "convex/react";
import { api } from "@tanweihup.dev/backend/convex/_generated/api";
import { toast } from "sonner";
import type { Id } from "@tanweihup.dev/backend/convex/_generated/dataModel";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LinkFormProps {
  editingLink?: {
    _id: Id<"links">;
    label: string;
    url: string;
    order: number;
  };
  onSuccess?: () => void;
}

export default function LinkForm({ editingLink, onSuccess }: LinkFormProps) {
  const createLink = useMutation(api.portfolio.createLink);
  const updateLink = useMutation(api.portfolio.updateLink);

  const form = useForm({
    defaultValues: {
      label: editingLink?.label ?? "",
      url: editingLink?.url ?? "",
      order: editingLink?.order ?? 0,
    },
    onSubmit: async ({ value }) => {
      try {
        if (editingLink) {
          await updateLink({
            id: editingLink._id,
            label: value.label,
            url: value.url,
            order: value.order,
          });
          toast.success("Link updated");
        } else {
          await createLink({
            label: value.label,
            url: value.url,
            order: value.order,
          });
          toast.success("Link added");
        }
        onSuccess?.();
      } catch (error) {
        toast.error("Failed to save link");
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
        {editingLink ? "Edit Link" : "Add Link"}
      </h3>

      <div className="grid grid-cols-3 gap-4">
        <form.Field name="label">
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor={field.name} className="text-black">Label</Label>
              <Input
                id={field.name}
                placeholder="e.g., github, linkedin"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className="bg-white border-[#ccc] text-black"
              />

            </div>
          )}
        </form.Field>

        <form.Field name="url">
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor={field.name} className="text-black">URL</Label>
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

        <form.Field name="order">
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor={field.name} className="text-black">Order</Label>
              <Input
                id={field.name}
                type="number"
                value={field.state.value}
                onChange={(e) => field.handleChange(parseInt(e.target.value) || 0)}
                className="bg-white border-[#ccc] text-black"
              />
            </div>
          )}
        </form.Field>
      </div>

      <form.Subscribe>
        {(state) => (
          <Button
            type="submit"
            className="bg-black text-white hover:bg-gray-800"
            disabled={!state.canSubmit || state.isSubmitting}
          >
            {state.isSubmitting ? "Saving..." : editingLink ? "Update" : "Add Link"}
          </Button>
        )}
      </form.Subscribe>
    </form>
  );
}
