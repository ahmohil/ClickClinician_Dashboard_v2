import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from '@tanstack/react-table';
import { getRequest } from '../../api';
import { ErrorMessages } from '@constants';

const AgencyUsers = ({ agencyId, agencyData }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDisabledUsers, setShowDisabledUsers] = useState(false);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 50,
  });

  const navigate = useNavigate();


  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await getRequest(`api/Users/GetAdminUsersForAgency?agencyId=${encodeURIComponent(agencyId)}`);
      setData(result);
    } catch (err) {
      setError(ErrorMessages.FETCH_ERROR);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [showDisabledUsers, agencyId]);

  const columns = useMemo(
    () => [
      {
        header: 'Clinician Name',
        accessorKey: 'DisplayName',
      },
      {
        header: 'Role',
        accessorKey: 'Role',
        cell: ({ getValue }) => getValue().split(/(?=[A-Z])/).join(' '),
      },
      {
        header: 'Phone Number',
        accessorKey: 'PhoneNumber',
        cell: ({ getValue }) => {
          const phone = getValue();
          return phone ? phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3') : 'N/A';
        },
      },
      {
        header: 'Email',
        accessorKey: 'Email',

      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <div className="d-flex justify-content-between mb-3">
        <h2>{agencyData.name}</h2>
        <div>
          <button className="btn btn-primary me-2" onClick={() => navigate(`/admin/agency/users/add/${agencyId}`)}>
            Add User
          </button>
          <button className="btn btn-secondary" onClick={() => setShowDisabledUsers(!showDisabledUsers)}>
            {showDisabledUsers ? 'Hide' : 'Show'} Disabled Users
          </button>
        </div>
      </div>
      {data.length === 0 ? (
        <div>No user found.</div>
      ) : (
        <>
          <table className="table table-striped table-bordered">
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : (
                        <div
                          {...{
                            className: header.column.getCanSort() ? 'cursor-pointer select-none' : '',
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: ' 🔼',
                            desc: ' 🔽',
                          }[header.column.getIsSorted()] ?? null}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map(row => (
                <tr key={row.id} onClick={() => navigate(`/admin/agency/edituser/${agencyId}/${row.original.id}`)}>
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination d-flex justify-content-between align-items-center">
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
        </>
      )}
    </div>
  );
};

export default AgencyUsers;