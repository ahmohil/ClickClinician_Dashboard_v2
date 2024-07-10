import React from "react";

const Input = (props) => {
	const { type, style, icon, placeholder, value, onChange, className, iconImg } = props;

	return (
		<>
			{icon && <i className={`icon ${icon}`}></i>}
			<input type={type} placeholder={placeholder} value={value} onChange={onChange} className={`${className}`} style={style} />
			{iconImg && <span className="iconify" data-icon={iconImg}></span>}
		</>
	);
};

export default Input;
