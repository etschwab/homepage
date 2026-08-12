"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { ArrowRight } from "lucide-react";

import { siteCopy } from "@/data/profile";
import { login } from "@/lib/auth/actions";
import type { LoginState } from "@/lib/auth/schema";

const initialState: LoginState = {};

export function LoginForm() {
  const [state, formAction] = useActionState(login, initialState);

  return (
    <form action={formAction} className="login-form" noValidate>
      <div className="form-field">
        <label htmlFor="username">
          {siteCopy.login.usernameLabel}
        </label>
        <div className="input-with-icon">
          <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            placeholder={siteCopy.login.usernamePlaceholder}
            required
          />
        </div>
        {state.errors?.username ? (
          <p className="form-error">{state.errors.username[0]}</p>
        ) : null}
      </div>

      <div className="form-field">
        <label htmlFor="password">
          {siteCopy.login.passwordLabel}
        </label>
        <div className="input-with-icon">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder={siteCopy.login.passwordPlaceholder}
            required
          />
        </div>
        {state.errors?.password ? (
          <p className="form-error">{state.errors.password[0]}</p>
        ) : null}
      </div>

      {state.message ? (
        <p className="form-message">{state.message}</p>
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
      className="action-primary login-submit"
    >
      {pending ? siteCopy.login.pending : siteCopy.login.submit}
      <ArrowRight aria-hidden="true" size={17} />
    </button>
  );
}
