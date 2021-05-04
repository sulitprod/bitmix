import { useEffect, useState } from 'react';
import styled from 'styled-components';

import Button from '../default/Button';
import Icon from '../default/Icon';
import Input from '../default/Input';

import { showNotification } from '../../utils';
import { CELLS_COUNT } from '../../constant';

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
const StyledDefenition = styled(Styled)`
	> div {
		height: 40px;
		background: ${({theme}) => theme.shadowGray};
	}
`;
const CenterColor = styled.div`
	background: ${p => p.bg} !important;
	width: 386px;
	flex-shrink: 0;
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

const Panel = ({ user, updateUserBits, domination, remaining }) => {
	const [inputValue, setInputValue] = useState('');
	const [inProgress, setInProgress] = useState(false);
	const { status, randomCells, players } = domination;
	const onChange = ({ target }) => {
		let newValue = Number(target.value);

		if (isNaN(newValue)) newValue = inputValue;
		if (newValue > user.balance) newValue = user.balance;
		setInputValue(newValue || '');
		updateUserBits(newValue);
	}
	const changeValue = (handler) => {
		let newValue = handler(
			Number(inputValue),
			user.balance
		);

		if (newValue) newValue = Number(newValue.toFixed(1));
		if (newValue > user.balance) newValue = user.balance;
		setInputValue(newValue);
		updateUserBits(newValue);
	}
	const addValue = async () => {
		if (Number(inputValue) > 0) {
			setInProgress(true);
			await fetch('/api/bet', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ count: Number(inputValue) })
			});
			updateUserBits(0);
			setInputValue('');
			setInProgress(false);
			showNotification('Биты добавлены', 'success');
		} else {
			showNotification('Битов должно быть больше 0', 'warning');
		}
	}

	if (status === 0 || status === 1) {
		return (
			user ? <Styled>
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
	} else if (status === 2) {
		const [ id, setId ] = useState(0);

		useEffect(() => {
			if (id !== 19) {
				const interval = setTimeout(() => setId(id + 1), 500);
				
				return () => clearTimeout(interval)
			}
		}, [id]);
		console.log(id);
		console.log(players[randomCells[id].split(':')[(CELLS_COUNT - 1) / 2]]);
		const currentColor = players[randomCells[id].split(':')[(CELLS_COUNT - 1) / 2]].color;
		return (
			<StyledDefenition>
				<div></div>
				<CenterColor bg={currentColor} />
				<div></div>
			</StyledDefenition>
		);
	}
}

export default Panel;