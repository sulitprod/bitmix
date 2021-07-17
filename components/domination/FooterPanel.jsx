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
	const { lastWinners, sum } = useStore();

	return (
		<Styled>
			<LastWinners>
				{ lastWinners.length ?
				lastWinners.map(({ photo }, key) => <Photo src={photo} key={key} />) :
				<p>Отсутствуют</p>
				}
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