'use client';

import Link from 'next/link';

export default function PendingApprovalPage() {
	return (
		<div className='min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6'>
			<h1 className='text-4xl font-bold mb-4 text-yellow-500'>Waiting for Approval</h1>
			<p className='mb-6 text-center text-gray-700'>
				Your account has been created successfully. An administrator will review and validate your account soon.
			</p>
			<Link href='/' className='px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition'>
				Return Home
			</Link>
		</div>
	);
}
