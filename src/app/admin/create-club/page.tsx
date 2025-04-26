'use client';

import { supabase } from '@/utils/supabase/supabaseClient';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CreateClubPage() {
	const router = useRouter();
	const [clubName, setClubName] = useState('');
	const [loading, setLoading] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');

	const handleSubmit = async () => {
		if (!clubName.trim()) {
			setErrorMsg('Club name cannot be empty.');
			return;
		}

		setLoading(true);
		setErrorMsg('');

		try {
			const { error } = await supabase.from('clubs').insert({
				name: clubName,
				is_validated: false, // ❗ pending by default
			});

			if (error) throw error;

			router.push('/admin'); // Redirect to admin dashboard or success page
		} catch (error) {
			console.error('Error creating club:', error);
			setErrorMsg('Failed to create club. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6'>
			<h1 className='text-4xl font-bold mb-6 text-green-600'>Create Your Club</h1>
			<div className='w-full max-w-md bg-white rounded-lg p-8 shadow'>
				<input
					type='text'
					placeholder='Enter Club Name'
					value={clubName}
					onChange={e => setClubName(e.target.value)}
					className='w-full p-3 mb-4 border rounded focus:outline-none focus:ring focus:ring-green-400'
				/>
				{errorMsg && <p className='text-red-600 mb-4'>{errorMsg}</p>}
				<button
					type='button'
					onClick={handleSubmit}
					disabled={loading}
					className='w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition disabled:bg-gray-400'
				>
					{loading ? 'Creating...' : 'Create Club'}
				</button>
			</div>
		</div>
	);
}
