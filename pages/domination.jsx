import { useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';

import Grid from '../components/domination/Grid';
import Panel from '../components/domination/Panel';
import Players from '../components/domination/Players';
import FooterPanel from '../components/domination/FooterPanel';
import Actions from '../components/domination/Actions';
import { Info, Content } from '../components/Styled';

import { declText } from '../utils';
import { firebaseDB } from '../utils/firebase';

const Domination = ({ title, user }) => {
	const [userBits, updateUserBits] = useState(0);
	const [value, loading, error] = useCollection(
		firebaseDB.collection('domination'),
		{ snapshotListenOptions: { includeMetadataChanges: true } }
	);

	return (
		<main>
			{ value ? 
			<>
				<Info>
					<div className="title">
						<p className="name">{title}</p>
						<p>•</p>
						<p>Игра #{value.docs[0].id}</p>
					</div>
					<div>{`${value.docs[0].data().players.length} ${declText(value.docs[0].data().players.length, 'участников', 'участник', 'участника')}`}</div>
				</Info>
				<Content>
					<Players domination={{ id: value.docs[0].id, ...value.docs[0].data() }} user={user} userBits={userBits} />
					<Panel domination={{ id: value.docs[0].id, ...value.docs[0].data() }} user={user} updateUserBits={updateUserBits} />
					<Grid domination={{ id: value.docs[0].id, ...value.docs[0].data() }} />
					<FooterPanel domination={{ id: value.docs[0].id, ...value.docs[0].data() }} />
					<Actions domination={{ id: value.docs[0].id, ...value.docs[0].data() }} />
				</Content>
			</> :
			<div>Пока не создано не одной игры</div> }
		</main>
	);
}
 
export default Domination;

export const getStaticProps = async () => {
	const props = {
		title: 'Доминация',
		user: {
			id: 3,
			photo_50: 'favicon.png',
			name: 'Gleb',
			balance: 300
		}
	}

	return { props }
}