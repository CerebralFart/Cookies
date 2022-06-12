export default class ProtectedNameError extends Error {
  constructor(public readonly name: string) {
    super(`Cannot use protected name '${name}' for cookies`);
  }
}
