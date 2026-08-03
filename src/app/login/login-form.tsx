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
        <label className="font-mono text-sm text-zinc-700" htmlFor="username">
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
            className="h-12 w-full rounded-soft border border-black/10 bg-white/80 pl-12 pr-4 text-zinc-950 outline-none transition-colors placeholder:text-zinc-500 focus:border-sky-200/35"
            placeholder={siteCopy.login.usernamePlaceholder}
            required
          />
        </div>
        {state.errors?.username ? (
          <p className="text-sm text-sky-700">{state.errors.username[0]}</p>
        ) : null}
      </div>

      <div className="grid gap-2">
        <label className="font-mono text-sm text-zinc-700" htmlFor="password">
          {siteCopy.login.passwordLabel}
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          className="h-12 w-full rounded-soft border border-black/10 bg-white/80 px-4 text-zinc-950 outline-none transition-colors placeholder:text-zinc-500 focus:border-sky-200/35"
          placeholder={siteCopy.login.passwordPlaceholder}
          required
        />
        {state.errors?.password ? (
          <p className="text-sm text-sky-700">{state.errors.password[0]}</p>
        ) : null}
      </div>

      {state.message ? (
        <p className="rounded-[1.5rem] border border-sky-200/50 bg-sky-100/55 p-3 text-sm leading-6 text-sky-950">
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
      className="action-primary button-motion inline-flex h-12 items-center justify-center gap-3 rounded-soft px-6 font-mono text-sm font-bold focus:outline-none focus:ring-2 focus:ring-sky-200/25 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? siteCopy.login.pending : siteCopy.login.submit}
      <ArrowRight aria-hidden="true" size={17} />
    </button>
  );
}
