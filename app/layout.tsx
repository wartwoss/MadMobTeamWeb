import type { Metadata } from "next";
import { SITE_URL } from "./lib/site";

/* The localized layout owns the real document metadata. This base is needed
   for the root not-found route and for file-based social images, which are
   resolved before a locale segment exists. */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
