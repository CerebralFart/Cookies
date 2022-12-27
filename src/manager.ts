import ProtectedNameError from "./errors/protectedName";
import { resolve } from "./helpers";
import { CookieLike, defaults, Options } from "./options";
import serialize from "./serialize";

export default class Manager {
  private static readonly epochStart = new Date("01-01-1970");
  private static readonly protectedProperties = ["prototype"];

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

  private static checkProtectedName(name: string): void {
    if (this.protectedProperties.indexOf(name) > -1)
      throw new ProtectedNameError(name);
  }

  private constructor() {}

  public static get(name: string): string | null {
    this.checkProtectedName(name);

    const search = name + "=";
    const cookie = Manager.getCookies().find((cookie) =>
      cookie.startsWith(search)
    );
    return cookie === undefined ? null : cookie.substring(search.length);
  }

  public static set(name: string, value: CookieLike): boolean {
    this.checkProtectedName(name);

    const def = resolve(defaults);
    const opts = {
      path: value.path ?? def.path,
      domain: value.domain ?? def.domain,
      secure: value.secure ?? def.secure,
      sameSite: value.sameSite ?? def.sameSite,
    } as Partial<Options>;

    if (value.expires !== undefined) opts.expires = value.expires;
    else opts.maxAge = value.maxAge ?? def.maxAge;

    Manager.setCookie(name, value, opts);
    return true;
  }

  public static delete(name: string): boolean {
    this.checkProtectedName(name);
    Manager.setCookie(name, "", { path: "/", expires: Manager.epochStart });
    return true;
  }

  public static has(name: string): boolean {
    if (this.protectedProperties.indexOf(name) > -1) return false;

    const search = name + "=";
    return (
      document.cookie.startsWith(search) ||
      new RegExp(`; ?` + search).test(document.cookie)
    );
  }

  public static keys(): string[] {
    return [
      ...Manager.getCookies().map((cookie) =>
        cookie.substring(0, cookie.indexOf("="))
      ),
      ...this.protectedProperties,
    ];
  }

  public static getDescriptor(name: string): PropertyDescriptor {
    if (this.protectedProperties.indexOf(name) > -1)
      return Object.getOwnPropertyDescriptor(
        Manager,
        name
      ) as PropertyDescriptor;

    return {
      configurable: true,
      enumerable: true,
      writable: true,
    };
  }
}
