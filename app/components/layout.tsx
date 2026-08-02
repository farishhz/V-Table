import OgImage from "./og-image.png";
import { Metadata } from "next";

const title = "og-table Components";
const description = "Component playground for the og-table ecosystem.";
const ogUrl = OgImage.src;

export const metadata: Metadata = {
  title: title,
  description: description,
  openGraph: {
    url: "/components",
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
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
