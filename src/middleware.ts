import { createServerClient } from '@supabase/ssr';
import { type NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
	// Create a new response
	let res = NextResponse.next({
		request: {
			headers: req.headers,
		},
	});

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
						req.cookies.set(name, value);
					}
					res = NextResponse.next({ request: req });
					for (const { name, value, options } of cookiesToSet) {
						res.cookies.set(name, value, options);
					}
				},
			},
		},
	);

	// Always refresh session
	await supabase.auth.getSession();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	const pathname = req.nextUrl.pathname;

	// Define public routes
	const isPublicRoute =
		pathname.startsWith('/login') ||
		pathname.startsWith('/confirm-email') ||
		pathname.startsWith('/complete-profile') ||
		pathname.startsWith('/pending-approval');

	if (!user && !isPublicRoute) {
		return NextResponse.redirect(new URL('/login', req.url));
	}

	if (user && isPublicRoute) {
		return NextResponse.redirect(new URL('/administrator/dashboard', req.url));
	}

	if (user && !user.email_confirmed_at) {
		return NextResponse.redirect(new URL('/confirm-email', req.url));
	}

	// Fetch user profile
	const { data: profile, error } = await supabase
		.from('users')
		.select('id, is_validated')
		.eq('id', user?.id)
		.maybeSingle();

	if (error) {
		console.error('Error fetching profile', error);
		return NextResponse.redirect(new URL('/login', req.url));
	}

	if (!profile) {
		return NextResponse.redirect(new URL('/complete-profile', req.url));
	}

	if (!profile.is_validated) {
		return NextResponse.redirect(new URL('/pending-approval', req.url));
	}

	// ✅ If everything is good, continue
	return res;
}

export const config = {
	matcher: ['/administrator/:path*', '/dashboard/:path*'],
};
