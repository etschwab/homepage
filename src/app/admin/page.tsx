import { redirect } from "next/navigation";

import { verifySession } from "@/lib/auth/dal";

export default async function AdminPage() {
  await verifySession();
  redirect("/dateien");
}
