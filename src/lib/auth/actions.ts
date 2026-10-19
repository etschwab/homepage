"use server";

import "server-only";

import { redirect } from "next/navigation";

import {
  verifyAdminCredentials,
  verifyEditorCredentials,
} from "@/lib/auth/password";
import {
  clearLoginAttempts,
  consumeLoginAttempt,
  getLoginRateLimitKey,
} from "@/lib/auth/rate-limit";
import { loginSchema, type LoginState } from "@/lib/auth/schema";
import {
  createAdminSession,
  createSession,
  deleteAdminSession,
  deleteSession,
} from "@/lib/auth/session";

type Verify = typeof verifyAdminCredentials;

async function attemptLogin(
  formData: FormData,
  scope: string,
  verify: Verify,
): Promise<{ state: LoginState } | { username: string }> {
  const parsed = loginSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return {
      state: {
        errors: parsed.error.flatten().fieldErrors,
        message: "Bitte prüfe die Eingaben.",
      },
    };
  }

  const rateLimitKey = await getLoginRateLimitKey(`${scope}:${parsed.data.username}`);
  const rateLimit = consumeLoginAttempt(rateLimitKey);

  if (!rateLimit.allowed) {
    return {
      state: {
        message:
          "Zu viele Login-Versuche. Bitte warte kurz und probiere es später erneut.",
      },
    };
  }

  const credentials = await verify(parsed.data.username, parsed.data.password);

  if (!credentials.ok) {
    return { state: { message: "Nutzername oder Passwort ist nicht korrekt." } };
  }

  clearLoginAttempts(rateLimitKey);
  return { username: credentials.username };
}

export async function login(
  _previousState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const result = await attemptLogin(formData, "files", verifyAdminCredentials);
  if ("state" in result) return result.state;

  await createSession(result.username);
  redirect("/dateien");
}

export async function logout() {
  await deleteSession();
  redirect("/dateien");
}

export async function adminLogin(
  _previousState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const result = await attemptLogin(formData, "admin", verifyEditorCredentials);
  if ("state" in result) return result.state;

  await createAdminSession(result.username);
  redirect("/admin");
}

export async function adminLogout() {
  await deleteAdminSession();
  redirect("/admin/login");
}
