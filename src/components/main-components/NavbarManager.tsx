'use client';

import { usePathname } from 'next/navigation';
import NavbarLanding from './NavbarLanding';

export default function NavbarManager() {
	const pathname = usePathname();
	const isAdminPage = pathname.startsWith('/administrator');

	if (isAdminPage) return null; // Don't render NavbarV2
	return <NavbarLanding />;
}
