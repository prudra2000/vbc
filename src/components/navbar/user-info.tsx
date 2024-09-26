import React from "react";
import { useSession } from "next-auth/react";
import Avatar from "../avatar";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { handleSignOut } from "@/actions/logout";
import { signOut } from "next-auth/react";

import Link from "next/link";
import { LogOut, Settings, LayoutDashboard } from "lucide-react";

const UserInfo = () => {
  const { data: session, status } = useSession();
  return (
    <div>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger className="rounded-full focus:border-blue-500">
            {" "}
            <Avatar
              alt={session?.user?.name ?? ""}
              src={session?.user?.image ?? ""}
              size="small"
            />
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              <div className="flex flex-row gap-2 items-center">
                <Avatar
                  alt={session?.user?.name ?? ""}
                  src={session?.user?.image ?? ""}
                />
                <div className="flex flex-col text-xs">
                  <span className="font-semibold">{session?.user?.name}</span>
                  <span className="text-neutral-500">
                    {session?.user?.email}
                  </span>
                </div>
              </div>
            </MenubarItem>
            <MenubarSeparator />
            <Link href="/dashboard"> 
              <MenubarItem>
                <span>
                    Dashboard
                </span>
              <MenubarShortcut>
                <LayoutDashboard className="w-4 h-4" />
              </MenubarShortcut>
            </MenubarItem>
            </Link>
            <MenubarSeparator />
            <Link href="/settings"> 
              <MenubarItem>
                <span>Setting</span>
              <MenubarShortcut>
                <Settings className="w-4 h-4" />
              </MenubarShortcut>
            </MenubarItem>
            </Link>
            <MenubarSeparator />
            <MenubarItem onClick={() => signOut({ redirectTo: "/" })}>
              <span className="text-destructive">Logout</span>
              <MenubarShortcut>
                <LogOut className="w-4 h-4 stroke-destructive" />
              </MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
};

export default UserInfo;
