import cn from 'classnames';
import styled from 'styled-components';
import { TIMES } from '../../constant';
import { useEffect, useState } from 'react';
import { Times } from '../../utils';

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

const Lines = ({ time, className, status }) => {
	const defaultCount = 30;
	const lines = [];
	const startTime = TIMES.domination[status];
	const count = Math.ceil(defaultCount / startTime * (time > 0 ? time : 0)) || 0;

	for (let i = 0; i < defaultCount - count; i++) lines.push(false);
	for (let i = 0; i < count; i++) lines.push(true);

	return (
		<TimeLines {...{ className }}>
			{lines.map((active, key) => <div className={cn({ active })} key={key} />)}
		</TimeLines>
	);
}

const Timer = ({ domination, remaining }) => {
	const [ state, setState ] = useState('');
	const [ time, setTime ] = useState(0);
	const { status, started } = domination;
	let interval;

	const changeTime = (state, add) => {
		const diff = (Times(2) - Times(2, started)) / 1000 - add;

		if (state) setState(Times(0, TIMES.domination[status] - diff));
		setTime(TIMES.domination[status] - diff);
	};

	useEffect(() => {
		switch (status) {
			case 0:
				setState('Ожидание игроков');
				break;
			case 1:
				changeTime(true, 0);
				interval = setInterval(() => changeTime(true, 0), 1000);
				return () => clearInterval(interval);
			case 2:
				setState('Определение победителя');
				changeTime(false, TIMES.domination[1]);
				interval = setInterval(() => changeTime(false, TIMES.domination[1]), 1000);
				return () => clearInterval(interval);
			case 3:
				setState('Победитель');
				break;
		}
	}, [status]);
	
	return (
		<StyledTimer>
			<Lines {...{ time, status, className: 'left'}} />
			<State className={cn({ active: status !== 0 })}>{state}</State>
			<Lines {...{ time, status, className: 'right'}} />
		</StyledTimer>
	);
}

export default Timer;