import handler from "./handler";
import { Constructor } from "./helpers";
import Manager from "./manager";
import { CookieLike, Options } from "./options";

type PublicType = Constructor<CookieLike, [string, Partial<Options>]> & {
  [key: string]: CookieLike;
};

const Cookie: PublicType = new Proxy(Manager, handler) as unknown as PublicType;

export default Cookie;
