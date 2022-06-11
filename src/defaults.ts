import { Computed } from "./helpers";
import Options from "./options";

const defaults: Computed<Options> = {
  path: "/",
  domain: () => document.location.hostname,
  secure: () => document.location.protocol.startsWith("https"),
  sameSite: "lax",
  maxAge: 14 * 24 * 60 * 60,
};

export default defaults;
