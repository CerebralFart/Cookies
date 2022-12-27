export type Constructor<T, A extends any[]> = new (...args: A) => T;

export type Computed<T extends {}> = {
  [key in keyof T]: T[key] | (() => T[key]);
};

export type Either<A extends {}, B extends {}> =
  | (A & { [key in keyof B]?: never })
  | (B & { [key in keyof A]?: never });

export function resolve<T extends {}>(computable: Computed<T>): T {
  return Object.fromEntries(
    Object.entries(computable).map(([key, value]) => [
      key,
      typeof value === "function" ? value() : value,
    ])
  ) as T;
}
