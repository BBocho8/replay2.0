import { createClient } from './supabaseClient';

export const fetcher = async (key: string) => {
	const supabase = createClient();
	const { data, error } = await supabase.from(key).select('*');
	if (error) throw error;
	return data;
};
