'use client';

import { createClient } from '@/utils/supabase/supabaseClient';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useState } from 'react';
import { toast } from 'react-toastify';

const supabase = createClient();

export default function EditCompetitionDialog({
	open,
	onClose,
	onUpdated,
	competition,
}: {
	open: boolean;
	onClose: () => void;
	onUpdated: () => void;
	competition: any;
}) {
	const [name, setName] = useState(competition.name);

	const handleUpdate = async () => {
		if (!name.trim()) return toast.error('Name cannot be empty');
		const { error } = await supabase.from('competitions').update({ name }).eq('id', competition.id);
		if (error) return toast.error('Failed to update competition');
		toast.success('Competition updated!');
		onUpdated();
		onClose();
	};

	return (
		<Dialog open={open} onClose={onClose} fullWidth maxWidth='xs'>
			<DialogTitle>Edit Competition</DialogTitle>
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
				<Button onClick={handleUpdate} variant='contained'>
					Save
				</Button>
			</DialogActions>
		</Dialog>
	);
}
