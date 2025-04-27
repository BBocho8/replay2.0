'use client';

import CreateMatchForm from '@/components/admin/CreateMatchForm';
import PendingUsersList from '@/components/admin/PendingUsersList';
import { createClient } from '@/utils/supabase/supabaseClient';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminDashboardPage() {
	const supabase = createClient();
	const router = useRouter();
	const [fullName, setFullName] = useState<string | null>(null);

	useEffect(() => {
		const fetchUser = async () => {
			const {
				data: { user },
			} = await supabase.auth.getUser();
			setFullName(user?.user_metadata?.full_name || null);
		};

		fetchUser();
	}, [supabase]);

	return (
		<div className='min-h-screen bg-gray-100 p-6'>
			<div className='max-w-7xl mx-auto'>
				<div className='flex items-center justify-between mb-8'>
					<h1 className='text-3xl font-bold'>Welcome{fullName ? `, ${fullName}` : ''} 👋</h1>

					{/* Button to manage competitions */}
					<button
						type='button'
						onClick={() => router.push('/administrator/dashboard/competitions')}
						className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
					>
						Manage Competitions
					</button>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
					{/* Left: Pending Users */}
					<div className='bg-white p-6 rounded-lg shadow'>
						<h2 className='text-xl font-bold mb-4'>Pending Players/Coaches</h2>
						<PendingUsersList />
					</div>

					{/* Right: Create Match */}
					<div className='bg-white p-6 rounded-lg shadow'>
						<h2 className='text-xl font-bold mb-4'>Create a New Match</h2>
						<CreateMatchForm />
					</div>
				</div>
			</div>
		</div>
	);
}
