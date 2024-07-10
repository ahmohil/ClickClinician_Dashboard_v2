import React, { useState, useEffect, useMemo } from 'react';
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
import { useNavigate } from 'react-router-dom';

const AgencyServiceRequests = ({ agencyId ,agencyData}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCancelledRequests, setShowCancelledRequests] = useState(false);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const navigate = useNavigate();
  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await getRequest(`api/ServiceRequests/Admin?showCancelled=${showCancelledRequests}&agencyId=${agencyId}`);
      console.log("Fetched data:", result); // Log the fetched data
      setData(result);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(ErrorMessages.FETCH_ERROR);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [showCancelledRequests, agencyId]);

  const columns = useMemo(
    () => [
      {
        header: 'SR Type',
        accessorFn: (row) => `${row.RequestTypeAbbreviation ? `(${row.RequestTypeAbbreviation})` : ''} ${row.RequestTypeName || ''}`,
      },
      {
        header: 'Address',
        accessorFn: (row) => `${row.AddressLine1 || ''} ${row.AddressLine2 || ''}`,
      },
      {
        header: 'Status',
        accessorKey: 'PatientStatus',
      },
      {
        header: 'Accepted By',
        accessorKey: 'AcceptingTherapistName',
      },
      {
        header: 'Priority',
        accessorKey: 'Priority',
      },
      {
        header: 'Created On',
        accessorKey: 'CreatedOn',
        cell: ({ getValue }) => {
          const date = getValue();
          return date ? new Date(date).toLocaleString() : 'Invalid Date';
        },
      },
      {
        header: 'Cancelled',
        accessorKey: 'CancellationReason',
        cell: ({ getValue }) => (getValue() ? '✓' : ''),
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
          <button className="btn btn-primary me-2" onClick={() => navigate(`/admin/agency/requests/add/${agencyId}`, {state: {agencyData: agencyData}})}>
            Post New Service Request
          </button>
          <button className="btn btn-secondary" onClick={() => setShowCancelledRequests(!showCancelledRequests)}>
            {showCancelledRequests ? 'Hide' : 'Show'} Cancelled Requests
          </button>
        </div>
      </div>
      {data.length === 0 ? (
        <div>No service requests found.</div>
      ) : (
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
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {data.length > 0 && (
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
      )}
    </div>
  );
};

export default AgencyServiceRequests;