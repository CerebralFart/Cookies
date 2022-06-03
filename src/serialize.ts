import Options from "./options";

export default function serialize(options: Partial<Options>): string {
  //TODO this requires unit testing
  let buffer = "";

  const { domain, expires, maxAge, path, sameSite, secure } = options;

  if (maxAge !== undefined) buffer += `max-age=${maxAge};`;
  if (expires !== undefined) buffer += `expires=${expires.toUTCString()};`;
  if (domain !== undefined) buffer += `domain=${domain};`;
  if (path !== undefined) buffer += `path=${path};`;
  if (sameSite !== undefined) buffer += `sameSite=${sameSite};`;
  if (secure === true) buffer += `secure;`;

  return buffer;
}
