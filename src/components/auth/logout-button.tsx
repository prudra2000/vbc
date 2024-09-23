import React from "react";
import { auth, signOut } from "@/auth";
import { Button } from "../ui/button";
import { handleSignOut } from "@/actions/logout";
import { LogOut } from "lucide-react";

const LogoutButton = () => {
  return (
    <form action={handleSignOut}>
      <Button variant="outline">
        <LogOut className="w-4 h-4 stroke-[#F8CC38] " />
        <span className="ml-2 px-1">Logout</span>
      </Button>
    </form>
  );
};

export default LogoutButton;
