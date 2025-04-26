'use client';
import { getCurrentUser } from '@/utils/supabase/auth';
import { Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminPageComponent() {
	const router = useRouter();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchUser = async () => {
			const user = await getCurrentUser();
			console.log(user);
			if (!user) {
				router.push('/login');
			} else {
				setLoading(false);
			}
		};
		fetchUser();
	}, [router]);

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<Box
			sx={{
				height: '100vh',
				maxHeight: '100dvh',
				overscrollBehavior: 'none',
				overflow: 'auto',
				WebkitFontSmoothing: 'antialiased',
			}}
		>
			<p>Hellooooo I am connected !!!</p>
		</Box>
	);
}
