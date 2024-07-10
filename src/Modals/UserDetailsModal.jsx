import React, { useState, useEffect } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Dropdown, Accordion, Row, Col, Form } from 'react-bootstrap';
import Select from 'react-select';
import { CustomInput, LoadingButton } from '@components'; // Ensure this path is correct
import { getAllUserTypes, getUserDevices, setPassword, updateClinician } from '@services';
import { Switch } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { failureToaster, isDataExists, successToaster } from "@utils";
import { states } from '../constants/states';
import { createSearchParams } from 'react-router-dom';

const UserDetailsModal = ({ selectedUser, discardSelectedUser, onSave, onDelete , edit=false}) => {
	const [editMode, setEditMode] = useState(edit);
	const [userData, setUserData] = useState(selectedUser);
	const [userTypes, setUserTypes] = useState([]);
	const [devices, setDevices] = useState([]);
	const [specialties, setSpecialties] = useState([]);
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [validationErrors, setValidationErrors] = useState({});
	const [passwordValidation, setPasswordValidation] = useState({});
	const [isFormSubmitted, setIsFormSubmitted] = useState(false);
	const [newPassword, setNewPassword] = useState({});
	const [isUpdating, setIsUpdating] = useState(false);

	

	const renderDeviceDetails = () => {
		console.log("Devices are", devices)
		console.log("Selected device id is", userData.selectedDevice)
		const selectedDevice = userData?.selectedDevice?.value
		console.log(selectedDevice)
		if (!selectedDevice) return null;

		return (
			<div className="mt-3">
				<p>Device Added On: {selectedDevice.CreationDate}</p>
				<p>Notifications Setting: {selectedDevice.NotificationsEnabled ? 'ON' : 'OFF'}</p>
				<p>Installed App Version: {selectedDevice.InstalledAppVersion}</p>
				<p>Operating System Version: {selectedDevice.OperatingSystemVersion}</p>
				<p>Filter Enabled: {selectedDevice.FilterEnabled ? 'true' : 'false'}</p>
				<p>Filter Zipcode: {selectedDevice.FilterZipCode}</p>
				<p>Filter Miles: {selectedDevice.FilterRadiusMiles}</p>
			</div>
		);
	};


	useEffect(() => {
		const fetchUserTypes = async () => {
			try {
				const types = await getAllUserTypes();
				setUserTypes(types.map(type => ({ value: type.Id, label: type.Name })));
			} catch (error) {
				console.error("Failed to fetch user types:", error);
			}
		};

		fetchUserTypes();
		// Fetch specialties here and map them to { value, label } format
	}, []);

	useEffect(() => {
		const fetchUserDevices = async () => {
			if (selectedUser.Id) {
				try {
					const userDevices = await getUserDevices(selectedUser.Id);
					console.log("User devices are", userDevices)
					setDevices(userDevices.map(device => ({
						value: device,
						label: `${device.DeviceModel} - ${device.OperatingSystemVersion}`
					})));
				} catch (error) {
					console.error("Failed to fetch user devices:", error);
				}
			}
		};

		fetchUserDevices();
	}, [selectedUser.Id]);

	const handleInputChange = (name, value) => {
		console.log("Name is", name)
		console.log("Value is", value)
		setUserData(prev => ({ ...prev, [name]: value }));
	};

	const handleSelectChange = (name) => (selectedOption) => {
		setUserData(prev => ({ ...prev, [name]: selectedOption }));
	};

	const handleSetPassword = async () => {
		console.log("user is", selectedUser.Id)

		try {
			setIsUpdating(true)
			const password = await setPassword(selectedUser.Id, newPassword.password)
			setIsUpdating(false)
			successToaster("Password Updated Succesfully!")
		}
		catch (err) {
			setIsUpdating(false)
			successToaster("Failed to Update Password!")
		}

	}

	const handleSave = () => {

		// Perform validation here
		
		try {
			setIsFormSubmitted(true);
			console.log(userData)
			console.log(validationErrors)
			if (Object.keys(validationErrors).length === 0) {
				const result = updateClinician(selectedUser.Id, userData)
				setEditMode(false)
				successToaster("Profile Updated Sucesfuly!")
				setEditMode(false);
				console.log(result)
			}
		}
		catch {
			setIsFormSubmitted(false)
			successToaster("Profile Updated Sucesfuly!")
		}

	};

	return (
		<Modal centered show={selectedUser} className="users-details-modals" size="xl" onHide={discardSelectedUser}>
			<Modal.Header closeButton>
				<Modal.Title>Clinician</Modal.Title>
				<div className="ms-auto d-flex align-items-end details-modal-header-btns">
					{editMode ? (
						<>
							<Button variant="secondary" onClick={() => setEditMode(false)} className="me-2">
								Cancel
							</Button>
							<LoadingButton
								isLoading={isUpdating}
								onClick={handleSave}
							>
								Save
							</LoadingButton>
						</>
					) : (
						<Button variant="primary" onClick={() => setEditMode(true)}>
							Edit
						</Button>
					)}
				</div>
			</Modal.Header>
			<div className='edit-modal-bg'>
				<Modal.Body className="position-relative">

					<Accordion defaultActiveKey={['0', '1', '2', '3', '4']} alwaysOpen>
						<Row>
							<Col md={6} >
								<Accordion.Item eventKey="0">
									<Accordion.Header>Basic Information</Accordion.Header>
									<Accordion.Body>
										<div className="mb-4">
											<label htmlFor="DisplayName" className="d-block fs-md-18 fw-500 mb-2">Name</label>
											<CustomInput
												type="text"
												name="DisplayName"
												placeholder="Enter name"
												extraClasses={`modal-input details-modal-input ${!editMode ? "disabled" : ""}`}
												setState={setUserData}
												state={userData}
												isRequired={true}
												
												isFormSubmitted={isFormSubmitted}
												isDisabled={!editMode}
											/>
										</div>
										<div className="mb-4">
											<label htmlFor="Email" className="d-block fs-md-18 fw-500 mb-2">Email</label>
											<CustomInput
												type="email"
												name="Email"
												placeholder="Enter email"
												extraClasses={`modal-input details-modal-input ${!editMode ? "disabled" : ""}`}
												setState={setUserData}
												state={userData}
												isRequired={true}
												setValidationsState={setValidationErrors}
												isFormSubmitted={isFormSubmitted}
												isDisabled={!editMode}
											/>
										</div>
										<div className="mb-4">
											<label htmlFor="PhoneNumber" className="d-block fs-md-18 fw-500 mb-2">Phone Number</label>
											<CustomInput
												type="tel"
												name="PhoneNumber"
												placeholder="Enter phone number"
												extraClasses={`modal-input details-modal-input ${!editMode ? "disabled" : ""}`}
												setState={setUserData}
												state={userData}
												isRequired={true}
												setValidationsState={setValidationErrors}
												isFormSubmitted={isFormSubmitted}
												isDisabled={!editMode}
												isPhoneNumber={true}
											/>
										</div>
									</Accordion.Body>
								</Accordion.Item>

								<Accordion.Item eventKey="1">
									<Accordion.Header>Address</Accordion.Header>
									<Accordion.Body>
										<div className="mb-4">
											<label htmlFor="Address1" className="d-block fs-md-18 fw-500 mb-2">Street Address</label>
											<CustomInput
												type="text"
												name="Address1"
												placeholder="Enter street address"
												extraClasses={`modal-input details-modal-input ${!editMode ? "disabled" : ""}`}
												setState={setUserData}
												state={userData}
												setValidationsState={setValidationErrors}
												isFormSubmitted={isFormSubmitted}
												isDisabled={!editMode}
											/>
										</div>
										<div className="mb-4">
											<label htmlFor="Address2" className="d-block fs-md-18 fw-500 mb-2">Suite/Apt/House Number</label>
											<CustomInput
												type="text"
												name="Address2"
												placeholder="Enter suite/apt/house number"
												extraClasses={`modal-input details-modal-input ${!editMode ? "disabled" : ""}`}
												setState={setUserData}
												state={userData}
												setValidationsState={setValidationErrors}
												isFormSubmitted={isFormSubmitted}
												isDisabled={!editMode}
											/>
										</div>
										<div className="d-flex mb-4">
											<div className="flex-grow-1 me-2">
												<label htmlFor="City" className="d-block fs-md-18 fw-500 mb-2">City</label>
												<CustomInput
													type="text"
													name="City"
													placeholder="Enter city"
													extraClasses={`modal-input details-modal-input ${!editMode ? "disabled" : ""}`}
													setState={setUserData}
													state={userData}
													setValidationsState={setValidationErrors}
													isFormSubmitted={isFormSubmitted}
													isDisabled={!editMode}
												/>
											</div>
											<div className="flex-grow-1 mx-2">
												<label htmlFor="State" className="d-block fs-md-18 fw-500 mb-2">State</label>
												<Select
													options={states}
													value={userData['State']}
													onChange={handleSelectChange('State')}
													isDisabled={!editMode}
													className="default-select-container"
													classNamePrefix="default-select"
												/>
											</div>
											<div className="flex-grow-1 ms-2">
												<label htmlFor="ZipCode" className="d-block fs-md-18 fw-500 mb-2">Zip Code</label>
												<CustomInput
													type="text"
													name="ZipCode"
													extraClasses={`modal-input details-modal-input ${!editMode ? "disabled" : ""}`}
													placeholder="Enter zip code"
													setState={setUserData}
													state={userData}
													setValidationsState={setValidationErrors}
													isFormSubmitted={isFormSubmitted}
													isDisabled={!editMode}
												/>
											</div>
										</div>
									</Accordion.Body>
								</Accordion.Item>
							</Col>

							<Col md={6}>

								<Accordion.Item eventKey="2">
									<Accordion.Header>Speciality</Accordion.Header>
									<Accordion.Body>
										<div className="mb-4">
											<label htmlFor="UserTypeId" className="d-block fs-md-18 fw-500 mb-2">Speciality</label>
											<Select
												options={userTypes}
												value={userTypes.find(type => type.value === userData.UserTypeId)}
												onChange={handleSelectChange('UserTypeId')}
												isDisabled={!editMode}
												className="default-select-container"
												classNamePrefix="default-select"
											/>
										</div>

									</Accordion.Body>
								</Accordion.Item>

								<Accordion.Item eventKey="3">
									<Accordion.Header>Mobile Status</Accordion.Header>
									<Accordion.Body>
										<div className="mb-4">
											<label htmlFor="selectedDevice" className="d-block fs-md-18 fw-500 mb-2">Mobile Devices</label>
											<Select
												options={devices}
												value={devices.find(device => device.value.Id === userData.selectedDevice?.Id)}
												onChange={handleSelectChange('selectedDevice')}
												isDisabled={!editMode}
												className="default-select-container"
												classNamePrefix="default-select"
											/>
										</div>
										{renderDeviceDetails()}
									</Accordion.Body>
								</Accordion.Item>

								<Accordion.Item eventKey="4">
									<Accordion.Header>Change Password</Accordion.Header>
									<Accordion.Body>
										<div className="mb-4 position-relative">
											<>
												<CustomInput
													type={isPasswordVisible ? "text" : "password"}
													name="password"
													placeholder="Enter password"
													extraClasses={`modal-input details-modal-input ${!editMode ? "disabled" : ""}`}
													setState={setNewPassword}
													state={newPassword}
													isRequired={false}
													isFormSubmitted={isFormSubmitted}
													isDisabled={!editMode || isUpdating}
													setValidationsState={setPasswordValidation}
												/>
												<div className="eye-in-modal" onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
													<span className="iconify" data-icon={isPasswordVisible ? "fa-solid:eye-slash" : "fa:eye"}></span>
												</div>
											</>
										</div>
										<div className="mb-4 position-relative">
											<CustomInput
												type={isPasswordVisible ? "text" : "password"}
												name="confirm-password"
												placeholder="Confirm password"
												extraClasses={`modal-input details-modal-input ${!editMode ? "disabled" : ""}`}
												setState={setNewPassword}
												state={newPassword}
												isRequired={false}
												isFormSubmitted={isFormSubmitted}
												isDisabled={!editMode || isUpdating}
												setValidationsState={setPasswordValidation}
											/>
											<div className="eye-in-modal" onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
												<span className="iconify" data-icon={isPasswordVisible ? "fa-solid:eye-slash" : "fa:eye"}></span>
											</div>

											{editMode && (
												<div className="d-flex w-full flex-end">
													{/* <Button variant="primary" className="mt-4 " onClick={handleSetPassword}>Save</Button> */}
													<LoadingButton
														isLoading={isUpdating}
														onClick={handleSetPassword}
													>
														Save
													</LoadingButton>
												</div>
											)}
										</div>
									</Accordion.Body>
								</Accordion.Item>
							</Col>
						</Row>
					</Accordion>

					<div className='clinician-details-switches'>
						<div>
							<label style={{ marginRight: "20px" }}>Is Disabled</label>
							<Switch
								checkedChildren={<CheckOutlined />}
								unCheckedChildren={<CloseOutlined />}
								checked={userData.IsDisabled}
								onChange={(checked) => handleInputChange('IsDisabled', checked)}
								disabled={!editMode}
							/>
						</div>
						<div>
							<label style={{ marginRight: "20px" }}>Notification Enabled</label>
							<Switch
								checkedChildren={<CheckOutlined />}
								unCheckedChildren={<CloseOutlined />}
								checked={!userData.NotificationsDisabled}
								onChange={(checked) => handleInputChange('NotificationsDisabled', !checked)}
								disabled={!editMode}
							/>
						</div>
					</div>

				</Modal.Body>
			</div>
			<Modal.Footer>
				{/* <div className="service-dropdown">
					<Dropdown>
						<Dropdown.Toggle variant="success" id="dropdown-basic">
							<iconify-icon icon="uis:ellipsis-v"></iconify-icon>
						</Dropdown.Toggle>
						<Dropdown.Menu>
							<Dropdown.Item onClick={() => setEditMode(true)}>
								Edit
							</Dropdown.Item>
							<Dropdown.Item as={"div"} className="pointer" onClick={onDelete}>
								Delete
							</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</div>
				{editMode && (
					<>
						<Button variant="secondary" onClick={() => setEditMode(false)}>Cancel</Button>
						<Button variant="primary" onClick={handleSave}>Save</Button>
					</>
				)} */}
			</Modal.Footer>
		</Modal >
	);
};

export default UserDetailsModal;