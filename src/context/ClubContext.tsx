// context/ClubContext.tsx
'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface ClubContextType {
	selectedClubId: string | null;
	setSelectedClubId: (id: string | null) => void;
}

const ClubContext = createContext<ClubContextType | undefined>(undefined);

export const ClubProvider = ({ children }: { children: React.ReactNode }) => {
	const [selectedClubId, setSelectedClubId] = useState<string | null>(null);

	useEffect(() => {
		const saved = localStorage.getItem('selectedClubId');
		if (saved) setSelectedClubId(saved);
	}, []);

	const updateClubId = (id: string | null) => {
		setSelectedClubId(id);
		if (id) localStorage.setItem('selectedClubId', id);
		else localStorage.removeItem('selectedClubId');
	};

	return (
		<ClubContext.Provider value={{ selectedClubId, setSelectedClubId: updateClubId }}>{children}</ClubContext.Provider>
	);
};

export const useClub = () => {
	const context = useContext(ClubContext);
	if (!context) throw new Error('useClub must be used within a ClubProvider');
	return context;
};
