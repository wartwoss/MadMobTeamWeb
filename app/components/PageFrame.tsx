"use client";

import Navbar from "./Navbar";
import Footer from "./Footer";
import PageLoader from "./PageLoader";
import ScrollProgress from "./ScrollProgress";

type PageFrameProps = {
  title: string;
  children: React.ReactNode;
};

export default function PageFrame({ title, children }: PageFrameProps) {
  return (
    <>
      <PageLoader title={title} />
      <ScrollProgress />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}