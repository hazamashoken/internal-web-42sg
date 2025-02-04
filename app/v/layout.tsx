import { headers } from "next/headers";
import { unauthorized } from "next/navigation";

import { auth } from "@/lib/auth";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
