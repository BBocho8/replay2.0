'use client';

import { Typography } from '@mui/material';
import { usePathname } from 'next/navigation';
import NavbarLanding from './NavbarLanding';

export default function FooterManager() {
	const pathname = usePathname();
	const isAdminPage = pathname.startsWith('/administrator');

	if (isAdminPage) return <Typography>Hellooo</Typography>; // Don't render NavbarV2
	return <NavbarLanding />;
}
