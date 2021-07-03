import { signOut } from 'next-auth/client';
import styled from 'styled-components';
import { useEffect, useState } from 'react';

import Bits from '../Bits';
import { Button, Photo, Tooltip } from '../default';
import { Info, Content, SubBlock, Separator, Main } from '../Styled';
import { useUser } from '../../providers/Store';

const Actions = styled.div`
	display: flex;
	
	> .button + .button {
		margin-left: ${({theme}) => theme.pg8};
	}
`;
const CreatedInfo = styled.div`
	font-size: 12px;
	color: ${({theme}) => theme.lightGray};
`;
const Name = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;
const Status = styled.p`
	color: ${({type, theme}) => type === 2 ? '#BF4242' : type === 1 ? '#FFD700' : theme.lightGray};
`;
const WarningText = styled.div`
	text-align: center;
	color: ${({theme}) => theme.lightGray};
	padding: ${({theme}) => theme.pg12};
	line-height: 16px;
`;
const StyledRewards = styled.div`
	> .header {
		margin-bottom: ${({theme}) => theme.pg8};
		text-align: center;
	}
	> .content {
		display: flex;

		> div + div {
			margin-left: ${({theme}) => theme.pg8};
		}
	}
`;
const SignOut = styled(Button)`
	color: ${({theme}) => theme.redText};
`;
const StyledStatistic = styled.div`
	width: 1022px;

	> div {
		display: flex;

		&.header {
			margin-bottom: ${({theme}) => theme.pg8};
			color: ${({theme}) => theme.lightGray};
		}

		> div {
			width: 33.3%;
			text-align: center;
		}
	}
`;
const RewardInfo = styled.div`
	width: 256px;
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;

	> * {
		margin: ${({theme}) => theme.pg4};
	}
	> .description {
		font-size: 12px;
		color: ${({theme}) => theme.lightGray};
	}
`;

const LastGames = () => {
	const lastGames = [];

	return (
		<SubBlock>
			<div className='header'>
				<div className='title'>Последние 10 игр</div>
				<div className='buttons'>
					<Button type='main' value='Посмотреть все' padding={12} />
				</div>
			</div>
			<div className='content'>
				{ lastGames.length ? 
				'' :
				<WarningText>Участия в играх не найдено</WarningText>
				}
			</div>
		</SubBlock>
	)
}

const Statistic = () => {
	return (
		<StyledStatistic>
			<div className='header'>
				<div>Количество игр</div>
				<div>Процент побед</div>
				<div>Сыграно битов</div>
			</div>
			<div>
				<div>-</div>
				<div>-</div>
				<div>
					<Bits value='0' />
				</div>
			</div>
		</StyledStatistic>
	)
}

const Rewards = ({ rewards }) => {
	const [ttpShow, setShow] = useState(false);

	useEffect(() => setShow(true), []);

	// ReactDOMServer.renderToStaticMarkup() - HTML внутри data-tip
	return (
		<StyledRewards>
			<div className='header'>Награды</div>
			<div className='content'>
				{ rewards.length ?
				rewards.map(({ name, photo, description }, key) => (
					<div key={key} data-tip={
						JSON.stringify({ name, photo, description })
					} data-for='reward'>
						<Photo src={photo} />
					</div>
				)) :
				<WarningText>Награды отсутствуют</WarningText>
				}
			</div>
			{ttpShow ? 
			<Tooltip place='top' effect='solid' id='reward' getContent={json => {
				if (json) {
					const { name, photo, description } = JSON.parse(json);

					return (
						<RewardInfo>
							<p className='title'>{name}</p>
							<Photo src={photo} width={64} />
							<p className='description'>{description}</p>
						</RewardInfo>
					)
				}
			}} /> : ''}
		</StyledRewards>
	)
}

const Settings = () => {
	return (<div></div>)
}

const ProfilePage = ({ searchId }) => {
	const user = useUser();
	const statusText = [
		'Стандарт',
		'Премиум',
		'Заблокированный'
	]
	const customUser = {
		photo_100: 'https://sun4-17.userapi.com/s/v1/ig2/jCQ0wIVLVBG6ifAm4zDZcnPqDlig5GWukUOu2LjdWa4nbaaNrQFetfyD27RgONjLu2u74qv9P99P89fUmS4f3DzV.jpg?size=100x0&quality=96&crop=272,2,1460,1460&ava=1',
		name: 'Кампот Кампотов',
		id: '2212',
		rewards: [
			{
				name: 'Лучший игрок 2021',
				photo: '/img/favicon.png',
				description: 'Награждается игрок, находящийся в топе 1 дольше всех за определенный год'
			},
			{
				name: 'Худший игрок 2021',
				photo: '/img/favicon.png',
				description: 'Награждается игрок'
			}
		],
		created: '21.05.2021',
		status: 1
	}
	const { photo_100, name, rewards, created, status, id } = searchId ? customUser : user;

	return (
		<Main>
			<Info>
				<div className='title'>Профиль</div>
			</Info>
			<Content>
				<Photo src={photo_100} width={100} />
				<CreatedInfo>ID: {id}<Separator />Created: {created}</CreatedInfo>
				<Actions>
					<Button value='Перевести биты' type='main' padding={12} />
					{ searchId ? '' : <SignOut value='Выйти' type='main' onClick={signOut} padding={12} /> }
				</Actions>
				<Name>
					<p>{name}</p>
					<Status type={status}>{statusText[status]}</Status>
				</Name>
				<Statistic />
				<Rewards {...{ rewards }} />
				<LastGames />
				{ searchId ? '' : <Settings /> }
			</Content>
		</Main>
	)
}

export default ProfilePage;