"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { ArrowRight, User } from "lucide-react";

import { siteCopy } from "@/data/profile";
import { login } from "@/lib/auth/actions";
import type { LoginState } from "@/lib/auth/schema";

const initialState: LoginState = {};

export function LoginForm() {
  const [state, formAction] = useActionState(login, initialState);

  return (
    <form action={formAction} className="grid gap-5" noValidate>
      <div className="grid gap-2">
        <label className="font-mono text-sm text-zinc-300" htmlFor="username">
          {siteCopy.login.usernameLabel}
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
            className="h-12 w-full rounded-soft border border-white/10 bg-black/40 pl-12 pr-4 text-white outline-none transition-colors placeholder:text-zinc-600 focus:border-cyan-300/50"
            placeholder={siteCopy.login.usernamePlaceholder}
            required
          />
        </div>
        {state.errors?.username ? (
          <p className="text-sm text-cyan-100">{state.errors.username[0]}</p>
        ) : null}
      </div>

      <div className="grid gap-2">
        <label className="font-mono text-sm text-zinc-300" htmlFor="password">
          {siteCopy.login.passwordLabel}
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          className="h-12 w-full rounded-soft border border-white/10 bg-black/40 px-4 text-white outline-none transition-colors placeholder:text-zinc-600 focus:border-cyan-300/50"
          placeholder={siteCopy.login.passwordPlaceholder}
          required
        />
        {state.errors?.password ? (
          <p className="text-sm text-cyan-100">{state.errors.password[0]}</p>
        ) : null}
      </div>

      {state.message ? (
        <p className="rounded-soft border border-cyan-300/25 bg-cyan-300/10 p-3 text-sm leading-6 text-cyan-50">
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
      className="button-motion inline-flex h-12 items-center justify-center gap-3 rounded-soft bg-cyan-200 px-6 font-mono text-sm font-bold text-black hover:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-300/40 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? siteCopy.login.pending : siteCopy.login.submit}
      <ArrowRight aria-hidden="true" size={17} />
    </button>
  );
}
