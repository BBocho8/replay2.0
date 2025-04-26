'use client';

import Link from 'next/link';

export default function UnauthorizedPage() {
	return (
		<div className='min-h-screen flex flex-col items-center justify-center bg-gray-100'>
			<h1 className='text-4xl font-bold mb-4 text-red-600'>Unauthorized Access</h1>
			<p className='mb-6 text-gray-700 text-center'>You do not have permission to view this page.</p>
			<Link href='/' className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition'>
				Go back Home
			</Link>
		</div>
	);
}
