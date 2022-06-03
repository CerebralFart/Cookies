import Manager from "./manager";

const handler: ProxyHandler<{}> = {
  get: (_, property: string) => Manager.get(property),
  set: (_, property: string, value: any) => Manager.set(property, value),
  deleteProperty: (_, property: string) => Manager.delete(property),
  has: (_, property: string) => Manager.has(property),
  ownKeys: (_) => Manager.keys(),
  getOwnPropertyDescriptor: (_, property: string) =>
    Manager.has(property) ? Manager.propertyDescription : undefined,
};
export default handler;
