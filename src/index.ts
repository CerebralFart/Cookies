import handler from "./handler";

type PublicType = { [key: string]: string };

const Cookie: PublicType = new Proxy({}, handler) as unknown as PublicType;

export default Cookie;
