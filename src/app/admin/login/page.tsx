import Link from "next/link";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { LoginForm } from "@/app/login/login-form";
import { adminLogin } from "@/lib/auth/actions";
import { readAdminSession } from "@/lib/auth/session";

export const metadata: Metadata = {
  title: "Admin-Login",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  if (await readAdminSession()) {
    redirect("/admin");
  }

  return (
    <main className="login-page">
      <section className="login-panel">
        <Link href="/" className="login-back-link">
          Zur Startseite
        </Link>

        <div className="login-heading">
          <h1>Admin</h1>
        </div>

        <p className="login-description">
          Bereich zum Bearbeiten der Website. Das Login für die Dokumente
          funktioniert hier nicht.
        </p>

        <div className="login-form-wrap">
          <LoginForm action={adminLogin} />
        </div>
      </section>
    </main>
  );
}
