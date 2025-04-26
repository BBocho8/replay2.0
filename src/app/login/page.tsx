'use client';

import { signIn } from '@/utils/supabase/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function LoginPage() {
	const router = useRouter();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = async () => {
		try {
			// 1. Sign in
			await signIn(email, password);
			toast.success('Login successful!');

			// // 2. Fetch user info
			// const {
			// 	data: { user },
			// } = await supabase.auth.getUser();
			// if (!user) {
			// 	toast.error('Failed to fetch user after login.');
			// 	return;
			// }

			// // 3. Check if user profile exists
			// const { data: existingProfile, error: profileError } = await supabase
			// 	.from('users')
			// 	.select('id')
			// 	.eq('id', user.id)
			// 	.maybeSingle();

			// if (profileError) {
			// 	toast.error('Failed to check user profile.');
			// 	console.error(profileError);
			// 	return;
			// }

			// // 4. If no profile, create one
			// if (!existingProfile) {
			// 	await supabase.from('users').insert({
			// 		id: user.id,
			// 		role: 'player', // Default role if missing (can improve later)
			// 		club_id: null,
			// 		is_validated: false,
			// 	});
			// }

			// 5. Redirect
			router.push('/admin'); // (or dynamic based on role later)
		} catch (error) {
			console.error(error);
			toast.error('Login failed. Please check your credentials.');
		}
	};

	return (
		<div className='min-h-screen flex items-center justify-center bg-gray-100'>
			<div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
				<h1 className='text-2xl font-bold mb-4 text-center'>Login</h1>
				<input
					className='w-full p-2 mb-4 border rounded'
					value={email}
					onChange={e => setEmail(e.target.value)}
					placeholder='Email'
				/>
				<input
					className='w-full p-2 mb-4 border rounded'
					type='password'
					value={password}
					onChange={e => setPassword(e.target.value)}
					placeholder='Password'
					onKeyUp={e => e.key === 'Enter' && handleSubmit()}
				/>
				<button
					type='button'
					className='w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700'
					onClick={handleSubmit}
				>
					Login
				</button>
				<p className='mt-4 text-center text-sm'>
					Don&apos;t have an account?{' '}
					<span
						className='text-blue-600 cursor-pointer'
						onClick={() => router.push('/register')}
						onKeyUp={e => e.key === 'Enter' && router.push('/register')}
					>
						Create one
					</span>
				</p>
			</div>
		</div>
	);
}
