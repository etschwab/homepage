"use server";

import "server-only";

import { redirect } from "next/navigation";

import { verifyAdminCredentials } from "@/lib/auth/password";
import {
  clearLoginAttempts,
  consumeLoginAttempt,
  getLoginRateLimitKey,
} from "@/lib/auth/rate-limit";
import { loginSchema, type LoginState } from "@/lib/auth/schema";
import { createSession, deleteSession } from "@/lib/auth/session";

export async function login(
  _previousState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const parsed = loginSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
      message: "Bitte pruefe die Eingaben.",
    };
  }

  const rateLimitKey = await getLoginRateLimitKey(parsed.data.username);
  const rateLimit = consumeLoginAttempt(rateLimitKey);

  if (!rateLimit.allowed) {
    return {
      message:
        "Zu viele Login-Versuche. Bitte warte kurz und probiere es spaeter erneut.",
    };
  }

  const credentials = await verifyAdminCredentials(
    parsed.data.username,
    parsed.data.password,
  );

  if (!credentials.ok) {
    return { message: "Nutzername oder Passwort ist nicht korrekt." };
  }

  clearLoginAttempts(rateLimitKey);
  await createSession(credentials.username);
  redirect("/admin");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
