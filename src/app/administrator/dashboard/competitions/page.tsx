'use client';

import type { Competition } from '@/types/supabase/database';
import { createClient } from '@/utils/supabase/supabaseClient';
import { useState } from 'react';
import { toast } from 'react-toastify';
import useSWR from 'swr';

const supabase = createClient(); // Move outside

async function fetchCompetitions() {
	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) throw new Error('User not logged in');

	const { data: profile } = await supabase.from('users').select('club_id').eq('id', user.id).maybeSingle();
	if (!profile || !profile.club_id) throw new Error('Club not assigned');

	const { data: club } = await supabase.from('clubs').select('competitions').eq('id', profile.club_id).maybeSingle();
	if (!club) throw new Error('Club not found');

	if (!club.competitions || club.competitions.length === 0) return [];

	const { data: competitionList } = await supabase.from('competitions').select('id, name').in('id', club.competitions);

	return competitionList || [];
}

export default function ManageCompetitionsPage() {
	const [newCompetitionName, setNewCompetitionName] = useState('');
	const { data: competitions, mutate, error, isLoading } = useSWR('competitions', fetchCompetitions);

	const handleAddCompetition = async () => {
		if (!newCompetitionName.trim()) {
			toast.error('Competition name cannot be empty');
			return;
		}

		try {
			const {
				data: { user },
			} = await supabase.auth.getUser();
			if (!user) throw new Error('User not logged in');

			const { data: profile } = await supabase.from('users').select('club_id').eq('id', user.id).maybeSingle();
			if (!profile || !profile.club_id) throw new Error('Club not assigned');

			// 1. Create new competition
			const { data: newCompetition, error: createError } = await supabase
				.from('competitions')
				.insert({ name: newCompetitionName })
				.select('id')
				.single();

			if (createError) throw createError;

			// 2. Attach competition to club
			const { error: updateError } = await supabase.rpc('append_competition_to_club', {
				club_id_input: profile.club_id,
				competition_id_input: newCompetition.id,
			});
			if (updateError) throw updateError;

			toast.success('Competition added successfully!');
			setNewCompetitionName('');
			mutate(); // ✅ Now works
		} catch (error) {
			console.error(error);
			toast.error('Failed to add competition');
		}
	};

	if (isLoading) return <p>Loading competitions...</p>;
	if (error) return <p>Error loading competitions</p>;

	return (
		<div className='p-6'>
			<h1 className='text-2xl font-bold mb-4'>Manage Competitions</h1>

			<div className='flex items-center space-x-4 mb-6'>
				<input
					className='border p-2 rounded w-full'
					type='text'
					value={newCompetitionName}
					onChange={e => setNewCompetitionName(e.target.value)}
					placeholder='New Competition Name'
				/>
				<button
					type='button'
					className='bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded'
					onClick={handleAddCompetition}
				>
					Add
				</button>
			</div>

			<ul className='space-y-2'>
				{competitions?.map((comp: Competition) => (
					<li key={comp.id} className='bg-white p-4 rounded shadow'>
						{comp.name}
					</li>
				))}
			</ul>
		</div>
	);
}
