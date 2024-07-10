import { Fragment, useEffect } from "react";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { isDataExists } from "@utils";

const AutoCompleteInput = ({
	state,
	setState,
	validationErrors,
	setValidationErrors,
	setLocationDetails,
	locationDetails,
	isFormSubmitted = true,
	isRequired = false,
	name,
	icon = undefined,
	iconifyIcon = undefined,
	extraClasses = "",
}) => {
	const handleSelect = async (selectedAddress) => {
		if (!!selectedAddress && isDataExists(selectedAddress)) {
			try {
				const results = await geocodeByAddress(selectedAddress);
				if (isDataExists(results)) {
					setState(results[0].formatted_address);

					const latLng = await getLatLng(results[0]);

					const city = results[0].address_components.find(
						(item) => item.types.includes("locality") || item.types.includes("political")
					)?.long_name;

					// const city = results[0].address_components.find((item) => item.types.includes("locality"))?.long_name;

					const locationState = results[0].address_components.find((item) =>
						item.types.includes("administrative_area_level_1")
					)?.long_name;
					setLocationDetails({
						...locationDetails,
						city,
						state: locationState,
						coordinates: latLng,
					});

					setValidationErrors((prev) => ({ ...prev, [name]: false }));
				}
			} catch (error) {
				// console.error("Error selecting place:", error);
			}
		} else {
			setLocationDetails((prev) => ({ ...prev, coordinates: { lng: 0, lat: 0 } }));
		}
	};

	const searchOptions = {
		// componentRestrictions: { country: "us" },
		// types: ["geocode"],
	};

	useEffect(() => {
		if (isFormSubmitted && isRequired && !!!state) setValidationErrors((prev) => ({ ...prev, [name]: true }));
	}, [isFormSubmitted]);

	return (
		<Fragment>
			{icon && <i className={`icon ${icon}`}></i>}
			<PlacesAutocomplete
				className={` `}
				value={state}
				onChange={setState}
				onSelect={handleSelect}
				searchOptions={searchOptions}>
				{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
					<div className={`custom-dropdown position-relative ${extraClasses}`}>
						<input
							{...getInputProps({
								placeholder: "Enter your location",
								className: "border-0 h-100 w-100",
							})}
							onBlur={(e) => handleSelect(e.target.value)}
						/>
						{loading && <div>Loading...</div>}
						{isDataExists(suggestions) && (
							<div className="autocomplete-dropdown-container custom-menu w-100">
								{suggestions.map((suggestion) => {
									const className = ` pointer  p-2 ${
										suggestion.active ? "suggestion-item--active" : "suggestion-item"
									}`;
									return (
										<div
											{...getSuggestionItemProps(suggestion, {
												className,
											})}
											key={suggestion.placeId}>
											<span>{suggestion.description}</span>
										</div>
									);
								})}
							</div>
						)}
					</div>
				)}
			</PlacesAutocomplete>
			{iconifyIcon && <span className="iconify" data-icon={iconifyIcon}></span>}
			{isFormSubmitted && validationErrors[name] && <div className="error">This field is required</div>}
		</Fragment>
	);
};

export default AutoCompleteInput;
