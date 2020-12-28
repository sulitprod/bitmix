import { useState } from 'react';
import { dominationCollection, DominationContextProvider, useDomination } from '../hooks/domination';
import { getCollectionItems } from '../utils/firebase';

import Grid from '../components/domination/Grid';
import Panel from '../components/domination/Panel';
import Players from '../components/domination/Players';
import FooterPanel from '../components/domination/FooterPanel';
import Actions from '../components/domination/Actions';
import { Info, Content } from '../components/Styled';
import { declText, genGrid, rndColor } from '../utils';

const DominationProvider = ({ info, title, user }) => (
	<DominationContextProvider domination={info}>
		<Domination {...{ title, user }} />
	</DominationContextProvider>
)

const Domination = ({ title, user }) => {
	const [userBits, updateUserBits] = useState(0);
	const { domination } = useDomination();

	const { players, id } = domination[0];

	return (
		<main>
			<Info>
				<div className="title">
					<p className="name">{title}</p>
					<p>•</p>
					<p>Игра #{id}</p>
				</div>
				<div>{`${players.length} ${declText(players.length, 'участников', 'участник', 'участника')}`}</div>
			</Info>
			<Content>
				<Players User={user} userBits={userBits} />
				<Panel User={user} updateUserBits={updateUserBits} />
				<Grid />
				<FooterPanel />
				<Actions />
			</Content>
		</main>
	);
}
 
export default DominationProvider;

export const getServerSideProps = async () => {
	const domination = await getCollectionItems(dominationCollection());
	const props = {
		title: 'Доминация',
		info: domination,
		user: {
			id: 3,
			photo_50: 'favicon.png',
			name: 'Gleb',
			balance: 300
		}
	}
	// const props = {
	// 	title: 'Доминация',
	// 	dd: Domination,
	// 	info: {
	// 		id: 2,
	// 		cells: [],
	// 		sum: 500,
	// 		actions: [],
	// 		players: [
	// 			{
	// 				id: 0,
	// 				photo_50: 'favicon.png',
	// 				name: 'Алена',
	// 				count: 150,
	// 				color: rndColor()
	// 			},
	// 			{
	// 				id: 1,
	// 				photo_50: 'favicon.png',
	// 				name: 'Павел',
	// 				count: 100,
	// 				color: rndColor()
	// 			},
	// 			{
	// 				id: 2,
	// 				photo_50: 'favicon.png',
	// 				name: 'Электротехник',
	// 				count: 250, 
	// 				color: rndColor()
	// 			}
	// 		]
	// 	},
	// 	user: {
	// 		id: 3,
	// 		photo_50: 'favicon.png',
	// 		name: 'Gleb',
	// 		balance: 300
	// 	}
	// };
	// props.info.cells = genGrid(props.info.players, 1441)
	// props.info.actions = [
	// 	{
	// 		...props.info.players[0],
	// 		count: 50,
	// 		packages: [1, 501]
	// 	}, 
	// 	{
	// 		...props.info.players[1],
	// 		count: 124,
	// 		packages: [502, 1742]
	// 	}, 
	// 	{
	// 		...props.info.players[0],
	// 		count: 100,
	// 		packages: [1743, 2743]
	// 	}
	// ]

	return { props }
}