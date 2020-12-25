import { forwardRef } from 'react';
import styled from 'styled-components';

const Styled = styled.div`
	background: ${({theme}) => theme.gray};
	color: ${({theme}) => theme.white};
	display: block;
	text-align: left;

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
	}
`;

const Input = forwardRef(({ 
	left, 
	right, 
	placeholder, 
	value, 
	onChange,
	className
}, ref) => (
	<Styled className={className}>
		{left && <div>{left}</div>}
		<input {...{ placeholder, value, onChange, ref }} />
		{right && <div>{right}</div>}
	</Styled>	
));

export default Input;