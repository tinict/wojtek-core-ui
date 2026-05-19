import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({ request });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet, headers) {
                    cookiesToSet.forEach(({ name, value }) =>
                        request.cookies.set(name, value)
                    );
                    supabaseResponse = NextResponse.next({ request });
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    );
                    Object.entries(headers ?? {}).forEach(([key, value]) =>
                        supabaseResponse.headers.set(key, value)
                    );
                },
            },
        }
    );

    // QUAN TRỌNG: Không được đặt code nào giữa createServerClient và getClaims()
    const { data } = await supabase.auth.getClaims();
    const user = data?.claims;

    const { pathname } = request.nextUrl;

    // Chưa đăng nhập → không được vào /admin
    if (!user && pathname.startsWith('/admin')) {
        const url = request.nextUrl.clone();
        url.pathname = '/sign-in';
        return NextResponse.redirect(url);
    }

    // Đã đăng nhập → không được vào /sign-in, redirect về /admin
    if (user && (pathname === '/sign-in' || pathname.startsWith('/sign-in'))) {
        const url = request.nextUrl.clone();
        url.pathname = '/admin';
        return NextResponse.redirect(url);
    }

    // QUAN TRỌNG: Phải return supabaseResponse để cookie được sync đúng
    return supabaseResponse;
}

