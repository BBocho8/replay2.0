'use client';

import { useState } from 'react';

export default function PendingUsersList() {
	const [loading, setLoading] = useState(false);

	// Tomorrow: Fetch pending users with SWR here

	return (
		<div>
			{loading ? (
				<p>Loading pending users...</p>
			) : (
				<ul className='space-y-4'>
					{/* Tomorrow: Map through pending users */}
					<li className='bg-gray-50 p-4 rounded shadow'>
						Player Example - FC Demo Club
						<div className='flex mt-2 gap-2'>
							<button type='button' className='bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded'>
								Approve
							</button>
							<button type='button' className='bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded'>
								Reject
							</button>
						</div>
					</li>
				</ul>
			)}
		</div>
	);
}
