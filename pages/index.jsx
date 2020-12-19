import styled from 'styled-components';

import Grid from '../components/domination/Grid';
import Panel from '../components/domination/Panel';
import Players from '../components/domination/Players';
import FooterPanel from '../components/domination/FooterPanel';
import Actions from '../components/domination/Actions';

import { declText, genGrid, rndColor } from '../utils';

const Info = styled.div`
	margin-top: 32px;
	padding: ${({theme}) => theme.pg4};
	text-align: center;

	> .title {
		display: flex;
		justify-content: center;

		> .name {
			font-weight: 600;
		}

		> p {
			font-size: 20px;
			padding: ${({theme}) => theme.pg4};
		}
	}

	> div {
		text-align: center;
		color: ${({theme}) => theme.white};
		padding: ${({theme}) => theme.pg4};
	}
`;

const Content = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	> div {
		margin-bottom: 16px;
	}
` 

const Main = ({ title, info, user }) => {
	return (
		<main>
			<Info>
				<div className="title">
					<p className="name">{title}</p>
					<p>•</p>
					<p>Игра #{info.id}</p>
				</div>
				<div>{`${info.players.length} ${declText(info.players.length, 'участников', 'участник', 'участника')}`}</div>
			</Info>
			<Content>
				<Players Domination={info} />
				<Panel User={user} />
				<Grid Domination={info} />
				<FooterPanel Domination={info} />
				<Actions Domination={info} />
			</Content>
		</main>
	);
}

export default Main;

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