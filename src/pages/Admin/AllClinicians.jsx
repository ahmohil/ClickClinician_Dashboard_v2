import { useEffect, useState, useMemo } from "react";
import { changeUserStatusByAdmin, deleteUserByAdmin, getAllClinicians, deleteClinician } from "@services";
import { confirmationAlert, failureToaster, isDataExists, successToaster } from "@utils";
import { NoData, Loader } from "@components";
import {
	useReactTable,
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	getFilteredRowModel,
	flexRender,
} from '@tanstack/react-table';
import { UserDetailsModal } from "@modals";

const DELETION_SUCCESS_MESSAGE = "User deleted successfully!";

const AllClinicians = () => {
	const [selectedUser, setSelectedUser] = useState(null);
	const [users, setUsers] = useState([]);
	const [isRendering, setIsRendering] = useState(false);
	const [editMode, setEditMode] = useState(false);
	const [pagination, setPagination] = useState({
		pageIndex: 0,
		pageSize: 10,
	});
	const [globalFilter, setGlobalFilter] = useState('');

	const onDeleteUser = async (id, index) => {
		try {
			console.log("IOD", id)
			await deleteClinician(id);
			successToaster(DELETION_SUCCESS_MESSAGE);
			getUsersData();
		} catch (error) {
			failureToaster(error.message);
		}
	};

	const getUsersData = async () => {
		setIsRendering(true);

		try {
			const result = await getAllClinicians();
			setUsers(result);
			setIsRendering(false);
			console.log(result)
		} catch (error) {
			failureToaster(error.message);
			setIsRendering(false);
		}
	};

	const handleEdit = (user) => {
		setEditMode(true)
		setSelectedUser(user)
	}

	const handleView = (user) => {
		setEditMode(false)
		setSelectedUser(user)
	}
	useEffect(() => {
		getUsersData();
	}, []);

	const columns = useMemo(
		() => [
			{
				header: 'Clinician Name',
				accessorKey: 'DisplayName',
			},
			{
				header: 'Clinician Type',
				accessorKey: 'UserType.Name',
			},
			{
				header: 'Phone Number',
				accessorKey: 'PhoneNumber',
			},
			{
				header: 'Email',
				accessorKey: 'Email',
			},
			{
				header: 'Status',
				accessorFn: (row) => (row.IsDisabled ? 'Inactive' : 'Active'),
				cell: ({ getValue }) => (
					<span className={`text-capitalize ${getValue() === 'Active' ? "success-text" : "error-text"}`}>
						{getValue()}
					</span>
				),
			},
			{
				id: 'actions',
				header: 'Action',
				cell: ({ row }) => (
					<div className="d-flex gap-3">
						<a className="fs-22 default-text pointer" onClick={() => handleView(row.original)}>
							<span className="iconify" data-icon="carbon:view"></span>
						</a>
						<a className="fs-22 success-text pointer" onClick={() => handleEdit(row.original)}>
							<span className="iconify" data-icon="mdi:pencil"></span>
						</a>
						<a className="fs-22 text-danger pointer" onClick={() => confirmationAlert(() => onDeleteUser(row.original.Id, row.index))}>
							<span className="iconify" data-icon="heroicons:trash"></span>
						</a>
					</div>
				),
			},
		],
		[handleView, handleEdit, onDeleteUser]
	);

	const filteredUsers = useMemo(() => {
		return users.filter(user =>
			Object.values(user).some(value =>
				value && value.toString().toLowerCase().includes(globalFilter.toLowerCase())
			)
		);
	}, [users, globalFilter]);

	const table = useReactTable({
		data: filteredUsers,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		state: {
			pagination,
			globalFilter,
		},
		onPaginationChange: setPagination,
		onGlobalFilterChange: setGlobalFilter,
		pageCount: Math.ceil(filteredUsers.length / pagination.pageSize),
		manualPagination: false, // Change this to false
	});

	return (
		<div className="">
			<div className="card-box mb-md-4 flex">
				<h3 className="fs-md-24 fw-700 mb-0 flex-1">All Clinicians</h3>
				<input
					type="text"
					className="form-control flex-2"
					placeholder="Search clinicians..."
					value={globalFilter ?? ''}
					onChange={e => setGlobalFilter(e.target.value)}
				/>
			</div>

			<div  >
				<table className="table table-striped table-bordered">
					<thead>
						{table.getHeaderGroups().map(headerGroup => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map(header => (
									<th key={header.id}>
										{flexRender(
											header.column.columnDef.header,
											header.getContext()
										)}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody>
						{table.getRowModel().rows.map(row => (
							<tr key={row.id}>
								{row.getVisibleCells().map(cell => (
									<td key={cell.id}>
										{flexRender(
											cell.column.columnDef.cell,
											cell.getContext()
										)}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{table.getRowModel().rows.length > 0 && (
				<div className="pagination d-flex justify-content-between align-items-center mt-3">
					<div>
						<button
							className="btn btn-sm btn-secondary me-2"
							onClick={() => table.setPageIndex(0)}
							disabled={!table.getCanPreviousPage()}
						>
							{'<<'}
						</button>
						<button
							className="btn btn-sm btn-secondary me-2"
							onClick={() => table.previousPage()}
							disabled={!table.getCanPreviousPage()}
						>
							{'<'}
						</button>
						<button
							className="btn btn-sm btn-secondary me-2"
							onClick={() => table.nextPage()}
							disabled={!table.getCanNextPage()}
						>
							{'>'}
						</button>
						<button
							className="btn btn-sm btn-secondary me-2"
							onClick={() => table.setPageIndex(table.getPageCount() - 1)}
							disabled={!table.getCanNextPage()}
						>
							{'>>'}
						</button>
					</div>
					<span>
						Page{' '}
						<strong>
							{table.getState().pagination.pageIndex + 1} of{' '}
							{table.getPageCount()}
						</strong>{' '}
					</span>
					<select
						className="form-control w-auto"
						value={table.getState().pagination.pageSize}
						onChange={e => {
							table.setPageSize(Number(e.target.value))
						}}
					>
						{[10, 20, 30, 40, 50].map(pageSize => (
							<option key={pageSize} value={pageSize}>
								Show {pageSize}
							</option>
						))}
					</select>
				</div>
			)}
			{isRendering && <Loader />}
			{!!selectedUser && (
				<UserDetailsModal selectedUser={selectedUser} discardSelectedUser={() => setSelectedUser(null)} edit={editMode} />
			)}
		</div>
	);
};

export default AllClinicians;
