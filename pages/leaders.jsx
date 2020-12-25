import styled from 'styled-components';
import Coins from '../components/Coins';
import Photo from '../components/default/Photo';

import { Info, Content } from '../components/Styled';

const StyledLeaders = styled.div`
	width: 1022px;
	display: table;
	color: ${({theme}) => theme.white};
`;
const FlexRow = styled.div`
	display: table-row;
	align-items: center;
	> div {
		padding: ${({theme}) => theme.pg8};
		display: table-cell;
		vertical-align: middle;

		&.player {
			width: 100%;
		}
	}
`;
const StyledLeader = styled(FlexRow)`
	> .player {
		display: flex;
		align-items: center;

		> p {
			margin-left: ${({theme}) => theme.pg8};
		}
	}
	> .place, .count {
		text-align: center;
	}
	&:nth-child(2) .place {
		color: #FFD700;
	}
	&:nth-child(3) .place {
		color: #C0C0C0;
	}
	&:nth-child(4) .place {
		color: #cd7f32;
	}
`;

const Leader = ({ photo_50, name, count, id }) => (
	<StyledLeader>
		<div className="place">{id + 1}</div>
		<div className="player">
			<Photo src={photo_50} />
			<p>{name}</p>
		</div>
		<Coins value={count} className="count" />
	</StyledLeader>
);
const Leaders = ({ info }) => (
	<main>
		<Info>
			<div className="title">
				<p className="name">Список лидеров</p>
			</div>
		</Info>
		<Content>
			<StyledLeaders>
				<FlexRow>
					<div>Место</div>
					<div className="player">Игрок</div>
					<div>Выигрыш</div>
				</FlexRow>
				{info.map((props, key) => <Leader {...props} key={key} id={key} />)}
			</StyledLeaders>
		</Content>
	</main>
);

export default Leaders;

export async function getServerSideProps() {
	const props = {
		info: [
			{
				photo_50: 'favicon.png',
				name: 'Алена',
				count: 15032
			},
			{
				photo_50: 'favicon.png',
				name: 'Павел',
				count: 8062
			},
			{
				photo_50: 'favicon.png',
				name: 'Супер-убийца',
				count: 3044
			}
		]
	}

	return { props }
}