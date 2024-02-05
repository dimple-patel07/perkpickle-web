import React from "react";
import { IoSearch } from "react-icons/io5";
import Select, { components, ValueContainerProps } from "react-select";

const DropdownWithCheckbox = ({ items, selAvailableCards, selectionLimit, onAvailableCardSelection }) => {
	const Option = (props) => {
		return (
			<div>
				<components.Option {...props}>
					<input type="checkbox" checked={props.isSelected} onChange={() => null} /> <label>{props.label}</label>
				</components.Option>
			</div>
		);
	};
	const MultiValueContainer = (props) => {
		const found = items.find((data) => data.value === props.data.value);
		const tooltipValue = found?.label;
		// props.data.label = props.data.label.substring(0, 3);
		return (
			<div title={tooltipValue}>
				{/* <components.MultiValueContainer {...props} /> */}
				<components.MultiValueRemove {...props}></components.MultiValueRemove>
			</div>
		);
	};
	const handleChange = (selected) => {};
	const ValueContainer = ({ children, ...props }) => {
		let [values, input] = children;

		if (Array.isArray(values)) {
			const plural = values.length === 1 ? "" : "s";
			// values = `${values.length} card${plural} selected`;
			// values = (
			// 	<>
			// 		<IoSearch />
			// 		&nbsp; Search Card Here
			// 	</>
			// );
		}

		return (
			<components.ValueContainer {...props}>
				{values}
				{input}
			</components.ValueContainer>
		);
	};
	return (
		<span className="d-inline-block" data-toggle="popover" data-trigger="focus" data-content="Please selecet account(s)">
			<Select
				options={items}
				isMulti
				closeMenuOnSelect={false}
				hideSelectedOptions={false}
				components={{ Option, ValueContainer }}
				onChange={handleChange}
				allowSelectAll={true}
				isOptionDisabled={() => selAvailableCards.length >= selectionLimit}
				placeholder={
					<>
						<IoSearch />
						&nbsp; Search Card Here
					</>
				}
				// styles={{
				// 	multiValueLabel: (base) => ({
				// 		...base,
				// 		backgroundColor: "blue",
				// 		color: "white",
				// 	}),
				// 	multiValueRemove: (base) => ({
				// 		...base,
				// 		border: `1px dotted`,
				// 		height: "100%",
				// 	}),
				// }}
			/>
		</span>
	);
};
export default DropdownWithCheckbox;
