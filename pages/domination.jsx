import { useEffect } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { observer } from 'mobx-react-lite';

import Grid from '../components/domination/Grid';
import Panel from '../components/domination/Panel';
import Players from '../components/domination/Players';
import FooterPanel from '../components/domination/FooterPanel';
import Actions from '../components/domination/Actions';
import Timer from '../components/domination/Timer';
import { Info, Content, Separator, Warning, Main } from '../components/Styled';

import { declText } from '../utils';
import { Icon } from '../components/default';
import { useStore } from '../providers/Store';
import { firebaseDB } from '../utils/firebase';

const Domination = observer(({ title }) => {
	const domination = useStore();
	const [ getDomination, loading, error ] = useCollectionData(
		firebaseDB.collection('domination').where('current', '==', true),
		{ snapshotListenOptions: { includeMetadataChanges: true } }
	);
	const { id, players } = domination;

	useEffect(() => getDomination ? domination.init(getDomination[0]) : '', [getDomination]);

	return (
		<Main>
			{ domination ? 
			<>
				<Info>
					<div className='title'>{title}<Separator />{`Игра #${id}`}</div>
					<div>{`${players.length} ${declText(players.length, 'участников', 'участник', 'участника')}`}</div>
				</Info>
				<Content>
					<Players />
					<Timer />
					<Panel />
					<Grid />
					<FooterPanel />
					<Actions />
				</Content>
			</> :
			<Warning>
				<Icon src='warning' width={64} />
				<p>Ошибка загрузки игры</p>
			</Warning> }
		</Main>
	);
});

const getStaticProps = async () => {
	const props = {
		title: 'Доминация'
	}

	return { props }
}

export default Domination;
export { getStaticProps };