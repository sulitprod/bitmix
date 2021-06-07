import { useState } from 'react';
import styled from 'styled-components';

import Button from '../default/Button';
import Icon from '../default/Icon';
import Input from '../default/Input';

import { showNotification } from '../../utils';
import { CELLS, TIMES } from '../../constant';
import Photo from '../default/Photo';
import Bits from '../Bits';
import { Package } from '../Styled';
import { useSession } from 'next-auth/client';

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

const Name = styled.p`
	line-height: 16px;
	padding-bottom: ${({theme}) => theme.pg8};
`;
const Styled = styled.div`
	display: flex;
	width: 998px;
	align-items: center;

	> * {
		width: 100%;
	}
	> * + * {
		margin-left: ${({theme}) => theme.pg8};
	}
`;
const StyledDefenition = styled(Styled)`
	> div {
		height: 32px;
		background: ${({theme}) => theme.shadowGray};
	}
`;
const CenterColor = styled.div`
	transition: background .2s, width .5s ease;
	flex-shrink: 0;
	background: ${p => p.bg} !important;
	width: 40px;
	height: 40px !important;
	border-radius: 4px;

	&:not(.current):after {
		content: '';
		position: absolute;
		background: #ffffff38;
		width: 10px;
		height: 10px;
		z-index: 2;
		left: 4px;
		top: 4px;
	}

	&.winner {
		width: 380px !important;
		display: flex;
		overflow: hidden;
		justify-content: space-between;
		background: ${({theme}) => theme.bodyBackground} !important;
	}
`;
const Sum = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
`;
const StyledBits = styled(Bits)`
	padding-bottom: ${({theme}) => theme.pg4};
`;
const StyledInput = styled(Input)`
	line-height: 24px;
	width: 0;
	flex-grow: 1;
`;
const StyledButton = styled(Button)`
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

const AwaitStage = ({ user, updateAddingBits }) => {
	const { balance } = user || {};
	const [ inputValue, setInputValue ] = useState('');
	const [ inProgress, setInProgress ] = useState(false);
	const onChange = ({ target }) => {
		let newValue = Number(target.value);

		if (isNaN(newValue)) newValue = inputValue;
		if (newValue > balance) newValue = balance;
		setInputValue(newValue || '');
		updateAddingBits(newValue);
	}
	const changeValue = (handler) => {
		let newValue = handler(Number(inputValue), balance);

		if (newValue) newValue = Number(newValue.toFixed(1));
		if (newValue > balance) newValue = balance;
		setInputValue(newValue);
		updateAddingBits(newValue);
	}
	const addValue = async () => {
		if (Number(inputValue) > 0) {
			setInProgress(true);
			await fetch('/api/bet', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ count: Number(inputValue) })
			});
			updateAddingBits(0);
			setInputValue('');
			setInProgress(false);
			showNotification('Биты добавлены', 'success');
		} else {
			showNotification('Битов должно быть больше 0', 'warning');
		}
	}

	return (
		user && 'id' in user ? <Styled>
			{BUTTONS.map(([value, handler], key) => (
				<StyledButton
					className='values'
					key={key}
					type='main'
					value={value}
					padding={12}
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
				padding={12}
				value='Добавить биты' 
				loading={inProgress}
				onClick={addValue} 
			/>
		</Styled> :
		<AuthText>Чтобы добавлять биты, нужно авторизоваться</AuthText>
	);
}
const WinnerStage = ({ status, randomCells, players, remaining }) => {
	const randomCount = randomCells.length;
	const id = status === 2 ? 
		Math.ceil((TIMES.domination[status] - remaining) / (TIMES.domination[status] / randomCount)) - 1 : 
		randomCells.length - 1;
	const current = players[randomCells[id].split(':')[(CELLS.count - 1) / 2]];
	const { color, name, photo_100, count } = current;
	const sum = players.reduce((all, { count }) => all + count, 0);

	return (
		<StyledDefenition>
			<div />
			<CenterColor bg={color} />
			{ status === 2 ? 
				<CenterColor className='current'>
					<Photo src={photo_100} />
				</CenterColor> :
				<CenterColor className='winner'>
					<Button padding={0} left={<Photo src={photo_100} />} align='left'>
						<Name>{name}</Name>
						<Bits value={count} />
					</Button>
					<Sum>
						<StyledBits value={sum} />
						<Package color={color} packages={[0, 100]} />
					</Sum>
				</CenterColor>
			}
			<CenterColor bg={color} />
			<div />
		</StyledDefenition>
	);
}
const Panel = ({ updateAddingBits, domination, remaining }) => {
	const [ user, userLoading ] = useSession();
	const { status, randomCells, players } = domination;

	return (
		status === 0 || status === 1 ? <AwaitStage {...{ user, updateAddingBits }} /> :
		status === 2 || status === 3 ? <WinnerStage {...{ status, randomCells, players, remaining }} /> : ''
	)
}

export default Panel;