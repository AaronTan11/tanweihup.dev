import alchemy from "alchemy";
import { TanStackStart } from "alchemy/cloudflare";
import { config } from "dotenv";

config({ path: "./.env" });
config({ path: "../../apps/web/.env.prod" });

const app = await alchemy("tanweihup.dev", {
  profile: "prod"
});

export const web = await TanStackStart("web", {
  cwd: "../../apps/web",
  bindings: {
    VITE_CONVEX_URL: alchemy.env.VITE_CONVEX_URL!,
    VITE_CONVEX_SITE_URL: alchemy.env.VITE_CONVEX_SITE_URL!,
  },
  profile: "prod",
  domains: ["tanweihup.dev", "www.tanweihup.dev"]
});

console.log(`Web    -> ${web.url}`);
console.log(`Web    -> ${web.domains?.map((domain) => domain.name).join(", ")}`);

await app.finalize();
