'use client';

import CreateMatchForm from '@/components/admin/CreateMatchForm';
import PendingUsersList from '@/components/admin/PendingUsersList';
// (Optional later) import PendingClubsList from '@/components/admin/PendingClubsList';
// (Optional later) import AdminStatsCard from '@/components/admin/AdminStatsCard';

import { supabase } from '@/utils/supabase/supabaseClient';
import { useEffect, useState } from 'react';

export default function AdminDashboardPage() {
	const [fullName, setFullName] = useState<string | null>(null);

	useEffect(() => {
		const fetchUser = async () => {
			const {
				data: { user },
			} = await supabase.auth.getUser();
			setFullName(user?.user_metadata?.full_name || null);
		};

		fetchUser();
	}, []);

	return (
		<div className='min-h-screen bg-gray-100 p-6'>
			<div className='max-w-7xl mx-auto'>
				<h1 className='text-3xl font-bold mb-8'>Welcome{fullName ? `, ${fullName}` : ''} 👋</h1>

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

				{/* (Optional) Future grid expansion for PendingClubsList or AdminStatsCard */}
			</div>
		</div>
	);
}
