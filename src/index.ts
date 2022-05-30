import handler from "./handler";
import Manager from "./manager";

const Cookie: { [key: string]: string } = new Proxy(
  new Manager(),
  handler
) as {};

export default Cookie;
