import Link from "next/link";
import { redirect } from "next/navigation";
import { ShieldCheck } from "lucide-react";

import { LoginForm } from "@/app/login/login-form";
import { siteCopy } from "@/data/profile";
import { readSession } from "@/lib/auth/session";

export default async function LoginPage() {
  const session = await readSession();

  if (session) {
    redirect("/admin");
  }

  return (
    <main className="site-container grid min-h-svh place-items-center py-16">
      <section className="rounded-soft w-full max-w-md border border-white/10 bg-black/70 p-6 backdrop-blur-md sm:p-8">
        <Link
          href="/"
          className="font-mono text-sm text-zinc-400 transition-colors hover:text-cyan-100"
        >
          {siteCopy.login.backLink}
        </Link>

        <div className="mt-10 flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-soft border border-cyan-300/30 text-cyan-100">
            <ShieldCheck aria-hidden="true" size={22} />
          </span>
          <div>
            <p className="font-mono text-sm text-cyan-200">
              {siteCopy.login.eyebrow}
            </p>
            <h1 className="text-2xl font-semibold text-white">
              {siteCopy.login.title}
            </h1>
          </div>
        </div>

        <p className="mt-5 text-sm leading-6 text-zinc-400">
          {siteCopy.login.descriptionStart}{" "}
          <span className="font-mono text-cyan-100">
            {siteCopy.login.usernamePlaceholder}
          </span>{" "}
          {siteCopy.login.descriptionMiddle}{" "}
          <span className="font-mono text-cyan-100">
            {siteCopy.login.passwordPlaceholder}
          </span>
          . {siteCopy.login.descriptionEnd}
        </p>

        <div className="mt-8">
          <LoginForm />
        </div>
      </section>
    </main>
  );
}
