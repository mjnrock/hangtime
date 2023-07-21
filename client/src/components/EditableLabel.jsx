import { useState, useEffect, useRef } from "react";

export const EditableLabel = ({ initialValue, onBlur, onChange, ...props }) => {
	const { inputClassName, labelClassName } = props;
	const [ isEditing, setIsEditing ] = useState(false);
	const [ tempValue, setTempValue ] = useState(initialValue);

	const inputRef = useRef(null);

	useEffect(() => {
		if(isEditing) {
			inputRef.current.focus();
			inputRef.current.select();
		}
	}, [ isEditing ]);

	const handleKeyDown = e => {
		if(e.key === "Enter") {
			onChange(tempValue);
			setIsEditing(false);
		}
	};

	return (
		isEditing ? (
			<input
				ref={ inputRef }
				type="text"
				value={ tempValue }
				onChange={ e => setTempValue(e.target.value) }
				onBlur={ () => {
					setIsEditing(false);
					onBlur(tempValue);
				} }
				onKeyDown={ handleKeyDown }
				{ ...props }
				className={ inputClassName ?? props.className }
			/>
		) : (
			<h2
				onDoubleClick={ () => setIsEditing(true) }
				{ ...props }
				className={ labelClassName ?? props.className }
			>
				{ initialValue }
			</h2>
		)
	);
};

export default EditableLabel;