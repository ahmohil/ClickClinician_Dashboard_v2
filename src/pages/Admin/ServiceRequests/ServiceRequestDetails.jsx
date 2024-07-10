import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Table, Button, Input, Typography, Row, Col, Card, Spin } from 'antd';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from '@tanstack/react-table';
import { getRequest } from '../../../api';
import { useNavigate } from 'react-router-dom';

const { Text, Title } = Typography;

const ServiceRequestDetails = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { requestId } = useParams();
  const [globalFilter, setGlobalFilter] = useState('');
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [details, setDetails] = useState(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await getRequest(`/api/ServiceRequest/GetDistributionUserList?requestId=${requestId}`);
      setData(response);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [requestId]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await getRequest(`/api/ServiceRequest?requestId=${requestId}`);
        setDetails(response);
      } catch (error) {
        console.error('Error fetching service request details:', error);
      }
    };

    fetchDetails();
  }, [requestId]);

  const resendNotification = (therapistId) => {
    // Dummy function for resending notification
    console.log(`Resending notification to therapist: ${therapistId}`);
  };

  const columns = useMemo(
    () => [
      {
        header: 'Therapist',
        accessorKey: 'DisplayName',
      },
      {
        header: 'Status',
        accessorKey: 'Status',
        cell: ({ getValue }) => {
          const statuses = getValue();
          if (!statuses || statuses.length === 0) return 'No status';
          // const latestStatus = statuses[statuses.length - 1];
          // return `${new Date(latestStatus.Date).toLocaleString()} - ${latestStatus.Status}`;
          return  <div >
            {statuses.map((status) => <div>{new Date(status.Date).toLocaleString()} - {status.Status}</div>)}
          </div>
        },
      },
      {
        header: 'Send Notification',
        accessorKey: 'TherapistId',
        cell: ({ row }) => (
          <button
            className={`btn ${row.original.CanReceiveNotification ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => row.original.CanReceiveNotification && resendNotification(row.original.TherapistId)}
            disabled={!row.original.CanReceiveNotification}
            style={{ 
              width: "200px",
              opacity: row.original.CanReceiveNotification ? 1 : 0.5
            }}
          >
            {row.original.CanReceiveNotification ? 'Resend Notification' : 'Notifications Disabled'}
          </button>
        ),
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
    state: {
      pagination,
      globalFilter,
    },
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    pageCount: Math.ceil(data.length / pagination.pageSize),
  });

  if (loading) return <Spin fullscreen="true" size="large" />;

  return (
    <>
      <div style={{ padding: '20px' }}>
        <Title level={4} style={{ color: '#1890ff', marginBottom: '20px' }}>
          Service Request Notification Details
          <Button type="link" style={{ float: 'right' }} onClick={()=> navigate(-1)}>
            Back
          </Button>
        </Title>
        {details && (
          <Row gutter={16}>
            <Col span={12}>
              <Card>
                <Row>
                  <Col span={8}><Text strong>Specialty:</Text></Col>
                  <Col span={16}><Text>{details.RequestType.Specialty.Name} Therapist</Text></Col>
                </Row>
                <Row>
                  <Col span={8}><Text strong>Agency:</Text></Col>
                  <Col span={16}><Text>{details.HomeHealthAgency || 'N/A'}</Text></Col>
                </Row>
                <Row>
                  <Col span={8}><Text strong>Accepted By:</Text></Col>
                  <Col span={16}><Text>{details.AcceptingTherapistName || 'N/A'}</Text></Col>
                </Row>
              </Card>
            </Col>
            <Col span={12}>
              <Card>
                <Row>
                  <Col span={8}><Text strong>Address:</Text></Col>
                  <Col span={16}><Text>{`${details.AddressLine1}${details.AddressLine2 ? ', ' + details.AddressLine2 : ''}`}</Text></Col>
                </Row>
                <Row>
                  <Col span={8}><Text strong>Status:</Text></Col>
                  <Col span={16}><Text>{details.PatientStatus || 'Posted'}</Text></Col>
                </Row>
                <Row>
                  <Col span={8}><Text strong>Priority:</Text></Col>
                  <Col span={16}><Text>{details.Priority}</Text></Col>
                </Row>
                <Row>
                  <Col span={8}><Text strong>Created On:</Text></Col>
                  <Col span={16}><Text>{new Date(details.CreatedOn).toLocaleString()}</Text></Col>
                </Row>
              </Card>
            </Col>
          </Row>
        )}
      </div>
      <div>
        <Input.Search
          placeholder="Search therapists..."
          onChange={(e) => setGlobalFilter(e.target.value)}
          style={{ marginBottom: 16 }}
        />
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
      </div>
    </>
  );
};

export default ServiceRequestDetails;