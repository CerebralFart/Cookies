export type Either<A extends {}, B extends {}> =
  | (A & { [key in keyof B]?: never })
  | (B & { [key in keyof A]?: never });
