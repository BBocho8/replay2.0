import { createServerClient } from '@supabase/ssr';

export const createAdminClient = () => {
	return createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL as string,
		process.env.SUPABASE_SERVICE_ROLE_KEY as string, // 👈 Service role key here
		{
			cookies: {
				getAll() {
					return [];
				},
				setAll() {
					// Service role calls don't need cookies set
				},
			},
		},
	);
};
