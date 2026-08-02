"use client";

import Link from "next/link";
import { cn } from "@/utils/cn";
import { Icons } from "./icons";
import { InfoDialog } from "@/app/(main)/(table)/components/InfoDialog";
import { Button } from "./ui/button";
export function Navigation() {
  return (
    <nav className="flex items-center justify-between gap-3 h-[50px] pl-4 pr-5 bg-[#121A19]  w-full fixed z-10">
      <div className="flex items-center gap-3 transition-transform ease-in-out translate-x-0">
        <Button className="py-2  ">
          <Link href="/" className="mr-4 flex items-center justify-center gap-2 lg:mr-6">
            <Icons.logo3 className="size-12 opacity-80" />
            {/* <span className="inline-flex  font-bold text-xl text-[#85A6A5] font-mono">V Table</span> */}
          </Link>
        </Button>
      </div>
    </nav>
  );
}

export function NavigationActions({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "h-[50px] flex items-center justify-end fixed top-0 right-scrollbar-offset gap-2 z-10 left-44",
        className,
      )}
    >
      {children}
    </div>
  );
}
