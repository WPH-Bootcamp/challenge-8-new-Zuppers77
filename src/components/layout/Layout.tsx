import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="bg-black min-h-screen flex flex-col font-sans text-white">
      <Navbar />
      <main className="grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};
