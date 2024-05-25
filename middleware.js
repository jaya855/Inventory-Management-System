import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request) {

  const authToken= request.cookies.get("authToken")?.value;

  if(request.nextUrl.pathname==="/login" || request.nextUrl.pathname==="/signup"){
    if(authToken){
      return NextResponse.redirect(new URL('/stocks', request.url))
    }
  }

  if(request.nextUrl.pathname==="/stocks"){
    if(!authToken){
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }



  // if(!authToken && request.nextUrl.pathname === "stocks"){
  //   return NextResponse.redirect(new URL('/login', request.url))
  // }
 
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/stocks',
}