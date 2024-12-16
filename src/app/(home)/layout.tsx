import Footer from "@/components/Footer";
import Header from "@/components/Header/Header";
import React from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex items-start min-h-screen">
        <div className="w-full">{children}</div>
      </div>
      <Footer />
    </div>
  );
}
