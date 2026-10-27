import type { MetadataRoute } from "next";
import { SITE_NAME } from "./lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — Web & Software Development`,
    short_name: SITE_NAME,
    description:
      "Web, mobile and custom software development studio in Sulaymaniyah, Iraq.",
    start_url: "/en",
    scope: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    lang: "en",
    dir: "ltr",
    categories: ["business", "developer", "technology"],
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    shortcuts: [
      {
        name: "Projects",
        url: "/en/projects",
      },
      {
        name: "Contact",
        url: "/en/contact",
      },
    ],
    related_applications: [],
    prefer_related_applications: false,
  } satisfies MetadataRoute.Manifest & { dir?: string };
}
