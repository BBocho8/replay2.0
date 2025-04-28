'use client';

import { createClient } from '@/utils/supabase/supabaseClient';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { toast } from 'react-toastify';

const supabase = createClient();

interface DeleteMatchDialogProps {
	open: boolean;
	onClose: () => void;
	onDeleted: () => void;
	matchId: string;
}

export default function DeleteMatchDialog({ open, onClose, onDeleted, matchId }: DeleteMatchDialogProps) {
	const handleDelete = async () => {
		const { error } = await supabase.from('matches').delete().eq('id', matchId);

		if (error) {
			console.error(error);
			toast.error('Failed to delete match');
		} else {
			toast.success('Match deleted!');
			onDeleted();
			onClose();
		}
	};

	return (
		<Dialog open={open} onClose={onClose} fullWidth maxWidth='xs'>
			<DialogTitle>Delete Match</DialogTitle>
			<DialogContent>
				<DialogContentText>Are you sure you want to delete this match? This action cannot be undone.</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Cancel</Button>
				<Button onClick={handleDelete} color='error' variant='contained'>
					Delete
				</Button>
			</DialogActions>
		</Dialog>
	);
}
