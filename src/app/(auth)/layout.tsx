import Image from "next/image";
import React from "react";
import background from "../../../public/images/image 1.png";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-dvh">
      <Image
        priority
        className="w-1/2 object-cover"
        src={background}
        alt="Background image"
      />
      <div className="w-1/2 flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
}
