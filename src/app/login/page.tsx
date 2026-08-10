import Link from "next/link";
import { redirect } from "next/navigation";
import { ShieldCheck } from "lucide-react";

import { LoginForm } from "@/app/login/login-form";
import { siteCopy } from "@/data/profile";
import { readSession } from "@/lib/auth/session";

export default async function LoginPage() {
  const session = await readSession();

  if (session) {
    redirect("/dateien");
  }

  return (
    <main className="login-page">
      <section className="login-panel">
        <Link href="/dateien" className="login-back-link">
          {siteCopy.login.backLink}
        </Link>

        <div className="login-heading">
          <span className="login-icon">
            <ShieldCheck aria-hidden="true" size={22} />
          </span>
          <div>
            <p className="section-label">{siteCopy.login.eyebrow}</p>
            <h1>{siteCopy.login.title}</h1>
          </div>
        </div>

        <p className="login-description">{siteCopy.login.description}</p>

        <div className="login-form-wrap">
          <LoginForm />
        </div>
      </section>
    </main>
  );
}
