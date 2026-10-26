"use client";

import dynamic from "next/dynamic";
import ModernFooter from "./ModernFooter";
import ModernLoader from "./ModernLoader";
import ModernNavbar from "./ModernNavbar";

/* Ambient decoration + scroll meter are client-only flourishes; keeping them
   out of SSR trims the initial payload without changing the content tree. */
const ModernBackdrop = dynamic(() => import("./ModernBackdrop"), {
  ssr: false,
});
const ModernScrollProgress = dynamic(() => import("./ModernScrollProgress"), {
  ssr: false,
});

type ModernPageFrameProps = {
  title: string;
  loaderTitle?: string;
  children: React.ReactNode;
};

/* Modern-theme counterpart of PageFrame: same contract (title drives the
   loader), completely different chrome — ambient aurora backdrop, floating
   glass navbar, hairline gradient progress meter and iris-wipe loader. */
export default function ModernPageFrame({
  title,
  loaderTitle,
  children,
}: ModernPageFrameProps) {
  return (
    <div className="font-modern-body relative flex min-h-dvh flex-col overflow-x-clip bg-[#041419] text-cyan-50">
      <ModernBackdrop />
      <ModernLoader title={loaderTitle ?? title} />
      <ModernScrollProgress />
      <ModernNavbar />
      <main
        id="main-content"
        tabIndex={-1}
        className="relative z-10 flex-1 outline-none"
      >
        {children}
      </main>
      <ModernFooter />
    </div>
  );
}
