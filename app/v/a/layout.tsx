import { notFound } from "next/navigation";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== "admin") {
    return notFound();
  }

  return children;
}
