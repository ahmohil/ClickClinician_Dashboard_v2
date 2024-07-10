import { useEffect, useState, useMemo } from "react";
import { getServiceRequests } from "@services";
import { failureToaster, isDataExists } from "@utils";
import { NoData, Loader } from "@components";
// import { ServiceDetailsModal } from "@modals";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from '@tanstack/react-table';
import { Link, useNavigate } from "react-router-dom";

const AllServiceRequests = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [services, setServices] = useState([]);
  const [isRendering, setIsRendering] = useState(false);
  const [globalFilter, setGlobalFilter] = useState('');
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const navigate = useNavigate();

  const columns = useMemo(
    () => [
      {
        header: 'SR Type',
        accessorKey: 'RequestTypeName',
      },
      {
        header: 'Agency',
        accessorKey: 'Agency',
      },
      {
        header: 'Address',
        accessorFn: (row) => `${row.AddressLine1}${row.AddressLine2 ? ', ' + row.AddressLine2 : ''}`,
      },
      {
        header: 'Status',
        accessorKey: 'PatientStatus',
        cell: ({ getValue }) => (
          <span className={`text-capitalize ${getValue() === "Accepted" ? "success-text" : "error-text"}`}>
            {getValue()}
          </span>
        ),
      },
      {
        header: 'Accepted By',
        accessorKey: 'AcceptingTherapistName',
        cell: ({ getValue }) => getValue() || 'N/A',
      },
      {
        header: 'Priority',
        accessorKey: 'Priority',
      },
      {
        header: 'Created On',
        accessorKey: 'CreatedOn',
        cell: ({ getValue }) => new Date(getValue()).toLocaleDateString(),
      },
      {
        id: 'actions',
        header: 'Action',
        cell: ({ row }) => (
          <div className="d-flex gap-3">
            <Link className="fs-22 default-text pointer" to ={`/admin/service-requests/details/${row.original.Id}`}>
              <span className="iconify" data-icon="carbon:view"></span>
            </Link>
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: services,
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
    pageCount: Math.ceil(services.length / pagination.pageSize),
  });

  useEffect(() => {
    getServicesData();
  }, []);

  const getServicesData = async () => {
    setIsRendering(true);
    try {
      const result = await getServiceRequests({
        "includedCanceled": "true"
      });
      setServices(result);
      setIsRendering(false);
    } catch (error) {
      failureToaster(error.message);
      setIsRendering(false);
    }
  };

  return (
    <div className="">
      <div className="card-box mb-md-4 flex">
        <h3 className="fs-md-24 fw-700 mb-0 flex-1">All Service Requests</h3>
        <input
          type="text"
          className="form-control flex-2"
          placeholder="Search by SR Type, Agency, or Address"
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
      {/* {!!selectedService && (
        <ServiceDetailsModal selectedService={selectedService} discardSelectedService={() => setSelectedService(null)} />
      )} */}
    </div>
  );
};

export default AllServiceRequests;