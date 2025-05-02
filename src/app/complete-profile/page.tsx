'use client';

import { createClient } from '@/utils/supabase/supabaseClient';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';
import useSWR from 'swr';

export default function CompleteProfilePage() {
	const supabase = createClient();
	const router = useRouter();
	const [fullName, setFullName] = useState('');
	const [role, setRole] = useState<'player' | 'coach' | 'admin'>('player');
	const [clubId, setClubId] = useState('');
	const [newClubName, setNewClubName] = useState('');

	const {
		data: clubs,
		error,
		isLoading,
	} = useSWR('clubs', async () => {
		const { data, error } = await supabase.from('clubs').select('id, name').eq('is_validated', true);

		if (error) throw error;
		return data;
	});

	const handleSubmit = async () => {
		try {
			if (!fullName.trim()) {
				toast.error('Full Name is required.');
				return;
			}

			const {
				data: { user },
			} = await supabase.auth.getUser();
			if (!user) {
				toast.error('Failed to fetch user.');
				return;
			}

			let finalClubId = clubId;

			if (role === 'admin') {
				if (!newClubName.trim()) {
					toast.error('Club Name is required for Admin.');
					return;
				}

				// Create new club
				const { data: createdClub, error: clubError } = await supabase
					.from('clubs')
					.insert({ name: newClubName, is_validated: true })
					.select('id')
					.single();

				if (clubError || !createdClub) {
					console.error(clubError);
					toast.error('Failed to create club.');
					return;
				}

				finalClubId = createdClub.id;
			}

			// Create user profile
			await supabase.from('users').insert({
				id: user.id,
				full_name: fullName,
				role,
				email: user.email,
				club_id: finalClubId || null,
				is_validated: role === 'admin',
			});

			toast.success('Profile completed successfully!');

			// Redirect
			router.push(`${role === 'admin' ? '/administrator' : '/pending-approval'}`);
		} catch (error) {
			console.error(error);
			toast.error('Failed to complete profile.');
		}
	};

	if (isLoading) return <p>Loading...</p>;
	if (error) return <p>Failed to load clubs.</p>;

	return (
		<div className='min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6'>
			<div className='w-full max-w-md bg-white rounded-lg p-8 shadow'>
				<h1 className='text-2xl font-bold mb-6 text-center'>Complete Your Profile</h1>

				<input
					type='text'
					className='w-full p-3 mb-4 border rounded focus:outline-none'
					placeholder='Full Name'
					value={fullName}
					onChange={e => setFullName(e.target.value)}
				/>

				<select
					className='w-full p-3 mb-4 border rounded focus:outline-none'
					value={role}
					onChange={e => {
						setRole(e.target.value as 'player' | 'coach' | 'admin');
						// Reset club fields
						setClubId('');
						setNewClubName('');
					}}
				>
					<option value='player'>Player</option>
					<option value='coach'>Coach</option>
					<option value='admin'>Admin</option>
				</select>

				{role === 'admin' ? (
					<input
						type='text'
						className='w-full p-3 mb-4 border rounded focus:outline-none'
						placeholder='New Club Name'
						value={newClubName}
						onChange={e => setNewClubName(e.target.value)}
					/>
				) : (
					<select
						className='w-full p-3 mb-6 border rounded focus:outline-none'
						value={clubId}
						onChange={e => setClubId(e.target.value)}
					>
						<option value=''>Select Your Club</option>
						{clubs?.map(club => (
							<option key={club.id} value={club.id}>
								{club.name}
							</option>
						))}
					</select>
				)}

				<button
					type='button'
					onClick={handleSubmit}
					className='w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
				>
					Complete Profile
				</button>
			</div>
		</div>
	);
}
