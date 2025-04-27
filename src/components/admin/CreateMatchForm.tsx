'use client';

import { createClient } from '@/utils/supabase/supabaseClient';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function CreateMatchForm() {
	const supabase = createClient();
	const [homeTeam, setHomeTeam] = useState('');
	const [awayTeam, setAwayTeam] = useState('');
	const [date, setDate] = useState('');
	const [competitionId, setCompetitionId] = useState('');
	const [competitions, setCompetitions] = useState<{ id: string; name: string }[]>([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		async function fetchCompetitions() {
			try {
				const {
					data: { user },
				} = await supabase.auth.getUser();
				if (!user) throw new Error('Not logged in');

				const { data: profile } = await supabase.from('users').select('club_id').eq('id', user.id).maybeSingle();
				if (!profile || !profile.club_id) throw new Error('No club assigned');

				const { data: club } = await supabase
					.from('clubs')
					.select('competitions')
					.eq('id', profile.club_id)
					.maybeSingle();
				if (!club) throw new Error('No club found');

				if (!club.competitions || club.competitions.length === 0) {
					setCompetitions([]);
					return;
				}

				const { data: competitionList } = await supabase
					.from('competitions')
					.select('id, name')
					.in('id', club.competitions);

				setCompetitions(competitionList || []);
			} catch (error) {
				console.error(error);
				toast.error('Failed to load competitions');
			}
		}

		fetchCompetitions();
	}, [supabase]);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);

		try {
			const { error } = await supabase.from('matches').insert({
				home_team: homeTeam,
				away_team: awayTeam,
				date,
				competition_id: competitionId,
				is_video_available: false, // default
			});

			if (error) throw error;

			toast.success('Match created successfully!');
			setHomeTeam('');
			setAwayTeam('');
			setDate('');
			setCompetitionId('');
		} catch (error) {
			console.error(error);
			toast.error('Failed to create match');
		} finally {
			setLoading(false);
		}
	};

	return (
		<form className='space-y-4' onSubmit={handleSubmit}>
			<input
				type='text'
				className='w-full border p-2 rounded'
				placeholder='Home Team'
				value={homeTeam}
				onChange={e => setHomeTeam(e.target.value)}
			/>
			<input
				type='text'
				className='w-full border p-2 rounded'
				placeholder='Away Team'
				value={awayTeam}
				onChange={e => setAwayTeam(e.target.value)}
			/>
			<input type='date' className='w-full border p-2 rounded' value={date} onChange={e => setDate(e.target.value)} />

			<select
				className='w-full border p-2 rounded'
				value={competitionId}
				onChange={e => setCompetitionId(e.target.value)}
			>
				<option value=''>Select Competition</option>
				{competitions.map(comp => (
					<option key={comp.id} value={comp.id}>
						{comp.name}
					</option>
				))}
			</select>

			<button
				type='submit'
				className='w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded'
				disabled={loading}
			>
				{loading ? 'Creating...' : 'Create Match'}
			</button>
		</form>
	);
}
