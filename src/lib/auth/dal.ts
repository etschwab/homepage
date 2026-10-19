import "server-only";

import { cache } from "react";
import { redirect } from "next/navigation";

import { readAdminSession, readSession } from "@/lib/auth/session";

export const verifySession = cache(async () => {
  const session = await readSession();

  if (!session) {
    redirect("/login");
  }

  return session;
});

/** Nur mit dem eigenen Admin-Login, nicht mit dem Dokumenten-Login. */
export const verifyAdminSession = cache(async () => {
  const session = await readAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return session;
});
