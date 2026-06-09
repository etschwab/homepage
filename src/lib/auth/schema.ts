import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "Bitte gib den Nutzernamen ein.")
    .max(32, "Der Nutzername ist zu lang."),
  password: z.string().min(1, "Bitte gib das Passwort ein.").max(128),
});

export type LoginState = {
  errors?: {
    username?: string[];
    password?: string[];
  };
  message?: string;
};
