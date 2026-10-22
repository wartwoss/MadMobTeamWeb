"use client";

import Navbar from "./Navbar";
import Footer from "./Footer";
import PageLoader from "./PageLoader";
import ScrollProgress from "./ScrollProgress";
import ScreenGrit from "./ScreenGrit";

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
      <main className="relative flex-1">
        <ScreenGrit />
        {children}
      </main>
      <Footer />
    </div>
  );
}
