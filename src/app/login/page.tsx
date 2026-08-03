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
      <section className="rounded-soft w-full max-w-md border border-black/10 bg-white/90 p-6 backdrop-blur-md sm:p-8">
        <Link
          href="/"
          className="font-mono text-sm text-zinc-500 transition-colors hover:text-sky-700"
        >
          {siteCopy.login.backLink}
        </Link>

        <div className="mt-10 flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-soft border border-sky-200/20 text-sky-700/90">
            <ShieldCheck aria-hidden="true" size={22} />
          </span>
          <div>
            <p className="font-mono text-sm text-sky-700/80">
              {siteCopy.login.eyebrow}
            </p>
            <h1 className="text-2xl font-semibold text-zinc-950">
              {siteCopy.login.title}
            </h1>
          </div>
        </div>

        <p className="mt-5 text-sm leading-6 text-zinc-500">
          {siteCopy.login.descriptionStart}{" "}
          <span className="font-mono text-sky-700/90">
            {siteCopy.login.usernamePlaceholder}
          </span>{" "}
          {siteCopy.login.descriptionMiddle}{" "}
          <span className="font-mono text-sky-700/90">
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
