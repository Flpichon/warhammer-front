import "server-only";
import { cookies } from "next/headers";
const ACCESS_TOKEN_COOKIE = "wh_access_token";
type CookieOptions = {
  secure?: boolean;
};
function baseCookieOptions(opts: CookieOptions = {}): {
  httpOnly: true;
  sameSite: "lax";
  secure: boolean;
  path: "/";
} {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: opts.secure ?? process.env.NODE_ENV === "production",
    path: "/",
  };
}
export async function getAccessToken(): Promise<string | null> {
  const store = await cookies();
  return store.get(ACCESS_TOKEN_COOKIE)?.value ?? null;
}
export async function setAccessToken(
  token: string,
  opts: CookieOptions = {},
): Promise<void> {
  const store = await cookies();
  store.set(ACCESS_TOKEN_COOKIE, token, baseCookieOptions(opts));
}
export async function clearAccessToken(
  opts: CookieOptions = {},
): Promise<void> {
  const store = await cookies();
  store.set(ACCESS_TOKEN_COOKIE, "", {
    ...baseCookieOptions(opts),
    maxAge: 0,
  });
}
