import { Either } from "./helpers";

type Options = {
  path: string;
  domain: string;
  secure: boolean;
  sameSite: "lax" | "strict" | "none";
} & Either<{ maxAge: number }, { expires: Date }>;

export default Options;
