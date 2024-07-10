import { Fragment, useState } from "react";
import { TEXT_CHARACTER_LIMIT } from "@constants";
import { isDataExists } from "@utils";

const TextLessMore = ({ text, maxCharacters }) => {
	const [showFullText, setShowFullText] = useState(false);
	const characterLimit = maxCharacters || TEXT_CHARACTER_LIMIT;

	const toggleFullText = () => setShowFullText(!showFullText);

	return (
		<Fragment>
			{isDataExists(text) && text.length <= characterLimit && <span>{text}</span>}
			{isDataExists(text) && text.length > characterLimit && (
				<Fragment>
					<div className="mb-2">
						{text.slice(0, characterLimit)}
						{showFullText && <span>{text.slice(characterLimit, text.length)}</span>}
						{!showFullText && "..."}
					</div>
					<a className="fs-md-18 default-text fw-600 pointer" onClick={toggleFullText}>
						{showFullText && "Show less"}
						{!showFullText && "Read More"}
					</a>
				</Fragment>
			)}
		</Fragment>
	);
};

export default TextLessMore;
