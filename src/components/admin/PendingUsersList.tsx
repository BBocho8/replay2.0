'use client';

import type { User } from '@/types/supabase/database';
import useSWR from 'swr';

const fetchPendingUsers = async () => {
	const res = await fetch('/api/admin/list-users');
	if (!res.ok) throw new Error('Failed to fetch users');
	const users = await res.json();
	return users.filter((user: User) => !user.is_validated);
};

const approveUser = async (userId: string) => {
	await fetch('/api/admin/approve-user', {
		method: 'PATCH',
		body: JSON.stringify({ id: userId }),
		headers: { 'Content-Type': 'application/json' },
	});
};

const rejectUser = async (userId: string) => {
	await fetch('/api/admin/reject-user', {
		method: 'DELETE',
		body: JSON.stringify({ id: userId }),
		headers: { 'Content-Type': 'application/json' },
	});
};

export default function PendingUsersList() {
	const { data: pendingUsers, error, isLoading, mutate } = useSWR('pending-users', fetchPendingUsers);

	if (isLoading) return <p>Loading...</p>;
	if (error || !pendingUsers) return <p>Error: {error.message}</p>;

	if (pendingUsers.length === 0) {
		return <p>No pending users 🎉</p>;
	}

	return (
		<ul className='space-y-2'>
			{pendingUsers.map((user: User) => (
				<li key={user.id} className='bg-white p-4 rounded shadow flex justify-between items-center'>
					<div>
						<p className='font-bold'>{user.full_name}</p>
						<p className='text-sm text-gray-500'>{user.role}</p>
					</div>
					<div className='flex space-x-2'>
						<button
							type='button'
							className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded'
							onClick={async () => {
								await approveUser(user.id);
								mutate(); // refresh the list after approve
							}}
						>
							Approve ✅
						</button>
						<button
							type='button'
							className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded'
							onClick={async () => {
								await rejectUser(user.id);
								mutate(); // refresh the list after reject
							}}
						>
							Reject ❌
						</button>
					</div>
				</li>
			))}
		</ul>
	);
}
