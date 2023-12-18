import { useCallback, useEffect, useRef, useState } from 'react';
import { makeStyles } from '@mui/styles';
import {
	DataGrid as MuiDataGrid,
	gridPageCountSelector,
	gridPageSelector,
	gridPageSizeSelector,
	GridRowModes,
	useGridApiContext,
	useGridSelector,
} from '@mui/x-data-grid';
import { Box, Button, MenuItem, Pagination, Select } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PropTypes from 'prop-types';
import { cloneDeep, findIndex, map } from 'lodash';

const SAMPLE_COLUMNS = [
	{ field: 'id', headerName: 'ID', width: 90 },
	{
		field: 'firstName',
		headerName: 'First name',
		width: 150,
		editable: true,
	},
	{
		field: 'lastName',
		headerName: 'Last name',
		width: 150,
		editable: true,
	},
	{
		field: 'age',
		headerName: 'Age',
		type: 'number',
		width: 110,
		editable: true,
	},
	{
		field: 'fullName',
		headerName: 'Full name',
		description: 'This column has a value getter and is not sortable.',
		sortable: false,
		width: 160,
		valueGetter: (params) =>
			!!params ? `${params.row.firstName || ''} ${params.row.lastName || ''}` : '',
	},
];

const SAMPLE_ROWS = [
	{ id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
	{ id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
	{ id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
	{ id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
	{ id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
	{ id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
	{ id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
	{ id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
	{ id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const CustomNoRowsOverlay = () => {
	return (
		<Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
			<label>검색 결과가 없습니다.</label>
		</Box>
	);
};

const useStylesCustomPagination = makeStyles(() => ({
	CustomPagination: (props) => ({
		width: '100%',
		display: 'flex',
		justifyContent: props.pageAlignCenter ? 'center' : 'flex-start',
		position: 'relative',
		marginTop: '1rem',
		'& > div:last-child': {
			position: 'absolute',
			right: 0,
		},
		height: '3rem',
	}),
}));

function CustomPagination({ pageAlignCenter, setPageSize, rowsPerPageOptions }) {
	const classes = useStylesCustomPagination({ pageAlignCenter });
	const apiRef = useGridApiContext();
	const page = useGridSelector(apiRef, gridPageSelector);
	const pageCount = useGridSelector(apiRef, gridPageCountSelector);
	const pageSize = useGridSelector(apiRef, gridPageSizeSelector);

	const handlePageSize = useCallback(
		(e) => {
			setPageSize(e.target.value);
		},
		[setPageSize],
	);

	return (
		<div className={classes.CustomPagination}>
			<Pagination
				boundaryCount={2}
				count={pageCount}
				page={page + 1}
				onChange={(event, value) => apiRef.current.setPage(value - 1)}
				showFirstButton
				showLastButton
				shape="rounded"
			/>

			<Select value={pageSize} onChange={handlePageSize} IconComponent={KeyboardArrowDownIcon}>
				{map(rowsPerPageOptions, (item, index) => (
					<MenuItem key={index} value={item}>{`${item}개 보기`}</MenuItem>
				))}
			</Select>
		</div>
	);
}

const useStyles = makeStyles((theme) => ({
	DataGrid: {
		height: '100%',
		width: '100%',
		minHeight: 'inherit',
		display: 'flex',
		flexDirection: 'column',
	},
	header: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		fontWeight: 500,
		marginBottom: '0.8rem',
		'& > div > label:before': {
			content: '" | "',
			margin: '0 8px',
		},
		'& span': {
			color: theme.palette.primary.main,
		},
		'& button': {
			width: '5rem',
		},
	},
}));

export default function DataGrid(props) {
	const {
		columns = SAMPLE_COLUMNS,
		rows = SAMPLE_ROWS,
		id = 'id',
		initialPageSize = 10,
		hasEditor = false,
		pageAlignCenter = false,
		handleAdd = () => {},
		handleDelete = () => {},
		checkboxSelection = false,
		noHeader = false,
		handleRows = () => {},
		rowsPerPageOptions = [10, 20, 30, 50, 100],
		addheadercontrol = undefined,
		...others
	} = props;
	const classes = useStyles();
	const [pageSize, setPageSize] = useState(initialPageSize);
	const [rowModesModel, setRowModesModel] = useState({});
	const lastFocusedId = useRef(null);

	const handleRowClick = useCallback(
		(params) => {
			lastFocusedId.current = params.id;
			setRowModesModel({ ...rowModesModel, [params.id]: { mode: GridRowModes.Edit } });
		},
		[rowModesModel],
	);

	const handleClickAdd = useCallback(() => {
		handleAdd(lastFocusedId.current);
	}, [handleAdd]);

	const handleClickDelete = useCallback(() => {
		handleDelete();
	}, [handleDelete]);

	const handleProcessRowUpdate = useCallback(
		(newRow) => {
			handleRows((prev) => {
				let idx = findIndex(prev, [id, newRow[`${id}`]]);
				let tmp = cloneDeep(prev);
				tmp[idx] = newRow;
				return tmp;
			});
			return newRow;
		},
		[handleRows, id],
	);

	useEffect(() => {
		if (rows?.length === 0) lastFocusedId.current = null;
	}, [rows]);

	return (
		<div className={classes.DataGrid}>
			{!noHeader && (
				<div className={classes.header}>
					<div>
						{`전체 ${rows?.length ?? '--'}건`}
						{checkboxSelection && (
							<label>
								선택 <span>{0}건</span>
							</label>
						)}
					</div>

					{addheadercontrol ?? null}

					{hasEditor && (
						<div>
							<Button onClick={handleClickDelete}>삭제</Button>
							<Button onClick={handleClickAdd} sx={{ ml: 1 }}>
								추가
							</Button>
						</div>
					)}
				</div>
			)}

			<div style={{ height: '100%' }}>
				<MuiDataGrid
					columns={columns}
					rows={rows}
					getRowId={(row) => row[`${id}`]}
					hideFooterSelectedRowCount
					pagination={true}
					pageSize={pageSize}
					components={{
						Pagination: CustomPagination,
						NoRowsOverlay: hasEditor ? () => null : CustomNoRowsOverlay,
					}}
					componentsProps={{
						pagination: { pageAlignCenter, setPageSize, rowsPerPageOptions },
					}}
					disableColumnMenu
					onRowClick={handleRowClick}
					checkboxSelection={checkboxSelection}
					processRowUpdate={handleProcessRowUpdate}
					experimentalFeatures={{ newEditingApi: true }}
					getRowClassName={(params) => !!params.row.error && `Custom-MuiDataGrid-Row--error`}
					rowModesModel={rowModesModel}
					{...others}
				/>
			</div>
		</div>
	);
}

DataGrid.propTypes = {
	columns: PropTypes.array,
	rows: PropTypes.array,
	id: PropTypes.string,
};
