"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  AlignJustify,
  Search,
  X,
  LayoutDashboard,
  CreditCard,
} from "lucide-react";
import UserInfo from "./user-info";

const NavBarLogo = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-row gap-2 items-center justify-center font-bold">
    {children}
  </div>
);
NavBarLogo.displayName = "NavBarLogo";

const NavBarLink = ({ children }: { children: React.ReactNode }) => (
  <div>
    <Button variant="link" className="text-black ">
      {children}
    </Button>
  </div>
);
NavBarLink.displayName = "NavBarLink";

const NavBarLinks = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-row gap-2">{children}</div>
);
NavBarLinks.displayName = "NavBarLinks";

const Navbar = ({
  logo,
  links,
}: {
  logo?: React.ReactElement<typeof NavBarLogo>;
  links?: React.ReactNode;
}) => {

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
    setTimeout(() => {
      document.getElementById("search-input")?.focus();
    }, 100);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleNavbar = () => {
    setIsOpen((prev) => !prev);
  };

  const closeNavbar = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isDialogOpen) {
        handleCloseDialog();
      } else if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        handleOpenDialog();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isDialogOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeNavbar();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);



  return (
    <div className="relative z-20">
      <div className="flex flex-row px-3 py-2 justify-between items-center bg-white backdrop-blur-md border-b border-1 border-blue-400 text-white">
        {logo}
        <div
          className={`${
            isOpen ? "hidden" : "block"
          } hidden sm:hidden md:flex flex-row gap-x-2 justify-center items-center`}
        >

          <Link href="/dashboard">
            <Button variant="link" size="sm" className="hover:bg-slate-100">
              <LayoutDashboard className="w-4 h-4 stroke-blue-800" />
              <span className="ml-1 text-accent-primary rounded-md px-1 text-sm">
                Darshboard
              </span>
            </Button>
          </Link>
          <Link href="/subscribe">
            <Button variant="link" size="sm" className="hover:bg-slate-100">
              <CreditCard className="w-4 h-4 stroke-blue-800" />
              <span className="ml-1 text-accent-primary rounded-md px-1 text-sm">
                Subscribe
              </span>
            </Button>
          </Link>
          <UserInfo />

          {isOpen ? (
            <Button
              variant="link"
              size="sm"
              className="hover:bg-slate-100"
              onClick={closeNavbar}
            >
              <X className="w-4 h-4 stroke-blue-800" />
            </Button>
          ) : (
            <Button
              variant="link"
              size="sm"
              className="hover:bg-slate-100"
              onClick={toggleNavbar}
            >
              <AlignJustify className="w-4 h-4 stroke-blue-800" />
            </Button>
          )}
        </div>
        <div className="flex md:hidden gap-x-2 items-center">
          <Button
            variant="link"
            size="sm"
            onClick={() => handleOpenDialog()}
            className="hover:bg-slate-100"
          >
            <Search className="w-4 h-4 stroke-blue-800" />
          </Button>

          <Link href="/dashboard">
            <Button variant="link" size="sm" className="hover:bg-slate-100">
              <LayoutDashboard className="w-4 h-4 stroke-blue-800" />
            </Button>
          </Link>
          <UserInfo />
        </div>
      </div>
      <div
        ref={menuRef}
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 absolute w-80 h-screen bg-blue-50/90 backdrop-blur-md border-r border-1 border-blue-400 `}
      >
        <div className="flex flex-col justify-between px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <div className="flex flex-row gap-2 text-white p-2">{links}</div>
        </div>
      </div>
    </div>
  );
};
Navbar.displayName = "Navbar";

export { Navbar, NavBarLinks, NavBarLogo, NavBarLink };
