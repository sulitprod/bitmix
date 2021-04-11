import styled from 'styled-components';

import Photo from '../default/Photo';
import Icon from '../default/Icon';

import { percent } from '../../utils';

const Line = styled.div.attrs(p => ({
	style: {
		height: `${percent(p.sum, p.count)}px`,
	}}))`
	background: ${p => (p.bg || p.theme.gray)};
	width: 100%;
`;
const StyledIcon = styled(Icon)`
	fill: ${({theme}) => theme.lightGray};
`;
const GiftText = styled.div`
	text-align: center;
	color: ${({theme}) => theme.lightGray};
	display: flex;
	flex-direction: column;
	justify-content: center;

	> * {
		padding: ${({theme}) => theme.pg8};
	}
`;
const StyledPlayer = styled.div`
	display: flex;
	flex-direction: column;
	width: 40px;

	& + & {
		margin-left: ${({theme}) => theme.pg8};
	}
	> .line {
		align-items: flex-end;
		display: flex;
		height: 100px;
		width: 100%;
		flex-direction: column-reverse;
	}
`;
const StyledPlayers = styled.div`
	display: flex;
	height: 140px;
`;
const IconArea = styled.div`
	height: 40px;
	width: 40px;
	padding: 12px;
	background: ${({theme}) => theme.darkGray};
`;
const BonusText = styled.div`
	color: #53e253;
	position: absolute;
	left: -108px;
	text-align: right;
	width: 100px;
`;

const Player = ({ photo_50, color, sum, count, userBits, currentUser }) => (
	<StyledPlayer>
		<div className='line'>
			<Line {...{ sum, count, bg: color }} />
			{ currentUser ? 
			<Line {...{ sum, count: userBits, bg: '' }}>
				{ sum === (count + userBits) || sum === userBits ? <BonusText>+2% к выигрышу</BonusText> : '' }
			</Line> : '' }
		</div>
		{photo_50 ? 
			<Photo src={photo_50} /> : 
			<IconArea>
				<Icon src='add' />
			</IconArea>
		}
	</StyledPlayer>
);

const Players = ({ userBits, domination, user }) => {
	const { players } = domination;
	const sum = players.reduce((all, { count }) => all + count, 0);
	const newSum = sum + userBits;
	let inGame = false;

	if (user) for (const player of players) if (player.id === user.id) inGame = true;

	const withUserPlayers = userBits && !inGame ? [ ...players, { id: user.id, count: userBits } ] : players;

	return (
		<StyledPlayers>
			{ withUserPlayers.length ? withUserPlayers.map((player, key) => (
				<Player {...player}{...{ key, sum: newSum, currentUser: !user ? false : player.id === user.id, userBits }} />
			)) : 
			<GiftText>
				<StyledIcon src='gift' width={64} />
				<p>Добавьте к игре биты первым и получите дополнительные 2% при выигрыше!</p>
			</GiftText> }
		</StyledPlayers>
	);
}

export default Players;