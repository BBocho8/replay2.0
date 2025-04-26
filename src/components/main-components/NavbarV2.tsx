'use client';

import { type TProjectSetup, useProjectSetup } from '@/stores/sanity-store';
import type { VideoV2 } from '@/types/Video';
import { fetchVideosV2 } from '@/utils/fetchVideo';
import { signOut } from '@/utils/supabase/auth';
import { supabase } from '@/utils/supabase/supabaseClient';
import { Box, Typography } from '@mui/material';
import classNames from 'classnames';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import removeAccents from 'remove-accents';
import useSWR from 'swr';
import { useOnClickOutside } from 'usehooks-ts';
import logo from '../../../public/logo.png';

const NavbarV2 = ({
	projectId,
	dataset,
	token,
	supabaseUrl,
	supabaseServiceRoleKey,
}: {
	projectId: string;
	dataset: string;
	token: string;
	supabaseUrl: string;
	supabaseServiceRoleKey: string;
}) => {
	const { creds, setProjectSetup } = useProjectSetup();
	const { data } = useSWR('fetchVideosV2', () => fetchVideosV2(projectId, dataset));
	const router = useRouter();
	const [isOpen, setIsOpen] = useState(false);
	const [query, setQuery] = useState('');
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const ref = useRef(null);

	const getFilteredItems = (query: string, items: VideoV2[]) => {
		if (!query) return items;
		if (query.length > 2) {
			return items.filter(
				game =>
					removeAccents(game.homeTeam.toLowerCase()).includes(removeAccents(query.toLowerCase())) ||
					removeAccents(game.awayTeam.toLowerCase()).includes(removeAccents(query.toLowerCase())),
			);
		}
	};

	const filteredItems = getFilteredItems(query, data || []);

	const handleClickOutside = () => {
		setIsOpen(false);
	};

	useOnClickOutside(ref, handleClickOutside);

	const navClass = classNames({
		'absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white  md:mt-0 md:p-0 md:top-0 md:relative md:opacity-100 md:translate-x-0 md:flex md:items-center md:justify-between': true,
		'opacity-0 -translate-x-full': !isOpen,
		'translate-x-0 opacity-100': isOpen,
	});

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		setProjectSetup({
			...(creds as TProjectSetup | undefined),
			projectId,
			dataset,
			token,
			supabaseUrl,
			supabaseServiceRoleKey,
		});

		// 🧠 Detect user session
		const checkSession = async () => {
			const {
				data: { session },
			} = await supabase.auth.getSession();
			setIsLoggedIn(!!session);
		};

		checkSession();

		// Optional: listen for login/logout events
		const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
			setIsLoggedIn(!!session);
		});

		return () => {
			listener.subscription.unsubscribe();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<nav ref={ref} className='relative bg-white shadow'>
			<div className='container px-6 py-3 mx-auto md:flex'>
				<div className='flex items-center justify-between'>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							gap: 2,
						}}
					>
						<Link href='/'>
							<Image priority className='w-auto h-8 sm:h-9' src={logo} alt='logo' />
						</Link>
						<Typography
							className='md:hidden'
							sx={{
								fontWeight: 600,
								fontSize: '20px',
								lineHeight: '26px',
							}}
						>
							SVE REPLAY
						</Typography>
					</Box>

					<div className='flex md:hidden'>
						<button
							type='button'
							className='text-black hover:text-primaryGreen focus:outline-none focus:text-primaryGreen cursor-pointer transition ease-in-out'
							aria-label='toggle menu'
							onClick={() => setIsOpen(!isOpen)}
							onKeyDown={e => {
								if (e.key === 'Enter' || e.key === ' ') {
									setIsOpen(!isOpen);
								}
							}}
						>
							{isOpen ? (
								<svg className='w-6 h-6' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
									<title>Close Menu</title>
									<path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
								</svg>
							) : (
								<svg className='w-6 h-6' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
									<title>Open Menu</title>
									<path strokeLinecap='round' strokeLinejoin='round' d='M4 8h16M4 16h16' />
								</svg>
							)}
						</button>
					</div>
				</div>

				<div className={navClass}>
					<div className='flex flex-col px-2 -mx-4 md:flex-row md:mx-10 md:py-0'>
						<Link
							onClick={() => setIsOpen(false)}
							href='/'
							className='px-2.5 py-1 text-gray-700 font-bold transition-colors duration-300 transform rounded-lg hover:bg-gray-100 md:mx-2'
						>
							Home
						</Link>
						<Link
							onClick={() => setIsOpen(false)}
							href='/replay'
							className='px-2.5 py-1 text-gray-700 font-bold transition-colors duration-300 transform rounded-lg hover:bg-gray-100 md:mx-2'
						>
							Replay
						</Link>
						<Link
							onClick={() => setIsOpen(false)}
							href='/admin'
							className='px-2.5 py-1 text-gray-700 font-bold transition-colors duration-300 transform rounded-lg hover:bg-gray-100 md:mx-2'
						>
							Admin
						</Link>
						{isLoggedIn && (
							<Typography
								onClick={() => {
									setIsOpen(false);
									signOut();
									toast.success('You have been logged out');
									router.push('/');
								}}
								className='px-2.5 py-1 text-gray-700 font-bold transition-colors duration-300 transform rounded-lg hover:bg-gray-100 md:mx-2 cursor-pointer'
							>
								Sign out
							</Typography>
						)}
					</div>

					{/* Mobile Search */}
					<div className='md:hidden'>
						<div className='relative mt-2 md:mt-0'>
							<span className='absolute inset-y-0 left-0 flex items-center pl-3'>
								<svg className='w-5 h-5 text-gray-400' viewBox='0 0 24 24' fill='none'>
									<title>Search Icon</title>
									<path
										d='M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z'
										stroke='currentColor'
										strokeWidth='2'
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
								</svg>
							</span>

							<input
								type='text'
								className='w-full py-2 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-lg focus:border-primaryGreen focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-primaryGreen'
								onChange={e => setQuery(e.target.value)}
								value={query || ''}
								placeholder='Search for a game'
							/>
						</div>

						<ul className='overflow-y-auto max-h-52'>
							{query.length > 2 &&
								filteredItems?.map(game => (
									<Link
										onClick={() => {
											setQuery('');
											setIsOpen(false);
										}}
										key={game._id}
										href={`/replay/${game._id}`}
									>
										<p className='px-4 py-2 text-black bg-white border hover:bg-gray-300 text-center'>
											{game.homeTeam} vs {game.awayTeam} - {dayjs(game?.date).format('MMM D, YYYY')}
										</p>
									</Link>
								))}
						</ul>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default NavbarV2;
