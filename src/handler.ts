import Manager from "./manager";

const handler: ProxyHandler<Manager> = {
  get: (target: Manager, property: string) => target.get(property),
  set: (target: Manager, property: string, value: any) =>
    target.set(property, value),
  deleteProperty: (target: Manager, property: string) =>
    target.delete(property),
  has: (target: Manager, property: string) => target.has(property),
  ownKeys: (target: Manager) => target.keys(),
  getOwnPropertyDescriptor: (target: Manager, property: string) =>
    target.has(property) ? target.propertyDescription : undefined,
};
export default handler;
