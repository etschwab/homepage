import { z } from "zod";

import { siteCopy } from "@/data/profile";

export const loginSchema = z.object({
  username: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, siteCopy.login.usernameRequired)
    .max(32, siteCopy.login.usernameTooLong),
  password: z.string().min(1, siteCopy.login.passwordRequired).max(128),
});

export type LoginState = {
  errors?: {
    username?: string[];
    password?: string[];
  };
  message?: string;
};
