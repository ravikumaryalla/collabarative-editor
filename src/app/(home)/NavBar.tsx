"use client";

import Image from "next/image";
import Link from "next/link";

import SearchInput from "./SearchInput";
import { UserButton, OrganizationSwitcher } from "@clerk/nextjs";

const NavBar = () => {
  return (
    <nav className="flex items-center px-3 md:px-6 py-3 gap-2 md:gap-4 justify-between w-full fixed top-0 left-0 z-10 bg-white border-b border-gray-200/60 shadow-sm">
      <div className="flex items-center gap-2 md:gap-3 shrink-0">
        <Link 
          href="/" 
          className="flex items-center gap-2 md:gap-3 hover:opacity-80 transition-opacity group"
        >
          <div className="relative">
            <Image 
              src="/logo.svg" 
              width={36} 
              height={36} 
              alt="logo" 
              className="transition-transform group-hover:scale-105"
            />
          </div>
          <span className="text-base md:text-lg font-semibold text-gray-900 hidden sm:inline-block">
            Tech Docs
          </span>
        </Link>
      </div>
      
      <div className="flex-1 flex justify-center min-w-0 mx-2 md:mx-4">
        <SearchInput />
      </div>

      <div className="flex items-center gap-1 md:gap-2 shrink-0">
        <div className="hidden lg:block">
          <OrganizationSwitcher
            afterCreateOrganizationUrl={"/"}
            afterLeaveOrganizationUrl="/"
            afterSelectOrganizationUrl={"/"}
            afterSelectPersonalUrl={"/"}
          />
        </div>
        <UserButton />
      </div>
    </nav>
  );
};

export default NavBar;
