import { useEffect, useState, useMemo } from "react";
import { changeUserStatusByAdmin, deleteUserByAdmin, getAllAgencies } from "@services";
import { confirmationAlert, failureToaster, isDataExists, successToaster } from "@utils";
import { NoData, Loader } from "@components";
import { UserDetailsModal } from "@modals";
import { Link } from "react-router-dom";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from '@tanstack/react-table';
import { useLocation } from "react-router-dom";
const DELETION_SUCCESS_MESSAGE = "User deleted successfully!";

const AllAgencies = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [isRendering, setIsRendering] = useState(false);
  const [globalFilter, setGlobalFilter] = useState('');
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const onDeleteUser = async (id, index) => {
    try {
      await deleteUserByAdmin(id);
      successToaster(DELETION_SUCCESS_MESSAGE);
      getUsersData();
    } catch (error) {
      failureToaster(error.message);
    }
  };

  const onChangeUserStatus = async (status, id) => {
    try {
      await changeUserStatusByAdmin(status, id);
      getUsersData();
      successToaster("Status changed successfully");
    } catch (error) {
      failureToaster(error.message);
    }
  };

  const getUsersData = async () => {
    setIsRendering(true);
    try {
      const result = await getAllAgencies();
      setUsers(result);
      setIsRendering(false);
    } catch (error) {
      failureToaster(error.message);
      setIsRendering(false);
    }
  };

  useEffect(() => {
    getUsersData();
  }, []);

  const columns = useMemo(
    () => [
      {
        header: 'Agency Name',
        accessorKey: 'Name',
        cell: ({ getValue }) => <div className="w-160 text-truncate">{getValue()}</div>,
      },
      {
        header: 'Phone Number',
        accessorKey: 'PhoneNumber',
      },
      {
        header: 'Fax',
        accessorKey: 'Fax',
        cell: ({ getValue }) => getValue() || 'N/A',
      },
      {
        header: 'Address',
        accessorFn: (row) => `${row.AddressLine1}${row.AddressLine2 ? ', ' + row.AddressLine2 : ''}, ${row.City}, ${row.State} ${row.Zip}`,
      },
      {
        header: 'Contact',
        accessorKey: 'MainContact',
        cell: ({ getValue }) => getValue() || 'N/A',
      },
      {
        header: 'Title',
        accessorKey: 'MainContactTitle',
        cell: ({ getValue }) => getValue() || 'N/A',
      },
      {
        header: 'Status',
        accessorKey: 'Status',
        cell: ({ getValue }) => (
          <span className={`text-capitalize ${getValue() === "Active" ? "success-text" : "error-text"}`}>
            {getValue() || 'N/A'}
          </span>
        ),
      },
      {
        id: 'actions',
        header: 'Action',
        cell: ({ row }) => {
          const encodedAgencyData = encodeURIComponent(JSON.stringify(row.original.Name));
          return (
            <div className="d-flex gap-3">
              <Link
                to={`/admin/details/${row.original.Id}?data=${encodedAgencyData}`}
                className="fs-22 default-text pointer"
              >
                <span className="iconify" data-icon="carbon:view"></span>
              </Link>
              {row.original.Status === "Active" && (
                <span
                  className="fs-22 text-danger pointer"
                  onClick={() => onChangeUserStatus("Inactive", row.original.Id)}
                >
                  <span className="iconify" data-icon="tdesign:user-blocked"></span>
                </span>
              )}
              {row.original.Status === "Inactive" && (
                <span
                  className="fs-22 text-success pointer"
                  onClick={() => onChangeUserStatus("Active", row.original.Id)}
                >
                  <span className="iconify" data-icon="mdi:user-tick-outline"></span>
                </span>
              )}
              <span
                className="fs-22 text-danger pointer"
                onClick={() => confirmationAlert(() => onDeleteUser(row.original.Id, row.index))}
              >
                <span className="iconify" data-icon="heroicons:trash"></span>
              </span>
            </div>
          );
        },
      },
    ],
    [onChangeUserStatus, onDeleteUser]
  );

  const table = useReactTable({
    data: users,
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
    pageCount: Math.ceil(users.length / pagination.pageSize),
  });

  return (
    <div className="">
      <div className="card-box mb-md-4 d-flex align-items-center">
        <h3 className="fs-md-24 fw-700 mb-0 flex-1">All Agencies</h3>
        <input
          type="text"
          className="form-control flex-2"
          placeholder="Search agencies..."
          value={globalFilter ?? ''}
          onChange={(e) => setGlobalFilter(e.target.value)}
        />
      </div>

      {!isRendering && (
        <>
          <table className="table table-striped table-bordered">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

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
                  {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                </strong>{' '}
              </span>
              <select
                className="form-control w-auto"
                value={table.getState().pagination.pageSize}
                onChange={(e) => {
                  table.setPageSize(Number(e.target.value));
                }}
              >
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select>
            </div>
          )}
        </>
      )}
      {isRendering && <Loader />}
      {!!selectedUser && (
        <UserDetailsModal selectedUser={selectedUser} discardSelectedUser={() => setSelectedUser(null)} />
      )}
    </div>
  );
};

export default AllAgencies;