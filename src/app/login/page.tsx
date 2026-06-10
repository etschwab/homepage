import Link from "next/link";
import { redirect } from "next/navigation";
import { ShieldCheck } from "lucide-react";

import { LoginForm } from "@/app/login/login-form";
import { readSession } from "@/lib/auth/session";

export default async function LoginPage() {
  const session = await readSession();

  if (session) {
    redirect("/admin");
  }

  return (
    <>
      <main className="site-container grid min-h-svh place-items-center py-16">
        <section className="w-full max-w-md border border-white/10 bg-[#080808]/82 p-6 backdrop-blur-md sm:p-8">
          <Link
            href="/"
            className="font-mono text-sm text-zinc-400 transition-colors hover:text-orange-300"
          >
            Zurück zur Seite
          </Link>

          <div className="mt-10 flex items-center gap-3">
            <span className="grid size-11 place-items-center border border-orange-400/40 text-orange-300">
              <ShieldCheck aria-hidden="true" size={22} />
            </span>
            <div>
              <p className="font-mono text-sm text-orange-400">
                Geschützter Bereich
              </p>
              <h1 className="text-2xl font-semibold text-white">Admin Login</h1>
            </div>
          </div>

          <p className="mt-5 text-sm leading-6 text-zinc-400">
            Zugriff mit Nutzername <span className="font-mono text-orange-300">eti</span> und
            Passwort <span className="font-mono text-orange-300">12345</span>. Es gibt keine
            Registrierung, nur diese geschützte Ansicht.
          </p>

          <div className="mt-8">
            <LoginForm />
          </div>
        </section>
      </main>
    </>
  );
}
