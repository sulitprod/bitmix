import cn from 'classnames';
import styled from 'styled-components';

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

const Timer = ({ domination }) => {
	let { active, state } = { active: false, state: 'Ожидание игроков' };
	let lines = [];
	const { players } = domination;

	for (let i = 0; i < 30; i++) lines.push(false);
	if (players.length === 1) state = 'Ожидание игрока';
	if (players.length >= 2) {
		lines = [];
		for (let i = 0; i < 30; i++) lines.push(true);
		state = '01:00';
		active = true;
	}
	
	return (
		<StyledTimer>
			<TimeLines className='left'>
				{lines.map((active, key) => <div className={cn({ active })} key={key} />)}
			</TimeLines>
			<State className={cn({ active })}>{state}</State>
			<TimeLines className='right'>
				{lines.map((active, key) => <div className={cn({ active })} key={key} />)}
			</TimeLines>
		</StyledTimer>
	);
}

export default Timer;