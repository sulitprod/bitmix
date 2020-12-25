import { useState } from 'react';
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

const Panel = ({ User }) => {
	const [inputValue, setInputValue] = useState('');
	const onChange = ({ target }) => setInputValue(target.value);

	return (
		<Styled>
			{BUTTONS.map(([value, handler], key) => (
				<StyledButton
					key={key}
					type='main'
					value={value}
					onClick={() => {
						setInputValue(
							handler(
								Number(inputValue),
								User.balance
							)
						)
					}}
				/>
			))}
			<StyledInput
				placeholder='Количество'
				value={inputValue}
				onChange={onChange}
			/>
			<StyledButton type='main' value='Добавить биты' />
		</Styled>
	);
}

export default Panel;