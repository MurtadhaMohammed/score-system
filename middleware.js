import { NextResponse } from "next/server";

export function middleware(req) {
  const response = NextResponse.next();

  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
  );
  response.headers.set("Access-Control-Allow-Credentials", true);
  response.headers.set("Access-Control-Max-Age", "86400");

  return response;
}

export const config = {
  matcher: "/api/:path*",
};
