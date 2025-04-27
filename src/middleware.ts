import { createServerClient } from '@supabase/ssr';
import { type NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
	const res = NextResponse.next();

	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL as string,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
		{
			cookies: {
				getAll() {
					return req.cookies.getAll();
				},
				setAll(cookiesToSet) {
					for (const { name, value, options } of cookiesToSet) {
						res.cookies.set(name, value, options);
					}
				},
			},
		},
	);

	await supabase.auth.getSession();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	const pathname = req.nextUrl.pathname;

	// 🚀 Public routes: login / email confirm / pending approval / complete profile
	const isPublicRoute =
		pathname.startsWith('/login') ||
		pathname.startsWith('/confirm-email') ||
		pathname.startsWith('/complete-profile') ||
		pathname.startsWith('/pending-approval');

	// 🚨 If no user and accessing protected route
	if (!user && !isPublicRoute) {
		return NextResponse.redirect(new URL('/login', req.url));
	}

	// ✅ If user logged in and trying to access public routes -> redirect to dashboard
	if (user && isPublicRoute) {
		return NextResponse.redirect(new URL('/administrator/dashboard', req.url));
	}

	// 🧠 Check email confirmation
	if (user && !user.email_confirmed_at) {
		return NextResponse.redirect(new URL('/confirm-email', req.url));
	}

	// 🔥 Fetch user profile
	const { data: profile, error } = await supabase
		.from('users')
		.select('id, is_validated')
		.eq('id', user?.id)
		.maybeSingle();

	// 🚨 If profile not found -> ask to complete profile
	if (!profile) {
		return NextResponse.redirect(new URL('/complete-profile', req.url));
	}

	// 🧠 If profile not validated yet
	if (!profile.is_validated) {
		return NextResponse.redirect(new URL('/pending-approval', req.url));
	}

	// ✅ All good, allow request
	return res;
}

export const config = {
	matcher: ['/administrator/:path*', '/dashboard/:path*'],
};
