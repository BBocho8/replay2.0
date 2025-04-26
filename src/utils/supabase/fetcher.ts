import { supabase } from './supabaseClient';

export const fetcher = async (key: string) => {
	const { data, error } = await supabase.from(key).select('*');
	if (error) throw error;
	return data;
};
