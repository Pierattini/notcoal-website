import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "The Not Coal Company",
    short_name: "The Not Coal Company",
    description: "Renewable energy, Solar PV and BESS consulting.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
      {
        src: "/notcoal-favicon-16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        src: "/notcoal-favicon-32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/notcoal-apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "/notcoal-icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/notcoal-icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/logos/logo-square.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
