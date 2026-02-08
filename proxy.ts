import { NextResponse, type NextRequest } from "next/server";
const ACCESS_TOKEN_COOKIE = "wh_access_token";
export function proxy(req: NextRequest): NextResponse | undefined {
  const { pathname } = req.nextUrl;
  const hasToken = !!req.cookies.get(ACCESS_TOKEN_COOKIE)?.value;
  if (pathname.startsWith("/app")) {
    if (!hasToken) {
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }
  return NextResponse.next();
}
export const config = {
  matcher: ["/app/:path*"],
};
