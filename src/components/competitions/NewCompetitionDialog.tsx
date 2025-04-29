'use client';

import { createClient } from '@/utils/supabase/supabaseClient';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useState } from 'react';
import { toast } from 'react-toastify';

const supabase = createClient();

export default function NewCompetitionDialog({
	open,
	onClose,
	onCreated,
}: {
	open: boolean;
	onClose: () => void;
	onCreated: () => void;
}) {
	const [name, setName] = useState('');

	const handleCreate = async () => {
		if (!name.trim()) return toast.error('Name cannot be empty');

		const {
			data: { user },
			error: userError,
		} = await supabase.auth.getUser();
		if (userError || !user) return toast.error('User not authenticated');

		const { data: profile, error: profileError } = await supabase
			.from('users')
			.select('club_id')
			.eq('id', user.id)
			.maybeSingle();
		if (profileError || !profile?.club_id) return toast.error('Club not assigned');

		const { data: newCompetition, error: insertError } = await supabase
			.from('competitions')
			.insert({ name })
			.select('id')
			.single();
		if (insertError) return toast.error('Failed to create competition');

		const { error: linkError } = await supabase.rpc('append_competition_to_club', {
			club_id_input: profile.club_id,
			competition_id_input: newCompetition.id,
		});
		if (linkError) return toast.error('Failed to link competition to club');

		toast.success('Competition created and linked!');
		setName('');
		onCreated();
		onClose();
	};

	return (
		<Dialog open={open} onClose={onClose} fullWidth maxWidth='xs'>
			<DialogTitle>New Competition</DialogTitle>
			<DialogContent>
				<TextField
					autoFocus
					label='Competition Name'
					value={name}
					onChange={e => setName(e.target.value)}
					fullWidth
					margin='dense'
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Cancel</Button>
				<Button onClick={handleCreate} variant='contained'>
					Create
				</Button>
			</DialogActions>
		</Dialog>
	);
}
