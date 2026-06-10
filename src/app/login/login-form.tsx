"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { ArrowRight, User } from "lucide-react";

import { login } from "@/lib/auth/actions";
import type { LoginState } from "@/lib/auth/schema";

const initialState: LoginState = {};

export function LoginForm() {
  const [state, formAction] = useActionState(login, initialState);

  return (
    <form action={formAction} className="grid gap-5" noValidate>
      <div className="grid gap-2">
        <label className="font-mono text-sm text-zinc-300" htmlFor="username">
          Nutzername
        </label>
        <div className="relative">
          <User
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
            size={17}
          />
          <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            className="h-12 w-full border border-white/10 bg-black/40 pl-12 pr-4 text-white outline-none transition-colors placeholder:text-zinc-600 focus:border-orange-400"
            placeholder="eti"
            required
          />
        </div>
        {state.errors?.username ? (
          <p className="text-sm text-orange-300">{state.errors.username[0]}</p>
        ) : null}
      </div>

      <div className="grid gap-2">
        <label className="font-mono text-sm text-zinc-300" htmlFor="password">
          Passwort
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          className="h-12 w-full border border-white/10 bg-black/40 px-4 text-white outline-none transition-colors placeholder:text-zinc-600 focus:border-orange-400"
          placeholder="12345"
          required
        />
        {state.errors?.password ? (
          <p className="text-sm text-orange-300">{state.errors.password[0]}</p>
        ) : null}
      </div>

      {state.message ? (
        <p className="border border-orange-400/30 bg-orange-500/10 p-3 text-sm leading-6 text-orange-100">
          {state.message}
        </p>
      ) : null}

      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-12 items-center justify-center gap-3 bg-orange-500 px-6 font-mono text-sm font-bold text-black transition-colors hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-300 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Prüfen..." : "Einloggen"}
      <ArrowRight aria-hidden="true" size={17} />
    </button>
  );
}
