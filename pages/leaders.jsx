import styled from 'styled-components';
import Bits from '../components/Bits';
import Photo from '../components/default/Photo';

import { Info, Content, Main } from '../components/Styled';

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

const Leader = ({ photo_100, name, count, id }) => (
	<StyledLeader>
		<div className="place">{id + 1}</div>
		<div className="player">
			<Photo src={photo_100} />
			<p>{name}</p>
		</div>
		<Bits value={count} className="count" />
	</StyledLeader>
);
const Leaders = ({ info }) => (
	<Main>
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
	</Main>
);

export default Leaders;

export async function getServerSideProps() {
	const props = {
		info: [
			{
				photo_100: 'img/favicon.png',
				name: 'Алена',
				count: 15032
			},
			{
				photo_100: 'img/favicon.png',
				name: 'Павел',
				count: 8062
			},
			{
				photo_100: 'img/favicon.png',
				name: 'Супер-убийца',
				count: 3044
			}
		]
	}

	return { props }
}