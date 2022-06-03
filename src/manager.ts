export default class Manager {
  private static secure =
    typeof document !== "undefined" && document.location.protocol === "https";
  private static epochStart = new Date("01-01-1970");

  private static getCookies(): string[] {
    return document.cookie.split(";").map((cookie) => cookie.trimStart());
  }

  private static setCookie(name: string, value: string, expiry: Date): void {
    document.cookie = `${name}=${encodeURIComponent(
      value
    )}; expires=${expiry.toUTCString()}; path=/; SameSite=Lax; ${
      this.secure ? "Secure" : ""
    }`;
  }

  public propertyDescription: PropertyDescriptor = {
    configurable: true,
    enumerable: true,
    writable: true,
  };

  public get(name: string): string | null {
    const search = name + "=";
    const cookie = Manager.getCookies().find((cookie) =>
      cookie.startsWith(search)
    );
    return cookie === undefined ? null : cookie.substring(search.length);
  }

  public set(name: string, value: string): boolean {
    const expiry = new Date();
    expiry.setTime(expiry.getTime() + 14 * 24 * 60 * 60 * 1000);
    Manager.setCookie(name, value, expiry);
    return true;
  }

  public delete(name: string): boolean {
    Manager.setCookie(name, "", Manager.epochStart);
    return true;
  }

  public has(name: string): boolean {
    const search = name + "=";
    return (
      document.cookie.startsWith(search) ||
      new RegExp(`; ?` + search).test(document.cookie)
    );
  }

  public keys(): string[] {
    return Manager.getCookies().map((cookie) =>
      cookie.substring(0, cookie.indexOf("="))
    );
  }
}
