import React from "react";
import { auth, signOut } from "@/auth";
import { Button } from "../ui/button";
import { handleSignOut } from "@/actions/logout";
import { LogOut } from "lucide-react";

const LogoutButton = () => {
  return (
    <form action={handleSignOut}>
      <Button variant="link" className="hover:bg-slate-100">
        <LogOut className="w-4 h-4 stroke-blue-800 " />
        <span className="ml-1 px-1 text-xs">Logout</span>
      </Button>
    </form>
  );
};

export default LogoutButton;
