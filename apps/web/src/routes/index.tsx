import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "convex/react";
import { api } from "@tanweihup.dev/backend/convex/_generated/api";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  const work = useQuery(api.portfolio.listWork);
  const projects = useQuery(api.portfolio.listProjects);
  const links = useQuery(api.portfolio.listLinks);

  return (
    <div className="min-h-screen bg-[#F9F4EB] text-[#1a1a1a] font-mono p-8 md:p-16 selection:bg-[#ddd] selection:text-black">
      <div className="max-w-3xl mx-auto space-y-16">
        {/* Navigation */}
        <nav className="text-sm text-[#666] mb-24">
          <span className="cursor-pointer hover:text-black transition-colors">[h] home</span>
          <span className="mx-4 cursor-pointer hover:text-black transition-colors">[p] projects</span>
        </nav>

        {/* Header */}
        <header className="space-y-8">
          <h1 className="text-4xl font-black tracking-tight text-black">aaron tan wei hup</h1>
          
          <div className="text-sm text-[#444] space-y-2">
            <p className="flex items-center gap-2">
              <span>📍</span> kuala lumpur, malaysia
            </p>
            <p className="flex items-center gap-2">
              <span>💼</span> engineer
            </p>
          </div>

          <p className="text-lg leading-relaxed max-w-2xl text-[#333]">
            i'm a software engineer. i enjoy working on blockchain systems, frontend ui and making it fast, and exploring weird but cool stuffs.
            if i'm not coding, i'm probably sleeping or reading books.
          </p>
        </header>

        {/* Work */}
        <section className="space-y-10">
          <h2 className="text-black font-black text-xl">* work</h2>
          
          <div className="space-y-8">
            {work === undefined ? (
              <p className="text-[#666] text-sm">loading...</p>
            ) : work.length === 0 ? (
              <p className="text-[#666] text-sm">no work experience added yet.</p>
            ) : (
              work.map((item) => (
                <div key={item._id} className="space-y-3">
                  <h3 className="text-black font-bold text-lg">{item.company}</h3>
                  <p className="text-sm text-[#555]">
                    {item.role} ({item.startDate} - {item.endDate || "present"})
                  </p>
                  <p className="text-base text-[#444] mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Projects */}
        <section className="space-y-10">
          <h2 className="text-black font-black text-xl">* projects</h2>
           
          <div className="space-y-8">
            {projects === undefined ? (
              <p className="text-[#666] text-sm">loading...</p>
            ) : projects.length === 0 ? (
              <p className="text-[#666] text-sm">no projects added yet.</p>
            ) : (
              projects.map((item) => (
                <div key={item._id}>
                  <h3 className="text-black font-bold text-lg mb-1">
                    {item.url ? (
                      <a href={item.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        {item.name}
                      </a>
                    ) : (
                      item.name
                    )}
                  </h3>
                  <p className="text-sm text-[#555] mb-3">{item.role}</p>
                  <p className="text-base text-[#444] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Links */}
        <section className="space-y-8 pt-8">
          <h2 className="text-black font-black text-xl">* links</h2>
          <div className="flex flex-wrap gap-6 text-base text-[#555]">
            {links === undefined ? (
              <p className="text-[#666] text-sm">loading...</p>
            ) : links.length === 0 ? (
              <p className="text-[#666] text-sm">no links added yet.</p>
            ) : (
              links.map((item) => (
                <a
                  key={item._id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-black transition-colors hover:underline"
                >
                  {item.label}
                </a>
              ))
            )}
          </div>
        </section>

        {/* Footer/Signature */}
        <footer className="pt-20 pb-12 text-xs text-[#888]">
          <p>deployed via tanweihup.dev</p>
          <p>inspired by nexxel.dev and rebuilt with tanstack start</p>
        </footer>
      </div>
    </div>
  );
}

