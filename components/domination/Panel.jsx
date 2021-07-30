import { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { sumBy } from 'lodash';

import { Photo, Input, Icon, Button } from '../default';
import { showNotification } from '../../utils';
import { CELLS } from '../../constant';
import Bits from '../Bits';
import { Package } from '../Styled';
import { useStore, useUser } from '../../providers/Store';

const BUTTONS = [
	[<Icon src='trash' />, () => 0, (value, _) => value !== 0],
	['+0.1', (value) => value + 0.1, (value, balance) => value !== balance],
	['+1', (value) => value + 1, (value, balance) => value !== balance],
	['+10', (value) => value + 10, (value, balance) => value !== balance],
	['+100', (value) => value + 100, (value, balance) => value !== balance],
	['1/2', (value) => value / 2, (value, balance) => value !== 0 && value !== balance],
	['х2', (value) => value * 2, (value, balance) => value !== 0 && value !== balance],
	['Всё', (_, balance) => balance, (value, balance) => value !== balance]
];

const Name = styled.p`
	line-height: 16px;
	padding-bottom: ${({theme}) => theme.pg8};
`;
const Styled = styled.div`
	display: flex;
	width: 100%;
	padding: 0 12px;
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
		background: rgb(255 255 255 / 22%);
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

const AwaitStage = ({ user, setAddingBits }) => {
	const { balance } = user || {};
	const input = useRef(null);
	const [ inputValue, setInputValue ] = useState(0);
	const [ inProgress, setInProgress ] = useState(false);
	const setValue = (newValue) => {
		if (newValue >= 0) {
			setInputValue(newValue);
			setAddingBits(newValue);
		}
		if (input.current !== document.activeElement) input.current.focus();
	}
	const keyControl = ({ keyCode }) => {
		switch (keyCode) {
			case 13:
				addValue();
				break;
			case 189:
				setValue(inputValue - 1);
				break;
			case 187:
				setValue(inputValue + 1);
				break;
		}
	}
	const onChange = ({ target }) => {
		let newValue = Number(target.value);

		if (isNaN(newValue)) newValue = inputValue;
		if (newValue > balance) newValue = balance;
		setValue(newValue);
	}
	const changeValue = (handler) => {
		let newValue = handler(inputValue, balance);

		if (newValue) newValue = Number(newValue.toFixed(1));
		if (newValue > balance) newValue = balance;
		setValue(newValue);
	}
	const addValue = async () => {
		if (inputValue > 0) {
			setInProgress(true);
			await fetch('/api/bet', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ count: inputValue })
			});
			setValue(0);
			setInProgress(false);
			showNotification('Биты добавлены', 'success');
		} else {
			showNotification('Битов должно быть больше 0', 'warning');
		}
	}

	return (
		user?.id ? <Styled>
			{BUTTONS.map(([value, handler, active], key) => {
				const disabled = active(inputValue, balance);
				return (
					<StyledButton
						className='values'
						key={key}
						type='main'
						value={value}
						padding={12}
						disabled={!active(inputValue, balance)}
						onClick={() => changeValue(handler)}
						onMouseDown={(event) => {
							event.preventDefault();
							event.stopPropagation();
						}}
					/>
				)
			})}
			<StyledInput
				element={input}
				placeholder='Количество'
				value={inputValue || ''}
				onChange={onChange}
				onKeyDown={keyControl}
			/>
			<StyledButton
				className='add' 
				type='main'
				padding={12}
				disabled={!inputValue}
				value='Добавить биты' 
				loading={inProgress}
				onClick={addValue} 
			/>
		</Styled> :
		<AuthText>Чтобы добавлять биты, нужно авторизоваться</AuthText>
	);
}
const WinnerStage = ({ status, randomGrids, players, remaining, statusTime, sum }) => {
	const randomCount = randomGrids.length;
	const id = status === 2 ? 
		Math.ceil((statusTime - remaining) / (statusTime / randomCount)) - 1 : 
		randomCount - 1;
	const current = players[randomGrids[id].split(':')[(CELLS.count - 1) / 2]];
	const { color, name, photo_100, count } = current;

	return (
		<StyledDefenition>
			<div />
			<CenterColor bg={color} />
			{ status === 2 ? 
				<CenterColor className='current'>
					<Photo src={photo_100} />
				</CenterColor> :
				<CenterColor className='current winner'>
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
const Panel = () => {
	const { status, setAddingBits, players, randomGrids, remaining, statusTime, sum } = useStore();
	const user = useUser();

	return (
		status === 0 || status === 1 ? <AwaitStage {...{ user, setAddingBits }} /> :
		status === 2 || status === 3 ? <WinnerStage {...{ status, randomGrids, players, remaining, statusTime, sum }} /> : ''
	)
}

export default observer(Panel);