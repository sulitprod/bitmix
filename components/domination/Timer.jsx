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
	let state = 'Ожидание игроков';
	let lines = [];
	const { status } = domination;

	switch (status) {
		case 0:
			for (let i = 0; i < 30; i++) lines.push(false);
			break;
		case 1:
			state = '1:00';
			for (let i = 0; i < 30; i++) lines.push(true);
			break;
	}
	
	return (
		<StyledTimer>
			<TimeLines className='left'>
				{lines.map((active, key) => <div className={cn({ active })} key={key} />)}
			</TimeLines>
			<State className={cn({ active: status !== 0 })}>{state}</State>
			<TimeLines className='right'>
				{lines.map((active, key) => <div className={cn({ active })} key={key} />)}
			</TimeLines>
		</StyledTimer>
	);
}

export default Timer;