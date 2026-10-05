import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Abanoub Rashad — Software Engineer",
    short_name: "Abanoub Rashad",
    description: "Portfolio of Abanoub Rashad: web applications, API integrations and smart-system dashboards.",
    start_url: "/",
    display: "standalone",
    background_color: "#090D16",
    theme_color: "#090D16",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
