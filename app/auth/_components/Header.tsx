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
        <Image
          src="/logo.svg"
          alt="logo"
          height={20}
          width={20}
          className="w-10 h-10"
        />
        Auth
      </h2>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
}

export default Header;
