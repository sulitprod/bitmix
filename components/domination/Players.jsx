import styled from 'styled-components';

import Photo from '../default/Photo';
import Icon from '../default/Icon';

import { percent } from '../../utils';
import { useDomination } from '../../hooks/domination';

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

const Player = ({ photo_50, color, sum, count }) => (
	<StyledPlayer>
		<div className='line'>
			<Line {...{ sum, count, bg: color || '' }}>
				{sum == count ? <BonusText>+2% к выигрышу</BonusText> : ''}
			</Line>
		</div>
		{photo_50 ? 
			<Photo src={photo_50} /> : 
			<IconArea>
				<Icon src='add' />
			</IconArea>
		}
	</StyledPlayer>
);

const Players = ({ userBits }) => {
	const { domination } = useDomination();
	const { sum, players } = domination[0];
	const newSum = sum + userBits; 

	return (
	<StyledPlayers>
		{userBits ? <Player {...{ count: userBits, sum: newSum }} /> : ''}
		{players.length || userBits ? players.map((player, key) => (
			<Player {...player}{...{ key, sum: newSum }} />
		)) : 
		<GiftText>
			<StyledIcon src='gift' width={64} />
			<p>Добавьте к игре биты первым и получите дополнительные 2% при выигрыше!</p>
		</GiftText>}
	</StyledPlayers>
);
		}

export default Players;