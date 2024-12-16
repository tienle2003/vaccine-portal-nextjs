"use client";
import React from "react";

import userTabs from "@/data/userTabs.json";
import CustomTabs from "@/components/CustomTabs";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <CustomTabs tabs={userTabs} />
      <div className="px-9">{children}</div>
    </div>
  );
}
