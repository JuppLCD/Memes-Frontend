type Input = {
	label: string;
	value: string;
};

interface InputRadioElementProps {
	title: string;
	name: string;
	handleChange: any;
	check: any;
	inputs: Input[];
}

function InputRadioElement({ title, name, handleChange, check, inputs }: InputRadioElementProps) {
	return (
		<>
			<h4 className='mb-3'>{title}</h4>

			{inputs.map((input, index) => (
				<label className={index === inputs.length - 1 ? 'ml-5' : ''}>
					<input
						type='radio'
						className='mr-3'
						name={name}
						value={input.value}
						onChange={handleChange}
						checked={check === input.value}
					/>
					{input.label}
				</label>
			))}
		</>
	);
}

export default InputRadioElement;
