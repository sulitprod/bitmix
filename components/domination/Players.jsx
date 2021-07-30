import styled, { keyframes } from 'styled-components';
import { observer } from 'mobx-react-lite';

import { Photo, Icon } from '../default';
import { percent } from '../../utils';
import { useStore, useUser } from '../../providers/Store';
import { Warning } from '../Styled';

const addingKeys = keyframes`
	0% {
		bottom: 4px;
		opacity: 0.5;
	}
	100% {
		bottom: 0;
		opacity: 1;
	}
`;
const Line = styled.div`
	height: ${p => percent(p.potentialSum, p.count)}px;
	background-color: ${p => p.bg};
	width: 100%;
	border-radius: 4px;
`;
const AddingLine = styled(Line)`
	background-image: repeating-linear-gradient(
		45deg, 
		transparent 0, 
		transparent 4px, 
		${({theme, bonus}) => bonus ? '#2b452b' : theme.darkGray} 4px, 
		${({theme, bonus}) => bonus ? '#2b452b' : theme.darkGray} 8px
	);
	background-color: ${({theme}) => theme.shadowGray};
`;
const StyledPlayer = styled.div`
	display: flex;
	flex-direction: column;
	width: 40px;
	animation: ${addingKeys} linear;
	animation-duration: .2s;

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
	padding: ${({theme}) => theme.pg12};
	border-radius: 4px;
	background: ${({theme}) => theme.darkGray};
`;
const BonusText = styled.div`
	color: #53e253;
	position: absolute;
	left: 50px;
	top: 30px;
	line-height: 24px;
`;

const Player = ({ photo_100, color, potentialSum, count, addingBits, userBet }) => {
	const bonus = potentialSum === (count + addingBits);

	return (
		<StyledPlayer>
			<LineArea>
				<Line {...{ potentialSum, count, bg: color }} />
				{ userBet && 
				<AddingLine {...{ bonus, potentialSum, count: addingBits, bg: '' }}>
					{ bonus && <BonusText>+2% к выигрышу</BonusText> }
				</AddingLine> }
			</LineArea>
			{ photo_100 ? 
				<Photo src={photo_100} /> : 
				<StyledIcon src='add' />
			}
		</StyledPlayer>
	);
};

const Players = () => {
	const { players, addingBits, sum } = useStore();
	const user = useUser();
	const potentialSum = sum + addingBits;
	const inGame = user && players.some(({ id }) => id === user.id);

	const withUserPlayers = addingBits && !inGame ? [ ...players, { id: user.id, count: 0 } ] : players;

	return (
		<StyledPlayers>
			{ withUserPlayers.length ? 
			withUserPlayers.map((player, key) => (
				<Player {...{ 
					...player, 
					key,
					potentialSum, 
					userBet: !user ? false : player.id === user.id, 
					addingBits
				}} />
			)) : 
			<Warning>
				<Icon src='gift' width={64} />
				<p>Добавьте к игре биты первым и получите дополнительные 2% при выигрыше!</p>
			</Warning>
			}
		</StyledPlayers>
	);
}

export default observer(Players);