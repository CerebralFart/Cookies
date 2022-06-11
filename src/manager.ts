import { resolve } from "./helpers";
import { CookieLike, defaults, Options } from "./options";
import serialize from "./serialize";

export default class Manager {
  private static epochStart = new Date("01-01-1970");

  private static getCookies(): string[] {
    return document.cookie.split(";").map((cookie) => cookie.trimStart());
  }

  private static setCookie(
    name: string,
    value: string,
    options: Partial<Options>
  ): void {
    document.cookie = `${name}=${encodeURIComponent(value)}; ${serialize(
      options
    )}`;
  }

  public static propertyDescription: PropertyDescriptor = {
    configurable: true,
    enumerable: true,
    writable: true,
  };

  private constructor() {}

  public static get(name: string): string | null {
    const search = name + "=";
    const cookie = Manager.getCookies().find((cookie) =>
      cookie.startsWith(search)
    );
    return cookie === undefined ? null : cookie.substring(search.length);
  }

  public static set(name: string, value: CookieLike): boolean {
    const def = resolve(defaults);
    const opts = {
      path: value.path ?? def.path,
      domain: value.domain ?? def.domain,
      secure: value.secure ?? def.secure,
      sameSite: value.sameSite ?? def.sameSite,
    } as Partial<Options>;

    if ("expires" in value) opts.expires = value.expires;
    else opts.maxAge = value.maxAge ?? def.maxAge;

    Manager.setCookie(name, value, opts);
    return true;
  }

  public static delete(name: string): boolean {
    Manager.setCookie(name, "", { path: "/", expires: Manager.epochStart });
    return true;
  }

  public static has(name: string): boolean {
    const search = name + "=";
    return (
      document.cookie.startsWith(search) ||
      new RegExp(`; ?` + search).test(document.cookie)
    );
  }

  public static keys(): string[] {
    return Manager.getCookies().map((cookie) =>
      cookie.substring(0, cookie.indexOf("="))
    );
  }
}
