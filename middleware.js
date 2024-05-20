// middleware.js
import { NextResponse } from 'next/server';

export function middleware(req) {
  const { pathname } = req;
 
  if (pathname === '/stocks') {
    const token=localStorage.getItem("token")
    

    if (!token) {
      
      return NextResponse.redirect(new URL('/login', req.url));
    }
    return NextResponse.next();
  }

  
  return NextResponse.next();
}

export const config = {
  matcher: ['/stocks'],
};