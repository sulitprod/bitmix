import styled from 'styled-components';

import Photo from '../default/Photo';
import Icon from '../default/Icon';

import { percent } from '../../utils';

const Line = styled.div`
	background: ${p => p.bg};
	height: ${p => percent(p.sum, p.count)}px;
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

const Player = ({ photo_50, color, sum, count }) => (
	<StyledPlayer>
		<div className='line'>
			<Line {...{ sum, count, bg: color }} />
		</div>
		<Photo src={photo_50} />
	</StyledPlayer>
);

const Players = ({ Domination: { players, sum } }) => (
	<StyledPlayers>
		{players.length ? players.map((player, key) => (
			<Player {...player}{...{ key, sum }} />
		)) : 
		<GiftText>
			<StyledIcon src='gift' width={64} />
			<p>Добавьте к игре биты первым и получите дополнительные 2% при выигрыше!</p>
		</GiftText>}
	</StyledPlayers>
);

export default Players;