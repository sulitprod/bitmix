import { useState } from 'react';
import styled from 'styled-components';

import Button from '../default/Button';
import Bits from '../Bits';
import Icon from '../default/Icon';
import Photo from '../default/Photo';

import { declText } from '../../utils';

const ColoredIcon = styled(Icon)`
	&& {
		position: absolute;
		left: 3px;
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
	padding: ${({theme}) => theme.pg12};
	line-height: 16px;
`;
const StyledAction = styled.div`
	display: flex;
	padding: ${({theme}) => theme.pg4};
	color: ${({theme}) => theme.lightGray};
	justify-content: space-between;

	.mainText {
		color: ${({theme}) => theme.white};
	}
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
	}
`;
const StyledGroupedAction = styled.div`
	display: flex;
	color: ${({theme}) => theme.lightGray};
	flex-direction: column;

	.mainText {
		color: ${({theme}) => theme.white};
	}
	> div {
		display: flex;
		align-items: center;
		padding: ${({theme}) => theme.pg4};

		&.top {
			justify-content: space-between;
			
			> .player {
				display: flex;
				align-items: center;
				
				> p {
					margin-left: ${({theme}) => theme.pg8};
				}
			}
		}
		&.content {
			flex-wrap: wrap;

			> div {
				display: flex;
				align-items: center;
				margin-right: ${({theme}) => theme.pg4};
			}
		}
	}
`;
const StyledPackage = styled.div`
	padding-left: ${({theme}) => theme.pg8};
			
	> .mainText {
		background: ${({theme}) => theme.darkGray};
		padding: ${({theme}) => theme.pg8};
	}
`
const StyledActions = styled.div`
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

const Package = ({ color, packages }) => (
	<StyledPackage>
			<StyledIcon src='packageTail' width={30} />
			<ColoredIcon src='packageTail2' width={30} bg={color} />
			<div className='mainText'>{`${packages[0]} - ${packages[1]}`}</div>
	</StyledPackage>
)

const Action = ({ photo_50, count, name, packages, color }) => (
	<StyledAction>
		<div>
			<Photo src={photo_50} />
			<div className='text'>
				<p>Игрок</p>
				<p className='mainText'>{name}</p>
				<p>добавил</p>
				<Bits value={count} />
			</div>
		</div>
		<Package {...{ color, packages }} />
	</StyledAction>
);

const GroupedActions = ({ photo_50, count, name, packagesList, color }) => (
	<StyledGroupedAction>
		<div className='top'>
			<div className='player'>
				<Photo src={photo_50} />
				<p className='mainText'>{name}</p>
				<p>({packagesList.length} {declText(packagesList.length, 'пакетов', 'пакет', 'пакета')})</p>
			</div>
			<Bits value={count} />
		</div>
		<div className='content'>{packagesList.map((packages, key) => (
			<Package {...{ color, packages }} key={key} />
		))}</div>
	</StyledGroupedAction>
);

const Actions = ({ domination }) => {
	const [ sortView, changeSortView ] = useState(true);
	const { actions } = domination;
	const sortedActions = actions.slice(0).reverse();
	let groupedActions = {};

	for (const action of sortedActions) {
		const { id, packages, count } = action;

		if (!(id in groupedActions)) groupedActions[id] = {
			...action,
			count: 0,
			packagesList: []
		}; 
		groupedActions[id].packagesList.push(packages);
		groupedActions[id].count += count;
	}
	groupedActions = Object.values(groupedActions);

	return (
		<StyledActions>
			<div className='top'>
				<div>
					<p className='mainText'>История</p>
					<p className='separator'>•</p>
					<p>{
					sortedActions.length ? 
					`${sortedActions.length} ${declText(sortedActions.length, 'действий', 'действие', 'действия')}` :
					'Нет действий'
					}</p>
				</div>
				<div>
					<Button type='main' children={<Icon src='sort' width={24} />} onClick={() => changeSortView(true)} active={sortView} />
					<Button type='main' children={<Icon src='list' width={24} />} onClick={() => changeSortView(false)} active={!sortView} />
				</div>
			</div>
			<div className='content'>
				{sortedActions.length ? 
				sortView ? sortedActions.map((action, key) => (
					<Action key={key} {...action} />
				)) :
				groupedActions.map((action, key) => (
					<GroupedActions key={key} {...action} />
				)) :
				<NoActionsText>В игре пока не совершено действий</NoActionsText>}
			</div>
		</StyledActions>
	);
}

export default Actions;