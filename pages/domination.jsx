import { useState } from 'react';
import { useCollection, useDocumentData } from 'react-firebase-hooks/firestore';

import Grid from '../components/domination/Grid';
import Panel from '../components/domination/Panel';
import Players from '../components/domination/Players';
import FooterPanel from '../components/domination/FooterPanel';
import Actions from '../components/domination/Actions';
import Timer from '../components/domination/Timer';
import { Info, Content } from '../components/Styled';

import { declText } from '../utils';
import { firebaseDB } from '../utils/firebase';
import { getDomination } from '../hooks/domination';

const Domination = ({ title, user, startDomination }) => {
	const [userBits, updateUserBits] = useState(0);
	const [getDomination, loading, error] = useDocumentData(
		firebaseDB.collection('current').doc('domination'),
		{ snapshotListenOptions: { includeMetadataChanges: true } }
	);

	const domination = getDomination || startDomination;

	return (
		<main>
			{ domination ? 
			<>
				<Info>
					<div className="title">
						<p className="name">{title}</p>
						<p>•</p>
						<p>Игра #{domination.id}</p>
					</div>
					<div>{`${domination.players.length} ${declText(domination.players.length, 'участников', 'участник', 'участника')}`}</div>
				</Info>
				<Content>
					<Players domination={domination} user={user} userBits={userBits} />
					<Timer domination={domination} />
					<Panel domination={domination} user={user} updateUserBits={updateUserBits} />
					<Grid domination={domination} />
					<FooterPanel domination={domination} />
					<Actions domination={domination} />
				</Content>
			</> :
			<div>Ошибка загрузки игры</div> }
		</main>
	);
}
 
export default Domination;

export const getStaticProps = async () => {
	const startDomination = await getDomination();
	const props = {
		title: 'Доминация',
		startDomination,
		user: {
			id: 3,
			photo_50: 'favicon.png',
			name: 'Gleb',
			balance: 300
		}
	}

	return { props }
}