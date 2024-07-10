import Slider from "rc-slider";
import { Fragment, useEffect, useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { CheckBox, CustomInput } from "@components";
import Modal from "react-bootstrap/Modal";

import {
	AgeCategories,
	DefaultOption,
	ParticipantLevelOptions,
	EnvironmentTypeOptions,
	ExperienceOptions,
	RestRoomAccessOptions,
	CertificationsOptions,
	LanguagesOptions,
	SessionPreferenceOptions,
} from "@constants";
import { DeliveryModeOptions } from "../constants/services";

import { isDataExists } from "@utils";
import { useLocation } from "react-router-dom";
import { Button } from "../components";

const AllLanguagesOptions = LanguagesOptions.map((item) => ({
	...item,
	isChecked: false,
}));

const FilterMenuWidth = { width: "75%" };

const defaultFiltersBody = {
	radius: 0,
	sessionPreference: [],
	deliveryMode: [],
	participantLevel: [],
	environmentType: [],
	ageFactors: [],
	restRoomAccess: [],
	experience: [],
	certifications: [],
	languages: [],
	minPrice: 0,
	maxPrice: 0,
	maxGroup: 0,
};

const defaultBody = {
	radius: 0,
	minPrice: 0,
	maxPrice: 0,
	maxGroup: 0,
};

const ServiceFiltersModal = ({
	setIsFilterMenuOpen,
	isFilterMenuOpen,
	setServiceFilters,
	UserStore,
	show,
	reset,
	setShow,
	setReset,
}) => {
	const location = useLocation();

	const [body, setBody] = useState(defaultBody);
	const [langInput, setLangInput] = useState(false);
	const [suggestedLanguage, setSuggestedLanguage] = useState("");
	const [sessionPreference, setSessionPreference] = useState([]);
	const [deliveryMode, setDeliveryMode] = useState([]);
	const [participantLevel, setParticipantLevel] = useState([]);
	const [environmentType, setEnvironmentType] = useState([]);
	const [language, setLanguage] = useState([]);
	const [certification, setCertification] = useState([]);
	const [experience, setExperience] = useState([]);
	const [restRoom, setRestRoom] = useState([]);
	const [ageGroup, setAgeGroup] = useState([]);

	const [languageOptions, setLanguageOptions] = useState(AllLanguagesOptions);

	const Thumb_Style = { left: `calc(${body.radius}% - 50px)` };

	const resetFilters = () => {
		setIsFilterMenuOpen(false);
		setSessionPreference([]);
		setDeliveryMode([]);
		setParticipantLevel([]);
		setEnvironmentType([]);
		setAgeGroup([]);
		setRestRoom([]);
		setExperience([]);
		setLanguage([]);
		setCertification([]);
		setBody(defaultBody);
		setSuggestedLanguage("");
		setLangInput(false);
		setLanguageOptions(AllLanguagesOptions);
		setServiceFilters(defaultFiltersBody);
		setShow(false);
		setReset(false);
	};

	const handleItemExistence = (value, array) => {
		const shallowCopy = [...array];

		if (shallowCopy.includes(value)) {
			const index = shallowCopy.findIndex((item) => item === value);
			shallowCopy.splice(index, 1);
		} else shallowCopy.push(value);

		return shallowCopy;
	};

	const handleFilterCheckBoxChange = (value, key) => {
		switch (key) {
			case "sessionPreference": {
				setSessionPreference(handleItemExistence(value, sessionPreference));

				break;
			}

			case "deliveryMode": {
				setDeliveryMode(handleItemExistence(value, deliveryMode));

				break;
			}

			case "participantLevel": {
				setParticipantLevel(handleItemExistence(value, participantLevel));

				break;
			}

			case "environmentType": {
				setEnvironmentType(handleItemExistence(value, environmentType));

				break;
			}

			case "age-group": {
				setAgeGroup(handleItemExistence(value, ageGroup));

				break;
			}

			case "restRoom": {
				setRestRoom(handleItemExistence(value, restRoom));

				break;
			}

			case "experience": {
				setExperience(handleItemExistence(value, experience));

				break;
			}

			case "certification": {
				setCertification(handleItemExistence(value, certification));

				break;
			}

			default:
				break;
		}
	};

	const handleLanguage = (value) =>
		setLanguageOptions((prevLanguageOptions) =>
			prevLanguageOptions.map((item) => (item.value === value ? { ...item, isChecked: !item.isChecked } : item))
		);

	const addLanguage = () => {
		const lang = suggestedLanguage.toLowerCase();
		const capitalizedLabel = lang.charAt(0).toUpperCase() + lang.slice(1);

		let newLang = {
			label: capitalizedLabel,
			value: lang,
			isChecked: true,
		};

		setLanguageOptions((prevLanguageOptions) => [...prevLanguageOptions, newLang]);

		setSuggestedLanguage("");
		setLangInput(false);
	};

	const applyFilters = () => {
		let payload = {
			...body,
			sessionPreference: sessionPreference,
			deliveryMode: deliveryMode,
			participantLevel: participantLevel,
			environmentType: environmentType,
			ageFactors: ageGroup,
			restRoomAccess: restRoom,
			experience: experience,
			languages: language,
			certification: certification,
		};

		setServiceFilters(payload);
		setIsFilterMenuOpen(false);
		setShow(false);
	};

	useEffect(() => {
		const checkedLanguages = languageOptions.filter((option) => option.isChecked);
		setLanguage(checkedLanguages.map((option) => option.value));
	}, [languageOptions]);
	useEffect(() => {
		if (reset) {
			resetFilters();
		}
	}, [reset]);

	return (
		<>
			<Modal size="lg" className="filters-modals" show={show} onHide={() => setShow(false)}>
				<Modal.Header className="border-0" closeButton>
					<Modal.Title>
						<div className="fs-32 fw-500 dark-gray-text">Filters</div>
					</Modal.Title>
				</Modal.Header>
				<Modal.Body className="space-pad">
					{" "}
					{/* {UserStore.loggedInUser && (
						<>
							<div className="my-3 fw-700 dark-gray-text mb-2 pb-4">Search Radius</div>

							<div className="filter-bar position-relative mb-4">
								<Slider
									min={0}
									max={100}
									value={body.radius}
									onChange={(e) =>
										setBody({
											...body,
											radius: e,
										})
									}
								/>

								<div className="thumb" style={Thumb_Style}>
									{body.radius} miles
								</div>
							</div>
						</>
					)} */}
					<div>
						<div className="dark-gray-text fw-700 ">Session Preference:</div>
						<div className="vertically-centered flex-wrap gap-3 my-4">
							{SessionPreferenceOptions?.map((option, i) => (
								<CheckBox
									label={option.label}
									key={option.value}
									onChange={() => handleFilterCheckBoxChange(option.value, "sessionPreference")}
									value={!!sessionPreference && sessionPreference.includes(option.value)}
									uniqueIdentifier={`sessionPreference-${i}`}
								/>
							))}
						</div>
					</div>
					<div>
						<div className="dark-gray-text fw-700 ">Delivery Mode</div>
						<div className="vertically-centered flex-wrap gap-3 my-4">
							{DeliveryModeOptions?.map((option, i) => (
								<CheckBox
									label={option.label}
									key={option.value}
									value={!!deliveryMode && deliveryMode.includes(option.value)}
									onChange={() => handleFilterCheckBoxChange(option.value, "deliveryMode")}
									uniqueIdentifier={`deliveryMode-${i}`}
								/>
							))}
						</div>
					</div>
					<div>
						<div className="dark-gray-text fw-700 ">Participant Level</div>
						<div className="vertically-centered flex-wrap gap-3 my-4">
							{ParticipantLevelOptions?.map((option, i) => (
								<CheckBox
									label={option.label}
									key={option.value}
									onChange={() => handleFilterCheckBoxChange(option.value, "participantLevel")}
									value={participantLevel.includes(option.value)}
									uniqueIdentifier={`participantLevel-${i}`}
								/>
							))}
						</div>
					</div>
					<div className="dark-gray-text fw-700 ">Environment Type</div>
					<div className="vertically-centered flex-wrap gap-3 my-4">
						{EnvironmentTypeOptions?.map((option, i) => (
							<CheckBox
								key={option.value}
								label={option.label}
								onChange={() => handleFilterCheckBoxChange(option.value, "environmentType")}
								value={environmentType.includes(option.value)}
								uniqueIdentifier={`environmentType-${i}`}
							/>
						))}
					</div>
					<div className="dark-gray-text fw-700 "> Age-Group</div>
					<div className="d-flex flex-wrap gap-2 my-4">
						{AgeCategories?.map((option, i) => (
							<CheckBox
								key={option.value}
								label={option.label}
								onChange={() => handleFilterCheckBoxChange(option.value, "age-group")}
								value={ageGroup.includes(option.value)}
								uniqueIdentifier={`age-${i}`}
							/>
						))}
					</div>
					<div className="dark-gray-text fw-700 ">Restroom</div>
					<div className="d-flex flex-wrap gap-2 my-4">
						{[DefaultOption, ...RestRoomAccessOptions]?.map((option, i) => (
							<CheckBox
								key={option.value}
								label={option.label}
								onChange={() => handleFilterCheckBoxChange(option.value, "restRoom")}
								uniqueIdentifier={`restRoom-${i}`}
								value={restRoom.includes(option.value) || restRoom.includes("all")}
								disabled={restRoom.includes("all") && option.value !== "all"}
							/>
						))}
					</div>
					<div className="dark-gray-text fw-700 ">Experience</div>
					<div className="vertically-centered flex-wrap gap-3 my-4">
						{[DefaultOption, ...ExperienceOptions]?.map((option, i) => (
							<CheckBox
								key={option.value}
								label={option.label}
								onChange={() => handleFilterCheckBoxChange(option.value, "experience")}
								uniqueIdentifier={`experience-${i}`}
								value={experience.includes(option.value) || experience.includes("all")}
								disabled={experience.includes("all") && option.value !== "all"}
							/>
						))}
					</div>
					<div className="dark-gray-text fw-700 ">Certifications</div>
					<div className="vertically-centered flex-wrap gap-3 my-4">
						{[DefaultOption, ...CertificationsOptions]?.map((option, i) => (
							<CheckBox
								key={option.value}
								label={option.label}
								onChange={() => handleFilterCheckBoxChange(option.value, "certification")}
								uniqueIdentifier={`certification-${i}`}
								value={certification.includes(option.value) || certification.includes("all")}
								disabled={certification.includes("all") && option.value !== "all"}
							/>
						))}
					</div>
					<div className="dark-gray-text fw-700 ">Languages</div>
					<div className="d-flex align-items-center flex-wrap gap-1 my-4">
						{languageOptions.map((item, index) => (
							<div
								className={` ${item.isChecked ? "language-blue" : ""} language-btn pointer`}
								key={index}
								onClick={() => handleLanguage(item.value)}>
								<span>{item.label}</span>
							</div>
						))}

						<div
							className={`language-btn mw-170  pointer ${langInput ? "language-gray" : ""}`}
							onClick={() => setLangInput(true)}>
							Suggest other
						</div>
					</div>
					<div className="row my-4">
						{langInput && (
							<Fragment>
								<div className="col-md-6">
									<div className="min-input">
										<input
											type="text"
											placeholder="Enter Language"
											value={suggestedLanguage}
											onChange={(e) => setSuggestedLanguage(e.target.value)}
										/>
									</div>
								</div>
								<div className="col-md-4 ">
									<button
										className="near-btn mw-211 br-100"
										disabled={!isDataExists(suggestedLanguage.trim())}
										onClick={addLanguage}>
										Add{" "}
									</button>
								</div>
							</Fragment>
						)}
					</div>
					<div className="dark-gray-text fw-700 mb-3 pb-4 ">Price</div>
					<div className="second-sliders position-relative">
						<Slider
							range
							min={0}
							max={10000}
							value={[body.minPrice, body.maxPrice]}
							onChange={(e) =>
								setBody({
									...body,
									minPrice: e[0],
									maxPrice: e[1],
								})
							}
						/>
						<div className="thumb thumb-fixed">
							${body.minPrice} - ${body.maxPrice}
						</div>
					</div>
					<div className="row my-5">
						<div className="col-lg-4">
							<div className="dark-gray-text fw-700 mb-2">Minimum Value</div>

							<div className="min-input">
								<CustomInput
									placeholder="Enter min price"
									state={body}
									setState={setBody}
									isNumericOnly={true}
									name={"minPrice"}
								/>
							</div>
						</div>
						<div className="col-lg-4 mt-3 mt-lg-0">
							<div className="dark-gray-text fw-700 mb-2">Maximum Value</div>

							<div className="min-input">
								<CustomInput
									placeholder="Enter Max Price"
									state={body}
									setState={setBody}
									isNumericOnly={true}
									name={"maxPrice"}
								/>
							</div>
						</div>

						<div className="col-lg-4 mt-3 mt-lg-0">
							<div className="dark-gray-text fw-700 mb-2">Maximum Group Size</div>
							<div className="min-input position-relative">
								<CustomInput
									placeholder="Enter Max Participants"
									state={body}
									setState={setBody}
									isNumericOnly={true}
									name={"maxGroup"}
								/>
							</div>
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer className="justify-content-between">
					<Button
						onClick={resetFilters}
						text="Reset Filters"
						className="mw-211 br-100 primary-btn bg-danger border-0 fs-16 fs-md-handle"
					/>
					<Button
						onClick={applyFilters}
						text="Apply Filters"
						className="primary-btn fs-md-handle mw-211 br-100 fs-16"
					/>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default ServiceFiltersModal;
