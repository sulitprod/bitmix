import { useState } from 'react';
import styled from 'styled-components';

import Button from '../default/Button';
import Coins from '../Coins';
import Icon from '../default/Icon';
import Photo from '../default/Photo';
import { declText } from '../../utils';

const ColoredIcon = styled(Icon)`
	&& {
		position: absolute;
		left: -5px;
		top: 3px;
		fill: ${p => p.bg};
	}
`;

const StyledIcon = styled(Icon)`
	&& {
		fill: ${({theme}) => theme.darkGray};
		z-index: 1;
		top: 2px;
	}
`;
const NoActionsText = styled.div`
	text-align: center;
	color: ${({theme}) => theme.lightGray};
	padding: ${({theme}) => theme.pg8};
`;
const StyledAction = styled.div`
	display: flex;
	padding: ${({theme}) => theme.pg4};
	color: ${({theme}) => theme.lightGray};
	justify-content: space-between;

	> div {
		display: flex;
		align-items: center;

		> .text {
			margin-left: ${({theme}) => theme.pg8};
			> * {
				display: inline-block;
				margin-right: 6px;
			}
		}
		.mainText {
			color: ${({theme}) => theme.white};
		}
		> .package {
			background: ${({theme}) => theme.darkGray};
			padding: ${({theme}) => theme.pg8};
		}
	}
`;
const ActionsStyled = styled.div`
	background: ${({theme}) => theme.shadowGray};
	display: flex;
	flex-direction: column;
	width: 1022px;
	padding: ${({theme}) => theme.pg8};
	color: ${({theme}) => theme.white};

	> .top {
		display: flex;
		justify-content: space-between;
		width: 100%;
		padding: ${({theme}) => theme.pg4};

		> div {
			align-items: center;
			display: flex;

			> .separator {
				padding: 0 ${({theme}) => theme.pg8};
			}
			> .mainText {
				font-weight: 600;
			}
			> .button + .button {
				margin-left: ${({theme}) => theme.pg8};
			}
		}
	}
`;

const Action = ({ photo_50, count, name, packages, color }) => (
	<StyledAction>
		<div>
			<Photo src={photo_50} />
			<div className='text'>
				<p>Игрок</p>
				<p className='mainText'>{name}</p>
				<p>добавил</p>
				<Coins value={count} />
			</div>
		</div>
		<div>
			<StyledIcon src='packageTail' width={30} />
			<ColoredIcon src='packageTail2' width={30} bg={color} />
			<div className='mainText package'>{`${packages[0]} - ${packages[1]}`}</div>
		</div>
	</StyledAction>
);

const Actions = ({ Domination: { actions } }) => {
	const [sortView, changeSortView] = useState(true);

	return (
		<ActionsStyled>
			<div className='top'>
				<div>
					<p className='mainText'>История</p>
					<p className='separator'>•</p>
					<p>{actions.length ? 
					`${actions.length} ${declText(actions.length, 'действий', 'действие', 'действия')}` :
					'Нет действий'}</p>
				</div>
				<div>
					<Button type='main' children={<Icon src='sort' width={24} />} onClick={() => changeSortView(true)} active={sortView} />
					<Button type='main' children={<Icon src='list' width={24} />} onClick={() => changeSortView(false)} active={!sortView} />
				</div>
			</div>
			<div className='content'>
				{actions.length ? 
				sortView ? actions.map((action, key) => (
					<Action key={key} {...action} />
				)) :
				<NoActionsText>Эта сортировка пока не доступна</NoActionsText> :
				<NoActionsText>В игре пока не совершено действий</NoActionsText>}
			</div>
		</ActionsStyled>
	);
}

export default Actions;