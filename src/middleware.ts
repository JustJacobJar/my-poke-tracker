// export { auth as middleware } from "@/lib/auth";
import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

//Middleware function to handle reqeusts
// export default async function middleware(request: NextRequest) {
//   const session = await Oauth();

//   console.log("We be gaming");

//   //Maybe the route should have a /protected path to check if it should check for user logged in
//   //If not logged in, redirect
//   if (!session) {
//     //change this to the login page
//     const absoluteURL = new URL("/dashboard", request.nextUrl.origin);
//     return NextResponse.redirect(absoluteURL.toString());
//   }

//   //Has access, can continue
//   return NextResponse.next();
// }

export default auth(async (request: NextRequest) => {
  const session = await auth();
  //Maybe the route should have a /protected path to check if it should check for user logged in
  //If not logged in, redirect
  if (!session) {
    //change this to the login page
    const absoluteURL = new URL("/dashboard", request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  //Has access, can continue
  return NextResponse.next();
});

//Matcher exampels at https://nextjs.org/docs/pages/building-your-application/routing/middleware#matcher
export const config = {
  matcher: "/dashboard/(.*)",
};
