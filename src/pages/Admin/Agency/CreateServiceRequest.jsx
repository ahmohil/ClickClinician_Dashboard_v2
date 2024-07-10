'use strict';

import React, { useState, useEffect } from 'react';
import { Accordion, Row, Col } from 'react-bootstrap';
import { Input, Select, DatePicker, Button } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { states } from '../../../constants/states';
import { getAllUserTypes } from "@services";
import { postRequest } from '../../../api';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';

const { Option } = Select;
const { TextArea } = Input;

const CreateServiceRequest = () => {
  const [request, setRequest] = useState({
    priority: '',
    patientFirstName: '',
    patientLastName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zip: '',
    phoneNumber: '',
    phoneNumberAlt: '',
    certPeriodStart: null,
    specialNotes: '',
    patientDateOfBirth: null,
    patientSex: null,
    requestTypes: [],
  });

  const [isUpdating, setIsUpdating] = useState(false);
  const [userTypes, setUserTypes] = useState([]);
  const location = useLocation();
  const agencyData = location.state?.agencyData;
  const navigate = useNavigate();
  const { agencyId } = useParams();
  useEffect(() => {
    const fetchUserTypes = async () => {
      const types = await getAllUserTypes();
      setUserTypes(types.map(type => ({ value: type.Id, label: type.Name })));
    };
    fetchUserTypes();
  }, []);

  const handleInputChange = (name, value) => {
    setRequest(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    console.log("Request is", request);
    setIsUpdating(true);

    const payload = {
      ...request,
      agencyId: agencyId,
      createdDateTimeUTC: new Date().toISOString(),
      certPeriodStart: request.certPeriodStart ? request.certPeriodStart.toISOString() : null,
      patientDateOfBirth: request.patientDateOfBirth ? request.patientDateOfBirth.toISOString() : null,
    };

    try {
      const response = await postRequest('api/ServiceRequest', payload);
      console.log('Service request created:', response.data);
      navigate(-1);
    } catch (error) {
      console.error('Error creating service request:', error);
      // Handle error (e.g., show error message to user)
    } finally {
      setIsUpdating(false);
    }
  };

  const getCertDeadline = () => {
    if (!request.certPeriodStart) {
      return null;
    }
    return dayjs(request.certPeriodStart).add(60, "days");
  };

  return (
    <div className="request-page pageleftmenu edit-modal-bg">
      <div className="request-bar d-flex justify-content-between align-items-center mt-2">
        <h5 className="title">Create Service Request</h5>
        <h2>{agencyData.name}</h2>
        <div className="request-actions d-flex align-items-center">
          <Button onClick={() => navigate(-1)}>Cancel</Button>
          <Button type="primary" loading={isUpdating} onClick={handleSave}>Create</Button>
        </div>
      </div>

      <div className="container-alignment mt-4">
        <div className="col-md-12">
          <Accordion defaultActiveKey={['0', '1', '2', '3']} alwaysOpen>
            <Row>
              <Col sm={6}>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Service Request</Accordion.Header>
                  <Accordion.Body>
                    <div className="mb-4">
                      <label>Clinician Type</label>
                      <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="Select clinician types"
                        value={request.requestTypes}
                        onChange={(value) => handleInputChange('requestTypes', value)}
                      >
                        {userTypes.map(type => (
                          <Option key={type.value} value={type.value}>{type.label}</Option>
                        ))}
                      </Select>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="priority">Priority</label>
                      <Select
                        style={{ width: '100%' }}
                        value={request.priority}
                        onChange={(value) => handleInputChange('priority', value)}
                      >
                        <Option value="">Select...</Option>
                        <Option value="1 - Today">Today</Option>
                        <Option value="2 - 24 Hours">24 Hours</Option>
                        <Option value="3 - 48 Hours">48 Hours</Option>
                        <Option value="4 - 72 Hours">72 Hours</Option>
                        <Option value="5 - 5 Days">5 Days</Option>
                      </Select>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Col>

              <Col sm={6}>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>Medical</Accordion.Header>
                  <Accordion.Body>
                    <div className="d-flex mb-3 justify-content-between">
                      <div className="flex-grow-1 me-2">
                        <label htmlFor="certPeriodStart">Cert Period Start:</label>
                        <DatePicker
                          style={{ width: '100%' }}
                          value={request.certPeriodStart}
                          onChange={(date) => handleInputChange('certPeriodStart', date)}
                        />
                      </div>
                      <div className="flex-grow-1 ms-2">
                        <label htmlFor="certPeriodEnd">Cert Period End:</label>
                        <DatePicker
                          style={{ width: '100%' }}
                          value={getCertDeadline()}
                          disabled
                        />
                      </div>
                    </div>

                    <div className="d-flex mb-3 justify-content-between">
                      <div className="flex-grow-1 me-2">
                        <label htmlFor="patientDateOfBirth">Date of Birth:</label>
                        <DatePicker
                          style={{ width: '100%' }}
                          value={request.patientDateOfBirth}
                          onChange={(date) => handleInputChange('patientDateOfBirth', date)}
                        />
                      </div>
                      <div className="flex-grow-1 ms-2">
                        <label htmlFor="patientSex">Gender</label>
                        <Select
                          style={{ width: '100%' }}
                          value={request.patientSex}
                          onChange={(value) => handleInputChange('patientSex', value)}
                        >
                          <Option value={null}>Choose...</Option>
                          <Option value={1}>Male</Option>
                          <Option value={0}>Female</Option>
                          <Option value={2}>Other</Option>
                        </Select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="specialNotes">Notes</label>
                      <TextArea
                        rows={3}
                        value={request.specialNotes}
                        onChange={(e) => handleInputChange('specialNotes', e.target.value)}
                        placeholder="Enter special notes"
                      />
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Patient</Accordion.Header>
                  <Accordion.Body>
                    <div className="mb-4">
                      <label htmlFor="patientFirstName" className="d-block fs-md-18 fw-500 mb-2">First Name</label>
                      <Input
                        value={request.patientFirstName}
                        onChange={(e) => handleInputChange('patientFirstName', e.target.value)}
                        placeholder="Enter first name"
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="patientLastName" className="d-block fs-md-18 fw-500 mb-2">Last Name</label>
                      <Input
                        value={request.patientLastName}
                        onChange={(e) => handleInputChange('patientLastName', e.target.value)}
                        placeholder="Enter last name"
                      />
                    </div>
                    <div className="d-flex mb-4 justify-content-between">
                      <div className="flex-grow-1 me-2">
                        <label htmlFor="phoneNumber" className="d-block fs-md-18 fw-500 mb-2">Phone Number</label>
                        <Input
                          value={request.phoneNumber}
                          onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                          placeholder="Enter phone number"
                        />
                      </div>
                      <div className="flex-grow-1 ms-2">
                        <label htmlFor="phoneNumberAlt" className="d-block fs-md-18 fw-500 mb-2">Alt. Phone Number</label>
                        <Input
                          value={request.phoneNumberAlt}
                          onChange={(e) => handleInputChange('phoneNumberAlt', e.target.value)}
                          placeholder="Enter alt. phone number"
                        />
                      </div>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Col>

              <Col md={6}>
                <Accordion.Item eventKey="3">
                  <Accordion.Header>Address</Accordion.Header>
                  <Accordion.Body>
                    <div className="mb-4">
                      <label htmlFor="addressLine1" className="d-block fs-md-18 fw-500 mb-2">Street Address</label>
                      <Input
                        value={request.addressLine1}
                        onChange={(e) => handleInputChange('addressLine1', e.target.value)}
                        placeholder="Enter street address"
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="addressLine2" className="d-block fs-md-18 fw-500 mb-2">Suite/Apt/House Number</label>
                      <Input
                        value={request.addressLine2}
                        onChange={(e) => handleInputChange('addressLine2', e.target.value)}
                        placeholder="Enter suite/apt/house number"
                      />
                    </div>
                    <div className="d-flex mb-4">
                      <div className="flex-grow-1 me-2">
                        <label htmlFor="city" className="d-block fs-md-18 fw-500 mb-2">City</label>
                        <Input
                          value={request.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          placeholder="Enter city"
                        />
                      </div>
                      <div className="flex-grow-1 mx-2">
                        <label htmlFor="state" className="d-block fs-md-18 fw-500 mb-2">State</label>
                        <Select
                          style={{ width: '100%' }}
                          value={request.state}
                          onChange={(value) => handleInputChange('state', value)}
                        >
                          {states.map(state => (
                            <Option key={state.value} value={state.value}>{state.label}</Option>
                          ))}
                        </Select>
                      </div>
                      <div className="flex-grow-1 ms-2">
                        <label htmlFor="zip" className="d-block fs-md-18 fw-500 mb-2">Zip Code</label>
                        <Input
                          value={request.zip}
                          onChange={(e) => handleInputChange('zip', e.target.value)}
                          placeholder="Enter zip code"
                        />
                      </div>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Col>
            </Row>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default CreateServiceRequest;