'use client';

import { supabase } from '@/utils/supabase/supabaseClient';
import { useState } from 'react';
import { toast } from 'react-toastify';
import useSWR from 'swr';

const fetchPendingUsers = async () => {
	const { data, error } = await supabase.from('users').select('id, full_name, role, club_id').eq('is_validated', false);

	if (error) throw error;
	return data;
};

export default function PendingUsersList() {
	const { data: users, isLoading, mutate } = useSWR('pending-users', fetchPendingUsers);
	const [actionLoading, setActionLoading] = useState<string | null>(null);

	const handleApprove = async (userId: string) => {
		try {
			setActionLoading(userId);
			const { error } = await supabase.from('users').update({ is_validated: true }).eq('id', userId);

			if (error) throw error;
			toast.success('User approved!');
			mutate(); // Refresh list
		} catch (error) {
			console.error(error);
			toast.error('Failed to approve user.');
		} finally {
			setActionLoading(null);
		}
	};

	const handleReject = async (userId: string) => {
		try {
			setActionLoading(userId);
			const { error } = await supabase.from('users').delete().eq('id', userId);

			if (error) throw error;
			toast.success('User rejected and deleted.');
			mutate(); // Refresh list
		} catch (error) {
			console.error(error);
			toast.error('Failed to reject user.');
		} finally {
			setActionLoading(null);
		}
	};

	if (isLoading) return <p>Loading pending users...</p>;

	if (!users || users.length === 0) return <p>No pending users.</p>;

	return (
		<ul className='space-y-4'>
			{users.map((user: any) => (
				<li key={user.id} className='bg-gray-50 p-4 rounded shadow flex justify-between items-center'>
					<div>
						<p className='font-semibold'>{user.full_name || 'No Name'}</p>
						<p className='text-sm text-gray-600 capitalize'>{user.role}</p>
					</div>
					<div className='flex gap-2'>
						<button
							type='button'
							onClick={() => handleApprove(user.id)}
							className='bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded'
							disabled={actionLoading === user.id}
						>
							{actionLoading === user.id ? 'Loading...' : 'Approve'}
						</button>
						<button
							type='button'
							onClick={() => handleReject(user.id)}
							className='bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded'
							disabled={actionLoading === user.id}
						>
							{actionLoading === user.id ? 'Loading...' : 'Reject'}
						</button>
					</div>
				</li>
			))}
		</ul>
	);
}
