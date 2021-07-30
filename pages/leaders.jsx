import { observer } from 'mobx-react-lite';
import styled from 'styled-components';

import Bits from '../components/Bits';
import { Button, Photo } from '../components/default';
import { Info, Content, Main, SubBlock } from '../components/Styled';
import { getTopPlayers } from '../hooks/domination-redis';
import { useStore } from '../providers/Store';

const StyledLeaders = styled.div`
	width: 100%;
	display: table;
	counter-reset: place;
	color: ${({theme}) => theme.white};
`;
const FlexRow = styled.div`
	display: table-row;
	align-items: center;
	> div {
		display: table-cell;
		vertical-align: middle;

		&.player {
			width: 100%;
		}
	}
`;
const Header = styled(FlexRow)`
	> div {
		padding: ${({theme}) => theme.pg8};
		color: ${({theme}) => theme.lightGray};
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
	> .place:before {
		counter-increment: place;
		content: counter(place);
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

const Leader = ({ photo, name, count, id }) => (
	<StyledLeader>
		<div className='place'></div>
		<div className='player'>
			<Button {...{ left: <Photo src={photo} />, align: 'left', href: `/user/${id}` }}>{name}</Button>
		</div>
		<Bits value={count} className='count' />
	</StyledLeader>
);
const Leaders = ({ leaders }) => {
	return (
		<Main>
			<Info>
				<div className='title'>Список лидеров</div>
			</Info>
			<Content>
				<SubBlock>
					<div className='header'>
						<div className='title'>Наибольший выигрыш</div>
					</div>
					<div className='content'>
						<StyledLeaders>
							<Header>
								<div>Место</div>
								<div className='player'>Игрок</div>
								<div>Выигрыш</div>
							</Header>
							{leaders.map(({ player: { photo, name, id }, count }) => 
								<Leader {...{ photo, name, id, count, key: id }} />
							)}
						</StyledLeaders>
					</div>
				</SubBlock>
			</Content>
		</Main>
	)
};

const getStaticProps = async () => {
	const props = {
		leaders: await getTopPlayers()
	}

	return { props }
}

export default observer(Leaders);
export { getStaticProps };