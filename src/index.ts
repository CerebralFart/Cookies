import handler from "./handler";
import Manager from "./manager";

type PublicType = { [key: string]: string };

const Cookie: PublicType = new Proxy(
  new Manager(),
  handler
) as unknown as PublicType;

export default Cookie;
