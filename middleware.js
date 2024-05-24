import { NextRequest, NextResponse } from 'next/server';

export default function middleware(request: NextRequest) {
  let currentUser = request.cookies.get('currentUser')?.value;

  if (!currentUser && request.url.includes('stocks')) {
    return NextResponse.redirect(new URL('/', request.url));
  }
}
