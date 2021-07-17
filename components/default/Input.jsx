import { useState } from 'react';
import cn from 'classnames';
import styled from 'styled-components';

const Styled = styled.div`
	background: ${({theme}) => theme.gray};
	color: ${({theme}) => theme.white};
	display: block;
	border-radius: 4px;
	transition: 0.4s background ease;

	&.focus {
		background: ${({theme}) => theme.grayFocus};
	}

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
	onKeyDown,
	className,
	max,
	min,
	pattern,
	element
}) => {
	const [focus, setFocus] = useState(false);

	return (
		<Styled className={cn({ focus }, className)}>
			{left && <div>{left}</div>}
			<input {...{ placeholder, value, onChange, onKeyDown, ref: element, onFocus: () => setFocus(true), onBlur: () => setFocus(false) }} />
			{right && <div>{right}</div>}
		</Styled>
	)
};

export default Input;