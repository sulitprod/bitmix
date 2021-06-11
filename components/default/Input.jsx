import styled from 'styled-components';

const Styled = styled.div`
	background: ${({theme}) => theme.gray};
	color: ${({theme}) => theme.white};
	display: block;
	border-radius: 4px;

	> div {
		display: inline-block;
		line-height: 0;
		vertical-align: middle;
	}
	> * + * {
		margin-left: ${({theme}) => theme.pg8};
	}
	> input {
		background: transparent;
		color: unset;
		padding: ${({theme}) => theme.pg8};
		line-height: unset;
		width: 100%;
	}
`;

const Input = ({
	left, 
	right, 
	placeholder, 
	value, 
	onChange,
	className,
	max,
	min,
	pattern
}) => {
	return (
		<Styled className={className}>
			{left && <div>{left}</div>}
			<input {...{ placeholder, value, onChange }} />
			{right && <div>{right}</div>}
		</Styled>
	)
};

export default Input;