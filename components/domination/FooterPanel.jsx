import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { useStore } from '../../providers/Store';

import Bits from '../Bits';
import { Photo } from '../default';
import { Separator } from '../Styled';

const Styled = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
	padding: 0 12px;
	color: ${({theme}) => theme.white};

	> div {
		align-items: center;
		display: flex;
	}
`;
const LastWinners = styled.div`
	> div + div {
		margin-left: ${({theme}) => theme.pg8};
	}
`;

const FooterPanel = observer(() => {
	const { players, lastWinners } = useStore();
	const sum = players.reduce((all, { count }) => all + count, 0);

	return (
		<Styled>
			<LastWinners>
				{lastWinners.map(({ data: { winner, players } }, key) => <Photo src={players[winner.player].photo_100} key={key} />)}
				<Separator />
				<p>Последние победители</p>
			</LastWinners>
			<div>
				<p>Общая сумма</p>
				<Separator />
				<Bits value={sum} />
			</div>
		</Styled>
	);
});

export default FooterPanel;