import { createRef, useState } from 'react';
import styled from 'styled-components';

import Button from '../default/Button';
import Icon from '../default/Icon';
import Input from '../default/Input';

const BUTTONS = [
	[<Icon src='trash' />, () => ''],
	['+0.1', (value) => value + 0.1],
	['+1', (value) => value + 1],
	['+10', (value) => value + 10],
	['+100', (value) => value + 100],
	['1/2', (value) => value / 2],
	['х2', (value) => value * 2],
	['Всё', (_, balance) => balance]
];

const Styled = styled.div`
	display: flex;
	width: 998px;

	> * {
		width: 100%;
	}
	> * + * {
		margin-left: ${({theme}) => theme.pg8};
	}
`;
const StyledInput = styled(Input)`
	line-height: 24px;
`;
const StyledButton = styled(Button)`
	&& {
		line-height: 24px;
	}
`;

const Panel = ({ User, updateUserBits }) => {
	const [inputValue, setInputValue] = useState('');
	const input = createRef();
	const onChange = ({ target }) => {
		setInputValue(target.value);
		updateUserBits(Number(target.value));
	}
	const onClick = (handler) => {
		const newValue = handler(
			Number(inputValue),
			User.balance
		);

		setInputValue(newValue);
		updateUserBits(newValue);
	}

	return (
		<Styled>
			{BUTTONS.map(([value, handler], key) => (
				<StyledButton
					key={key}
					type='main'
					value={value}
					onClick={() => onClick(handler)}
				/>
			))}
			<StyledInput
				placeholder='Количество'
				ref={input}
				value={inputValue}
				onChange={onChange}
			/>
			<StyledButton type='main' value='Добавить биты' />
		</Styled>
	);
}

export default Panel;