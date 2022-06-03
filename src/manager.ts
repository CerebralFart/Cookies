import Options from "./options";
import serialize from "./serialize";

export default class Manager {
  private static secure =
    typeof document !== "undefined" && document.location.protocol === "https";
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

  public static set(name: string, value: string): boolean {
    Manager.setCookie(name, value, {
      path: "/",
      maxAge: 14 * 24 * 60 * 60,
      sameSite: "lax",
      secure: this.secure,
    });
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
