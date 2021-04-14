import { useState } from 'react';
import styled from 'styled-components';
import random from 'random';

import Button from '../default/Button';
import Icon from '../default/Icon';
import Input from '../default/Input';

import showNotification from '../../utils/showNotifications';
import { addBits } from '../../hooks/domination';

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
	width: 0;
	flex-grow: 1;
`;
const StyledButton = styled(Button)`
	&& {
		line-height: 24px;
	}
	&.values {
		flex-basis: 64px;
	}
	&.add {
		flex-basis: 166px;
	}
`;
const AuthText = styled.div`
	text-align: center;
	padding: ${({theme}) => theme.pg12};
	line-height: 16px;
	color: ${({theme}) => theme.lightGray};
`;

const Panel = ({ user, updateUserBits, domination }) => {
	const [inputValue, setInputValue] = useState('');
	const [inProgress, setInProgress] = useState(false);
	const onChange = ({ target }) => {
		let newValue = Number(target.value);

		if (isNaN(newValue)) newValue = inputValue;
		if (newValue > user.balance) newValue = user.balance;
		setInputValue(newValue || '');
		updateUserBits(newValue);
	}
	const changeValue = (handler) => {
		let newValue = Number(handler(
			Number(inputValue),
			user.balance
		).toFixed(1));
		if (newValue > user.balance) newValue = user.balance;
		setInputValue(newValue);
		updateUserBits(newValue);
	}
	const addValue = async () => {
		if (Number(inputValue) > 0) {
			setInProgress(true);
			// user.id
			await addBits(random.int(0, 10), Number(inputValue), domination);
			updateUserBits(0);
			setInputValue('');
			setInProgress(false);
			showNotification('Биты добавлены', 'success');
		} else {
			showNotification('Битов должно быть больше 0', 'warning');
		}
	}

	return (
		user ? 
		<Styled>
			{BUTTONS.map(([value, handler], key) => (
				<StyledButton
					className='values'
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
				max={user.balance}
			/>
			<StyledButton 
				className='add' 
				type='main' 
				value='Добавить биты' 
				loading={inProgress}
				onClick={addValue} 
			/>
		</Styled> :
		<AuthText>Чтобы добавлять биты, нужно авторизоваться</AuthText>
	);
}

export default Panel;