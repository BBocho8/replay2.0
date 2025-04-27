// import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
// import type { NextRequest } from 'next/server';
// import { NextResponse } from 'next/server';

// export async function middleware(req: NextRequest) {
// 	const res = NextResponse.next();
// 	const supabase = createMiddlewareClient({ req, res });

// 	// ✨ Important: Refresh session automatically
// 	await supabase.auth.getSession();

// 	const {
// 		data: { user },
// 	} = await supabase.auth.getUser();
// 	const pathname = req.nextUrl.pathname;
// 	// Allow access to public pages without auth
// 	if (
// 		pathname.startsWith('/login') ||
// 		pathname.startsWith('/confirm-email') ||
// 		pathname.startsWith('/pending-approval')
// 	) {
// 		return res;
// 	}
// 	if (!user) {
// 		// Not logged in
// 		return NextResponse.redirect(new URL('/login', req.url));
// 	}
// 	// 🧠 Check if email is confirmed
// 	if (!user.email_confirmed_at) {
// 		// Email not confirmed yet
// 		return NextResponse.redirect(new URL('/confirm-email', req.url));
// 	}
// 	// Fetch user's profile data
// 	const { data: profile, error } = await supabase
// 		.from('users')
// 		.select('id, is_validated')
// 		.eq('id', user.id)
// 		.maybeSingle();
// 	if (error) {
// 		console.error('Error fetching user profile in middleware', error);
// 		return NextResponse.redirect(new URL('/login', req.url));
// 	}
// 	if (!profile) {
// 		// 🧠 User confirmed email but has no profile yet
// 		return NextResponse.redirect(new URL('/complete-profile', req.url));
// 	}
// 	if (!profile.is_validated) {
// 		// 🧠 Profile exists but is not validated
// 		return NextResponse.redirect(new URL('/pending-approval', req.url));
// 	}
// 	// ✅ All good
// 	return res;
// }

// // 👇 Match only protected routes
// export const config = {
// 	matcher: ['/administrator/:path*', '/dashboard/:path*'],
// };

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

	const {
		data: { session },
	} = await supabase.auth.getSession();

	const {
		data: { user },
	} = await supabase.auth.getUser();
	const pathname = req.nextUrl.pathname;

	if (
		pathname.startsWith('/login') ||
		pathname.startsWith('/confirm-email') ||
		pathname.startsWith('/complete-profile') ||
		pathname.startsWith('/pending-approval')
	) {
		return res;
	}

	if (!user) {
		return NextResponse.redirect(new URL('/login', req.url));
	}

	if (!user.email_confirmed_at) {
		return NextResponse.redirect(new URL('/confirm-email', req.url));
	}

	// Fetch user profile to check validation
	const { data: profile, error } = await supabase
		.from('users')
		.select('id, is_validated')
		.eq('id', user.id)
		.maybeSingle();

	if (error || !profile) {
		console.error('Error fetching profile', error);
		return NextResponse.redirect(new URL('/login', req.url));
	}

	if (!profile.is_validated) {
		return NextResponse.redirect(new URL('/pending-approval', req.url));
	}

	return res;
}

export const config = {
	matcher: ['/administrator/:path*', '/dashboard/:path*'],
};
