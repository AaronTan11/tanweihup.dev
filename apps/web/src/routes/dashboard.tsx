import { createFileRoute } from "@tanstack/react-router";
import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";
import { useState } from "react";
import type { Id } from "@tanweihup.dev/backend/convex/_generated/dataModel";

import SignInForm from "@/components/sign-in-form";
import UserMenu from "@/components/user-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import WorkForm from "@/components/dashboard/work-form";
import WorkTable from "@/components/dashboard/work-table";
import ProjectForm from "@/components/dashboard/project-form";
import ProjectTable from "@/components/dashboard/project-table";
import LinkForm from "@/components/dashboard/link-form";
import LinkTable from "@/components/dashboard/link-table";

export const Route = createFileRoute("/dashboard")({
  component: RouteComponent,
});

type EditingWork = {
  _id: Id<"work">;
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  description: string;
  order: number;
};

type EditingProject = {
  _id: Id<"projects">;
  name: string;
  role: string;
  description: string;
  url?: string;
  order: number;
};

type EditingLink = {
  _id: Id<"links">;
  label: string;
  url: string;
  order: number;
};

function RouteComponent() {
  const [showSignIn, setShowSignIn] = useState(true);
  const [editingWork, setEditingWork] = useState<EditingWork | undefined>(undefined);
  const [editingProject, setEditingProject] = useState<EditingProject | undefined>(undefined);
  const [editingLink, setEditingLink] = useState<EditingLink | undefined>(undefined);

  return (
    <div className="min-h-screen bg-[#F9F4EB] text-[#1a1a1a] font-mono">
      <Authenticated>
        <div className="p-8 md:p-16 max-w-5xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-black text-black">Dashboard</h1>
            <UserMenu />
          </div>

          {/* Tabs */}
          <Tabs defaultValue="work" className="w-full">
            <TabsList variant="default" className="mb-8">
              <TabsTrigger value="work" className="text-base px-4 py-2">Work</TabsTrigger>
              <TabsTrigger value="projects" className="text-base px-4 py-2">Projects</TabsTrigger>
              <TabsTrigger value="links" className="text-base px-4 py-2">Links</TabsTrigger>
            </TabsList>

            {/* Work Tab */}
            <TabsContent value="work" className="space-y-8">
              <WorkForm
                editingWork={editingWork}
                onSuccess={() => setEditingWork(undefined)}
              />
              <WorkTable onEdit={(work) => setEditingWork(work)} />
            </TabsContent>

            {/* Projects Tab */}
            <TabsContent value="projects" className="space-y-8">
              <ProjectForm
                editingProject={editingProject}
                onSuccess={() => setEditingProject(undefined)}
              />
              <ProjectTable onEdit={(project) => setEditingProject(project)} />
            </TabsContent>

            {/* Links Tab */}
            <TabsContent value="links" className="space-y-8">
              <LinkForm
                editingLink={editingLink}
                onSuccess={() => setEditingLink(undefined)}
              />
              <LinkTable onEdit={(link) => setEditingLink(link)} />
            </TabsContent>
          </Tabs>
        </div>
      </Authenticated>

      <Unauthenticated>
        <div className="min-h-screen flex items-center justify-center bg-[#F9F4EB]">
          {showSignIn === true && (
            <SignInForm onSwitchToSignUp={() => setShowSignIn(false)} />
          )}
        </div>
      </Unauthenticated>

      <AuthLoading>
        <div className="min-h-screen flex items-center justify-center bg-[#F9F4EB]">
          <p className="text-[#666] text-lg">Loading...</p>
        </div>
      </AuthLoading>
    </div>
  );
}

