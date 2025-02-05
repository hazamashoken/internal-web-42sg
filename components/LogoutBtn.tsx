"use client";

import { LogOut } from "lucide-react";

import { DropdownMenuItem } from "./ui/dropdown-menu";

import { authClient } from "@/lib/auth-client";

export function LogoutDropDownItem() {
  async function logout() {
    await authClient.signOut();
  }

  return (
    <DropdownMenuItem onClick={() => logout()}>
      <LogOut />
      Log Out
    </DropdownMenuItem>
  );
}
