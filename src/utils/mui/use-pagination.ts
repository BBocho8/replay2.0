import { useState } from 'react';

export const usePagination = (initialPage = 0, initialRowsPerPage = 5) => {
	const [page, setPage] = useState(initialPage);
	const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);

	const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setRowsPerPage(Number.parseInt(event.target.value, 10));
		setPage(0);
	};

	return { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage };
};
