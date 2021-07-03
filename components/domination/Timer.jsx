import cn from 'classnames';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

import { Times } from '../../utils';
import { Icon } from '../default';
import { useStore } from '../../providers/Store';

const StyledTimer = styled.div`
	height: 40px;
	display: flex;
	width: 100%;
	padding: 0 12px;
	align-items: center;
`;
const TimeLines = styled.div`
	height: 100%;
	white-space: nowrap;
	display: flex;
	color: ${({theme}) => theme.bodyBackground};

	&.left {
		flex-direction: row;
		div + div {
			border-left: 2px solid;
		}
	}
	&.right {
		flex-direction: row-reverse;
		div + div {
			border-right: 2px solid;
		}
	}
`;
const Line = styled.div`
	width: 10px;
	border-radius: 2px;
	background: ${({theme, active}) => active ? theme.darkGray : theme.gray};
`;
const State = styled.div`
	line-height: 16px;
	flex-grow: 1;
	text-align: center;
	color: ${({theme, active}) => active ? theme.white : theme.lightGray};
`;

const Lines = ({ count, defaultCount, className }) => {
	const lines = [];

	for (let i = 0; i < defaultCount - count; i++) lines.push(false);
	for (let i = 0; i < count; i++) lines.push(true);

	return (
		<TimeLines {...{ className }}>
			{lines.map((active, key) => <Line active={active} key={key} />)}
		</TimeLines>
	);
}

const Timer = observer(() => {
	const { status, statusTime, remaining } = useStore();
	const active = status !== 0;
	const defaultCount = 30;
	const [ syncRemaining, setRem ] = useState(0); 
	const statusText = [
		'Ожидание игроков',
		Times(0, syncRemaining),
		'Определение победителя',
		'Победитель'
	][status];
	const count = active ? Math.floor(defaultCount / statusTime * syncRemaining) : 0;

	useEffect(() => setRem(remaining), [remaining]);

	return (
		<StyledTimer>
			<Lines {...{ count, defaultCount, className: 'left'}} />
			<State active={active}>{
				(active && count === 0) ? <Icon src='load' /> : statusText
			}</State>
			<Lines {...{ count, defaultCount, className: 'right'}} />
		</StyledTimer>
	);
});

export default Timer;