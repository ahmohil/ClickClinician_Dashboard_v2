// import React from 'react';

// const EditAgencyInfo = ({ agencyData }) => {
//   // Implement the edit agency info form here
//   return (
//     <div>
//       <h3>Edit Agency Info</h3>
//       {/* Add your form implementation here */}
//     </div>
//   );
// };

// export default EditAgencyInfo;


import React, { useState, useEffect } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Dropdown, Accordion, Row, Col, Form } from 'react-bootstrap';
import Select from 'react-select';
import { CustomInput, LoadingButton } from '@components'; // Ensure this path is correct
import { getAllUserTypes, getUserDevices, setPassword, updateClinician } from '@services';
import { Switch } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { failureToaster, isDataExists, successToaster } from "@utils";
import { createSearchParams } from 'react-router-dom';
import {getRequest, postRequest, putRequest} from "../../api";

const EditAgencyInfo = ({ agencyId, agencyData }) => {
  const [editMode, setEditMode] = useState(true);
  const [userData, setUserData] = useState(agencyData);
  const [devices, setDevices] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const states = [
    { label: "Alabama", value: "AL" },
    { label: "Alaska", value: "AK" },
    { label: "Arizona", value: "AZ" },
    { label: "Arkansas", value: "AR" },
    { label: "California", value: "CA" },
    { label: "Colorado", value: "CO" },
    { label: "Connecticut", value: "CT" },
    { label: "Delaware", value: "DE" },
    { label: "Florida", value: "FL" },
    { label: "Georgia", value: "GA" },
    { label: "Hawaii", value: "HI" },
    { label: "Idaho", value: "ID" },
    { label: "Illinois", value: "IL" },
    { label: "Indiana", value: "IN" },
    { label: "Iowa", value: "IA" },
    { label: "Kansas", value: "KS" },
    { label: "Kentucky", value: "KY" },
    { label: "Louisiana", value: "LA" },
    { label: "Maine", value: "ME" },
    { label: "Maryland", value: "MD" },
    { label: "Massachusetts", value: "MA" },
    { label: "Michigan", value: "MI" },
    { label: "Minnesota", value: "MN" },
    { label: "Mississippi", value: "MS" },
    { label: "Missouri", value: "MO" },
    { label: "Montana", value: "MT" },
    { label: "Nebraska", value: "NE" },
    { label: "Nevada", value: "NV" },
    { label: "New Hampshire", value: "NH" },
    { label: "New Jersey", value: "NJ" },
    { label: "New Mexico", value: "NM" },
    { label: "New York", value: "NY" },
    { label: "North Carolina", value: "NC" },
    { label: "North Dakota", value: "ND" },
    { label: "Ohio", value: "OH" },
    { label: "Oklahoma", value: "OK" },
    { label: "Oregon", value: "OR" },
    { label: "Pennsylvania", value: "PA" },
    { label: "Rhode Island", value: "RI" },
    { label: "South Carolina", value: "SC" },
    { label: "South Dakota", value: "SD" },
    { label: "Tennessee", value: "TN" },
    { label: "Texas", value: "TX" },
    { label: "Utah", value: "UT" },
    { label: "Vermont", value: "VT" },
    { label: "Virginia", value: "VA" },
    { label: "Washington", value: "WA" },
    { label: "West Virginia", value: "WV" },
    { label: "Wisconsin", value: "WI" },
    { label: "Wyoming", value: "WY" }
  ];

  const fetchData = async() => {
    try{
      const data = await getRequest(`api/Agency/GetAgency?agencyId=${agencyId}`)
      console.log(data)
      setUserData(data)
    }catch(error){
      failureToaster("Something went wrong!")
    }
  }


  const handleInputChange = (name, value) => {
    console.log("Name is", name)
    console.log("Value is", value)
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name) => (selectedOption) => {
    setUserData(prev => ({ ...prev, [name]: selectedOption }));
  };

  const handleSave = async () => {
    // Perform validation here
    try {
      setIsFormSubmitted(true);
      console.log(userData);
      console.log(validationErrors);
  
      // Construct the URL
      let url = `api/Agency/Update?`;
      if (agencyId !== undefined && agencyId !== null) {
        url += `id=${encodeURIComponent(agencyId)}`;
      }
      url = url.replace(/[?&]$/, "");
  
  
      // Make the API call
      const response = await putRequest(url,JSON.stringify(userData));
      setEditMode(false);
      successToaster("Profile Updated Successfully!");
      console.log(response);
    } catch (error) {
      console.log(" error is ==>", error)
      setIsFormSubmitted(false);
      failureToaster("Error updating profile: " + error.message);
    }
  };


  useEffect(() => {
    fetchData()
  },[])

  return (
    <>


      <div className='d-flex justify-content-between mb-4 align-items-center'>

        <div>
          <label style={{ marginRight: "20px" }}>Is Active</label>
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            checked={userData.Status == "Active" ? true: false}
            onChange={(checked) => handleInputChange('Status', !checked ? "Inactive": "Active")}
            disabled={!editMode}
          />
        </div>
        <div>
          <LoadingButton
            isLoading={isUpdating}
            onClick={handleSave}
          >
            Save
          </LoadingButton>
        </div>

      </div>

      <Accordion defaultActiveKey={['0', '1', '2', '3', '4']} alwaysOpen>
        <Row>
          <Col md={6} >
            <Accordion.Item eventKey="0">
              <Accordion.Header>Basic Information</Accordion.Header>
              <Accordion.Body>
                <div className="mb-4">
                  <label htmlFor="Name" className="d-block fs-md-18 fw-500 mb-2">Name</label>
                  <CustomInput
                    type="text"
                    name="Name"
                    placeholder="Enter name"
                    extraClasses={`custom-input details-modal-input ${!editMode ? "disabled" : ""}`}
                    setState={setUserData}
                    state={userData}
                    isRequired={true}
                    isFormSubmitted={isFormSubmitted}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="MainContact" className="d-block fs-md-18 fw-500 mb-2">Main Contact</label>
                  <CustomInput
                    type="text"
                    name="MainContact"
                    placeholder="Enter main contact name"
                    extraClasses={`custom-input details-modal-input ${!editMode ? "disabled" : ""}`}
                    setState={setUserData}
                    state={userData}
                    isRequired={true}
                    setValidationsState={setValidationErrors}
                    isFormSubmitted={isFormSubmitted}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="PhoneNumber" className="d-block fs-md-18 fw-500 mb-2">Phone Number</label>
                  <CustomInput
                    type="text"
                    name="PhoneNumber"
                    placeholder="Enter phone number"
                    extraClasses={`custom-input details-modal-input ${!editMode ? "disabled" : ""}`}
                    setState={setUserData}
                    state={userData}
                    isRequired={true}
                    setValidationsState={setValidationErrors}
                    isFormSubmitted={isFormSubmitted}
                    isPhoneNumber={true}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="Fax" className="d-block fs-md-18 fw-500 mb-2">Fax</label>
                  <CustomInput
                    type="text"
                    name="Fax"
                    placeholder="Enter Fax"
                    extraClasses={`custom-input details-modal-input ${!editMode ? "disabled" : ""}`}
                    setState={setUserData}
                    state={userData}
                    
                    setValidationsState={setValidationErrors}
                    isFormSubmitted={isFormSubmitted}
                    isPhoneNumber={true}
                  />
                </div>

              </Accordion.Body>
            </Accordion.Item>

          </Col>
          <Col md={6}>

            <Accordion.Item eventKey="1">
              <Accordion.Header>Address</Accordion.Header>
              <Accordion.Body>
                <div className="mb-4">
                  <label htmlFor="AddressLine1" className="d-block fs-md-18 fw-500 mb-2">Street Address</label>
                  <CustomInput
                    type="text"
                    name="AddressLine1"
                    placeholder="Enter street address"
                    extraClasses={`custom-input details-modal-input ${!editMode ? "disabled" : ""}`}
                    setState={setUserData}
                    state={userData}
                    setValidationsState={setValidationErrors}
                    isFormSubmitted={isFormSubmitted}

                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="AddressLine2" className="d-block fs-md-18 fw-500 mb-2">Suite/Apt/House Number</label>
                  <CustomInput
                    type="text"
                    name="AddressLine2"
                    placeholder="Enter suite/apt/house number"
                    extraClasses={`custom-input details-modal-input ${!editMode ? "disabled" : ""}`}
                    setState={setUserData}
                    state={userData}
                    setValidationsState={setValidationErrors}
                    isFormSubmitted={isFormSubmitted}

                  />
                </div>
                <div className="d-flex mb-4">
                  <div className="flex-grow-1 me-2">
                    <label htmlFor="City" className="d-block fs-md-18 fw-500 mb-2">City</label>
                    <CustomInput
                      type="text"
                      name="City"
                      placeholder="Enter city"
                      extraClasses={`custom-input details-modal-input ${!editMode ? "disabled" : ""}`}
                      setState={setUserData}
                      state={userData}
                      setValidationsState={setValidationErrors}
                      isFormSubmitted={isFormSubmitted}

                    />
                  </div>
                  <div className="flex-grow-1 mx-2">
                    <label htmlFor="State" className="d-block fs-md-18 fw-500 mb-2">State</label>
                    <Select
                      options={states}
                      value={userData['State']}
                      onChange={handleSelectChange('State')}

                      className="default-select-container"
                      classNamePrefix="default-select"
                    />
                  </div>
                  <div className="flex-grow-1 ms-2">
                    <label htmlFor="Zip" className="d-block fs-md-18 fw-500 mb-2">Zip Code</label>
                    <CustomInput
                      type="text"
                      name="Zip"
                      extraClasses={`custom-input details-modal-input ${!editMode ? "disabled" : ""}`}
                      placeholder="Enter zip code"
                      setState={setUserData}
                      state={userData}
                      setValidationsState={setValidationErrors}
                      isFormSubmitted={isFormSubmitted}

                    />
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Col>

        </Row>
      </Accordion>



    </>
  );
};

export default EditAgencyInfo;