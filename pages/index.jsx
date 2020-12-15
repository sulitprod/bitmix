// import { useObserver } from 'mobx-react-lite';

import Grid from '../components/jsx/domination/Grid';
import Panel from '../components/jsx/domination/Panel';
import Players from '../components/jsx/domination/Players';
import FooterPanel from '../components/jsx/domination/FooterPanel';
import Actions from '../components/jsx/domination/Actions';
import { declText } from '../utils';

// import { useStore } from '../hooks';

// import { dominations } from '../../server/models';

// import { session } from '../../libs';
// import { toJSON } from '../../utils';

// export default function Main({ title }) {
// 	return (
// 		<>
// 			<main>
// 				<div className="info">
// 					<div className="title">
// 						<p className="name">{title}</p>
// 						<p>•</p>
// 						<p>Игра #{Domination.id}</p>
// 					</div>
// 					<p>{Domination.players.length} игроков</p>
// 				</div>
// 				<div className="content">
// 					<div>
// 						<Players />
// 					</div>
// 					<div>
// 						<Panel />
// 					</div>
// 					<div>
// 						<Grid />
// 					</div>
// 					<div>
// 						<Winners />
// 					</div>
// 				</div>
// 			</main>
// 		</>
// 	);
// }

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

export default function Main({ title, info }) {
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
						<Players />
					</div>
					<div className="space">
						<Panel />
					</div>
					<div>
						<Grid />
					</div>
					<div>
						<FooterPanel />
					</div>
					<div className="space">
						<Actions />
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
			id: 1,
			players: [0, 1, 2]
		},
	};

	return { props }
}