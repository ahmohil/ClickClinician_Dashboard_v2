import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, Row, Col, Typography } from 'antd';
import { FileSearchOutlined, UserOutlined, EditOutlined } from '@ant-design/icons';
import AgencyServiceRequests from './AgencyServiceRequests';
import AgencyUsers from './AgencyUsers';
import EditAgencyInfo from './EditAgencyInfo';
import { useLocation } from 'react-router-dom';

const { TabPane } = Tabs;
const { Title } = Typography;

const AgencyDetails = () => {

  // const [agencyData, setAgencyData] = useState(null);
  const location = useLocation();
  console.log("Location is", location)
  const { agency_id } = useParams();
  const searchParams = new URLSearchParams(location.search);
  const encodedData = searchParams.get('data');
  const agencyData = encodedData ? {name: JSON.parse(decodeURIComponent(encodedData))} : null;


  if (!agencyData) return <div>Loading...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <Row gutter={24}>
        <Col span={24}>
          <Tabs defaultActiveKey="1" style={{ width: '100%' }}>
            <TabPane
              tab={
                <span className='d-flex '>
                  <FileSearchOutlined className='me-2'/>
                  Agency Service Requests
                </span>
              }
              key="1"
            >
              <AgencyServiceRequests agencyId={agency_id} agencyData={agencyData} />
            </TabPane>
            <TabPane
              tab={
                <span>
                  <UserOutlined className='me-2'/>
                  Agency Users
                </span>
              }
              key="2"
            >
              <AgencyUsers agencyId={agency_id} agencyData={agencyData} />
            </TabPane>
            <TabPane
              tab={
                <span>
                  <EditOutlined className='me-2'/>
                  Edit Agency Info
                </span>
              }
              key="3"
            >
              <EditAgencyInfo agencyData={agencyData} agencyId={agency_id}/>
            </TabPane>
          </Tabs>
        </Col>
        {/* <Col span={12}>
          <Title level={2} style={{ marginTop: '8px', marginLeft:'20px' }}>{agencyData.name}</Title>
        </Col> */}
      </Row>
    </div>
  );
};

export default AgencyDetails;