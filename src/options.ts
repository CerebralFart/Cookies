import { Computed, Either } from "./helpers";

export type CookieLike = string & Partial<Options>;

export type Options = {
  path: string;
  domain: string;
  secure: boolean;
  sameSite: "lax" | "strict" | "none";
} & Either<{ maxAge: number }, { expires: Date }>;

export const defaults: Computed<Options> = {
  path: "/",
  domain: () => document.location.hostname,
  secure: () => document.location.protocol.startsWith("https"),
  sameSite: "lax",
  maxAge: 14 * 24 * 60 * 60,
};
