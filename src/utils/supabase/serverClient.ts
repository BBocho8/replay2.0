import { createServerClient } from '@supabase/ssr';
import type { cookies } from 'next/headers';

export const createClient = (cookieStore: ReturnType<typeof cookies>) => {
	return createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL as string,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
		{
			cookies: {
				getAll() {
					return (async () => {
						const resolvedCookieStore = await cookieStore;
						return resolvedCookieStore.getAll();
					})();
				},
				setAll(cookiesToSet) {
					try {
						(async () => {
							const resolvedCookieStore = await cookieStore;
							for (const { name, value, options } of cookiesToSet) {
								resolvedCookieStore.set(name, value, options);
							}
						})();
					} catch {
						// The `setAll` method was called from a Server Component.
						// This can be ignored if you have middleware refreshing
						// user sessions.
					}
				},
			},
		},
	);
};
