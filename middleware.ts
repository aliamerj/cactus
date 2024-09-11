import { middleware } from "./auth.config";

const protectedRoutes: string[] = [];
const loginRoutes = ["/login", "/register"];
export default middleware((req) => {
  if (!req.auth && protectedRoutes.includes(req.nextUrl.pathname)) {
    const url = req.url.replace(req.nextUrl.pathname, "/login");
    return Response.redirect(url);
  }
  if (req.auth && loginRoutes.includes(req.nextUrl.pathname)) {
    const url = req.url.replace(req.nextUrl.pathname, "/");
    return Response.redirect(url);
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
