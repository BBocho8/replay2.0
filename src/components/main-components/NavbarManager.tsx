'use client';

import { usePathname } from 'next/navigation';
import NavbarV2 from './NavbarV2';

export default function NavbarManager() {
	const pathname = usePathname();
	const isAdminPage = pathname.startsWith('/administrator');

	if (isAdminPage) return null; // Don't render NavbarV2
	return <NavbarV2 />;
}
