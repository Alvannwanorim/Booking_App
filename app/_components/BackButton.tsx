import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
interface BackButtonProps {
  href: string;
  label: string;
}
function BackButton({ href, label }: BackButtonProps) {
  return (
    <Button variant="link" size="sm" className="font-normal w-full">
      <Link href={href}>{label}</Link>
    </Button>
  );
}

export default BackButton;
