import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Alvin Portfolio",
    short_name: "About Chen",
    description: "A frontend developer portfolio built with Next.js",
    start_url: "/",
    display: "standalone",
    background_color: "#1a1a1a",
    theme_color: "#1a1a1a",
    icons: [
      {
        src:"/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src:"/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      }
    ],
  };
}