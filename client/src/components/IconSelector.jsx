import React, { useState } from "react";
import * as BsIcons from "react-icons/bs";

/**
 * This is basically a component version of this page:
 * https://icons.getbootstrap.com/
 * 
 * It's a searchable list of all the icons available in react-icons/bs, allowing
 * a user to do something with a selected icon.
 */
export const IconSelector = ({ onSelect }) => {
	const [ searchTerm, setSearchTerm ] = useState("");
	const iconKeys = Object.keys(BsIcons).filter((key) =>
		key.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const handleIconClick = (iconName) => {
		if(onSelect) {
			onSelect(iconName, BsIcons[ iconName ]);	// Pass the icon name and the icon component to the onSelect callback
		}
	};

	return (
		<div className="flex flex-col items-center p-4 h-1/4">
			<div className="relative flex w-1/2 mb-4 h-1/4">
				<BsIcons.BsSearch className="absolute text-neutral-300 top-3 left-3" />
				<input
					type="text"
					value={ searchTerm }
					onChange={ (e) => setSearchTerm(e.target.value) }
					placeholder="Search for an icon..."
					className="w-full py-2 pl-10 pr-8 border rounded focus:outline-none focus:ring focus:border-blue-300 border-neutral-200"
				/>
				{ searchTerm.length > 0 && (
					<BsIcons.BsXCircle
						className="absolute cursor-pointer text-neutral-300 top-3 right-3 hover:text-neutral-400 active:text-neutral-500"
						onClick={ () => setSearchTerm("") }
					/>
				) }
			</div>
			<div className="flex flex-wrap justify-center overflow-y-scroll max-h-[25vh]">
				{ iconKeys.map((key) => {
					const Icon = BsIcons[ key ];
					return (
						<div
							className="flex flex-col items-center justify-center m-1 w-28"
							key={ key }
							onClick={ () => handleIconClick(key) }
						>
							<div className="flex flex-col items-center justify-center w-24 h-24 p-1 m-1 overflow-hidden border rounded cursor-pointer border-neutral-200 hover:bg-gray-100 active:bg-gray-200">
								<Icon size={ 32 } />
							</div>
							<span className="w-full text-xs text-center truncate">{ key }</span>
						</div>
					);
				}) }
			</div>
		</div>
	);
};

export default IconSelector;