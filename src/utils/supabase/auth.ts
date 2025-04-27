import { createClient } from './supabaseClient';

export const register = async (email: string, password: string) => {
	const supabase = createClient();
	// Step 1: Sign up
	const { error } = await supabase.auth.signUp({ email, password });
	if (error) throw error;
};

export const signIn = async (email: string, password: string) => {
	const supabase = createClient();
	const { error } = await supabase.auth.signInWithPassword({ email, password });
	if (error) throw error;
};

export const signOut = async () => {
	const supabase = createClient();
	const { error } = await supabase.auth.signOut();
	if (error) throw error;
};

export const getCurrentUser = async () => {
	const supabase = createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();
	return user;
};
