import { NextResponse } from "next/server";

export async function middleware(request) {
	const path = request.nextUrl.pathname;
	const token = request.cookies.get("authorizationToken");
	const AppNavigators = ["/dashboard", "/profile"];

	const AuthNavigators = ["/"];
	if (token) {
		if (AppNavigators.includes(path) && path !== "/dashboard" && path !== "/profile") {
			return NextResponse.redirect(new URL(path, request.url));
		}
		if (AuthNavigators.includes(path) && path !== "/dashboard") {
			return NextResponse.redirect(new URL("/dashboard", request.url));
		}
	} else {
		if (AuthNavigators.includes(path) && path !== "/") {
			return NextResponse.redirect(new URL(path, request.url));
		}
		if (AppNavigators.includes(path) && path !== "/") {
			return NextResponse.redirect(new URL("/", request.url));
		}
	}
}
