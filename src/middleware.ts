import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export default auth(async (request: NextRequest) => {
  const session = await auth();
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
//Paths to run middleware on, ig protects these paths
export const config = {
  matcher: ["/dashboard/collections/(.*)", "/dashboard/collections"],
};
