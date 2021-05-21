import styled from 'styled-components';

import Photo from '../default/Photo';
import Icon from '../default/Icon';

import { percent } from '../../utils';
import { useSession } from 'next-auth/client';

const Line = styled.div.attrs(p => ({
	style: {
		height: `${percent(p.sum, p.count)}px`,
	}}))`
	background-color: ${p => p.bg};
	width: 100%;
`;
const AddingLine = styled(Line)`
	background-image: repeating-linear-gradient(
		45deg, 
		transparent 0, 
		transparent 4px, 
		${({theme}) => theme.darkGray} 4px, 
		${({theme}) => theme.darkGray} 8px
	);
	background-color: ${({theme}) => theme.shadowGray};
`;
const GiftIcon = styled(Icon)`
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
`;
const LineArea = styled.div`
	margin-bottom: ${({theme}) => theme.pg8};
	align-items: flex-end;
	display: flex;
	height: 100px;
	width: 100%;
	flex-direction: column-reverse;
`;
const StyledPlayers = styled.div`
	display: flex;
	height: 150px;
`;
const StyledIcon = styled(Icon)`
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

const Player = ({ photo_100, color, sum, count, addingBits, userBet }) => (
	<StyledPlayer>
		<LineArea>
			<Line {...{ sum, count, bg: color }} />
			{ userBet ? 
			<AddingLine {...{ sum, count: addingBits, bg: '' }}>
				{ sum === count + addingBits ? <BonusText>+2% к выигрышу</BonusText> : '' }
			</AddingLine> : '' }
		</LineArea>
		{ photo_100 ? 
			<Photo src={photo_100} /> : 
			<StyledIcon src='add' />
		}
	</StyledPlayer>
);

const arraySum = (players) => players.reduce((all, { count }) => all + count, 0)

const Players = ({ addingBits, players }) => {
	const [ user, userLoading ] = useSession();
	const sum = arraySum(players) + addingBits;
	let inGame = false;

	if (user) for (const player of players) if (player.id === user.id) inGame = true;

	const withUserPlayers = addingBits && !inGame ? [ ...players, { id: user.id, count: 0 } ] : players;

	return (
		<StyledPlayers>
			{ withUserPlayers.length ? 
			withUserPlayers.map((player, key) => (
				<Player {...{ 
					...player, 
					key,
					sum, 
					userBet: !user ? false : player.id === user.id, 
					addingBits
				}} />
			)) : 
			<GiftText>
				<GiftIcon src='gift' width={64} />
				<p>Добавьте к игре биты первым и получите дополнительные 2% при выигрыше!</p>
			</GiftText>
			}
		</StyledPlayers>
	);
}

export default Players;