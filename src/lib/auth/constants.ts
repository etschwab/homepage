export const SESSION_DURATION_SECONDS = 60 * 60 * 8;
export const ADMIN_SESSION_DURATION_SECONDS = 60 * 60 * 2;

export function getSessionCookieName() {
  return process.env.NODE_ENV === "production"
    ? "__Host-bewerbung-session"
    : "bewerbung-session";
}

/** Eigenes Cookie für den Admin-Bereich, unabhängig vom Dokumenten-Login. */
export function getAdminCookieName() {
  return process.env.NODE_ENV === "production"
    ? "__Host-bewerbung-admin"
    : "bewerbung-admin";
}
