import styled from 'styled-components';

import Bits from '../Bits';
import Photo from '../default/Photo';
import { Separator } from '../Styled';

const Styled = styled.div`
	display: flex;
	justify-content: space-between;
	width: 998px;
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
`

export default function FooterPanel({ lastWinners, players }) {
	const sum = players.reduce((all, { count }) => all + count, 0);

	return (
		<Styled>
			<LastWinners>
				{lastWinners.map(({ photo_100 }, key) => <Photo src={photo_100} key={key} />)}
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
}