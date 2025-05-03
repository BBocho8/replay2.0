'use client';

import { usePathname } from 'next/navigation';
import FooterLanding from './FooterLanding';

export default function FooterManager() {
	const pathname = usePathname();
	const isAdminPage = pathname.startsWith('/administrator');

	if (isAdminPage) return null; // Don't render NavbarV2
	return <FooterLanding />;
}
