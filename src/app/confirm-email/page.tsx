'use client';

import Link from 'next/link';

export default function ConfirmEmailPage() {
	return (
		<div className='min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6'>
			<h1 className='text-4xl font-bold mb-4 text-blue-600'>Confirm Your Email</h1>
			<p className='mb-6 text-center text-gray-700'>
				We&apos;ve sent you a confirmation link. Please check your email inbox and confirm your email address to
				continue.
			</p>
			<Link href='/login' className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition'>
				Back to Login
			</Link>
		</div>
	);
}
