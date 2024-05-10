import Image from "next/image";
import React from "react";

interface HeaderProps {
  label: string;
  title?: string;
}

function Header({ label }: HeaderProps) {
  return (
    <div className="w-full flex flex-col placeholder-gray-4 items-center justify-center">
      <h2 className="text-3xl font-semibold flex gap-1">
        <Image src="/logo.svg" alt="logo" height={50} width={180} />
      </h2>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
}

export default Header;
