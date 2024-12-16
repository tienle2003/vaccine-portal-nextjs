"use client";
import React from "react";

import adminTabs from "@/data/adminTabs.json";
import CustomTabs from "@/components/CustomTabs";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <CustomTabs tabs={adminTabs} />
      <div className="px-9">{children}</div>
    </div>
  );
}
