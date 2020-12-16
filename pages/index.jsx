// import { useObserver } from 'mobx-react-lite';

import Grid from '../components/jsx/domination/Grid';
import Panel from '../components/jsx/domination/Panel';
import Players from '../components/jsx/domination/Players';
import FooterPanel from '../components/jsx/domination/FooterPanel';
import Actions from '../components/jsx/domination/Actions';
import { declText, genGrid, rndColor } from '../utils';

// import { useStore } from '../hooks';

// import { dominations } from '../../server/models';

// import { session } from '../../libs';
// import { toJSON } from '../../utils';


// export async function getServerSideProps({ query }) {
// 	const domination = await dominations.findOne({
// 		status: 0,
// 	});

// 	const props = {
// 		title: 'Доминация',
// 		domination: toJSON(domination),
// 	};

// 	const user = await session(query);

// 	if (user) {
// 		props.user = user;
// 	}

// 	return {
// 		props,
// 	};
// }

export default function Main({ title, info, user }) {
	return (
		<>
			<main>
				<div className="info">
					<div className="title">
						<p className="name">{title}</p>
						<p>•</p>
						<p>Игра #{info.id}</p>
					</div>
					<div className="playersCount">{`${info.players.length} ${declText(info.players.length, 'участников', 'участник', 'участника')}`}</div>
				</div>
				<div className="content">
					<div className="space">
						<Players Domination={info} />
					</div>
					<div className="space">
						<Panel User={user} />
					</div>
					<div>
						<Grid Domination={info} />
					</div>
					<div>
						<FooterPanel Domination={info} />
					</div>
					<div className="space">
						<Actions Domination={info} />
					</div>
				</div>
			</main>
			<style jsx>{`
				@import 'public/variables.scss';

				main {
					padding: $pg8;

					.info {
						margin-top: 32px;
						padding: $pg4;
						text-align: center;

						> .title {
							display: flex;
							justify-content: center;

							> .name {
								font-weight: 600;
							}

							> p {
								font-size: 20px;
								padding: $pg4;
							}
						}

						> div {
							text-align: center;
							color: $white;
							padding: $pg4;
						}
					}

					.content {
						padding: $pg4;

						> div {
							display: flex;
							justify-content: center;
							padding: $pg4;

							&.space {
								margin-top: 32px;
							}
						}
					}
				}
			`}</style>
		</>
	)
}

export async function getServerSideProps() {
	const props = {
		title: 'Доминация',
		info: {
			id: 2, 
			newColor: rndColor(),
			cells: [],
			sum: 500,
			actions: [],
			players: [
				{
					photo_50: 'favicon.png',
					name: 'Алена',
					count: 150,
					color: rndColor()
				},
				{
					photo_50: 'favicon.png',
					name: 'Павел',
					count: 100,
					color: rndColor()
				},
				{
					photo_50: 'favicon.png',
					name: 'Электротехник',
					count: 250, 
					color: rndColor()
				}
			]
		},
		user: {
			photo_50: 'favicon.png',
			name: 'Gleb',
			balance: 300
		}
	};
	props.info.cells = genGrid(props.info.players, 1441)
	props.info.actions = [
		{
			...props.info.players[0],
			count: 50,
			packages: [1, 501]
		}, 
		{
			...props.info.players[1],
			count: 124,
			packages: [502, 1742]
		}, 
		{
			...props.info.players[0],
			count: 100,
			packages: [1743, 2743]
		}
	]

	return { props }
}