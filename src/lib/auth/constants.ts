export const SESSION_DURATION_SECONDS = 60 * 60 * 8;

export function getSessionCookieName() {
  return process.env.NODE_ENV === "production"
    ? "__Host-bewerbung-session"
    : "bewerbung-session";
}
