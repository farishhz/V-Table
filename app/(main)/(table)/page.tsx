import type { Metadata } from "next";

import OgPhoto from "./assets/og.png";
import { Code } from "./code";
import { BASE_URL } from "@/utils/common";

const title = "Build Beautiful Table - ogtable";
const description =
  "Build beautiful tables for your next presentation, documentation, publication, information visualization, and more.";
const ogUrl = OgPhoto.src;

export const metadata: Metadata = {
  title: title,
  description: description,
  openGraph: {
    url: BASE_URL,
    title: title,
    description: description,
    images: [
      {
        url: ogUrl,
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  },
  twitter: {
    title: title,
    description: description,
    images: [
      {
        url: ogUrl,
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  },
  keywords: "generate, create, table, presentation, image, picture, share, export",
};

export default function Page() {
  return <Code />;
}
