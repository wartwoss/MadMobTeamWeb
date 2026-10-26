"use client";

import dynamic from "next/dynamic";
import Navbar from "./Navbar";
import Footer from "./Footer";
import PageLoader from "./PageLoader";
import ScreenGrit from "./ScreenGrit";

/* Decorative chrome only — no content, no SEO value. Loading it after
   hydration keeps framer-motion out of the critical path. */
const ScrollProgress = dynamic(() => import("./ScrollProgress"), {
  ssr: false,
});

type PageFrameProps = {
  title: string;
  loaderTitle?: string;
  children: React.ReactNode;
};

export default function PageFrame({ title, loaderTitle, children }: PageFrameProps) {
  return (
    <div className="flex min-h-dvh flex-col">
      <PageLoader title={loaderTitle ?? title} />
      <ScrollProgress />
      <Navbar />
      <main
        id="main-content"
        tabIndex={-1}
        className="relative flex-1 outline-none"
      >
        <ScreenGrit />
        {children}
      </main>
      <Footer />
    </div>
  );
}
