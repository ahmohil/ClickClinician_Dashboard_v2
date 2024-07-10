const CheckBox = ({ label, value, onChange, uniqueIdentifier, disabled }) => {
	return (
		<div className={`d-flex align-items-start align-items-md-center  gap-1 `}>
			<div className="filter-check">
				<input type="checkbox" checked={value} onChange={onChange} id={uniqueIdentifier ?? value} disabled={disabled} />
			</div>
			<label className={`pointer light-gray-text fs-14 `} htmlFor={uniqueIdentifier ?? value}>
				{label}
			</label>
		</div>
	);
};

export default CheckBox;
