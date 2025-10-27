"use client";

import Image from "next/image";
import Link from "next/link";

import SearchInput from "./SearchInput";
import { UserButton } from "@clerk/nextjs";

const NavBar = () => {
  return (
    <div className="flex  p-2  justify-between w-full fixed top-0 left-0 z-10 bg-white">
      <div className="flex gap-2 min-w-40">
        <Link href="/">
          <Image src="/logo.svg" width={36} height={36} alt="logo" />
        </Link>

        <span className="text-lg font-semibold">Tech Docs</span>
      </div>
      <SearchInput />

      <div>
        <UserButton />
      </div>
    </div>
  );
};

export default NavBar;
