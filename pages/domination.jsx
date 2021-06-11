import { useState, useEffect } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import styled from 'styled-components';

import Grid from '../components/domination/Grid';
import Panel from '../components/domination/Panel';
import Players from '../components/domination/Players';
import FooterPanel from '../components/domination/FooterPanel';
import Actions from '../components/domination/Actions';
import Timer from '../components/domination/Timer';
import { Info, Content, Separator, Warning, Main } from '../components/Styled';

import { declText, Times } from '../utils';
import { firebaseDB } from '../utils/firebase';
import { currentDomination } from '../hooks/domination';
import { TIMES } from '../constant';
import Icon from '../components/default/Icon';
import { useStore } from '../providers/Store';

const StyledIcon = styled(Icon)`
	fill: ${({theme}) => theme.lightGray};
`;

const lastWinners = [
	{
		photo_100: 'img/favicon.png',
	},
	{
		photo_100: 'img/favicon.png',
	},
	{
		photo_100: 'img/favicon.png',
	},
	{
		photo_100: 'img/favicon.png',
	},
	{
		photo_100: 'img/favicon.png',
	},
];

const Domination = ({ title, startDomination }) => {
	const [ getDomination, loading, error ] = useCollectionData(
		firebaseDB.collection('domination').where('current', '==', true),
		{ snapshotListenOptions: { includeMetadataChanges: true } }
	);
	const domination = getDomination ? getDomination[0] : startDomination;
	const { id, players, status, started, actions } = domination;
	const [ addingBits, updateAddingBits ] = useState(0);
	const computedRemaining = () => {
		const remaining = TIMES.domination[status] - (Times(2) - Times(2, started)) / 1000;

		return remaining < 0 ? 0 : remaining;
	};
	const [ remaining, setRemaining ] = useState(computedRemaining());

	useEffect(() => {
		if (status === 2 || status === 3) updateAddingBits(0);

		const interval = setInterval(() => {
			const current = computedRemaining();

			setRemaining(current);
			if (current === 0) clearInterval(interval);
		}, 500);

		return () => clearInterval(interval);
	}, [status]);

	return (
		<Main>
			{ domination ? 
			<>
				<Info>
					<div className="title">{title}<Separator />{`Игра #${id}`}</div>
					<div>{`${players.length} ${declText(players.length, 'участников', 'участник', 'участника')}`}</div>
				</Info>
				<Content>
					<Players {...{ players, addingBits }} />
					<Timer {...{ status, remaining }} />
					<Panel { ...{ domination, updateAddingBits, remaining }} />
					<Grid {...{ domination, remaining }} />
					<FooterPanel {...{ lastWinners, players }} />
					<Actions {...{ actions }} />
				</Content>
			</> :
			<Warning>
				<StyledIcon src='warning' width={64} />
				<p>Ошибка загрузки игры</p>
			</Warning> }
		</Main>
	);
}

const getStaticProps = async () => {
	const { data } = await currentDomination();
	const props = {
		title: 'Доминация',
		startDomination: data
	}

	return { props }
}

export default Domination;
export { getStaticProps };