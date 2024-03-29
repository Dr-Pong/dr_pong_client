import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(req: NextRequest) {
  if (
    req.nextUrl.pathname.startsWith('/_next') ||
    req.nextUrl.pathname.includes('/api/') ||
    PUBLIC_FILE.test(req.nextUrl.pathname)
  ) {
    return;
  }
  if (
    req.cookies.get('NEXT_LOCALE') &&
    req.cookies.get('NEXT_LOCALE')?.value !== req.nextUrl.locale
  ) {
    const locale = req.cookies.get('NEXT_LOCALE')?.value;
    return NextResponse.redirect(
      new URL(`/${locale}${req.nextUrl.pathname}${req.nextUrl.search}`, req.url)
    );
  }
}
