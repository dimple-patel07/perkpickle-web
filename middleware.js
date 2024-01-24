import { NextResponse } from "next/server";

export async function middleware(request) {
  const path = request.nextUrl.pathname;
  // const token = request.cookies.get('user')
  const token = false;

  const AppNavigators = ["/"];

  const AuthNavigators = ["/login"];
  console.log("-----------------",path);
  if (token) {
    if (AppNavigators.includes(path) && path !== "/") {
      return NextResponse.redirect(new URL(path, request.url));
    }
    if (AuthNavigators.includes(path) && path !== "/") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    if (AuthNavigators.includes(path) && path !== "/login") {
      return NextResponse.redirect(new URL(path, request.url));
    }
    if (AppNavigators.includes(path) && path !== "/login") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
}
