'use client';

import type { Club } from '@/types/supabase/database';
import { register } from '@/utils/supabase/auth';
import { fetcher } from '@/utils/supabase/fetcher';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';
import useSWR from 'swr';

export default function RegisterPage() {
	const router = useRouter();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [role, setRole] = useState<'player' | 'coach' | 'admin'>('player');
	const [clubId, setClubId] = useState('');
	const [newClubName, setNewClubName] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	const { data: clubs, error, isLoading } = useSWR('clubs', fetcher);

	const handleSubmit = async () => {
		setIsSubmitting(true);
		try {
			await register(email, password);
			toast.success('Registration successful! Please check your email for confirmation.');
			router.push('/confirm-email');
		} catch (error) {
			console.error(error);
			toast.error('Registration failed. Please try again.');
		} finally {
			setIsSubmitting(false);
		}
	};

	if (isLoading) {
		return (
			<div className='min-h-screen flex items-center justify-center bg-gray-100'>
				<div className='text-lg font-semibold'>Loading clubs...</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className='min-h-screen flex items-center justify-center bg-gray-100'>
				<div className='text-lg font-semibold text-red-500'>Failed to load clubs. Try refreshing.</div>
			</div>
		);
	}

	return (
		<div className='min-h-screen flex items-center justify-center bg-gray-100'>
			<div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
				<h1 className='text-2xl font-bold mb-6 text-center'>Create an Account</h1>

				<select
					className='w-full p-2 mb-4 border rounded'
					value={role}
					onChange={e => setRole(e.target.value as 'player' | 'coach' | 'admin')}
				>
					<option value='player'>Player</option>
					<option value='coach'>Coach</option>
					<option value='admin'>Admin</option>
				</select>

				{role === 'admin' ? null : role === 'player' || role === 'coach' ? (
					<select className='w-full p-2 mb-4 border rounded' value={clubId} onChange={e => setClubId(e.target.value)}>
						<option value=''>Select your Club</option>
						{clubs
							?.filter((club: Club) => club.is_validated) // 🧠 Only clubs validated
							.map((club: Club) => (
								<option key={club.id} value={club.id}>
									{club.name}
								</option>
							))}
					</select>
				) : (
					<input
						className='w-full p-2 mb-4 border rounded'
						value={newClubName}
						onChange={e => setNewClubName(e.target.value)}
						placeholder='New Club Name'
					/>
				)}

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
					className={`w-full p-2 rounded text-white ${
						isSubmitting ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'
					}`}
					onClick={handleSubmit}
					disabled={isSubmitting}
					type='button'
				>
					{isSubmitting ? 'Registering...' : 'Register'}
				</button>

				<p className='mt-4 text-center text-sm'>
					Already have an account?{' '}
					<span
						className='text-blue-600 cursor-pointer'
						onClick={() => router.push('/login')}
						onKeyDown={e => {
							if (e.key === 'Enter' || e.key === ' ') {
								router.push('/login');
							}
						}}
					>
						Login
					</span>
				</p>
			</div>
		</div>
	);
}
