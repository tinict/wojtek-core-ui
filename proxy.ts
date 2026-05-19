import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from './lib/supabase/server-client';

export async function proxy(request: NextRequest) {
    const response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    });
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    console.log({ user });

    // Redirect non-authenticated users away from protected routes
    if (!user && request.nextUrl.pathname.startsWith("/protected")) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
    return response;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}