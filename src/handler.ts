import Manager from "./manager";
import { CookieLike, defaults, Options } from "./options";

const handler: ProxyHandler<{}> = {
  get: (_, property: string) => Manager.get(property),
  set: (_, property: string, value: CookieLike) => Manager.set(property, value),
  deleteProperty: (_, property: string) => Manager.delete(property),
  has: (_, property: string) => Manager.has(property),
  ownKeys: (_) => Manager.keys(),
  getOwnPropertyDescriptor: (_, property: string) =>
    Manager.has(property) ? Manager.propertyDescription : undefined,
};
export default handler;
