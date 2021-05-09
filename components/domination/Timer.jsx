import cn from 'classnames';
import styled from 'styled-components';
import { TIMES } from '../../constant';
import { useEffect, useState } from 'react';
import { Times } from '../../utils';
import Icon from '../default/Icon';

const StyledTimer = styled.div`
	height: 40px;
	display: flex;
	width: 998px;
	align-items: center;
`;
const TimeLines = styled.div`
	height: 100%;
	white-space: nowrap;
	display: flex;

	&.left {
		flex-direction: row;
		div + div {
			margin-left: 2px;
		}
	}
	&.right {
		flex-direction: row-reverse;
		div + div {
			margin-right: 2px;
		}
	}
	
	> div {
		width: 8px;
		background: ${({theme}) => theme.gray};
		&.active {
			background: ${({theme}) => theme.darkGray};
		}
	}
`;
const State = styled.div`
	line-height: 16px;
	flex-grow: 1;
	text-align: center;
	color: ${({theme}) => theme.lightGray};
	&.active {
		color: ${({theme}) => theme.white};
		font-size: 20px;
	}
`;

const Lines = ({ count, defaultCount, className }) => {
	const lines = [];

	for (let i = 0; i < defaultCount - count; i++) lines.push(false);
	for (let i = 0; i < count; i++) lines.push(true);

	return (
		<TimeLines {...{ className }}>
			{lines.map((active, key) => <div className={cn({ active })} key={key} />)}
		</TimeLines>
	);
}

const Timer = ({ status, remaining }) => {
	const statusText = [
		'Ожидание игроков',
		Times(0, remaining),
		'Определение победителя',
		'Победитель'
	];
	const defaultCount = 30;
	const count = TIMES.domination[status] ? Math.floor(defaultCount / TIMES.domination[status] * remaining) : 0;
	
	return (
		<StyledTimer>
			<Lines {...{ count, defaultCount, className: 'left'}} />
			<State className={cn({ active: status !== 0 })}>{
				(status !== 0 && count === 0) ? <Icon src='load' /> : statusText[status]
			}</State>
			<Lines {...{ count, defaultCount, className: 'right'}} />
		</StyledTimer>
	);
}

export default Timer;