import { useState } from 'react';
import styled from 'styled-components';

import Button from '../default/Button';
import Icon from '../default/Icon';
import Input from '../default/Input';

import showNotification from '../../utils/showNotifications';
import { useDomination } from '../../hooks/domination';

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
	&.add > .value {
		width: 150px;
	}
`;

const Panel = ({ User, updateUserBits }) => {
	const [inputValue, setInputValue] = useState('');
	const [inProgress, setInProgress] = useState(false);
	const { addDomination } = useDomination();
	const onChange = ({ target: value }) => {
		setInputValue(value);
		updateUserBits(Number(value));
	}
	const changeValue = (handler) => {
		const newValue = handler(
			Number(inputValue),
			User.balance
		);

		setInputValue(newValue);
		updateUserBits(newValue);
	}
	const addValue = async () => {
		setInProgress(true);
		await addDomination();
		setInputValue('');
		setInProgress(false);
		showNotification('Биты добавлены', 'success');
	}

	return (
		<Styled>
			{BUTTONS.map(([value, handler], key) => (
				<StyledButton
					key={key}
					type='main'
					value={value}
					onClick={() => changeValue(handler)}
				/>
			))}
			<StyledInput
				placeholder='Количество'
				value={inputValue}
				onChange={onChange}
				disabled={inProgress}
			/>
			<StyledButton 
				className='add' 
				type='main' 
				value='Добавить биты' 
				loading={inProgress}
				onClick={addValue} 
			/>
		</Styled>
	);
}

export default Panel;