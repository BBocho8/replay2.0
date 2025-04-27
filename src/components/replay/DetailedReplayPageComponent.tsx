'use client';

import ReplayDetails from '@/components/replay/ReplayDetails';
import { useProjectSetup } from '@/stores/sanity-store';
import games, { type Game } from '@/utils/tempData';
import { useParams } from 'next/navigation';

const DetailedReplayComponent = () => {
	const { creds } = useProjectSetup() || {}; // Ensure creds is always an object

	const { gameID } = useParams();

	if (!creds?.projectId || !creds?.dataset) {
		return <p className='text-red-500'>Error: Missing project credentials. Please check your configuration.</p>;
	}

	const { projectId, dataset } = creds;

	const targetGame = games?.find(game => game._id === gameID);

	if (!targetGame) return <p className='text-gray-500'>Game not found.</p>;

	return <ReplayDetails game={targetGame as Game} />;
};

export default DetailedReplayComponent;
