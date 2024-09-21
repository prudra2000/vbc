"use client";
import React from "react";
import { Button } from "@/components/ui/button";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  AlignJustify,
  Github,
  Search,
  Home,
  X,
  SearchIcon,
  ChevronRight,
  Ban,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { auth, signOut } from "@/auth";
import { useSession } from "next-auth/react";
import Avatar from "./avatar";

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
  const { data: session } = useSession();

  const [docsData, setDocsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/searchIndex.json");
      const data = await response.json();
      setDocsData(data);
    };

    fetchData();
  }, []);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
    setTimeout(() => {
      document.getElementById("search-input")?.focus();
    }, 100);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSearchQuery("");
  };
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const toggleNavbar = () => {
    setIsOpen(true);
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

  const [searchQuery, setSearchQuery] = useState("");

  const filteredDocs = docsData.filter(
    (doc: { title: string; href: string; id: string }) =>
      doc.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative z-20">
      <div className="flex flex-row px-5 md:px-10 py-2 justify-between items-center bg-[#030711]/80 backdrop-blur-md border-b border-1 border-white/10 text-white">
        {logo}
        <div
          className={`${
            isOpen ? "hidden" : "block"
          } hidden sm:hidden md:flex flex-row gap-x-2 justify-center items-center`}
        >
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleOpenDialog()}
            className=""
          >
            <Search className="w-4 h-4 stroke-[#F8CC38]" />
            <span className=" hidden md:block ml-2 border border-1 border-accent-primary text-accent-primary rounded-md px-1 text-xs">
              {typeof navigator !== "undefined" &&
              navigator.userAgent.includes("Mac")
                ? "⌘ K"
                : "Ctrl+K"}
            </span>
          </Button>

          <a href={`/`}>
            <Button variant="outline" size="sm">
              <Home className="w-4 h-4 stroke-[#F8CC38]" />
            </Button>
          </a>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              window.open("https://github.com/prudra2000/Velocify", "_blank")
            }
          >
            <Github className="w-4 h-4 stroke-[#F8CC38]" />
          </Button>
          {isOpen ? (
            <Button
              variant="outline"
              className="rounded-full"
              onClick={closeNavbar}
            >
              <X className="h-4 w-4 stroke-[#F8CC38]" />
            </Button>
          ) : (
            <Button
              variant="outline"
              className="rounded-full"
              onClick={toggleNavbar}
            >
              <AlignJustify className="h-4 w-4 stroke-[#F8CC38]" />
            </Button>
          )}
        </div>
        <div className="-mr-2 flex md:hidden gap-x-2 items-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleOpenDialog()}
            className=""
          >
            <Search className="w-4 h-4 stroke-[#F8CC38]" />
          </Button>
          <div className="hidden md:block">
            <Input placeholder="Search" className="w-full h-8" />
          </div>
          <a href={`/`}>
            <Button variant="outline" size="sm">
              <Home className="w-4 h-4 stroke-[#F8CC38]" />
            </Button>
          </a>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              window.open("https://github.com/prudra2000/Velocify", "_blank")
            }
          >
            <Github className="w-4 h-4 stroke-[#F8CC38]" />
          </Button>
          {isOpen ? (
            <Button
              variant="outline"
              className="rounded-full"
              onClick={closeNavbar}
            >
              <X className="h-4 w-4 stroke-[#F8CC38]" />
            </Button>
          ) : (
            <Button
              variant="outline"
              className="rounded-full"
              onClick={toggleNavbar}
            >
              <AlignJustify className="h-4 w-4 stroke-[#F8CC38]" />
            </Button>
          )}
          {session &&
            session.user && ( // Check if session and user exist
              <Avatar
                src={session.user.image ?? ""}
                alt={session.user.name ?? ""}
                size="small"
                onLoad={() => {
                  // Cache the image in localStorage
                  const imgSrc = session.user?.image ?? "";
                  localStorage.setItem("cachedAvatar", imgSrc);
                }}
              />
            )}
        </div>
      </div>
      <div
        ref={menuRef}
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 absolute w-80 h-screen bg-[#030711]/90 backdrop-blur-md border-r border-1 border-white/10 `}
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
